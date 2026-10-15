import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, FileText, Printer, Copy, Sparkles, Heart, Activity, ArrowRight, AlertTriangle } from 'lucide-react';

export default function CareSolutions({ triageData, onNavigateToMood, onNavigateToSupplies }) {
  const [copied, setCopied] = useState(false);
  const [showFullDossier, setShowFullDossier] = useState(false);

  if (!triageData) {
    return (
      <div style={{ maxWidth: '850px', margin: '3rem auto', textAlign: 'center', padding: '2rem' }}>
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <Activity size={48} color="var(--crimson-rich)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--crimson-deep)', marginBottom: '0.8rem' }}>
            Awaiting Clinical Symptom Intake
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Please submit your symptom narrative in the <strong>Symptom Studio</strong> to convene the multi-agent clinical rounds.
          </p>
        </div>
      </div>
    );
  }

  const { decoder, triage, hygiene, doctor_brief } = triageData;

  const handleCopyDossier = () => {
    if (doctor_brief?.markdown_report) {
      navigator.clipboard.writeText(doctor_brief.markdown_report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Emergency Red-Alert Banner if triggered */}
      {decoder?.is_emergency && (
        <div style={{ background: '#FEE2E2', border: '2px solid #EF4444', borderRadius: '18px', padding: '1.4rem', marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: '0 8px 24px rgba(239, 68, 68, 0.2)' }}>
          <ShieldAlert size={28} color="#B91C1C" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 style={{ color: '#991B1B', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              CRITICAL ACUTE FLAG DETECTED — EMERGENCY PROTOCOL
            </h3>
            {decoder.emergency_warnings?.map((w, idx) => (
              <p key={idx} style={{ color: '#7F1D1D', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '0.4rem' }}>
                {w}
              </p>
            ))}
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#991B1B' }}>
              Please contact emergency medical services or proceed to the nearest emergency obstetrics/gynae triage hospital immediately.
            </span>
          </div>
        </div>
      )}

      {/* Triage Overview Header */}
      <div className="glass-panel" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge-tag badge-blush" style={{ marginBottom: '0.4rem' }}>
              Multi-Agent Clinical Evaluation
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--crimson-deep)', lineHeight: 1.2 }}>
              Clinical Triage & Care Roadmap
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'block' }}>Triage Index</span>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--crimson-rich)', fontFamily: 'var(--font-serif)' }}>
              {triage?.triage_score || 70} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 100</span>
            </div>
          </div>
        </div>

        {/* Non-Diagnostic Disclaimer Box */}
        <div style={{ background: '#FFF9E6', border: '1px solid #FDE68A', borderRadius: '12px', padding: '0.9rem 1.2rem', marginBottom: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <AlertTriangle size={20} color="#D97706" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.84rem', color: '#92400E', fontWeight: 500 }}>
            <strong>Non-Diagnostic Commitment:</strong> This roadmap is designed for patient advocacy and clinical consultation preparation. PCOS diagnosis requires laboratory confirmation and pelvic ultrasound by a licensed medical practitioner.
          </span>
        </div>

        {/* 2-Column Agent Results */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Decoded Symptoms (Agent 1) */}
          <div style={{ background: '#fff', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <Sparkles size={18} color="var(--crimson-rich)" />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
                Decoded Gynecological Tokens (Agent 1)
              </h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              From your everyday phrasing: <em>"{decoder?.raw_input}"</em>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {decoder?.matched_symptoms?.map((s, idx) => (
                <div key={idx} style={{ background: '#FFF0F3', padding: '0.6rem 0.9rem', borderRadius: '10px', borderLeft: '3px solid var(--ruby-light)' }}>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
                    {s.clinical_term}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {s.significance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Endocrine Cluster & Urgency (Agent 2) */}
          <div style={{ background: '#fff', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <Activity size={18} color="var(--crimson-rich)" />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
                PCOS & Rotterdam Pattern Profiling (Agent 2)
              </h4>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <span className="badge-tag badge-blush" style={{ fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                {triage?.triage_level}
              </span>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                {triage?.summary_explanation}
              </p>
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--crimson-deep)', marginBottom: '0.4rem' }}>
              Recommended Clinical Window:
            </div>
            <div style={{ background: '#E8F5E9', color: '#1B5E20', padding: '0.55rem 0.9rem', borderRadius: '10px', fontSize: '0.84rem', fontWeight: 600 }}>
              {triage?.care_urgency}
            </div>
          </div>
        </div>

        {/* Doctor Consultation Checklist */}
        <div style={{ background: '#fff', padding: '1.8rem', borderRadius: '18px', border: '1px solid var(--border-glass)', marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--crimson-deep)', marginBottom: '0.6rem' }}>
            Recommended Diagnostic Workup to Discuss with Your Gynecologist
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
            Take this list to your appointment. These targeted investigations help confirm or exclude PCOS, rule out thyroid mimicry, and check metabolic markers:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.8rem', marginBottom: '1.5rem' }}>
            {triage?.recommended_labs?.map((lab, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', background: '#FFF8F9', padding: '0.8rem 1rem', borderRadius: '12px' }}>
                <CheckCircle2 size={18} color="var(--crimson-rich)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
                    {lab.test}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {lab.purpose}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.2rem' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--crimson-deep)', marginBottom: '0.6rem' }}>
              High-Yield Questions to Ask Your Doctor:
            </h4>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {triage?.doctor_questions?.map((q, idx) => (
                <li key={idx} style={{ marginBottom: '0.3rem' }}>{q}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 1-Page Printable Doctor Dossier (Agent 5) */}
        <div style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE5EC 100%)', border: '1px solid var(--border-glass)', borderRadius: '18px', padding: '1.8rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <FileText size={22} color="var(--crimson-deep)" />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
                  Doctor-Ready Clinical Dossier (Agent 5)
                </h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                  Dossier ID: {doctor_brief?.dossier_id || 'AURA-2026'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button className="btn-secondary" onClick={handleCopyDossier} style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
                <Copy size={14} /> {copied ? 'Copied to Clipboard!' : 'Copy Brief'}
              </button>
              <button className="btn-primary" onClick={handlePrint} style={{ padding: '0.45rem 1.1rem', fontSize: '0.8rem' }}>
                <Printer size={14} /> Print / Save PDF
              </button>
            </div>
          </div>

          {/* Dossier Preview / Toggle */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.2rem', border: '1px solid var(--border-glass)', maxHeight: showFullDossier ? 'none' : '180px', overflow: 'hidden', position: 'relative' }}>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              {doctor_brief?.markdown_report}
            </pre>
            {!showFullDossier && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(transparent, #fff)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '10px' }}>
                <button
                  className="btn-secondary"
                  onClick={() => setShowFullDossier(true)}
                  style={{ padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
                >
                  Expand Full 1-Page Medical Dossier
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Fast-links to Safe Room and Product Lab */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          <div
            className="glass-panel"
            onClick={onNavigateToMood}
            style={{ padding: '1.4rem', cursor: 'pointer', background: '#FFF0F3', border: '1.5px solid var(--ruby-light)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
                🌸 The Safe Room & Mood Stabilizer
              </span>
              <ArrowRight size={16} color="var(--crimson-rich)" />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Feeling overwhelmed or insecure about facial hair, acne, or weight? Enter our calming sensory haven.
            </p>
          </div>

          <div
            className="glass-panel"
            onClick={onNavigateToSupplies}
            style={{ padding: '1.4rem', cursor: 'pointer', background: '#FFF8F9', border: '1.5px solid var(--crimson-rich)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
                🩸 Pad & Menstrual Product Science Lab
              </span>
              <ArrowRight size={16} color="var(--crimson-rich)" />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Why this pad? Why not that pad? Demystifying chlorine bleach, plastic rashes, and cup benefits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
