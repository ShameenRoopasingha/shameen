import { PortfolioData } from '@/types/portfolio';

export const PORTFOLIO_DATA: PortfolioData = {
  variant: {
    variantId: 'SR-2024-TVA',
    designation: 'SHAMEEN ROOPASINGHA',
    realName: 'Shameen Roopasingha',
    clearanceLevel: 'LEVEL-4 // SENIOR TECHNICAL CLEARANCE',
    primaryRole: 'Full Stack Engineer & Creative UI Architect',
    operationalStatus: 'VARIANT DETECTED // TIMELINE COMPLIANT',
    timelineBranch: 'EARTH-616 // TEMPORAL COORDINATE 03:03:00',
    dossierSummary:
      'High-velocity Full Stack Engineer specializing in reactive frontend architecture, high-framerate WebGL/Three.js interfaces, and robust Node.js/distributed microservices. Proven record building point-of-sale systems, automated business workflows, and high-conversion client solutions.',
    coreCompetencies: [
      'React & Next.js 15+',
      'TypeScript Architecture',
      'Three.js / WebGL / GSAP',
      'Node.js & Express REST/GraphQL',
      'Redux Toolkit & Zustand',
      'SQL, MongoDB & SQLite',
      'Electron Desktop Apps',
      'Tailwind CSS & Terminal UI Design',
    ],
    socialLinks: {
      github: 'https://github.com/ShameenRoopasingha',
      linkedin: 'https://linkedin.com/in/shameen-roopasingha',
      email: 'shameen.roopasingha@gmail.com',
      resumeUrl: '/documents/Shameen_Roopasingha_CV.pdf',
    },
  },

  projects: [
    {
      id: 'proj-pharmacy-pos',
      codeName: 'TIMEDOOR-ALPHA // POS-RX',
      title: 'Pharmacy Enterprise POS System',
      category: 'Desktop Architecture & Offline-First POS',
      temporalTag: 'EVD-001',
      summary:
        'Desktop enterprise inventory management and point-of-sale application engineered for high-throughput pharmacy environments with offline resilience.',
      problemSolved:
        'Replaced error-prone manual inventory logs and sluggish browser cash registers with an offline-first desktop executable featuring sub-second barcode lookups and real-time expiration batch tracking.',
      architectureHighlights: [
        'Built with Electron + React with strict IPC serialization between main and renderer threads.',
        'High-performance embedded SQLite database handling 50,000+ SKU records with zero cloud dependency.',
        'Atomic transaction rollbacks ensuring zero receipt/stock divergence during hardware or power loss.',
        'Direct ESC/POS thermal printer driver integration over USB and serial interfaces.',
      ],
      techStack: ['Electron', 'React', 'TypeScript', 'SQLite', 'TailwindCSS', 'Node IPC'],
      githubUrl: 'https://github.com/ShameenRoopasingha/pharmacy-pos-system',
      liveUrl: 'https://github.com/ShameenRoopasingha/pharmacy-pos-system#demo',
      status: 'VERIFIED',
    },
    {
      id: 'proj-whatsapp-bot',
      codeName: 'TIMEDOOR-BETA // COM-UPLINK',
      title: 'Autonomous WhatsApp Commerce Bot',
      category: 'Event-Driven Microservices & Chatbot Engine',
      temporalTag: 'EVD-002',
      summary:
        'High-concurrency conversational commerce engine enabling automated customer ordering, instant inventory verification, and automated payment receipt generation.',
      problemSolved:
        'Automated 80% of routine client purchase queries and order placements, eliminating staff bottleneck during peak holiday hours.',
      architectureHighlights: [
        'Event-driven Node.js & Express microservice listening for Webhook payloads via Twilio Messaging API.',
        'Supabase PostgreSQL layer with Row-Level Security for instant order state persistence.',
        'State machine session manager maintaining cart context across intermittent user messaging intervals.',
        'Integrated automated invoice PDF generation and WhatsApp media transmission within 1.2 seconds.',
      ],
      techStack: ['Node.js', 'Express', 'Twilio API', 'Supabase', 'PostgreSQL', 'TypeScript'],
      githubUrl: 'https://github.com/ShameenRoopasingha/whatsapp-pos-bot',
      liveUrl: 'https://github.com/ShameenRoopasingha/whatsapp-pos-bot#schematic',
      status: 'ACTIVE',
    },
    {
      id: 'proj-mern-user-system',
      codeName: 'TIMEDOOR-GAMMA // AUTH-NEXUS',
      title: 'MERN Multi-Tenant Authentication Core',
      category: 'Security Architecture & RBAC Engine',
      temporalTag: 'EVD-003',
      summary:
        'Production-ready authentication and multi-tenant authorization framework with cryptographic JWT rotation, session revocation, and automated schema enforcement.',
      problemSolved:
        'Eliminated recurrent boilerplate security vulnerabilities across client portals by centralizing enterprise-grade RBAC, rate-limiting, and validation.',
      architectureHighlights: [
        'Stateless JWT access tokens coupled with httpOnly cryptographic refresh cookies stored in Redis/Mongo.',
        'End-to-end type validation pipeline enforcing runtime safety from React forms down to Mongo schemas using Zod.',
        'Fine-grained Role-Based Access Control (RBAC) middleware verifying permissions per route.',
        'Comprehensive Redux Toolkit state slice with optimistic UI updates and instant session invalidation.',
      ],
      techStack: ['React', 'Redux Toolkit', 'Node.js', 'MongoDB', 'Zod', 'JWT Crypto'],
      githubUrl: 'https://github.com/ShameenRoopasingha/mern-user-system',
      liveUrl: 'https://github.com/ShameenRoopasingha/mern-user-system#security-spec',
      status: 'VERIFIED',
    },
    {
      id: 'proj-tva-tempad',
      codeName: 'TIMEDOOR-DELTA // CANONICAL-OS',
      title: 'TVA TemPad CRT Developer Interface',
      category: 'Creative Frontend Engineering & WebGL',
      temporalTag: 'EVD-004',
      summary:
        'Retro-futuristic 1970s CRT terminal portfolio mirroring Marvel Loki TVA aesthetic with zero-latency keyboard controls, stepped micro-interactions, and 60fps WebGL shaders.',
      problemSolved:
        'Transforms standard developer resumes into an unforgettable cinematic experience while giving recruiters instant, friction-free access to all qualifications and projects in seconds.',
      architectureHighlights: [
        'Next.js 15 Turbopack architecture with strict TypeScript data decoupling.',
        'Custom GLSL vertex and fragment shader running infinite grid warped coordinates in Three.js.',
        'Zero-layout-repaint phosphor CRT filter and stepped micro-interaction timing curve.',
        'Recruiter-first keyboard command deck (`1`-`4`, Arrow keys, ESC) and full mobile scanner mode.',
      ],
      techStack: ['Next.js', 'React', 'Three.js / R3F', 'GLSL', 'GSAP', 'Tailwind CSS'],
      githubUrl: 'https://github.com/ShameenRoopasingha/shameen',
      liveUrl: 'https://shameen-portfolio.vercel.app',
      status: 'ACTIVE',
    },
  ],

  experiences: [
    {
      id: 'exp-ceylon-weighing',
      role: 'UI/UX Developer & Systems Customizer',
      company: 'Ceylon Weighing Machines',
      period: 'Apr 2024 – Dec 2024',
      location: 'Colombo, Sri Lanka',
      coordinate: 'TC-2024.04-12',
      status: 'VERIFIED',
      summary:
        'Spearheaded enterprise UI/UX modernization for mission-critical weighbridge management software and industrial scale client interfaces.',
      achievements: [
        'Engineered complete user journey wireframes and interactive prototypes in Adobe XD for industrial scale terminals.',
        'Customized and modernized client-facing VB.Net backend applications, decreasing operator input latency by 35%.',
        'Implemented rigorous hardware-software communication safeguards to prevent weight telemetry sync errors.',
      ],
      technologies: ['Adobe XD', 'VB.Net', 'UI/UX Architecture', 'SQL Server', 'Industrial I/O'],
    },
    {
      id: 'exp-global-cloud',
      role: 'Web Application Developer',
      company: 'Global Cloud Tech Solutions',
      period: 'Jan 2021 – Dec 2022',
      location: 'Colombo, Sri Lanka',
      coordinate: 'TC-2021.01-22',
      status: 'CANONICAL',
      summary:
        'Developed dynamic, database-backed web applications, client administration portals, and custom API integrations for mid-market commercial businesses.',
      achievements: [
        'Delivered 8+ client portal applications utilizing PHP, HTML5/CSS3, and normalized MySQL relational structures.',
        'Enhanced database query efficiency, refactoring legacy relational tables to reduce page load latency under 1.5 seconds.',
        'Maintained 99.8% uptime across managed shared and cloud Linux servers, handling client security patches.',
      ],
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5/Sass', 'REST APIs', 'Apache'],
    },
    {
      id: 'exp-sanota',
      role: 'Frontend Web Developer',
      company: 'Sanota Pvt Ltd',
      period: 'Jan 2020 – Dec 2020',
      location: 'Colombo, Sri Lanka',
      coordinate: 'TC-2020.01-20',
      status: 'CANONICAL',
      summary:
        'Architected and deployed the enterprise flagship web presence for Sanota Pvt Ltd from foundational concepts to production.',
      achievements: [
        'Built full responsive corporate platform using semantic HTML, CSS3, and Bootstrap with custom branding assets.',
        'Optimized client conversion funnels and integrated responsive contact telemetry with zero downtime.',
        'Achieved 95+ Google Lighthouse scores across Accessibility, Best Practices, and Performance.',
      ],
      technologies: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Responsive Design', 'SEO'],
    },
  ],

  skillGroups: [
    {
      category: 'CORE RUNTIMES & FRAMEWORKS',
      code: 'VLT-CORE',
      skills: [
        { name: 'React.js / React 19', level: 95, tag: 'SPECIALIST' },
        { name: 'Next.js 15 (App Router)', level: 92, tag: 'SPECIALIST' },
        { name: 'TypeScript (Strict)', level: 88, tag: 'ADVANCED' },
        { name: 'Node.js & Express', level: 86, tag: 'ADVANCED' },
        { name: 'Electron Desktop', level: 82, tag: 'PROFICIENT' },
      ],
    },
    {
      category: 'GRAPHICS, MOTION & STYLING',
      code: 'VLT-CRT',
      skills: [
        { name: 'Tailwind CSS & Token Systems', level: 94, tag: 'SPECIALIST' },
        { name: 'GSAP Animation Timeline', level: 90, tag: 'ADVANCED' },
        { name: 'Three.js & React Three Fiber', level: 76, tag: 'PROFICIENT' },
        { name: 'GLSL Shaders & Canvas', level: 72, tag: 'CAPABLE' },
        { name: 'Figma & Adobe XD UI/UX', level: 85, tag: 'ADVANCED' },
      ],
    },
    {
      category: 'PERSISTENCE & DEPLOYMENT',
      code: 'VLT-DATA',
      skills: [
        { name: 'PostgreSQL & Supabase', level: 84, tag: 'ADVANCED' },
        { name: 'MongoDB / Mongoose', level: 82, tag: 'ADVANCED' },
        { name: 'SQLite (Embedded IPC)', level: 88, tag: 'SPECIALIST' },
        { name: 'Git & GitHub Workflows', level: 92, tag: 'SPECIALIST' },
        { name: 'Vercel, AWS & Linux DevOps', level: 78, tag: 'PROFICIENT' },
      ],
    },
  ],

  references: [
    {
      id: 'ref-dilshan',
      fileNumber: 'DOSSIER-REF-01',
      name: 'Dilshan Ranasinghe',
      role: 'Senior Technology Leader',
      organization: 'Delta Capita',
      endorsement:
        'Certified technical capability in software delivery, architecture discipline, and client-centric problem resolution.',
      verificationStatus: 'AUTHENTICATED',
    },
    {
      id: 'ref-uvinda',
      fileNumber: 'DOSSIER-REF-02',
      name: 'Uvinda Induwara',
      role: 'Engineering Lead',
      organization: 'OSO PVT LTD',
      endorsement:
        'Verified competence in frontend execution, rapid component prototyping, and cross-functional team collaboration.',
      verificationStatus: 'CLEARED',
    },
  ],
};
