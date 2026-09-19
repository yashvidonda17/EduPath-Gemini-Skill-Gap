import React from 'react';
import { Target, Compass, Layers, Zap, GraduationCap, LineChart } from 'lucide-react';

const features = [
  {
    icon: <Target size={26} />,
    title: 'Career Goal Mapping',
    desc: 'Select your target job role or specialization, and EduPath benchmarks your target industry requirements.'
  },
  {
    icon: <Compass size={26} />,
    title: 'AI Skill Gap Analysis',
    desc: 'Instantly identifies missing technical, domain, and soft skills needed to reach your dream position.'
  },
  {
    icon: <Layers size={26} />,
    title: 'Adaptive Learning Roadmap',
    desc: 'Generates a step-by-step personalized learning path updated dynamically as you learn.'
  },
  {
    icon: <Zap size={26} />,
    title: 'Bite-Sized Micro-Courses',
    desc: 'Curated tutorials, projects, and exercises tailored specifically to fix your individual skill gaps.'
  },
  {
    icon: <GraduationCap size={26} />,
    title: 'Hands-on Project Challenges',
    desc: 'Apply your learning directly through real-world portfolio projects recommended by AI.'
  },
  {
    icon: <LineChart size={26} />,
    title: 'Real-Time Progress Tracking',
    desc: 'Visualize your readiness score and track your transition from learner to job-ready professional.'
  }
];

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Zap size={14} /> Built For Modern Learners
          </div>
          <h2 className="section-title">
            Smart Learning Powered by <span className="text-gradient">Skill Intelligence</span>
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Stop wasting time on generic courses. EduPath builds exact roadmaps around what you need to learn.
          </p>
        </div>

        <div className="features-grid">
          {features.map((item, idx) => (
            <div key={idx} className="glass-panel feature-card">
              <div className="feature-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
