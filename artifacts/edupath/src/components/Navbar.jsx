import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, Home } from 'lucide-react';

export default function Navbar({ onStart, onDemo, onHome, activeView }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a 
          href="#" 
          className="brand-logo" 
          onClick={(e) => { e.preventDefault(); if (onHome) onHome(); }}
        >
          <div className="logo-icon">
            <Compass size={22} />
          </div>
          <span>Edu<span className="text-gradient">Path</span></span>
        </a>

        <ul className="nav-links">
          {activeView === 'landing' ? (
            <>
              <li><a href="#features" className="nav-link">Features</a></li>
              <li><a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); onDemo(); }}>How it Works</a></li>
            </>
          ) : (
            <li>
              <button 
                onClick={onHome} 
                className="nav-link" 
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Home size={15} /> Home
              </button>
            </li>
          )}
        </ul>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {activeView === 'landing' && (
            <button onClick={onDemo} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              View Demo
            </button>
          )}

          {activeView === 'landing' ? (
            <button onClick={onStart} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              <Sparkles size={16} /> Start Your Journey
            </button>
          ) : activeView === 'onboarding' ? (
            <span className="badge" style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}>
              Onboarding Form
            </span>
          ) : (
            <button onClick={onStart} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              Re-analyze
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
