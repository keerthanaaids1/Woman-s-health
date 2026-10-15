import React, { useState } from 'react';
import { Mic, Globe, Sparkles, AlertCircle, ArrowRight, Activity, CheckCircle, RefreshCw } from 'lucide-react';

export default function SymptomStudio({ symptomText, setSymptomText, onRunTriage, isTriaging, triageData }) {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState(['pelvic', 'facial', 'emotional']);
  const [severity, setSeverity] = useState(7);

  const presets = [
    {
      lang: "Hinglish (North India)",
      text: "Periods 3 mahine se late hain, face aur thodi pe daadhi jaise baal aa rahe hain, bohot chidhchidi ho gayi hoon."
    },
    {
      lang: "Tamil/English (South India)",
      text: "Periods romba thamasam aaguthu, mugathula mudi valarudhu, severe stomach pain and pad rash."
    },
    {
      lang: "Telugu/English (Deccan)",
      text: "Periods 2 months ga raaledhu, mukham meeda ventrukalu perugutunnayi, baaga alasata gaa undi."
    },
    {
      lang: "Hindi (Colloquial)",
      text: "Pet ke neeche chubhan wala dard hai, periods aniyamit hain aur jawline par daane nikalte hain."
    }
  ];

  const bodyRegions = [
    { id: 'pelvic', label: 'Pelvic & Uterine', icon: '🌸', desc: 'Cramping, cycle delays, spotting' },
    { id: 'facial', label: 'Facial & Jawline', icon: '✨', desc: 'Hirsutism, chin hair, cystic acne' },
    { id: 'emotional', label: 'Neuro-Endocrine', icon: '🧠', desc: 'Mood crashes, irritability, crying spells' },
    { id: 'metabolic', label: 'Metabolic & Glycemic', icon: '⚡', desc: 'Visceral belly bloat, chronic fatigue' },
    { id: 'scalp', label: 'Crown Scalp', icon: '💇‍♀️', desc: 'Part widening, androgenic shedding' },
    { id: 'vulvar', label: 'Dermatological / Vulvar', icon: '🛡️', desc: 'Pad rash, synthetic chafing, burning' }
  ];

  const toggleRegion = (id) => {
    setSelectedRegions(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleMicSim = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setSymptomText("Periods 2 mahine se chadh gaye hain, face pe mote baal aa rahe hain aur kamar me tez dard hai.");
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div className="glass-panel">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge-tag badge-blush" style={{ marginBottom: '0.6rem' }}>
            Stage 3 of 6: Symptom Expression Studio
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--crimson-deep)' }}>
            Express in Your Own Words
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto' }}>
            No medical vocabulary needed. Speak or write as you would to a trusted sister or mother. Our <strong>RegionalLinguisticDecoder</strong> will interpret without judgment.
          </p>
        </div>

        {/* Quick Regional Presets */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem', fontSize: '0.84rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
            <Globe size={15} /> Quick Test Presets (Regional & Colloquial Phrasing):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="btn-secondary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
                onClick={() => setSymptomText(p.text)}
              >
                {p.lang}
              </button>
            ))}
          </div>
        </div>

        {/* Main Text Input Box */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <textarea
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            rows={4}
            placeholder="Type your symptoms here in Hinglish, Tamil, Telugu, Hindi, or plain English... (e.g. 'periods late ho rahe hain, muh pe daadhi jaise baal aa gaye hain, bohot gussa aata hai')"
            style={{
              width: '100%',
              padding: '1.2rem',
              borderRadius: '16px',
              border: '1.5px solid var(--border-glass)',
              background: '#fff',
              fontSize: '1rem',
              color: 'var(--text-main)',
              fontFamily: 'inherit',
              lineHeight: 1.6,
              resize: 'vertical'
            }}
          />

          <div style={{ position: 'absolute', right: '12px', bottom: '16px', display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className={isRecording ? 'btn-primary' : 'btn-secondary'}
              onClick={handleMicSim}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: '999px' }}
              title="Voice transcription simulation"
            >
              <Mic size={15} />
              {isRecording ? "Listening..." : "Speak in Mother Tongue"}
            </button>
          </div>
        </div>

        {/* Interactive Bodily Region Radar (Rule 6.2 Non-Chat Surface) */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--crimson-deep)', marginBottom: '0.8rem' }}>
            Target Bodily Regions Experiencing Discomfort:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.8rem' }}>
            {bodyRegions.map(reg => {
              const active = selectedRegions.includes(reg.id);
              return (
                <div
                  key={reg.id}
                  onClick={() => toggleRegion(reg.id)}
                  style={{
                    padding: '0.9rem 1.1rem',
                    borderRadius: '14px',
                    border: active ? '2px solid var(--crimson-rich)' : '1px solid var(--border-glass)',
                    background: active ? '#FFF0F3' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: active ? '0 4px 12px rgba(164, 19, 60, 0.12)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: active ? 'var(--crimson-deep)' : 'var(--text-main)' }}>
                      {reg.icon} {reg.label}
                    </span>
                    {active && <CheckCircle size={16} color="var(--crimson-rich)" />}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {reg.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Severity Slider */}
        <div style={{ background: '#FFF8F9', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-glass)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
              Overall Distress & Discomfort Index:
            </span>
            <span className="badge-tag badge-blush" style={{ fontSize: '0.85rem' }}>
              Level {severity} / 10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--crimson-rich)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-light)', marginTop: '0.3rem' }}>
            <span>1 (Mild nuisance)</span>
            <span>5 (Disrupting work & sleep)</span>
            <span>10 (Debilitating / Acute)</span>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={onRunTriage}
            disabled={isTriaging || !symptomText.trim()}
            style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}
          >
            {isTriaging ? (
              <>
                <RefreshCw size={20} className="spinning" />
                Orchestrating 5 Clinical Agents...
              </>
            ) : (
              <>
                Convene Clinical Rounds & Decode Symptoms <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
