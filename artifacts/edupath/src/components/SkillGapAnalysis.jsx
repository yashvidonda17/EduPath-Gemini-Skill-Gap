import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  analyzeSkillGap,
  generateLearningRoadmap,
} from '@workspace/api-client-react';
import { 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  BrainCircuit, 
  Clock, 
  Compass, 
  Zap,
  Award,
  BookOpen,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function SkillGapAnalysis({ userProfile, onEditProfile, onGenerateRoadmap }) {
  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);
  const [analysisError, setAnalysisError] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [roadmapError, setRoadmapError] = useState('');

  useEffect(() => {
    let isCurrent = true;
    setAnalysis(null);
    setAnalysisError('');
    setAnalysisLoading(true);
    setRoadmap(null);
    setRoadmapError('');

    analyzeSkillGap(userProfile)
      .then((result) => {
        if (isCurrent) setAnalysis(result);
      })
      .catch((error) => {
        if (isCurrent) {
          setAnalysisError(error?.data?.error || error?.message || 'Gemini analysis failed. Please try again.');
        }
      })
      .finally(() => {
        if (isCurrent) setAnalysisLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [userProfile]);

  const handleGenerateClick = async () => {
    if (!analysis?.missingSkills?.length || roadmapLoading) return;

    setRoadmapLoading(true);
    setRoadmapError('');
    try {
      const result = await generateLearningRoadmap({
        profile: profileForRoadmap,
        skillGaps: analysis.missingSkills,
      });
      setRoadmap(result);
      if (onGenerateRoadmap) onGenerateRoadmap(result);
    } catch (error) {
      setRoadmapError(error?.data?.error || error?.message || 'Could not generate your learning roadmap.');
    } finally {
      setRoadmapLoading(false);
    }
  };

  if (analysisLoading) {
    return (
      <div className="container" style={{ paddingTop: '7rem', paddingBottom: '5rem', maxWidth: '1040px' }}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <Loader2 size={32} color="#818cf8" className="spin" style={{ animation: 'spin 1s linear infinite' }} />
          <h2 style={{ fontSize: '1.4rem', marginTop: '1rem', color: '#fff' }}>Analyzing your skill gap with Gemini</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Comparing your profile with the requirements for {userProfile.targetCareer}.</p>
        </div>
      </div>
    );
  }

  if (analysisError || !analysis) {
    return (
      <div className="container" style={{ paddingTop: '7rem', paddingBottom: '5rem', maxWidth: '840px' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <AlertCircle size={32} color="#f87171" />
          <h2 style={{ fontSize: '1.4rem', marginTop: '1rem', color: '#fff' }}>We could not complete the analysis</h2>
          <p style={{ color: '#fca5a5', margin: '0.75rem 0 1.5rem' }}>{analysisError || 'Gemini returned no analysis.'}</p>
          <button onClick={onEditProfile} className="btn btn-secondary">Modify Skills or Goal</button>
        </div>
      </div>
    );
  }

  const resumeProfile = analysis.resumeProfile || {
    skills: [],
    projects: [],
    experience: [],
    certifications: [],
    education: []
  };
  const capabilities = analysis.capabilities || [];
  const learningObjectives = analysis.learningObjectives || [];
  const { resume, ...profileForRoadmap } = userProfile;

  return (
    <div className="container" style={{ paddingTop: '7rem', paddingBottom: '5rem', maxWidth: '1040px' }}>
      
      {/* Top Bar Navigation & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className="badge">
            <Sparkles size={14} /> AI Skill Gap Analysis Report
          </div>
        </div>
        <button 
          onClick={onEditProfile} 
          className="btn btn-secondary" 
          style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
        >
          <RotateCcw size={14} /> Modify Skills or Goal
        </button>
      </div>

      {/* Main Analysis Header Card */}
      <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          
          {/* Left Column: Target & Profile Details */}
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Target Role Benchmark
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0.4rem 0 1rem', color: '#fff' }}>
              {userProfile.targetCareer}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--border-light)', color: '#e2e8f0' }}>
                <Award size={14} color="#818cf8" /> {userProfile.experience}
              </span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--border-light)', color: '#e2e8f0' }}>
                <Clock size={14} color="#34d399" /> {userProfile.weeklyHours}
              </span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--border-light)', color: '#e2e8f0' }}>
                <Compass size={14} color="#fbbf24" /> Goal: {userProfile.learningGoal}
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              EduPath compared your <strong>{userProfile.skills.length} current skills</strong> against industry benchmarks for 
              <strong> {userProfile.targetCareer}</strong>. Below is your detailed readiness breakdown.
            </p>
          </div>

          {/* Right Column: Dynamic Visual Progress Gauge / Score */}
          <div style={{
            background: 'rgba(9, 13, 22, 0.6)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1rem' }}>
              Target Skill Match Score
            </div>

            {/* Circular Progress Gauge */}
            <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 1rem' }}>
              <svg width="130" height="130" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#matchGradient)"
                  strokeWidth="10"
                  strokeDasharray={314.15}
                  strokeDashoffset={314.15 - (314.15 * analysis.matchPercentage) / 100}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                  transform="rotate(-90 60 60)"
                />
                <defs>
                  <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                  {analysis.matchPercentage}%
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Match</span>
              </div>
            </div>

            {/* Visual Bar Indicator */}
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-full)', height: '8px', overflow: 'hidden', marginBottom: '0.8rem' }}>
              <div 
                style={{ 
                  width: `${analysis.matchPercentage}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
                  transition: 'width 1s ease'
                }} 
              />
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <strong>{analysis.acquiredSkills.length}</strong> of <strong>{analysis.roleRequirements.length}</strong> required competencies met
            </div>
          </div>
        </div>
      </div>

      {/* Resume extraction and structured learning results */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
          <div style={{ padding: '0.4rem', background: 'rgba(167, 139, 250, 0.15)', borderRadius: '8px', color: '#c4b5fd' }}>
            <BrainCircuit size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Resume Intelligence</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Information extracted and evaluated for your target role</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.6rem', color: '#c4b5fd' }}>Resume Skills</h4>
            {resumeProfile.skills.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {resumeProfile.skills.map((skill, index) => <span key={`${skill}-${index}`} className="badge" style={{ fontSize: '0.75rem' }}>{skill}</span>)}
              </div>
            ) : <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>No resume skills extracted.</p>}
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.6rem', color: '#c4b5fd' }}>Capabilities</h4>
            {capabilities.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {capabilities.map((capability, index) => (
                  <div key={`${capability.name}-${index}`} style={{ padding: '0.65rem 0.8rem', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.86rem' }}>{capability.name}</strong>
                      <span style={{ fontSize: '0.7rem', color: '#a5b4fc' }}>{capability.level}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>{capability.evidence}</p>
                  </div>
                ))}
              </div>
            ) : <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>No capabilities extracted.</p>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.6rem', color: '#c4b5fd' }}>Projects & Experience</h4>
            {resumeProfile.projects.length === 0 && resumeProfile.experience.length === 0 ? (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>No projects or experience extracted.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {resumeProfile.projects.map((project, index) => (
                  <div key={`project-${index}`} style={{ padding: '0.7rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                    <strong style={{ fontSize: '0.86rem' }}>{project.name}</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>{project.description}</p>
                    {project.technologies.length > 0 && <p style={{ color: '#a5b4fc', fontSize: '0.72rem', marginTop: '0.25rem' }}>{project.technologies.join(' • ')}</p>}
                  </div>
                ))}
                {resumeProfile.experience.map((experience, index) => (
                  <div key={`experience-${index}`} style={{ padding: '0.7rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                    <strong style={{ fontSize: '0.86rem' }}>{experience.role} · {experience.company}</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>{experience.duration}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.6rem', color: '#c4b5fd' }}>Certifications & Education</h4>
            {resumeProfile.certifications.length === 0 && resumeProfile.education.length === 0 ? (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>No certifications or education extracted.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {resumeProfile.certifications.map((certification, index) => (
                  <div key={`certification-${index}`} style={{ padding: '0.7rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                    <strong style={{ fontSize: '0.86rem' }}>{certification.name}</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>{certification.issuer} · {certification.year}</p>
                  </div>
                ))}
                {resumeProfile.education.map((education, index) => (
                  <div key={`education-${index}`} style={{ padding: '0.7rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                    <strong style={{ fontSize: '0.86rem' }}>{education.degree} {education.field && `· ${education.field}`}</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>{education.institution} · {education.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-light)' }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.7rem', color: '#c4b5fd' }}>Learning Objectives</h4>
          {learningObjectives.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.65rem' }}>
              {learningObjectives.map((objective, index) => (
                <div key={`${objective.title}-${index}`} style={{ padding: '0.75rem 0.85rem', background: 'rgba(6, 182, 212, 0.06)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <strong style={{ fontSize: '0.84rem' }}>{objective.title}</strong>
                    <span style={{ color: '#67e8f9', fontSize: '0.7rem' }}>{objective.priority}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.25rem' }}>{objective.description}</p>
                  <p style={{ color: '#67e8f9', fontSize: '0.72rem', marginTop: '0.3rem' }}>Focus: {objective.relatedSkill}</p>
                </div>
              ))}
            </div>
          ) : <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>No learning objectives generated.</p>}
        </div>
      </div>

      {/* AI explanation */}
      <div className="glass-panel" style={{ padding: '1.5rem 1.75rem', marginBottom: '2rem', borderColor: 'var(--border-glow)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <BrainCircuit size={20} color="#818cf8" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>Gemini's skill-gap explanation</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>{analysis.explanation}</p>
          </div>
        </div>
      </div>

      {/* Grid: Acquired Skills vs Missing / Gap Skills */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', marginBottom: '2.5rem' }}>
        
        {/* Acquired Skills Panel */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
            <div style={{ padding: '0.4rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '8px', color: '#10b981' }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Acquired Skills ({analysis.acquiredSkills.length})</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Competencies you already possess</p>
            </div>
          </div>

          {analysis.acquiredSkills.length === 0 ? (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
              No direct matches found yet. Add more of your existing skills to see matches.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {analysis.acquiredSkills.map((req, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '0.85rem 1rem',
                    background: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{req.name}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderRadius: 'var(--radius-full)' }}>
                    Verified
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* User's raw skills list tag preview */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-light)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Your Submitted Skills:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {userProfile.skills.map((s, i) => (
                <span key={i} style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', color: 'var(--text-muted)' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Missing / Gap Skills Panel */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
            <div style={{ padding: '0.4rem', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '8px', color: '#f59e0b' }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Skill Gaps to Bridge ({analysis.missingSkills.length})</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>High-priority missing skills for this role</p>
            </div>
          </div>

          {analysis.missingSkills.length === 0 ? (
            <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.9rem' }}>
              🎉 You already match all major required skills for this role!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {analysis.missingSkills.map((req, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '0.85rem 1rem',
                    background: 'rgba(245, 158, 11, 0.04)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <BookOpen size={16} color="#fbbf24" />
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{req.name}</span>
                  </div>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.2rem 0.6rem', 
                    background: req.importance === 'Critical' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)', 
                    color: req.importance === 'Critical' ? '#f87171' : '#fbbf24', 
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600
                  }}>
                    {req.importance} Gap
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div className="glass-panel" style={{ padding: '2rem 2.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)', border: '1px solid var(--border-glow)' }}>
        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
          Ready to Close Your <span className="text-gradient">Skill Gap</span>?
        </h3>
        <p style={{ color: 'var(--text-muted)', maxWdith: '600px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
          EduPath can instantly assemble a step-by-step adaptive learning path structured around your {userProfile.weeklyHours} schedule.
        </p>

        {roadmap ? (
          <div style={{ textAlign: 'left', marginTop: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem 1.25rem',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.45)',
              borderRadius: 'var(--radius-md)',
              color: '#34d399',
              fontWeight: 600,
              marginBottom: '1.25rem'
            }}>
              <CheckCircle2 size={20} /> Personalized roadmap ready
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>{roadmap.summary}</p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {roadmap.steps.map((step, index) => (
                <div key={`${step.focusSkill}-${index}`} style={{
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <strong style={{ color: '#fff' }}>{index + 1}. {step.title}</strong>
                    <span className="badge" style={{ fontSize: '0.72rem' }}>{step.priority} • {step.duration}</span>
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: '0.6rem 0' }}>{step.outcome}</p>
                  <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', paddingLeft: '1.1rem', margin: 0 }}>
                    {step.actions.map((action, actionIndex) => <li key={actionIndex}>{action}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button 
            onClick={handleGenerateClick}
            disabled={roadmapLoading || analysis.missingSkills.length === 0}
            className="btn btn-primary" 
            style={{ padding: '0.95rem 2.5rem', fontSize: '1.05rem', boxShadow: 'var(--shadow-glow)', opacity: roadmapLoading || analysis.missingSkills.length === 0 ? 0.6 : 1 }}
          >
            {roadmapLoading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={18} />}
            {roadmapLoading ? 'Building your roadmap...' : 'Generate My Learning Roadmap'} <ArrowRight size={18} />
          </button>
        )}
        {roadmapError && <p style={{ color: '#fca5a5', fontSize: '0.9rem', marginTop: '1rem' }}>{roadmapError}</p>}
      </div>

    </div>
  );
}
