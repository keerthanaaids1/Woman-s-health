"""
AGENT 4: MoodSanctuaryNavigator
Dedicated to hormonal mood swings, emotional stabilization, somatic pacing,
and psychological reframing of physical insecurities (Facial hair, acne, bloating, hair loss).
"""

from typing import Dict, Any, List

INSECURITY_SANCTUARIES = {
    "facial_hair": {
        "title": "Facial Hair & Hirsutism Reframe",
        "root_cause": "Your hair follicles have higher sensitivity to circulating free androgens (testosterone and DHEA-S). This is a purely biochemical cellular receptor response, NOT a reflection of your womanhood or beauty.",
        "myth_buster": "Myth: 'Plucking or shaving makes 10 new hairs grow in place.' Fact: Shaving cuts hair at its blunted mid-shaft, making it feel temporarily coarser as it emerges; it does not multiply follicles.",
        "medical_pathway": "Gynecologists and endocrinologists can prescribe anti-androgens (e.g., Spironolactone), topical Eflornithine, or insulin-sensitizing myo-inositol to reduce androgen drive at the root.",
        "affirmation": "My body is navigating a hormonal signal, not a moral failure. I am inherently worthy, feminine, and whole."
    },
    "cystic_acne": {
        "title": "Jawline & Hormonal Acne Haven",
        "root_cause": "Elevated androgens stimulate the sebaceous glands to produce thicker, stickier sebum that traps keratinocytes inside pores. It has NOTHING to do with 'not washing your face enough'.",
        "myth_buster": "Myth: 'Scrubbing aggressively with astringents will clear PCOS acne.' Fact: Harsh physical scrubs strip your moisture barrier, aggravating inflammatory cytokines and exacerbating breakouts.",
        "medical_pathway": "Dermatologists manage hormonal acne through systemic hormonal regulation, topical retinoids, azelaic acid (15-20%), and balancing fasting insulin levels.",
        "affirmation": "My skin is healing and protecting me every single second. A flare-up is just inflammation, not my identity."
    },
    "weight_and_bloating": {
        "title": "Belly Bloat & Weight Resistance Sanctuary",
        "root_cause": "Hyperinsulinemia acts as an anabolic biochemical storage lock on adipocytes while aldosterone and cortisol fluctuations cause fluid retention in pelvic and gut tissues.",
        "myth_buster": "Myth: 'Starving on 800 calories or hours of extreme cardio will fix it.' Fact: Severe caloric restriction spikes adrenal cortisol, signaling the body to hoard visceral adipose tissue.",
        "medical_pathway": "Focus on stabilizing postprandial glucose curves (fiber-first eating, 30g protein per meal), gentle resistance training, and checking HOMA-IR with your physician.",
        "affirmation": "My weight is a metabolic barometer, not a scorecard. Nourishing my cells gently is my superpower."
    },
    "hair_thinning": {
        "title": "Crown Hair Thinning & Shedding Comfort",
        "root_cause": "Dihydrotestosterone (DHT) binds to scalp androgen receptors, shortening the anagen (growth) cycle and prematurely shifting follicles into telogen (resting) phase.",
        "myth_buster": "Myth: 'The hair follicles are permanently dead.' Fact: In most PCOS cases, follicles are dormant or miniaturized, capable of revitalization once systemic androgens stabilize.",
        "medical_pathway": "Evaluating ferritin, vitamin D, zinc, thyroid, and discussing topical minoxidil or natural 5-alpha-reductase inhibitors (spearmint tea, pumpkin seed extract) with your care provider.",
        "affirmation": "Each hair cycle is temporary. Restoring balance within gently reawakens growth."
    }
}

MOOD_STABILIZERS = [
    {
        "state": "Overwhelmed / Sudden Crying Spells (Progesterone Drop)",
        "protocol": "Physiological Sigh (Two quick inhales through nose, one long slow exhale through mouth). Drink 250ml cool water. Your nervous system is recalibrating neurotransmitters.",
        "herbal_support": "Chamomile or Lemon Balm infusion to support GABAergic calming."
    },
    {
        "state": "Irritability / Brain Fog (Blood Sugar Spike & Crash)",
        "protocol": "Consume a small protein-fat snack (handful of walnuts or Greek yogurt). Avoid refined sugars that worsen reactive hypoglycemia tremors.",
        "herbal_support": "Spearmint tea (shown in clinical trials to exert mild anti-androgenic effects)."
    },
    {
        "state": "Anxiety & Racing Heart Before Periods (Late Luteal)",
        "protocol": "Engage 4-7-8 Somatic Breathing: Inhale 4s, Hold 7s, Exhale 8s. Repeat 4 cycles to stimulate the vagus nerve.",
        "herbal_support": "Magnesium Glycinate (200-300mg in consultation with doctor) supports smooth muscle relaxation."
    }
]

def get_mood_care_plan(user_mood_state: str = "anxious", selected_insecurity: str = "facial_hair") -> Dict[str, Any]:
    """Generates calming, body-positive sanctuary guidance."""
    insecurity_data = INSECURITY_SANCTUARIES.get(selected_insecurity, INSECURITY_SANCTUARIES["facial_hair"])
    
    return {
        "agent": "MoodSanctuaryNavigator",
        "sanctuary_theme": "High-End Emotional & Somatic Haven",
        "insecurity_guidance": insecurity_data,
        "mood_stabilizers": MOOD_STABILIZERS,
        "breathing_exercise": {
            "name": "4-7-8 Somatic Vagus Nerve Calming Pacer",
            "inhale_sec": 4,
            "hold_sec": 7,
            "exhale_sec": 8,
            "cycles": 4
        },
        "all_insecurity_options": [
            {"id": k, "title": v["title"]} for k, v in INSECURITY_SANCTUARIES.items()
        ]
    }
