import React, { useState } from 'react';
import { User, Calendar, Droplets, Shield, Sparkles, Check, ArrowRight, LogIn } from 'lucide-react';

export default function PatientIntake({ profile, setProfile, onSaveIntake, onGoogleLogin, user }) {
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goalId) => {
    setProfile(prev => {
      const current = prev.primary_goals || [];
      const updated = current.includes(goalId)
        ? current.filter(g => g !== goalId)
        : [...current, goalId];
      return { ...prev, primary_goals: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveIntake();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div className="glass-panel">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge-tag badge-blush" style={{ marginBottom: '0.6rem' }}>
            Stage 2 of 6: Patient Baseline
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--crimson-deep)' }}>
            Tell Us About Your Rhythm
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Every woman's endocrine signature is unique. Your details help our agents personalize care without clinical judgment.
          </p>
        </div>

        {/* Google SSO Quick Fill Banner */}
        <div style={{ background: '#FFF0F3', border: '1px solid var(--border-glass)', borderRadius: '16px', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <LogIn size={18} color="var(--crimson-rich)" />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
                {user ? `Connected as: ${user.name}` : "Fast-Track with Google Account"}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                {user ? user.email : "Pre-fills profile and encrypts session into MongoDB vault."}
              </div>
            </div>
          </div>
          {!user && (
            <button type="button" className="btn-secondary" onClick={onGoogleLogin} style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}>
              Sign in with Google
            </button>
          )}
        </div>

        {/* Intake Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.4rem', marginBottom: '1.8rem' }}>
            {/* Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--crimson-deep)', marginBottom: '0.4rem' }}>
                Full Name / Preferred Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-glass)', background: '#fff', fontSize: '0.92rem' }}
                placeholder="e.g. Ananya"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--crimson-deep)', marginBottom: '0.4rem' }}>
                Age (Years)
              </label>
              <input
                type="number"
                min="12"
                max="65"
                value={profile.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 24)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-glass)', background: '#fff', fontSize: '0.92rem' }}
                required
              />
            </div>

            {/* Cycle Regularity */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--crimson-deep)', marginBottom: '0.4rem' }}>
                Cycle Regularity
              </label>
              <select
                value={profile.cycle_regularity}
                onChange={(e) => handleInputChange('cycle_regularity', e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-glass)', background: '#fff', fontSize: '0.92rem' }}
              >
                <option value="regular">Regular (Arrives every 24-35 days)</option>
                <option value="irregular">Irregular (Varies by more than 7-10 days)</option>
                <option value="delayed">Delayed (Cycles stretch 40 to 90 days)</option>
                <option value="absent">Absent / Amenorrhea (No periods for 3+ months)</option>
              </select>
            </div>

            {/* Menstrual Flow */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--crimson-deep)', marginBottom: '0.4rem' }}>
                Menstrual Flow Intensity
              </label>
              <select
                value={profile.menstrual_flow}
                onChange={(e) => handleInputChange('menstrual_flow', e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-glass)', background: '#fff', fontSize: '0.92rem' }}
              >
                <option value="light">Light / Minimal flow / Brown spotting</option>
                <option value="medium">Medium / Standard flow</option>
                <option value="heavy">Heavy (Soaking full pad in under 2-3 hours)</option>
                <option value="clotted">Heavy with noticeable blood clots</option>
              </select>
            </div>
          </div>

          {/* Rashes / Friction Question */}
          <div style={{ background: '#FFF8F9', border: '1px solid var(--border-glass)', borderRadius: '14px', padding: '1.2rem', marginBottom: '1.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--crimson-deep)' }}>
                  Do you experience pad rashes, burning sensation, or vulvar itching during periods?
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  This alerts our Menstrual Hygiene Scientist to inspect synthetic plastic contact and bleaching chemicals.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button
                  type="button"
                  className={profile.reported_rashes ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.45rem 1.2rem', fontSize: '0.82rem' }}
                  onClick={() => handleInputChange('reported_rashes', true)}
                >
                  Yes, frequently
                </button>
                <button
                  type="button"
                  className={!profile.reported_rashes ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.45rem 1.2rem', fontSize: '0.82rem' }}
                  onClick={() => handleInputChange('reported_rashes', false)}
                >
                  No, rare
                </button>
              </div>
            </div>
          </div>

          {/* Goals Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--crimson-deep)', marginBottom: '0.8rem' }}>
              What care areas matter most to you today? (Select all that apply)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
              {[
                { id: 'cycle_balance', label: '🌸 Menstrual Rhythm & Ovulation' },
                { id: 'facial_hair_acne', label: '✨ Facial Hair & Cystic Acne Relief' },
                { id: 'mood_stability', label: '🧘 Emotional Balance & Mood Swings' },
                { id: 'safe_pads', label: '🩸 Toxin-Free Pads & Hygiene Match' },
                { id: 'doctor_prep', label: '📋 Doctor Consultation Questions' }
              ].map(goal => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => handleGoalToggle(goal.id)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: profile.primary_goals?.includes(goal.id) ? '2px solid var(--crimson-rich)' : '1px solid var(--border-glass)',
                    background: profile.primary_goals?.includes(goal.id) ? '#FFE5EC' : '#fff',
                    color: profile.primary_goals?.includes(goal.id) ? 'var(--crimson-deep)' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {goal.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit and Next CTA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '0.82rem', color: savedSuccess ? '#1B5E20' : 'var(--text-light)' }}>
              {savedSuccess ? '✓ Profile encrypted & stored in MongoDB vault!' : 'Encrypted with client-side privacy tokens.'}
            </span>
            <button type="submit" className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
              Save & Proceed to Symptom Studio <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
