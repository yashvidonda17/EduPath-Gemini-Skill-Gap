// Mock career role database with required skills and priority levels
export const CAREER_ROLES = {
  'AI Engineer': [
    { name: 'Python', importance: 'Critical' },
    { name: 'LLMs & RAG Architectures', importance: 'Critical' },
    { name: 'Vector Databases', importance: 'High' },
    { name: 'PyTorch / TensorFlow', importance: 'High' },
    { name: 'API Design (FastAPI/REST)', importance: 'Medium' },
    { name: 'Git & Version Control', importance: 'Medium' },
    { name: 'Docker & Containerization', importance: 'Medium' },
    { name: 'Prompt Engineering', importance: 'Medium' }
  ],
  'Data Scientist': [
    { name: 'Python', importance: 'Critical' },
    { name: 'SQL & Database Querying', importance: 'Critical' },
    { name: 'Machine Learning Algorithms', importance: 'Critical' },
    { name: 'Pandas & NumPy', importance: 'High' },
    { name: 'Data Visualization (Matplotlib/Seaborn)', importance: 'High' },
    { name: 'Statistics & Probability', importance: 'High' },
    { name: 'Git & Version Control', importance: 'Medium' },
    { name: 'Deep Learning Basics', importance: 'Low' }
  ],
  'Full-Stack Developer': [
    { name: 'JavaScript / TypeScript', importance: 'Critical' },
    { name: 'React / Next.js', importance: 'Critical' },
    { name: 'HTML & CSS / UI Systems', importance: 'Critical' },
    { name: 'Node.js & Express', importance: 'High' },
    { name: 'SQL & NoSQL Databases', importance: 'High' },
    { name: 'REST APIs & GraphQL', importance: 'High' },
    { name: 'Git & Version Control', importance: 'Medium' },
    { name: 'CI/CD & Cloud Hosting', importance: 'Medium' }
  ],
  'DevOps Engineer': [
    { name: 'Docker & Containerization', importance: 'Critical' },
    { name: 'Kubernetes', importance: 'Critical' },
    { name: 'CI/CD Pipelines (GitHub Actions/Jenkins)', importance: 'Critical' },
    { name: 'Linux System Administration', importance: 'High' },
    { name: 'AWS / Cloud Infrastructure', importance: 'High' },
    { name: 'Terraform / IaC', importance: 'High' },
    { name: 'Python / Bash Scripting', importance: 'Medium' },
    { name: 'Git & Version Control', importance: 'Medium' }
  ],
  'Cybersecurity Specialist': [
    { name: 'Network Security & Protocols', importance: 'Critical' },
    { name: 'Linux Administration', importance: 'Critical' },
    { name: 'Python for Security', importance: 'High' },
    { name: 'Penetration Testing Tools', importance: 'High' },
    { name: 'SIEM & Threat Monitoring', importance: 'High' },
    { name: 'Cryptography Fundamentals', importance: 'Medium' },
    { name: 'Risk Assessment & Auditing', importance: 'Medium' },
    { name: 'Git & Version Control', importance: 'Low' }
  ]
};

export const POPULAR_SKILLS = [
  'Python', 'JavaScript', 'SQL', 'HTML', 'Git', 
  'React', 'Node.js', 'Machine Learning', 'Docker', 
  'C++', 'Java', 'Pandas', 'TypeScript', 'Linux'
];

export const EXPERIENCE_LEVELS = [
  { id: 'Beginner', title: 'Beginner', desc: '0-1 years • Building foundational knowledge' },
  { id: 'Intermediate', title: 'Intermediate', desc: '1-3 years • Built multiple hands-on projects' },
  { id: 'Advanced', title: 'Advanced', desc: '3+ years • Solid engineering background' }
];

export const LEARNING_HOURS = [
  { id: '5 hours', title: '5 Hours / week', desc: 'Casual learning • ~45 mins/day' },
  { id: '10 hours', title: '10 Hours / week', desc: 'Focused study • ~1.5 hours/day' },
  { id: '15+ hours', title: '15+ Hours / week', desc: 'Intensive boot camp pace' }
];

export const LEARNING_GOALS = [
  { id: 'Job', title: 'Land a New Job', desc: 'Targeting full-time tech roles' },
  { id: 'Internship', title: 'Secure an Internship', desc: 'Gaining industry experience' },
  { id: 'College', title: 'College / Academics', desc: 'Academic excellence & skill building' },
  { id: 'Career switch', title: 'Career Switch', desc: 'Transitioning into tech from another field' }
];

/**
 * Calculates skill gap matching between user skills and target career.
 */
export function analyzeSkillGap(targetCareer, userSkills) {
  const normalizedUserSkills = userSkills.map(s => s.trim().toLowerCase());
  
  // Find matching career role requirement list or fallback to default
  const roleRequirements = CAREER_ROLES[targetCareer] || [
    { name: 'Core Programming', importance: 'Critical' },
    { name: 'Domain Fundamentals', importance: 'Critical' },
    { name: 'Git & Version Control', importance: 'High' },
    { name: 'Project Portfolio', importance: 'High' },
    { name: 'System Design', importance: 'Medium' },
    { name: 'Database Management', importance: 'Medium' },
    { name: 'API Development', importance: 'Medium' }
  ];

  const acquired = [];
  const missing = [];

  roleRequirements.forEach(req => {
    const isAcquired = normalizedUserSkills.some(userSkill => 
      req.name.toLowerCase().includes(userSkill) || userSkill.includes(req.name.toLowerCase().split(' ')[0])
    );

    if (isAcquired) {
      acquired.push(req);
    } else {
      missing.push(req);
    }
  });

  const matchPercentage = Math.round((acquired.length / roleRequirements.length) * 100);

  return {
    targetCareer,
    roleRequirements,
    acquiredSkills: acquired,
    missingSkills: missing,
    matchPercentage: Math.max(matchPercentage, 15) // Keep minimum base score for morale
  };
}
