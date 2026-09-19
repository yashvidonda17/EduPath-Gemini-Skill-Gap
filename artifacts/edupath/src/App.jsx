import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import OnboardingForm from './components/OnboardingForm';
import SkillGapAnalysis from './components/SkillGapAnalysis';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'edupath_user_profile';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'onboarding' | 'analysis'
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification('');
    }, 4000);
  };

  const handleStartJourney = () => {
    setActiveView('onboarding');
  };

  const handleFormSubmit = (formData) => {
    setUserProfile(formData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (err) {
      console.warn('Could not save profile to localStorage', err);
    }
    setActiveView('analysis');
    showNotification('Gemini skill-gap analysis started.');
  };

  const handleGenerateRoadmap = (roadmap) => {
    showNotification(`Learning Roadmap ready for ${roadmap.targetCareer}!`);
  };

  return (
    <div className="app">
      <Navbar 
        activeView={activeView}
        onStart={handleStartJourney} 
        onDemo={() => setIsDemoOpen(true)}
        onHome={() => setActiveView('landing')}
      />

      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          background: 'var(--bg-card)',
          border: '1px solid var(--primary)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: 'var(--shadow-glow)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <CheckCircle2 color="#10b981" size={20} />
          <span style={{ fontSize: '0.95rem', color: '#fff' }}>{notification}</span>
        </div>
      )}

      {/* Main View Router */}
      <main>
        {activeView === 'landing' && (
          <>
            <Hero 
              onStart={handleStartJourney} 
              onDemo={() => setIsDemoOpen(true)} 
            />
            <Features />
          </>
        )}

        {activeView === 'onboarding' && (
          <OnboardingForm 
            initialData={userProfile}
            onSubmit={handleFormSubmit}
            onCancel={() => setActiveView('landing')}
          />
        )}

        {activeView === 'analysis' && userProfile && (
          <SkillGapAnalysis 
            userProfile={userProfile}
            onEditProfile={() => setActiveView('onboarding')}
            onGenerateRoadmap={handleGenerateRoadmap}
          />
        )}
      </main>

      <Footer />

      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)}
        onStart={() => {
          setIsDemoOpen(false);
          handleStartJourney();
        }}
      />
    </div>
  );
}
