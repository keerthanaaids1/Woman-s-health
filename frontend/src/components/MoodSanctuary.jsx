import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Feather, Wind, ShieldCheck, Sun, Moon, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MoodSanctuary() {
  const [activeInsecurity, setActiveInsecurity] = useState('facial_hair');
  const [breathingPhase, setBreathingPhase] = useState('idle'); // idle, inhale, hold, exhale
  const [breathTimer, setBreathTimer] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [activeTab, setActiveTab] = useState('insecurities'); // insecurities, moodswings, breathing

  // 4-7-8 Breathing Pacer Loop
  useEffect(() => {
    let interval = null;
    if (breathingPhase === 'inhale') {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev >= 4) {
            setBreathingPhase('hold');
            return 1;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (breathingPhase === 'hold') {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev >= 7) {
            setBreathingPhase('exhale');
            return 1;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (breathingPhase === 'exhale') {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev >= 8) {
            setCycleCount(c => c + 1);
            setBreathingPhase('inhale');
            return 1;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingPhase]);

  const startBreathing = () => {
    setCycleCount(0);
    setBreathingPhase('inhale');
    setBreathTimer(1);
  };

  const stopBreathing = () => {
    setBreathingPhase('idle');
    setBreathTimer(0);
  };

  const triggerSelfLoveConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FFB3C1', '#FF4D6D', '#C9184A', '#D4AF37']
    });
  };

  const insecurityDetails = {
    facial_hair: {
      title: "Facial Hair & Hirsutism Sanctuary",
      badge: "Purely Biochemical Sensitivity",
      root_cause: "Your hair follicles simply have higher sensitivity to circulating free androgens (testosterone and DHEA-S). This is a cellular receptor characteristic, NOT a reflection of your womanhood, femininity, or beauty.",
      myth_buster: "Myth: 'Plucking or shaving makes 10 new coarse hairs grow back.' Fact: Shaving merely blunts the tapered end of the hair fiber, making it feel temporarily pricklier as it breaks through the skin; it cannot create new hair follicles.",
      medical_options: "Gynecologists and endocrinologists can prescribe anti-androgens (e.g. Spironolactone), topical Eflornithine cream, or insulin-sensitizing Myo-Inositol to calm androgen stimulation at the root.",
      affirmation: "My body is navigating a hormonal signal, not a personal flaw. I am whole, beautifully feminine, and worthy of tenderness."
    },
    cystic_acne: {
      title: "Jawline & Hormonal Acne Haven",
      badge: "Internal Inflammation, Not Dirt",
      root_cause: "Fluctuating luteal androgens prompt sebaceous glands to produce thicker, stickier sebum that traps keratin inside deep follicular walls. It has absolutely ZERO to do with 'not washing your face enough'.",
      myth_buster: "Myth: 'Scrubbing with harsh alcohol toners or gritty scrubs will dry out PCOS acne.' Fact: Stripping the lipid mantle triggers compensatory sebum hypersecretion and cytokine-driven inflammation.",
      medical_options: "Dermatologists manage hormonal acne through systemic hormonal regulation, topical azelaic acid (15-20%), adapalene, and stabilizing postprandial insulin surges.",
      affirmation: "My skin is an organ that protects me every moment. A breakout is an internal message, not my identity."
    },
    weight_and_bloating: {
      title: "Belly Bloat & Weight Resistance Care",
      badge: "Metabolic Barometer",
      root_cause: "Hyperinsulinemia acts as an anabolic biochemical lock, directing calories into visceral adipocytes while progesterone drops cause fluid retention across gut and pelvic tissues.",
      myth_buster: "Myth: 'You just need to eat 800 calories and do hours of punishing cardio.' Fact: Severe caloric restriction spikes adrenal cortisol, signaling your endocrine system to hoard visceral fat as emergency survival.",
      medical_options: "Prioritize stabilizing postprandial glucose curves (fiber-first eating, 25-30g protein per meal), gentle resistance training, and checking HOMA-IR with your physician.",
      affirmation: "My weight is a metabolic barometer, not a moral scorecard. Nourishing my cells gently is my superpower."
    },
    hair_thinning: {
      title: "Crown Hair Thinning & Shedding Comfort",
      badge: "Follicular Dormancy, Not Loss",
      root_cause: "Elevated dihydrotestosterone (DHT) binds to sensitive crown androgen receptors, shortening the anagen growth cycle and prompting follicles into early resting telogen phase.",
      myth_buster: "Myth: 'The hair follicles are permanently dead.' Fact: In PCOS, follicles are almost always dormant or miniaturized, capable of reactivation once systemic hormone balance is restored.",
      medical_options: "Evaluate serum ferritin, vitamin D, and zinc; explore topical minoxidil or 5-alpha-reductase herbal allies (organic spearmint infusion, rosemary hydrosol).",
      affirmation: "Each follicular cycle renews. By restoring peace within, I create the soil for gentle regrowth."
    }
  };

  const current = insecurityDetails[activeInsecurity];

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Haven Header */}
      <div className="glass-panel" style={{ textAlign: 'center', marginBottom: '2rem', padding: '2.5rem' }}>
        <span className="badge-tag badge-blush" style={{ marginBottom: '0.6rem' }}>
          Stage 5 of 6: Mind & Body Sanctuary
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: 'var(--crimson-deep)', lineHeight: 1.2, marginBottom: '0.6rem' }}>
          The Safe Room & Mood Care Pavilion
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '750px', margin: '0 auto 1.5rem auto' }}>
          PCOS is not merely physical; it touches our self-worth, emotional serenity, and peace of mind. Step into this judgment-free space to stabilize mood crashes and release physical insecurities.
        </p>

        {/* Section Tabs */}
        <div style={{ display: 'inline-flex', background: 'rgba(255, 204, 213, 0.3)', padding: '0.35rem', borderRadius: '999px', border: '1px solid var(--border-glass)' }}>
          <button
            className={`nav-pill ${activeTab === 'insecurities' ? 'active' : ''}`}
            onClick={() => setActiveTab('insecurities')}
          >
            🌸 Reframe Insecurities
          </button>
          <button
            className={`nav-pill ${activeTab === 'breathing' ? 'active' : ''}`}
            onClick={() => setActiveTab('breathing')}
          >
            🧘 4-7-8 Somatic Pacer
          </button>
          <button
            className={`nav-pill ${activeTab === 'moodswings' ? 'active' : ''}`}
            onClick={() => setActiveTab('moodswings')}
          >
            ⚡ Mood Crash SOS
          </button>
        </div>
      </div>

      {/* TAB 1: REFRAME INSECURITIES */}
      {activeTab === 'insecurities' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.8rem' }}>
          {/* Insecurity Selector Column */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--crimson-deep)', marginBottom: '1rem' }}>
              Select What Weighs on You:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'facial_hair', label: 'Facial Hair & Hirsutism', icon: '✨' },
                { id: 'cystic_acne', label: 'Jawline & Cystic Acne', icon: '🌸' },
                { id: 'weight_and_bloating', label: 'Belly Bloat & Weight Resistance', icon: '🌿' },
                { id: 'hair_thinning', label: 'Crown Hair Thinning', icon: '💇‍♀️' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveInsecurity(item.id)}
                  style={{
                    padding: '0.9rem 1.1rem',
                    borderRadius: '14px',
                    border: activeInsecurity === item.id ? '2px solid var(--crimson-rich)' : '1px solid var(--border-glass)',
                    background: activeInsecurity === item.id ? 'linear-gradient(135deg, #FFF0F3 0%, #FFE5EC 100%)' : '#fff',
                    color: activeInsecurity === item.id ? 'var(--crimson-deep)' : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: activeInsecurity === item.id ? '0 4px 14px rgba(164, 19, 60, 0.15)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: '#FFF0F3', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--crimson-deep)', marginBottom: '0.3rem' }}>
                💡 Clinical Truth:
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Over 70% of women with PCOS struggle with physical insecurities. You are never alone, and your symptoms do not define your beauty.
              </p>
            </div>
          </div>

          {/* Insecurity Deep-Dive Card */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--crimson-deep)' }}>
                {current.title}
              </h3>
              <span className="badge-tag badge-blush" style={{ fontSize: '0.76rem' }}>
                {current.badge}
              </span>
            </div>

            {/* Root Cause */}
            <div style={{ marginBottom: '1.4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--crimson-rich)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Why It Happens (The Biology):
              </span>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: 1.6 }}>
                {current.root_cause}
              </p>
            </div>

            {/* Myth Buster */}
            <div style={{ background: '#FFF8F9', padding: '1rem 1.2rem', borderRadius: '14px', borderLeft: '4px solid var(--ruby-light)', marginBottom: '1.4rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
                Busting the Stigma:
              </span>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.5 }}>
                {current.myth_buster}
              </p>
            </div>

            {/* Medical Options */}
            <div style={{ marginBottom: '1.6rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--crimson-rich)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Medical Options to Discuss with Your Doctor:
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: 1.5 }}>
                {current.medical_options}
              </p>
            </div>

            {/* Affirmation Mantra */}
            <div style={{ background: 'linear-gradient(135deg, #590D22 0%, #800F2F 100%)', color: '#fff', padding: '1.4rem', borderRadius: '16px', boxShadow: '0 8px 24px rgba(89, 13, 34, 0.25)', textAlign: 'center' }}>
              <Sparkles size={20} color="#FFCCD5" style={{ margin: '0 auto 0.4rem auto' }} />
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                "{current.affirmation}"
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={triggerSelfLoveConfetti}
                style={{ background: '#fff', color: 'var(--crimson-deep)', border: 'none', padding: '0.45rem 1.2rem', fontSize: '0.82rem' }}
              >
                💖 I Accept & Love My Body Today
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 4-7-8 SOMATIC BREATHING PACER */}
      {activeTab === 'breathing' && (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <span className="badge-tag badge-blush" style={{ marginBottom: '0.8rem' }}>
            Vagus Nerve Grounding Tool
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--crimson-deep)', marginBottom: '0.6rem' }}>
            4-7-8 Somatic Vagal Reset
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 2rem auto' }}>
            When progesterone drops or cortisol spikes, your nervous system triggers panic signals. The 4-7-8 breathing cadence directly stimulates the vagus nerve, reducing heart rate and muscle tension.
          </p>

          {/* Animated Pulsating Orb */}
          <div className="breathing-orb-wrapper">
            <div className={`breathing-orb ${breathingPhase}`}>
              <div>
                <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.25rem', fontWeight: 800 }}>
                  {breathingPhase === 'idle' && "Ready"}
                  {breathingPhase === 'inhale' && "Inhale"}
                  {breathingPhase === 'hold' && "Hold"}
                  {breathingPhase === 'exhale' && "Exhale"}
                </div>
                {breathingPhase !== 'idle' && (
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>
                    {breathTimer}s
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            {breathingPhase === 'idle' ? (
              <button className="btn-primary" onClick={startBreathing} style={{ fontSize: '1.1rem', padding: '0.9rem 2.5rem' }}>
                <Wind size={20} /> Begin Calming Cadence
              </button>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Completed: <strong>{cycleCount}</strong> cycles
                </span>
                <button className="btn-secondary" onClick={stopBreathing} style={{ padding: '0.5rem 1.4rem' }}>
                  Pause Reset
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>🌸 <strong>Inhale 4s:</strong> Through nose, expanding belly</span>
            <span>✨ <strong>Hold 7s:</strong> Gentle pause without strain</span>
            <span>💨 <strong>Exhale 8s:</strong> Slow gentle whoosh through mouth</span>
          </div>
        </div>
      )}

      {/* TAB 3: MOOD CRASH SOS */}
      {activeTab === 'moodswings' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.8rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FFE5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--crimson-rich)', marginBottom: '1rem' }}>
              <Moon size={22} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--crimson-deep)', marginBottom: '0.5rem' }}>
              Sudden Crying Spells & Vulnerability
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Triggered by the late luteal drop in allopregnanolone (progesterone metabolite) which temporarily downregulates GABA-A calming receptors.
            </p>
            <div style={{ background: '#FFF0F3', padding: '0.9rem', borderRadius: '12px', fontSize: '0.82rem', color: 'var(--crimson-deep)' }}>
              <strong>Immediate Action:</strong> Drink 200ml room-temperature water. Wrap yourself in a soft blanket. Give your nervous system 20 minutes before making any major life decisions.
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.8rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FFE5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--crimson-rich)', marginBottom: '1rem' }}>
              <Sun size={22} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--crimson-deep)', marginBottom: '0.5rem' }}>
              Extreme Irritability & Brain Fog
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Often driven by postprandial reactive hypoglycemia (sharp spike and drop in blood sugar) common with insulin-resistant PCOS.
            </p>
            <div style={{ background: '#FFF0F3', padding: '0.9rem', borderRadius: '12px', fontSize: '0.82rem', color: 'var(--crimson-deep)' }}>
              <strong>Immediate Action:</strong> Eat a small protein-dense snack (almonds, walnuts, or boiled egg) rather than sugary sweets. Step into morning sunlight for 5 minutes.
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.8rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FFE5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--crimson-rich)', marginBottom: '1rem' }}>
              <Feather size={22} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--crimson-deep)', marginBottom: '0.5rem' }}>
              Herbal & Nutritional Calmers
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Evidence-based natural allies that support smooth neurochemical signaling during hormonal fluctuations.
            </p>
            <div style={{ background: '#FFF0F3', padding: '0.9rem', borderRadius: '12px', fontSize: '0.82rem', color: 'var(--crimson-deep)' }}>
              <strong>Allies:</strong> Spearmint tea (anti-androgenic), Magnesium Glycinate (muscle & sleep calmer), Chamomile/Lemon balm infusion (GABA support).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
