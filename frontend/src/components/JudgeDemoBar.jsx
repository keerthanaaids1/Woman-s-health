import React from 'react';
import { ShieldCheck, Zap, AlertTriangle, Database, Terminal } from 'lucide-react';

export default function JudgeDemoBar({ onSelectDemoCase, dbStatus }) {
  return (
    <div className="demo-ribbon">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#FFCCD5' }}>
          <ShieldCheck size={16} />
          IEEE RUAS EVALUATION BAR (Rule 6.2 Compliant)
        </span>
        <span style={{ fontSize: '0.75rem', opacity: 0.85, borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '0.8rem' }}>
          Engine: <strong>{dbStatus?.database?.engine || 'MongoDB / In-Memory Vault'}</strong>
        </span>
      </div>

      <div className="demo-btn-group">
        <button
          className="demo-btn"
          onClick={() => onSelectDemoCase('dialect')}
          title="Test regional Hinglish & colloquial phrases"
        >
          ⚡ Case 1: Dialect Slang
        </button>
        <button
          className="demo-btn"
          style={{ background: 'rgba(239, 68, 68, 0.3)', borderColor: '#FCA5A5' }}
          onClick={() => onSelectDemoCase('emergency')}
          title="Test severe acute emergency red-flag triage"
        >
          🚨 Case 2: Emergency Red-Flag
        </button>
        <button
          className="demo-btn"
          onClick={() => onSelectDemoCase('offline')}
          title="Test zero-crash deterministic offline fallback"
        >
          🛡️ Case 3: Offline Vault
        </button>
      </div>
    </div>
  );
}
