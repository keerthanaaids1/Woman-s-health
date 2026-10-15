"""
AGENT 2: HormonalSymptomProfiler
Analyzes decoded symptom clusters using clinical triage pathways aligned with
Rotterdam consensus markers (Cycle irregularity, Androgen excess signs, Metabolic flags).
STRICTLY NON-DIAGNOSTIC: Frames findings as care navigation, symptom patterns, and physician prep.
"""

from typing import Dict, Any, List

def profile_hormonal_health(decoded_symptoms: List[Dict[str, Any]], patient_profile: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates decoded symptoms and cycle history.
    Outputs pattern classification, risk tier, recommended doctor tests, and lifestyle alignment.
    """
    categories = [s.get("category") for s in decoded_symptoms]
    clinical_terms = [s.get("clinical_term", "") for s in decoded_symptoms]

    has_cycle_disruption = "menstrual_cycle" in categories or patient_profile.get("cycle_regularity") in ["irregular", "absent", "delayed"]
    has_androgen_signs = "androgen_excess" in categories or "dermatological" in categories
    has_metabolic_signs = "metabolic" in categories
    has_pelvic_pain = "pelvic_pain" in categories

    score = 0
    pattern_indicators = []

    if has_cycle_disruption:
        score += 35
        pattern_indicators.append("Ovulatory Rhythm Alteration (Oligomenorrhea/Irregularity)")
    
    if has_androgen_signs:
        score += 35
        pattern_indicators.append("Cutaneous Hyperandrogenism Clustered (Facial Hirsutism / Cystic Acne)")
    
    if has_metabolic_signs:
        score += 15
        pattern_indicators.append("Metabolic & Glycemic Dysregulation Tendencies")

    if has_pelvic_pain:
        score += 15
        pattern_indicators.append("Pelvic Congestion & Dysmenorrhea Signals")

    # Determine Triage Level
    if score >= 60:
        triage_level = "High Clinical Correspondence"
        care_urgency = "Priority Gynecological Consultation Recommended (Within 2-3 Weeks)"
        summary_explanation = "Your reported symptoms exhibit a strong cluster typical of ovulatory and endocrine imbalances, frequently observed in PCOS/PCOD phenotypes. A doctor will help evaluate your ovarian reserve and androgen profile."
    elif score >= 30:
        triage_level = "Moderate Hormonal Pattern"
        care_urgency = "Routine Specialized Gynecological Check-Up (Within 4-6 Weeks)"
        summary_explanation = "You are experiencing localized hormonal or menstrual cycle fluctuations. While common and often manageable with lifestyle modifications, professional clinical evaluation helps prevent progression."
    else:
        triage_level = "Mild / Preventive Focus"
        care_urgency = "Elective Wellness & Preventative Hormonal Review"
        summary_explanation = "Your symptoms appear isolated or mild. Establishing good circadian rhythm, blood sugar stability, and cycle tracking is recommended."

    # Recommended Clinical Tests to ask the Gynecologist
    recommended_labs = [
        {"test": "Serum LH & FSH Ratio (Day 2-3 of cycle)", "purpose": "Assesses pituitary-ovarian signaling and ovulatory drive"},
        {"test": "Total Testosterone & DHEA-Sulfate", "purpose": "Measures free circulating androgens causing hirsutism/acne"},
        {"test": "Fasting Blood Glucose + Fasting Serum Insulin", "purpose": "Calculates HOMA-IR to assess underlying insulin resistance"},
        {"test": "TSH & Free T4 Panel", "purpose": "Rules out primary subclinical hypothyroidism mimicking cycle delays"},
        {"test": "Pelvic Ultrasonography (USG Pelvis)", "purpose": "Evaluates ovarian volume, stroma density, and follicle counts (>12-20 'pearl necklace' appearance)"}
    ]

    # Specific questions for the patient to ask her doctor
    doctor_questions = [
        "Given my cycle irregularity and symptom history, would you recommend evaluating my androgen levels or a pelvic ultrasound?",
        "Could my symptoms be driven primarily by insulin resistance, chronic stress (adrenal), or post-pill changes?",
        "What evidence-based dietary or inositol/magnesium supplementation strategies do you suggest alongside any prescription?",
        "Are my pelvic cramps typical dysmenorrhea or should we evaluate for endometriosis or cyst presence?"
    ]

    return {
        "agent": "HormonalSymptomProfiler",
        "triage_score": min(score, 100),
        "triage_level": triage_level,
        "care_urgency": care_urgency,
        "pattern_indicators": pattern_indicators,
        "summary_explanation": summary_explanation,
        "disclaimer": "CRITICAL NOTICE: This triage assessment is strictly educational and care-navigational. It is NOT a clinical diagnosis. PCOS diagnosis requires Rotterdam-criteria verification by a licensed medical practitioner.",
        "recommended_labs": recommended_labs,
        "doctor_questions": doctor_questions
    }
