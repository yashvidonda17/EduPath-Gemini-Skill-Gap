import React from 'react';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div className="brand-logo" style={{ fontSize: '1.25rem' }}>
          <div className="logo-icon" style={{ width: '30px', height: '30px' }}>
            <Compass size={18} />
          </div>
          <span>Edu<span className="text-gradient">Path</span></span>
        </div>
        <p>Your personalized AI learning journey • Built for Hackathon MVP</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>© {new Date().getFullYear()} EduPath. All rights reserved.</p>
      </div>
    </footer>
  );
}
