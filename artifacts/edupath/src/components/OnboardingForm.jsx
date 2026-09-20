import React, { useRef, useState } from 'react';
import { 
  CAREER_ROLES, 
  POPULAR_SKILLS, 
  EXPERIENCE_LEVELS, 
  LEARNING_HOURS, 
  LEARNING_GOALS 
} from '../data/careerSkills';
import { 
  Sparkles, 
  Plus, 
  X, 
  Target, 
  BrainCircuit, 
  Clock, 
  Compass, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft,
  Upload,
  FileText,
  Trash2
} from 'lucide-react';

export default function OnboardingForm({ onSubmit, onCancel, initialData }) {
  const [targetCareer, setTargetCareer] = useState(initialData?.targetCareer || 'AI Engineer');
  const [skills, setSkills] = useState(initialData?.skills || ['Python', 'SQL', 'Git']);
  const [skillInput, setSkillInput] = useState('');
  const [experience, setExperience] = useState(initialData?.experience || 'Intermediate');
  const [weeklyHours, setWeeklyHours] = useState(initialData?.weeklyHours || '10 hours');
  const [learningGoal, setLearningGoal] = useState(initialData?.learningGoal || 'Job');
  const [resume, setResume] = useState(initialData?.resume || null);
  const [resumeReading, setResumeReading] = useState(false);
  const [error, setError] = useState('');
  const resumeInputRef = useRef(null);

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    const mimeType = file.type || (lowerName.endsWith('.pdf') ? 'application/pdf' : 'text/plain');
    const supportedType = mimeType === 'application/pdf' || mimeType === 'text/plain';
    if (!supportedType || (!lowerName.endsWith('.pdf') && !lowerName.endsWith('.txt'))) {
      setError('Please upload a PDF or plain-text resume.');
      event.target.value = '';
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Resume files must be 8 MB or smaller.');
      event.target.value = '';
      return;
    }

    setResumeReading(true);
    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      const data = dataUrl.includes(',') ? dataUrl.slice(dataUrl.indexOf(',') + 1) : dataUrl;
      setResume({ fileName: file.name, mimeType, data, size: file.size });
      setResumeReading(false);
    };
    reader.onerror = () => {
      setError('The resume could not be read. Please try another file.');
      setResumeReading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveResume = () => {
    setResume(null);
    if (resumeInputRef.current) resumeInputRef.current.value = '';
  };

  // Handle adding skill tags
  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || skillInput).trim();
    if (!trimmed) return;
    if (skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setError(`Skill "${trimmed}" is already added.`);
      return;
    }
    setSkills([...skills, trimmed]);
    setSkillInput('');
    setError('');
  };

  const handleKeyDownSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!targetCareer.trim()) {
      setError('Please select or enter your target career goal.');
      return;
    }
    if (skills.length === 0) {
      setError('Please add at least one current skill tag.');
      return;
    }
    if (resumeReading) {
      setError('Please wait for the resume to finish loading.');
      return;
    }
    setError('');
    
    const formData = {
      targetCareer,
      skills,
      experience,
      weeklyHours,
      learningGoal,
      ...(resume ? {
        resume: {
          fileName: resume.fileName,
          mimeType: resume.mimeType,
          data: resume.data
        }
      } : {})
    };

    onSubmit(formData);
  };

  return (
    <div className="container" style={{ paddingTop: '7rem', paddingBottom: '5rem', maxWidth: '840px' }}>
      <button 
        onClick={onCancel} 
        className="btn btn-secondary" 
        style={{ marginBottom: '1.5rem', padding: '0.4rem 1rem', fontSize: '0.88rem' }}
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge" style={{ marginBottom: '0.75rem' }}>
             <Sparkles size={14} /> Step 1 of 2: Skill Profile & Resume
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Configure Your <span className="text-gradient">EduPath Profile</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>
             Provide your career ambition, current skill set, and optionally your resume so our AI engine can pinpoint your precise skill gaps.
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.9rem'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Field 1: Target Career Goal */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              <Target size={18} color="var(--primary-light)" /> 1. Target Career Goal
            </label>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
              Select a suggested role or type your custom target role.
            </p>
            
            <input 
              type="text" 
              value={targetCareer} 
              onChange={(e) => setTargetCareer(e.target.value)}
              placeholder="e.g. AI Engineer, Data Scientist, Full-Stack Developer"
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'var(--transition)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
            />

            {/* Career presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
              {Object.keys(CAREER_ROLES).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setTargetCareer(role)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    background: targetCareer === role ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    color: targetCareer === role ? '#a5b4fc' : 'var(--text-muted)',
                    border: `1px solid ${targetCareer === role ? 'var(--primary)' : 'var(--border-light)'}`,
                    transition: 'var(--transition)'
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Field 2: Current Skills */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              <BrainCircuit size={18} color="#06b6d4" /> 2. Current Skills (Tags / Chips)
            </label>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
              Add skills you currently possess. Press Enter or click + to add.
            </p>

            {/* Input + Add button */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <input 
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleKeyDownSkill}
                placeholder="Type a skill (e.g. Python, SQL, HTML, Git)"
                style={{
                  flex: 1,
                  padding: '0.8rem 1.25rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <button 
                type="button" 
                onClick={() => handleAddSkill()}
                className="btn btn-secondary" 
                style={{ borderRadius: 'var(--radius-md)', padding: '0 1.25rem' }}
              >
                <Plus size={18} /> Add
              </button>
            </div>

            {/* Active Skill Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', minHeight: '42px', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
              {skills.length === 0 && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', alignSelf: 'center', paddingLeft: '0.5rem' }}>
                  No skills added yet. Add skills above or click quick-add buttons below.
                </span>
              )}
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.85rem',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    color: '#e0e7ff',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.88rem',
                    fontWeight: 500
                  }}
                >
                  {skill}
                  <X 
                    size={14} 
                    style={{ cursor: 'pointer', opacity: 0.8 }} 
                    onClick={() => handleRemoveSkill(index)}
                  />
                </span>
              ))}
            </div>

            {/* Quick Add Suggestions */}
            <div style={{ marginTop: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginRight: '0.5rem' }}>Popular skills:</span>
              <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                {POPULAR_SKILLS.filter(s => !skills.includes(s)).slice(0, 8).map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleAddSkill(skill)}
                    style={{
                      padding: '0.2rem 0.6rem',
                      fontSize: '0.78rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px dashed var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Field 3: Resume */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              <FileText size={18} color="#a78bfa" /> 3. Resume (Optional)
            </label>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
              Upload a PDF or plain-text resume to extract skills, projects, experience, certifications, and education.
            </p>
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf,.txt,application/pdf,text/plain"
              onChange={handleResumeChange}
              style={{ display: 'none' }}
            />
            {resume ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '1rem 1.1rem',
                background: 'rgba(167, 139, 250, 0.1)',
                border: '1px solid rgba(167, 139, 250, 0.35)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', minWidth: 0 }}>
                  <FileText size={20} color="#c4b5fd" />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: '#fff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{resume.fileName}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      {resumeReading ? 'Reading resume…' : `${Math.max(1, Math.round((resume.size || 0) / 1024))} KB ready for AI extraction`}
                    </div>
                  </div>
                </div>
                <button type="button" onClick={handleRemoveResume} className="btn btn-secondary" style={{ padding: '0.45rem 0.7rem', borderRadius: 'var(--radius-md)' }} aria-label="Remove resume">
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className="btn btn-secondary"
                style={{ width: '100%', borderStyle: 'dashed', borderRadius: 'var(--radius-md)', padding: '1rem' }}
              >
                <Upload size={18} /> Choose Resume PDF or TXT
              </button>
            )}
          </div>

          {/* Field 3: Current Experience Level */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.8rem' }}>
              4. Current Experience Level
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {EXPERIENCE_LEVELS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setExperience(item.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: experience === item.id ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${experience === item.id ? 'var(--primary)' : 'var(--border-light)'}`,
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: experience === item.id ? '#a5b4fc' : '#fff' }}>{item.title}</span>
                    {experience === item.id && <CheckCircle2 size={16} color="var(--primary-light)" />}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Field 4: Weekly Learning Time */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.8rem' }}>
              <Clock size={18} color="#10b981" /> 5. Weekly Learning Time
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {LEARNING_HOURS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setWeeklyHours(item.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: weeklyHours === item.id ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${weeklyHours === item.id ? '#10b981' : 'var(--border-light)'}`,
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: weeklyHours === item.id ? '#34d399' : '#fff' }}>{item.title}</span>
                    {weeklyHours === item.id && <CheckCircle2 size={16} color="#10b981" />}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Field 5: Learning Goal */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.8rem' }}>
              <Compass size={18} color="#f59e0b" /> 6. Learning Goal
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {LEARNING_GOALS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLearningGoal(item.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: learningGoal === item.id ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${learningGoal === item.id ? '#f59e0b' : 'var(--border-light)'}`,
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: learningGoal === item.id ? '#fbbf24' : '#fff' }}>{item.title}</span>
                    {learningGoal === item.id && <CheckCircle2 size={16} color="#f59e0b" />}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem 2.2rem' }}>
              <Sparkles size={18} /> Analyze My Skill Gap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
