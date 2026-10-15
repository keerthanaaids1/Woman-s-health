import React from 'react';
import { Heart, Activity, User, Sparkles, LogIn } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onGoogleLogin }) {
  const tabs = [
    { id: 'about', label: '1. Sanctuary Overview' },
    { id: 'patient', label: '2. Patient Intake' },
    { id: 'symptoms', label: '3. Symptom Studio' },
    { id: 'solutions', label: '4. Care & Solutions' },
    { id: 'mood', label: '5. Mood & Insecurity Haven' },
    { id: 'supplies', label: '6. Pad & Product Lab' },
  ];

  return (
    <nav className="sanctuary-nav">
      {/* Brand Emblem */}
      <div className="brand-wrapper" onClick={() => setActiveTab('about')}>
        <div className="brand-emblem">
          <Heart size={22} fill="currentColor" />
        </div>
        <div className="brand-text">
          <h1>AURA CARE SANCTUARY</h1>
          <p>Virtual Women's Health & Multi-Agent Hospital</p>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="nav-links">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-pill ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* User / Google Sign-In Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#FFF0F3', padding: '0.35rem 0.85rem', borderRadius: '999px', border: '1px solid var(--border-glass)' }}>
            <img
              src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"}
              alt="Avatar"
              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--crimson-deep)' }}>
              {user.name || "Patient"}
            </span>
          </div>
        ) : (
          <button className="btn-secondary" onClick={onGoogleLogin} style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}>
            <LogIn size={15} />
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
}
