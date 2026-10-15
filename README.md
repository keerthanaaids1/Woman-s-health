# AURA CARE SANCTUARY — VIRTUAL WOMEN'S HEALTH HOSPITAL
> **IEEE RUAS TechFest Submission**  
> **Problem Statement 3: Women’s Health — Understanding Symptoms (Particularly PCOS)**  
> **Non-Diagnostic Care Navigation, Regional Linguistic Translation & Menstrual Product Science**

---

## 📌 The Scoping Checkpoint (Exact 2-Line Statement)
* **Who the user is:** Young and adult women experiencing hormonal disruption and suspected PCOS, who articulate their symptoms through everyday colloquial or regional idioms (Hinglish, Tamil, Telugu, Hindi) without clinical medical terminology.
* **What breaks for that user today:** Existing symptom checkers either fail to decode cultural phrasing, trigger catastrophic diagnostic panic without clinical triage, or completely ignore the emotional distress of physical insecurities (facial hair, acne, bloat) and chronic menstrual pad irritation.

---

## 🏥 Architecture: The Multi-Agent Clinical Rounds Swarm
Aura Care is architected like a digital specialty hospital where 5 autonomous clinical AI agents collaborate in parallel:

| Agent | Name | Clinical Role |
|---|---|---|
| **Agent 1** | `RegionalLinguisticDecoder` | Normalizes everyday Hinglish/regional phrases (*"periods 2 mahine se chadh gaye"*, *"face pe mote baal"* ) into standardized gynecological tokens without stigma. |
| **Agent 2** | `HormonalSymptomProfiler` | Evaluates symptom clusters against Rotterdam consensus markers (ovulatory disruption, hyperandrogenism, insulin resistance) in a **strictly non-diagnostic** triage format. |
| **Agent 3** | `MenstrualHygieneScientist` | Analyzes pad materials, chlorine bleaching, microplastics, and pH disruption. Answers *"Why this pad? Why not that pad? What does it do to the vulva?"* |
| **Agent 4** | `MoodSanctuaryNavigator` | Houses "The Safe Room" for reframing body dysmorphia (hirsutism, cystic acne, weight resistance), stabilizing mood crashes, and guiding a 4-7-8 somatic vagus nerve pacer. |
| **Agent 5** | `ClinicalBriefComposer` | Converts patient-expressed concerns into a 1-page printable **Doctor Consultation Dossier** with lab panels (LH:FSH, DHEAS, HOMA-IR, USG) and questions for the gynecologist. |

---

## ⚖️ Hackathon Rule 6.2 Compliance
> *"A chat interface layered over an API is not accepted as a submission on its own. Teams must demonstrate either a non-chat interaction surface or a specific failure case they identified and handled."*

Aura Care Sanctuary exceeds Rule 6.2 in both dimensions:

### 1. Rich Non-Chat Interaction Surfaces
* **Interactive Bodily Region Radar:** Multi-system anatomical selector mapping pelvic, facial, neuro-endocrine, metabolic, and dermatological discomfort vectors with severity sliders.
* **The Menstrual Product Science Lab:** Side-by-side material and chemical breakdown comparing bleached synthetic pads, organic bamboo cotton, and medical-grade silicone cups.
* **The 4-7-8 Somatic Breathing Orb:** Live visual and tactile pacer stimulating the vagal calming reflex during hormonal mood crashes.
* **1-Page Printable Doctor Dossier:** Medical-grade summary sheet formatted for gynecological appointments with 1-click print and clipboard export.

### 2. Specific Failure Cases Identified & Handled
* **Failure Case 1 (Dialect & Colloquial Slang):** Prevents clinical misinterpretation of slang phrases like *"periods chadh gaye"* or *"thodi pe daadhi"* through a zero-latency colloquial lexicon.
* **Failure Case 2 (Acute Emergency Red-Flags):** Detects life-threatening symptoms (e.g. *"sudden severe stabbing abdominal pain, feel like fainting, soaked pad in 20 mins"*) and instantly triggers a prominent Red-Alert Emergency Hospital Directive, overriding standard lifestyle guidance.
* **Failure Case 3 (Network Drop / API Disconnection):** Embedded deterministic Rotterdam triage engine and In-Memory Resilient Vault ensure the platform never crashes or displays blank screens even if Wi-Fi drops in the hall.

---

## 🚀 One-Command Launch (Windows 11)
Simply double-click:
```bat
START.bat
```
This automatically initializes the FastAPI backend on `http://localhost:8000`, the React+Vite frontend on `http://localhost:5173`, and opens your default browser.

### Manual Launch (Alternative)
**Backend:**
```bash
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🔒 Non-Diagnostic Clinical Pledge
Aura Care Sanctuary strictly adheres to clinical safety guidelines:
* Never asserts a definitive medical diagnosis.
* Validates symptoms and provides non-alarmist, evidence-based care navigation.
* Explicitly directs patients toward certified gynecologists, endocrinologists, and pelvic ultrasonography.

---
*Created for IEEE Student Branch, RUAS Peenya Campus Hackathon.*
