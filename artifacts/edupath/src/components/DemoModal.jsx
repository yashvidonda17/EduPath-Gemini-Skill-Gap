import React from 'react';
import { X, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export default function DemoModal({ isOpen, onClose, onStart }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div className="badge" style={{ marginBottom: '1rem' }}>
          <Sparkles size={14} /> EduPath Interactive Overview
        </div>

        <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
          How <span className="text-gradient">EduPath</span> Works
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
            <CheckCircle size={22} color="#6366f1" />
            <div>
              <h4 style={{ fontSize: '1rem' }}>1. Enter Current Profile & Goal</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Input your existing skills and the career role you want to achieve.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
            <CheckCircle size={22} color="#06b6d4" />
            <div>
              <h4 style={{ fontSize: '1rem' }}>2. AI Analyzes Skill Gap</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>EduPath identifies precise technical and strategic gaps standing between you and your target role.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
            <CheckCircle size={22} color="#10b981" />
            <div>
              <h4 style={{ fontSize: '1rem' }}>3. Personalized Adaptive Roadmap</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Get a custom milestone plan with targeted resources to close each skill gap fast.</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close Preview
          </button>
          <button className="btn btn-primary" onClick={() => { onClose(); onStart(); }}>
            Start Journey <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
