import React from 'react';
import { ArrowRight, Play, Sparkles, Target, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';

export default function Hero({ onStart, onDemo }) {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="badge" style={{ marginBottom: '1rem' }}>
          <span className="badge-dot"></span>
          <span>AI-Powered Skill Gap Analysis</span>
        </div>

        <h1 className="hero-title">
          Your personalized <br />
          <span className="text-gradient">AI learning journey.</span>
        </h1>

        <p className="hero-subtitle">
          EduPath analyzes your current skills and career goal, identifies critical skill gaps, 
          and creates an adaptive learning roadmap tailored specifically for your target career.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onStart}>
            Start Your Journey <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary" onClick={onDemo}>
            <Play size={16} fill="currentColor" /> View Demo
          </button>
        </div>

        {/* Interactive Preview Dashboard Teaser */}
        <div className="preview-graphic-container">
          <div className="glass-panel preview-card">
            <div className="dashboard-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(99,102,241,0.15)', borderRadius: '10px', color: '#818cf8' }}>
                  <Target size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Career Goal</div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>Senior Full-Stack AI Engineer</div>
                </div>
              </div>
              <div className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                <TrendingUp size={14} /> 74% Skill Match
              </div>
            </div>

            <div className="roadmap-steps">
              <div className="step-card">
                <div className="step-header">
                  <span className="step-num">Step 01 • Mastered</span>
                  <CheckCircle2 size={16} color="#10b981" />
                </div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>React & Modern Frontend</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified skill from past projects</p>
              </div>

              <div className="step-card" style={{ borderColor: 'var(--primary)', background: 'rgba(99, 102, 241, 0.1)' }}>
                <div className="step-header">
                  <span className="step-num" style={{ color: '#06b6d4' }}>Step 02 • Skill Gap</span>
                  <span className="badge" style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>In Progress</span>
                </div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>LLM Prompting & RAG Pipelines</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Identified gap for AI Engineer role</p>
              </div>

              <div className="step-card">
                <div className="step-header">
                  <span className="step-num">Step 03 • Upcoming</span>
                  <Cpu size={16} color="#94a3b8" />
                </div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>Vector Databases & Embeddings</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Scheduled micro-learning modules</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
