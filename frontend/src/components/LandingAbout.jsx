import React from 'react';
import { Heart, Activity, Globe, Shield, Sparkles, Feather, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingAbout({ onGetStarted }) {
  const agents = [
    {
      name: "RegionalLinguisticDecoder",
      role: "Colloquial & Dialect Translator",
      desc: "Interprets natural Hindi, Tamil, Telugu, and Hinglish descriptions of distress without shame or medical jargon."
    },
    {
      name: "HormonalSymptomProfiler",
      role: "PCOS & Rotterdam Cluster Engine",
      desc: "Evaluates ovulatory rhythms, hyperandrogenism signs, and metabolic flags strictly for care navigation."
    },
    {
      name: "MenstrualHygieneScientist",
      role: "Product & Barrier Intelligence",
      desc: "Dissects pad materials, chlorine bleaching, and microplastics to explain why rashes happen and what to switch to."
    },
    {
      name: "MoodSanctuaryNavigator",
      role: "Somatic Calming & Insecurity Haven",
      desc: "Stabilizes hormonal mood crashes and reframes facial hair, cystic acne, and weight resistance with dignity."
    },
    {
      name: "ClinicalBriefComposer",
      role: "Doctor Consultation Dossier",
      desc: "Compiles a clean 1-page structured clinical report with targeted questions for your real gynecologist."
    }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Hero Section */}
      <div className="glass-panel" style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '3.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
          <span className="badge-tag badge-blush">
            <Sparkles size={14} /> A Virtual Specialty Hospital & Healing Sanctuary
          </span>
          <span className="badge-tag" style={{ background: '#FFF8E7', color: '#B45309', border: '1px solid #FDE68A' }}>
            Strictly Non-Diagnostic Care Navigation
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.2rem', color: 'var(--crimson-deep)', lineHeight: 1.15, marginBottom: '1.2rem', fontWeight: 700 }}>
          Your Body Speaks in Many Tongues.<br />
          <span style={{ color: 'var(--ruby-light)', fontStyle: 'italic' }}>We Listen in Compassion.</span>
        </h1>

        <p style={{ maxWidth: '750px', margin: '0 auto 2rem auto', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Transform everyday, colloquial, and regional-language symptom descriptions into structured clinical understanding, personalized menstrual hygiene guidance, and emotional haven support for <strong>PCOS and hormonal health</strong>.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={onGetStarted} style={{ fontSize: '1.05rem', padding: '0.95rem 2.2rem' }}>
            Enter Patient Sanctuary <ArrowRight size={18} />
          </button>
          <a
            href="#architecture"
            className="btn-secondary"
            style={{ textDecoration: 'none', fontSize: '1rem' }}
          >
            Explore Hospital Agents
          </a>
        </div>

        {/* Motivational Banner */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          <span>🌸 <strong>100% Stigma-Free:</strong> Speak naturally in your mother tongue</span>
          <span>🩸 <strong>Hygiene Transparency:</strong> Why this pad vs why not</span>
          <span>🧘 <strong>The Safe Room:</strong> Reclaiming peace with our bodies</span>
        </div>
      </div>

      {/* 3 Pillars of Care Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#FFE5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--crimson-rich)', marginBottom: '1rem' }}>
            <Globe size={22} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--crimson-deep)', marginBottom: '0.5rem' }}>
            Colloquial & Dialect Translation
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Never struggle to find formal English medical terms. Type or speak in Hinglish, Tamil, Telugu, Hindi, or Kannada. Our agent normalizes everyday idioms into clinical gynecological observations.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#FFE5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--crimson-rich)', marginBottom: '1rem' }}>
            <Shield size={22} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--crimson-deep)', marginBottom: '0.5rem' }}>
            Non-Diagnostic Care Navigation
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            We do not label you with an automated robotic disease tag. Instead, we map Rotterdam-aligned symptom clusters and arm you with a 1-page clinical brief to review with a licensed gynecologist.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#FFE5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--crimson-rich)', marginBottom: '1rem' }}>
            <Feather size={22} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--crimson-deep)', marginBottom: '0.5rem' }}>
            The Safe Room & Product Lab
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            A sanctuary to deconstruct facial hair shame, cystic acne guilt, and hormone mood crashes. Plus, science-backed clarity on sanitary pads, chlorine bleaching, and menstrual cups.
          </p>
        </div>
      </div>

      {/* Multi-Agent Architecture Showcase */}
      <div id="architecture" className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <Activity size={20} color="var(--crimson-rich)" />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--crimson-deep)' }}>
            Meet the Multi-Agent Clinical Rounds Swarm
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.8rem', fontSize: '0.95rem' }}>
          Our platform orchestrates five specialized autonomous AI agents working collaboratively to deliver holistic physical, emotional, and dermatological care.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {agents.map((ag, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                padding: '1.2rem',
                borderRadius: '16px',
                border: '1px solid var(--border-glass)',
                boxShadow: '0 4px 12px rgba(128, 15, 47, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--crimson-rich)' }}>
                  Agent {idx + 1}: {ag.name}
                </span>
                <span className="agent-dot" />
              </div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.5rem' }}>
                {ag.role}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {ag.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
