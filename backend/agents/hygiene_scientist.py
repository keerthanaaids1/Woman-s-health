"""
AGENT 3: MenstrualHygieneScientist
Analyzes menstrual supply materials, chemical additives, and physiological impact.
Answers: 'Why this pad? Why not that pad? What does it actually do to the body?'
Provides customized menstrual product matching based on flow, skin sensitivity, and vulvar health.
"""

from typing import Dict, Any, List

PRODUCT_CATALOG = [
    {
        "id": "conventional_synthetic",
        "name": "Conventional Bleached Synthetic Pads",
        "material": "Polyethylene plastic top-sheet, chlorine-bleached wood pulp, super-absorbent polyacrylate polymers (SAP), synthetic perfumes.",
        "pros": ["Inexpensive", "Available everywhere", "High liquid capture capacity"],
        "cons": [
            "Non-breathable plastic backing traps moisture and elevates local vulvar temperature",
            "Creates warm, anaerobic environment favoring Candida albicans and bacterial vaginosis",
            "Chlorine bleaching leaves trace organochlorines / dioxins irritating mucosal tissue",
            "Frequent cause of vulvar contact dermatitis, chafing, and post-period burning"
        ],
        "verdict": "AVOID IF PRONE TO RASHES OR HORMONAL ITCHING",
        "why_not_this": "The plastic barrier traps sweat and friction against sensitive vulvar skin. For women with PCOS who experience irregular or prolonged spotting, wearing synthetic plastic pads for extended days almost always results in contact dermatitis and bacterial disruption.",
        "best_for": "Emergency only when organic or safer alternatives are unavailable"
    },
    {
        "id": "organic_bamboo_cotton",
        "name": "100% Certified Organic Cotton / Bamboo Fiber Pads",
        "material": "GOTS certified organic cotton topsheet, bamboo pulp core, plant-based biodegradable cornstarch waterproof barrier, zero fragrances.",
        "pros": [
            "100% Breathable micro-perforated natural fibers",
            "Hypoallergenic, completely unbleached or elemental chlorine free (ECF)",
            "Naturally antimicrobial properties of bamboo Kun prevent odor without chemical perfumes",
            "Zero plastic contact with delicate labial skin"
        ],
        "cons": ["Slightly higher cost per pack", "Requires changing every 4-6 hours on heavy days"],
        "verdict": "TOP CLINICAL CHOICE FOR SENSITIVE SKIN & REGULAR FLOW",
        "why_this_pad": "It breathes like natural cotton underwear. It allows natural air exchange, preventing sweat accumulation and stopping the cycle of pad rash, chafing, and burning.",
        "best_for": "Sensitive skin, recurrent rashes, active daily wear, hormonal skin reactivity"
    },
    {
        "id": "medical_silicone_cup",
        "name": "Medical-Grade Platinum Silicone Menstrual Cup",
        "material": "100% USP Class VI Medical Grade Platinum Cured Silicone. Zero latex, BPA, phthalates, or chemical bleaches.",
        "pros": [
            "Collects blood rather than absorbing it — preserves natural vaginal mucosal moisture & acidic pH (3.8-4.5)",
            "Holds 3x to 5x more fluid than a standard pad (up to 30ml)",
            "Can be worn up to 12 hours safely",
            "Reusable for up to 10 years (zero recurring waste & zero microplastics)"
        ],
        "cons": ["Mild learning curve for insertion & removal", "Requires boiling in water before/after cycles"],
        "verdict": "GOLD STANDARD FOR HEAVY FLOW & UNPREDICTABLE PCOS CYCLES",
        "why_this_product": "PCOS often brings heavy bleeding followed by spotting. Cups eliminate pad friction entirely and will not dry out your vaginal flora during light days or leak during sudden heavy rushes.",
        "best_for": "Heavy flow, athletes, prolonged travel, women wanting zero skin friction"
    },
    {
        "id": "reusable_period_underwear",
        "name": "Triple-Layer Organic Period Underwear",
        "material": "Moisture-wicking organic modal inner, antimicrobial absorbent mid-layer, breathable TPU leakproof outer membrane.",
        "pros": [
            "Feels exactly like premium soft underwear — zero bulk or rustle",
            "Washable and reusable for 2-3 years",
            "Zero wing-rub or thigh chafing",
            "Ideal for overnight protection without shifting"
        ],
        "cons": ["Takes time to air-dry after cold machine wash", "Not meant as standalone for super-heavy days"],
        "verdict": "BEST COMPANION FOR SLEEP & LIGHT SPOTTING DAYS",
        "why_this_product": "Removes all insecurity of night-time stains or pad displacement during sleep, providing soothing comfort for tired pelvic muscles.",
        "best_for": "Overnight comfort, unpredictable spotting days, light flow, teens"
    }
]

def analyze_supplies(patient_profile: Dict[str, Any], reported_symptoms: List[str]) -> Dict[str, Any]:
    """
    Evaluates patient profile and recommends the ideal menstrual hygiene regimen.
    """
    has_rashes = any("rash" in s.lower() or "itch" in s.lower() or "burn" in s.lower() for s in reported_symptoms)
    flow = patient_profile.get("menstrual_flow", "medium")

    if has_rashes:
        recommended = PRODUCT_CATALOG[1] # Organic Bamboo Cotton
        secondary = PRODUCT_CATALOG[2] # Cup
        switch_reason = "You reported rashes, itching, or friction burns. You must immediately discontinue conventional plastic bleached pads. The plastic film causes an occlusive sweat effect, while trace bleaching agents trigger contact dermatitis."
    elif flow == "heavy":
        recommended = PRODUCT_CATALOG[2] # Menstrual Cup
        secondary = PRODUCT_CATALOG[1] # Organic Pads
        switch_reason = "Given heavy flow and cycle unpredictability, medical silicone collection prevents mucosal drying while offering up to 30ml volume without bulk."
    else:
        recommended = PRODUCT_CATALOG[1] # Organic Cotton/Bamboo
        secondary = PRODUCT_CATALOG[3] # Period Underwear
        switch_reason = "Balancing optimal mucosal health, zero chemical toxicity, and everyday convenience."

    return {
        "agent": "MenstrualHygieneScientist",
        "primary_recommendation": recommended,
        "secondary_alternative": secondary,
        "switch_reason": switch_reason,
        "all_products": PRODUCT_CATALOG,
        "golden_rules": [
            "Never wear any sanitary pad for longer than 6 hours, regardless of how light the flow is.",
            "Avoid scented, herbal-fragranced, or 'cooling sensation' pads — artificial scents contain known allergens like limonene.",
            "Wash vulva with warm water only. Never use scented soaps or internal feminine washes that strip the protective lactobacilli microbiome."
        ]
    }
