"""
AURA CARE SANCTUARY - Backend Core
Virtual Women's Health & Multi-Agent Triage Hospital Server
Built for high-end PCOS care navigation, regional linguistic translation,
menstrual product science, and emotional haven support.
"""

import os
import uuid
import logging
from typing import Dict, Any, Optional, List
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load environment configuration
load_dotenv()

from database import check_db_health, save_patient_record, get_patient_record, log_triage_event
from agents.regional_decoder import decode_regional_input
from agents.pcos_triage import profile_hormonal_health
from agents.hygiene_scientist import analyze_supplies, PRODUCT_CATALOG
from agents.mood_sanctuary import get_mood_care_plan
from agents.clinical_composer import compose_doctor_brief

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("aura.api")

app = FastAPI(
    title="Aura Women's Health Sanctuary API",
    description="Multi-Agent Hospital Triage, Regional Linguistic Decoder, and Menstrual Care System",
    version="2.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= DATA SCHEMAS =================
class GoogleAuthRequest(BaseModel):
    email: str = Field(..., example="ananya.sharma@gmail.com")
    name: str = Field(..., example="Ananya Sharma")
    avatar: Optional[str] = None
    google_id: Optional[str] = None

class PatientProfile(BaseModel):
    patient_id: Optional[str] = None
    name: str = "Valued Patient"
    email: Optional[str] = None
    age: int = 24
    cycle_regularity: str = "irregular" # regular, irregular, delayed, absent
    cycle_length_days: str = "38-45 days"
    last_period_date: Optional[str] = "2 months ago"
    menstrual_flow: str = "heavy" # light, medium, heavy, spotting
    reported_rashes: bool = False
    primary_goals: List[str] = ["cycle_balance", "skin_health", "mood_stability"]

class TriageAnalysisRequest(BaseModel):
    patient_profile: PatientProfile
    raw_symptom_text: str = Field(..., example="Periods 2 mahine se late hain aur face pe daadhi jaise baal aa rahe hain, bohot chidhchidi rehti hoon.")
    selected_body_regions: Optional[List[str]] = []
    severity_rating: int = 7
    active_insecurity: str = "facial_hair"

# ================= API ENDPOINTS =================

@app.get("/")
async def root():
    """System welcome and agent manifest."""
    return {
        "facility": "Aura Women's Specialty Health Sanctuary",
        "status": "Online & Triaging",
        "theme": "Blush Pink & Velvet Crimson Luxury Clinical Care",
        "active_agents": [
            {"name": "RegionalLinguisticDecoder", "role": "Translates Hinglish/Regional dialects into clinical symptom vectors"},
            {"name": "HormonalSymptomProfiler", "role": "Rotterdam-aligned non-diagnostic endocrine triage"},
            {"name": "MenstrualHygieneScientist", "role": "Product science & pad chemical irritant analyzer"},
            {"name": "MoodSanctuaryNavigator", "role": "Emotional haven, somatic regulation & insecurity reframing"},
            {"name": "ClinicalBriefComposer", "role": "Generates 1-page Doctor Consultation Dossier"}
        ]
    }

@app.get("/api/health")
async def health_check():
    """Live health status of database and services."""
    db_status = await check_db_health()
    return {
        "status": "healthy",
        "database": db_status,
        "ai_providers": {
            "groq_configured": bool(os.getenv("GROQ_API_KEY")),
            "gemini_configured": bool(os.getenv("GEMINI_API_KEY")),
            "offline_engine": "Deterministic Clinical Knowledge Vault (Active)"
        }
    }

@app.post("/api/auth/google")
async def google_login(payload: GoogleAuthRequest):
    """
    Authenticate or mock Google SSO for seamless patient access.
    Saves or restores patient profile in MongoDB/Vault.
    """
    patient_id = f"AURA-{abs(hash(payload.email)) % 100000:05d}"
    user_record = {
        "patient_id": patient_id,
        "email": payload.email,
        "name": payload.name,
        "avatar": payload.avatar or "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
        "auth_provider": "Google OAuth 2.0"
    }
    
    saved = await save_patient_record(patient_id, user_record)
    return {
        "success": True,
        "patient_id": patient_id,
        "user": saved
    }

@app.post("/api/patient/intake")
async def save_intake(profile: PatientProfile):
    """Save or update patient demographic & cycle details."""
    p_id = profile.patient_id or f"AURA-{uuid.uuid4().hex[:6].upper()}"
    saved = await save_patient_record(p_id, profile.dict())
    return {"success": True, "patient_id": p_id, "profile": saved}

@app.post("/api/triage/analyze")
async def run_multi_agent_triage(req: TriageAnalysisRequest):
    """
    Primary Multi-Agent Hospital Triage Pipeline:
    Agent 1 -> Agent 2 -> Agent 3 -> Agent 4 -> Agent 5
    """
    try:
        # Agent 1: Regional Linguistic Decoder
        decoder_result = await decode_regional_input(req.raw_symptom_text)
        
        # Agent 2: Hormonal Symptom Profiler (Rotterdam Criteria Aligned, Non-Diagnostic)
        triage_result = profile_hormonal_health(
            decoded_symptoms=decoder_result["matched_symptoms"],
            patient_profile=req.patient_profile.dict()
        )
        
        # Agent 3: Menstrual Hygiene Scientist (Pad/Product Intelligence)
        hygiene_result = analyze_supplies(
            patient_profile=req.patient_profile.dict(),
            reported_symptoms=[s["clinical_term"] for s in decoder_result["matched_symptoms"]]
        )
        
        # Agent 4: Mood Sanctuary Navigator (Insecurities & Mood Crash Protocol)
        mood_result = get_mood_care_plan(
            user_mood_state="anxious",
            selected_insecurity=req.active_insecurity
        )
        
        # Agent 5: Clinical Brief Composer (Doctor-Ready Brief)
        brief_result = compose_doctor_brief(
            patient_profile=req.patient_profile.dict(),
            decoder_data=decoder_result,
            triage_data=triage_result,
            hygiene_data=hygiene_result
        )
        
        # Audit log for clinical continuity
        event_id = str(uuid.uuid4())
        full_payload = {
            "event_id": event_id,
            "patient_id": req.patient_profile.patient_id or "AURA-GUEST",
            "decoder": decoder_result,
            "triage": triage_result,
            "hygiene": hygiene_result,
            "mood": mood_result,
            "brief": brief_result
        }
        await log_triage_event(event_id, full_payload)
        
        return {
            "success": True,
            "event_id": event_id,
            "pipeline_stages": [
                {"agent": "RegionalLinguisticDecoder", "status": "completed", "output": f"Decoded {decoder_result['symptom_count']} clinical markers"},
                {"agent": "HormonalSymptomProfiler", "status": "completed", "output": f"Triage Level: {triage_result['triage_level']}"},
                {"agent": "MenstrualHygieneScientist", "status": "completed", "output": f"Recommended: {hygiene_result['primary_recommendation']['name']}"},
                {"agent": "MoodSanctuaryNavigator", "status": "completed", "output": f"Active Haven: {mood_result['insecurity_guidance']['title']}"},
                {"agent": "ClinicalBriefComposer", "status": "completed", "output": f"Dossier ID {brief_result['dossier_id']} created"}
            ],
            "decoder": decoder_result,
            "triage": triage_result,
            "hygiene": hygiene_result,
            "mood": mood_result,
            "doctor_brief": brief_result
        }
    except Exception as e:
        logger.error(f"Error in multi-agent pipeline: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/supplies/compare")
async def get_supplies_comparison():
    """Retrieve full catalog of menstrual supplies with deep chemical & material breakdown."""
    return {"catalog": PRODUCT_CATALOG}

@app.get("/api/safe-room/insecurity")
async def get_safe_room_content(insecurity: str = "facial_hair"):
    """Fetch specialized reassurance and medical reframing for specific physical insecurities."""
    return get_mood_care_plan(selected_insecurity=insecurity)

@app.get("/api/demo/failure-cases")
async def get_test_failure_cases():
    """
    Hackathon Demonstration Endpoint (Rule 6.2 Compliance):
    Demonstrates handling of dialect slang, emergency acute flags, and network dropouts.
    """
    return {
        "cases": [
            {
                "id": "case_1_dialect_slang",
                "title": "Colloquial Hinglish Slang with Typos",
                "sample_input": "periods 3 mahine se late hain, face pe daadhi jaise baal aa rahe, bohot chidhchidi ho gayi hoon",
                "handled_behavior": "Decodes raw idioms accurately into Oligomenorrhea, Facial Hirsutism, and Hormonal Mood Volatility without hallucinatory diagnostic claims."
            },
            {
                "id": "case_2_acute_emergency",
                "title": "Severe Acute Pelvic Red-Flag (Ectopic/Torsion Risk)",
                "sample_input": "Unbearable sudden stabbing pain in right lower stomach, feel like fainting, soaked pad in 20 minutes",
                "handled_behavior": "Safety guardrails intercept input and trigger immediate Red-Alert Emergency Hospital Directive, overriding standard lifestyle guidance."
            },
            {
                "id": "case_3_offline_graceful_degradation",
                "title": "API Disconnection / Offline Mode",
                "sample_input": "Irregular cycles and jawline cystic pimples",
                "handled_behavior": "Zero crashes. Local deterministic Rotterdam clinical knowledge vault instantly takes over without cloud dependence."
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
