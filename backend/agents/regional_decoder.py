"""
AGENT 1: RegionalLinguisticDecoder
Translates everyday, colloquial, and regional-language inputs (Hinglish, Hindi, Tamil, Telugu, Kannada, Bengali, etc.)
into standardized clinical symptom vectors, emotional sentiment, and severity indicators.
Includes both LLM-driven inference and an extensive offline deterministic lexicon.
"""

import re
import os
import httpx
from typing import Dict, Any, List

# Extensive multilingual colloquial mapping lexicon (Offline Guarantee)
COLLEQUIAL_LEXICON = [
    {
        "patterns": [r"periods? late", r"periods? nahi aa", r"mahina nahi", r"chadh gaye", r"cycle late", r"madhavidaai thamasam", r"ruk ruk ke", r"irregular", r"2 mahine", r"3 mahine"],
        "clinical_term": "Oligomenorrhea / Cycle Irregularity",
        "category": "menstrual_cycle",
        "significance": "Key indicator of ovulatory dysfunction or hormonal disruption.",
        "severity_weight": 0.8
    },
    {
        "patterns": [r"face pe baal", r"daadhi", r"facial hair", r"chin hair", r"upper lip hair", r"mooch", r"mukhathil mudi", r"mugam mudi", r"mukha meeda ventrukalu"],
        "clinical_term": "Facial Hirsutism / Hyperandrogenism",
        "category": "androgen_excess",
        "significance": "Elevated circulating free androgens / DHEAS affecting hair follicles.",
        "severity_weight": 0.85
    },
    {
        "patterns": [r"chidhchid", r"rona aata", r"gussa achanak", r"mood kharab", r"mood swing", r"crying for no reason", r"depressed feel", r"anxiety achanak", r"kovam", r"manasu kashtam"],
        "clinical_term": "Hormonal Mood Volatility / PMDD Tendency",
        "category": "neuro_endocrine",
        "significance": "Estrogen-progesterone fluctuations altering serotonin and GABA signaling.",
        "severity_weight": 0.75
    },
    {
        "patterns": [r"pet me dard", r"cramps", r"chubhan", r"lower abdomen", r"kamar dard", r"pet ke neeche", r"vayiru vali", r"kadupu noppi"],
        "clinical_term": "Pelvic Pain / Dysmenorrhea",
        "category": "pelvic_pain",
        "significance": "Prostaglandin-driven uterine myometrial contractions or follicular capsule tension.",
        "severity_weight": 0.7
    },
    {
        "patterns": [r"weight badh", r"vazan badh", r"pet nikal raha", r"belly fat", r"cannot lose weight", r"eda kooduthal", r"baruvu peragadam"],
        "clinical_term": "Metabolic Adiposity / Insulin Resistance Marker",
        "category": "metabolic",
        "significance": "Reduced peripheral insulin sensitivity promoting visceral adipose deposition.",
        "severity_weight": 0.7
    },
    {
        "patterns": [r"acne", r"pimples", r"jawline pe daane", r"cheeks pe daane", r"cystic pimples", r"muhase"],
        "clinical_term": "Hormonal Cystic Acne (Jawline / Mandibular)",
        "category": "dermatological",
        "significance": "Sebaceous gland stimulation from DHT and elevated sebum viscosity.",
        "severity_weight": 0.65
    },
    {
        "patterns": [r"baal jhad", r"hair fall", r"scalp thinning", r"maang chaudi", r"hair loss", r"mudi kottuthu", r"ventrukalu raaladam"],
        "clinical_term": "Androgenetic Scalp Alopecia",
        "category": "dermatological",
        "significance": "Miniaturization of crown hair follicles sensitive to dihydrotestosterone.",
        "severity_weight": 0.7
    },
    {
        "patterns": [r"thakan", r"tired", r"kamzori", r"sleepy all day", r"lethargic", r"aluppu", r"alasata"],
        "clinical_term": "Chronic Fatigue / Glycemic Fluctuations",
        "category": "metabolic",
        "significance": "Cellular energy deficits related to postprandial reactive hypoglycemia.",
        "severity_weight": 0.6
    },
    {
        "patterns": [r"pad rash", r"itch", r"khujli", r"chafing", r"jalan", r"burning sensation", r"pad allergy"],
        "clinical_term": "Vulvar Contact Dermatitis / Pad Friction Irritation",
        "category": "hygiene_dermatology",
        "significance": "Allergic or mechanical reaction to bleached synthetic topsheets and trapped moisture.",
        "severity_weight": 0.7
    }
]

# Emergency acute red flags that must trigger emergency escalation
EMERGENCY_RED_FLAGS = [
    {
        "patterns": [r"faint", r"behosh", r"chakkar aake gir", r"sudden severe pain", r"unbearable stabbing", r"soaked 1 pad in 30 mins", r"heavy clotting size of lemon"],
        "warning": "CRITICAL ACUTE FLAG DETECTED: Symptoms suggest possible ectopic pregnancy rupture, acute ovarian torsion, or severe hemorrhage. Immediate in-person emergency hospital care is required."
    }
]

async def decode_regional_input(raw_text: str, detected_language: str = "auto") -> Dict[str, Any]:
    """
    Decodes colloquial or regional natural language text into structured clinical tokens.
    Uses rule-based lexicon for 0ms deterministic safety, augmented with LLM if API is present.
    """
    text_lower = raw_text.lower()
    matched_symptoms: List[Dict[str, Any]] = []
    emergency_alerts: List[str] = []

    # 1. Check for emergency acute red flags first
    for flag in EMERGENCY_RED_FLAGS:
        for p in flag["patterns"]:
            if re.search(p, text_lower):
                emergency_alerts.append(flag["warning"])
                break

    # 2. Match regional colloquialisms
    for item in COLLEQUIAL_LEXICON:
        matched = False
        for pattern in item["patterns"]:
            if re.search(pattern, text_lower):
                matched = True
                break
        if matched:
            matched_symptoms.append({
                "clinical_term": item["clinical_term"],
                "category": item["category"],
                "significance": item["significance"],
                "severity_weight": item["severity_weight"],
                "matched_pattern": pattern
            })

    # Fallback if no specific lexicon matched: extract general tokens
    if not matched_symptoms and len(raw_text.strip()) > 3:
        matched_symptoms.append({
            "clinical_term": "Generalized Hormonal / Pelvic Symptom Cluster",
            "category": "general",
            "significance": "Symptom description recorded for gynecologist review.",
            "severity_weight": 0.5,
            "matched_pattern": "general_input"
        })

    # 3. If Gemini or Groq API key is present, attempt enhancement
    enhanced_summary = None
    gemini_key = os.getenv("GEMINI_API_KEY")
    groq_key = os.getenv("GROQ_API_KEY")

    if gemini_key:
        try:
            async with httpx.AsyncClient(timeout=4.0) as client:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key={gemini_key}"
                prompt = (
                    "You are a warm, clinical linguistic translator in a women's health sanctuary. "
                    "Translate regional colloquial symptoms into respectful, non-diagnostic clinical terminology. "
                    "Never provide a final medical diagnosis. Always maintain empathy and dignity.\n"
                    f"Patient expressed: '{raw_text}'. Provide a 1-sentence respectful clinical translation and guidance."
                )
                payload = {"contents": [{"parts": [{"text": prompt}]}]}
                res = await client.post(url, json=payload, headers={"Content-Type": "application/json"})
                if res.status_code == 200:
                    data = res.json()
                    enhanced_summary = data["candidates"][0]["content"]["parts"][0]["text"].strip()
        except Exception:
            pass

    if not enhanced_summary and groq_key:
        try:
            async with httpx.AsyncClient(timeout=4.0) as client:
                res = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {groq_key}", "Content-Type": "application/json"},
                    json={
                        "model": "llama-3.1-8b-instant",
                        "messages": [
                            {"role": "system", "content": "You are a warm, clinical linguistic translator in a women's health triage clinic. Translate regional colloquial symptoms into respectful, non-diagnostic clinical terminology. Never provide a final diagnosis."},
                            {"role": "user", "content": f"The patient expressed: '{raw_text}'. Provide a 1-sentence respectful clinical translation and reassurance."}
                        ],
                        "max_tokens": 100
                    }
                )
                if res.status_code == 200:
                    data = res.json()
                    enhanced_summary = data["choices"][0]["message"]["content"].strip()
        except Exception:
            pass

    if not enhanced_summary:
        symptom_names = [s["clinical_term"] for s in matched_symptoms]
        enhanced_summary = f"Identified markers: {', '.join(symptom_names)}. Clinical focus on ovulatory rhythm, hormonal homeostasis, and symptom relief."

    return {
        "agent": "RegionalLinguisticDecoder",
        "raw_input": raw_text,
        "is_emergency": len(emergency_alerts) > 0,
        "emergency_warnings": emergency_alerts,
        "matched_symptoms": matched_symptoms,
        "symptom_count": len(matched_symptoms),
        "clinical_summary": enhanced_summary,
        "primary_categories": list(set(s["category"] for s in matched_symptoms))
    }
