import { PortfolioData } from '@/types/portfolio';

export const PORTFOLIO_DATA: PortfolioData = {
  variant: {
    variantId: 'SR-2025-TVA',
    designation: 'SHAMEEN ROOPASINGHA',
    realName: 'Shameen Roopasingha',
    clearanceLevel: 'LEVEL-4 // SOFTWARE ENGINEER CLEARANCE',
    primaryRole: 'Full-Stack Software Engineer',
    operationalStatus: 'VARIANT DETECTED // CANONICAL RECORD',
    timelineBranch: 'EARTH-616 // COLOMBO, SRI LANKA',
    location: 'Colombo, Sri Lanka',
    phone: '+94 70 370 3986',
    dossierSummary:
      'Final-year Computer Science (Applied AI) undergraduate with hands-on experience building full-stack web applications, from personal SaaS projects to freelance and R&D work. Highly proficient across the modern JavaScript/TypeScript ecosystem, specializing in React.js, Next.js, Node.js, and Tailwind CSS. Experienced in designing robust backends with PostgreSQL, Prisma ORM, and seamless API integrations. Quick to adapt to new tools and fully equipped for remote work. Looking for a project-based opportunity where I can independently deliver high-quality code and contribute real value to real-world projects from day one.',
    coreCompetencies: [
      'React.js & Next.js',
      'JavaScript & TypeScript',
      'Node.js & Express.js',
      'MongoDB & SQLite',
      'Tailwind CSS & HTML/CSS',
      'PostgreSQL & Supabase',
      'Electron.js Desktop Apps',
      'Cursor / Antigravity & AI Workflows',
    ],
    education: [
      {
        degree: 'BSc (Hons) in Computer Science with Applied AI',
        institution: 'Coventry University (SCU)',
        year: '2025 (Final Year - Reading)',
        level: 'UNDERGRADUATE DEGREE',
      },
      {
        degree: 'Higher National Diploma in Software Engineering',
        institution: 'Coventry University (NIBM)',
        year: '2024',
        level: 'HIGHER NATIONAL DIPLOMA',
      },
      {
        degree: 'Diploma in Software Engineering',
        institution: 'Coventry University (NIBM)',
        year: '2023',
        level: 'DIPLOMA',
      },
    ],
    socialLinks: {
      github: 'https://github.com/ShameenRoopasingha',
      linkedin: 'https://linkedin.com/in/shameen-roopasingha',
      email: 'shameenroopasingha@gmail.com',
      phone: '+94 70 370 3986',
      resumeUrl: '/documents/Shameen_Roopasingha_CV.pdf',
    },
  },

  projects: [
    {
      id: 'proj-vigil-saas',
      codeName: 'TIMEDOOR-ALPHA // VIGIL-SaaS',
      title: 'VIGIL — Travel Management MVP',
      category: 'Cloud SaaS & Operational Planning Platform',
      temporalTag: 'EVD-001',
      summary:
        'Comprehensive travel management SaaS MVP architected to streamline end-to-end operational planning, travel logistics, and itinerary scheduling for tour operators.',
      problemSolved:
        'Tour operators rely on disconnected manual spreadsheets, causing costly scheduling errors, lost booking details, and sluggish operational coordination.',
      architectureHighlights: [
        'Architected comprehensive travel management MVP streamlining end-to-end operational planning for tour operators.',
        'Defined system architecture, mapped user journeys, and prioritized core workflows for travel logistics, booking management, and itinerary scheduling.',
        'Engineered secure, multi-tenant Node.js and MongoDB backend with strict role-based access control (RBAC).',
        'Implemented modern reactive user interface with React.js, Next.js, and Tailwind CSS for rapid operational dispatching.',
      ],
      techStack: ['Node.js', 'MongoDB', 'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/ShameenRoopasingha',
      liveUrl: 'https://github.com/ShameenRoopasingha',
      status: 'ACTIVE',
    },
    {
      id: 'proj-pharmacy-pos',
      codeName: 'TIMEDOOR-BETA // PHARMA-POS',
      title: 'Pharmacy POS & Inventory System',
      category: 'Desktop Architecture & Offline-First System',
      temporalTag: 'EVD-002',
      summary:
        'Standalone offline-first Pharmacy Point of Sale and Inventory Management desktop system engineered to ensure business continuity during internet outages.',
      problemSolved:
        'Retail pharmacies suffered critical transaction disruptions during power fluctuations and internet downtime, risking stock divergences and lost checkout revenues.',
      architectureHighlights: [
        'Developed standalone Pharmacy POS & Inventory System utilizing Electron.js, React, and SQLite.',
        'Implemented offline-first capabilities to guarantee continuous checkout and stock tracking during internet outages.',
        'Designed atomic transactional workflows for high-reliability local receipt processing and inventory deductions.',
        'Leading active migration strategy transitioning legacy desktop POS & inventory architectures into web-based SaaS.',
      ],
      techStack: ['Electron.js', 'React.js', 'SQLite', 'JavaScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/ShameenRoopasingha',
      liveUrl: 'https://github.com/ShameenRoopasingha',
      status: 'VERIFIED',
    },
    {
      id: 'proj-weighbridge-ui',
      codeName: 'TIMEDOOR-GAMMA // WEIGH-R&D',
      title: 'Industrial Weighbridge Terminal Interface',
      category: 'Industrial Systems UI/UX & Application Customization',
      temporalTag: 'EVD-003',
      summary:
        'User-centric industrial human-machine interfaces engineered for weighbridges, integrated with customized VB.Net software and rigorous user testing.',
      problemSolved:
        'Heavy industrial weighbridge operators faced cumbersome terminal software that slowed vehicle scale processing and led to operator input mistakes.',
      architectureHighlights: [
        'Designed modern, user-centric interfaces in Adobe XD tailored for high-contrast industrial weighbridge operations.',
        'Collaborated closely with engineering to customize and optimize core VB.Net applications.',
        'Conducted rigorous on-site user testing to streamline vehicle weight capture and eliminate user workflow friction.',
        'Ensured reliable data capture under industrial field conditions at Ceylon Weighing Machines.',
      ],
      techStack: ['Adobe XD', 'VB.Net', 'UI/UX Design', 'Industrial Software', 'User Testing'],
      githubUrl: 'https://github.com/ShameenRoopasingha',
      liveUrl: 'https://github.com/ShameenRoopasingha',
      status: 'VERIFIED',
    },
    {
      id: 'proj-global-cloud-web',
      codeName: 'TIMEDOOR-DELTA // CLOUD-WEB',
      title: 'High-Availability Dynamic Web Solutions',
      category: 'Web Development & Client Systems',
      temporalTag: 'EVD-004',
      summary:
        'Production dynamic web systems and client portals developed and maintained at Global Cloud Tech ensuring 99.9% uptime SLAs.',
      problemSolved:
        'Businesses required stable, high-availability web platforms with consistent database performance and zero unexpected downtime.',
      architectureHighlights: [
        'Developed and maintained dynamic websites utilizing HTML, CSS, PHP, and SQL databases.',
        'Ensured consistent 99.9% uptime across production web platforms through disciplined maintenance.',
        'Delivered responsive client layouts and structured database queries for commercial client operations.',
        'Applied assistant project management methodologies to oversee milestone delivery and client specifications.',
      ],
      techStack: ['HTML', 'CSS', 'PHP', 'SQL', 'Web Development', 'Project Management'],
      githubUrl: 'https://github.com/ShameenRoopasingha',
      liveUrl: 'https://github.com/ShameenRoopasingha',
      status: 'VERIFIED',
    },
  ],

  experiences: [
    {
      id: 'exp-personal-saas',
      role: 'Full-Stack Product Developer (SaaS Focus)',
      company: 'Personal Projects',
      period: 'Jan 2025 – Present',
      location: 'Colombo, Sri Lanka',
      coordinate: 'TC-2025.01-PRES',
      status: 'ACTIVE' as unknown as 'VERIFIED',
      summary:
        'Architecting VIGIL, a comprehensive travel management MVP designed to streamline end-to-end operational planning for tour operators, and leading POS cloud migrations.',
      achievements: [
        'Architecting VIGIL, a comprehensive travel management MVP designed to streamline end-to-end operational planning for tour operators.',
        'Defining system architecture, mapping user journeys, and prioritizing core workflows for travel logistics, booking management, and itinerary scheduling.',
        'Building a secure, multi-tenant Node.js/MongoDB backend with strict role-based access control.',
        'Leading migration of legacy desktop POS & inventory systems to web-based SaaS.',
      ],
      technologies: ['Node.js', 'MongoDB', 'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SaaS'],
    },
    {
      id: 'exp-ceylon-weighing',
      role: 'UI/UX Developer (R&D)',
      company: 'CEYLON WEIGHING MACHINES',
      period: 'Apr 2024 – Oct 2024',
      location: 'Colombo, Sri Lanka',
      coordinate: 'TC-2024.04-10',
      status: 'VERIFIED',
      summary:
        'R&D UI/UX design and engineering for industrial weighbridge systems, collaborating on VB.Net application customizations and rigorous testing.',
      achievements: [
        'Designed user-centric interfaces for industrial weighbridges using Adobe XD.',
        'Collaborated with engineering to customize VB.Net applications and conducted rigorous user testing.',
      ],
      technologies: ['Adobe XD', 'VB.Net', 'UI/UX Design', 'User Testing', 'Industrial Systems'],
    },
    {
      id: 'exp-freelance',
      role: 'Full-Stack Freelance Developer',
      company: 'As a FREELANCER',
      period: 'Jan 2023 – Mar 2024',
      location: 'Colombo, Sri Lanka',
      coordinate: 'TC-2023.01-03',
      status: 'VERIFIED',
      summary:
        'Developed standalone Pharmacy POS & Inventory System with offline-first capabilities to ensure business continuity during internet outages.',
      achievements: [
        'Developed standalone Pharmacy POS & Inventory System using Electron.js, React, and SQLite.',
        'Implemented offline-first capabilities to ensure continuity during internet outages.',
      ],
      technologies: ['Electron.js', 'React.js', 'SQLite', 'JavaScript', 'Offline-First'],
    },
    {
      id: 'exp-global-cloud',
      role: 'Assistant Project Manager / Web Developer',
      company: 'GLOBAL CLOUD TECH',
      period: 'May 2021 – May 2022',
      location: 'Colombo, Sri Lanka',
      coordinate: 'TC-2021.05-22',
      status: 'CANONICAL',
      summary:
        'Developed and maintained dynamic websites using HTML, CSS, PHP, SQL ensuring 99.9% uptime and managed project deliverables.',
      achievements: [
        'Developed and maintained dynamic websites using HTML, CSS, PHP, SQL ensuring 99.9% uptime.',
      ],
      technologies: ['HTML', 'CSS', 'PHP', 'SQL', 'Web Development', 'Project Management'],
    },
  ],

  // Exact skills and percentage levels directly from CV Skills Chart
  skillGroups: [
    {
      category: 'CORE WEB & RUNTIMES',
      code: 'VLT-WEB',
      skills: [
        { name: 'Tailwind CSS', level: 85, tag: '85%' },
        { name: 'HTML/CSS', level: 85, tag: '85%' },
        { name: 'Javascript', level: 70, tag: '70%' },
        { name: 'React.js', level: 70, tag: '70%' },
        { name: 'TypeScript', level: 70, tag: '70%' },
        { name: 'Next.js', level: 60, tag: '60%' },
        { name: 'Redux', level: 50, tag: '50%' },
        { name: 'Electron.js', level: 30, tag: '30%' },
      ],
    },
    {
      category: 'BACKEND & DATABASES',
      code: 'VLT-DATA',
      skills: [
        { name: 'MongoDB', level: 80, tag: '80%' },
        { name: 'Express.js', level: 70, tag: '70%' },
        { name: 'SQLite', level: 65, tag: '65%' },
        { name: 'Supabase', level: 60, tag: '60%' },
        { name: 'Node.js', level: 50, tag: '50%' },
      ],
    },
    {
      category: 'TOOLS, WORKFLOWS & AI',
      code: 'VLT-TOOLS',
      skills: [
        { name: 'Cursor / Antigravity', level: 80, tag: '80%' },
        { name: 'Git', level: 70, tag: '70%' },
        { name: 'Figma', level: 70, tag: '70%' },
        { name: 'Agile', level: 60, tag: '60%' },
        { name: 'N8N', level: 60, tag: '60%' },
      ],
    },
  ],

  references: [
    {
      id: 'ref-dilshan',
      fileNumber: 'REF-001 // DC-LON',
      name: 'Mr. Dilshan Ranasinghe',
      role: 'Senior IT Site Reliability Engineer',
      organization: 'Delta Capita',
      phone: '+44 7391148946',
      endorsement:
        'Senior IT Site Reliability Engineer at Delta Capita. Official professional reference on record for technical reliability and engineering excellence.',
      verificationStatus: 'AUTHENTICATED',
    },
    {
      id: 'ref-uvinda',
      fileNumber: 'REF-002 // OSO-LK',
      name: 'Mr. Uvinda Induwara',
      role: 'Software Engineer',
      organization: 'OSO PVT LTD',
      phone: '+94 71 2248919',
      endorsement:
        'Software Engineer at OSO PVT LTD. Official professional reference on record for software development, teamwork, and execution.',
      verificationStatus: 'AUTHENTICATED',
    },
  ],
};
