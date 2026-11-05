// ============================================================
// PORTFOLIO DATA — Edit this file to update your portfolio
// ============================================================

export const personalInfo = {
  name: "Adarsh Maurya",
  title: "B.Tech Student | Aspiring Software Developer",
  greeting: "HELLO, I'M",
  bio: "A passionate first-year B.Tech student driven by curiosity, technology, and the desire to build meaningful digital experiences. I believe in continuous learning, clean code, and turning ideas into reality.",
  
  // Social links — replace # with your actual URLs
  github: "https://github.com/adarshmaurya13272-sys",
  linkedin: "https://linkedin.com/in/adarsh-maurya-a72102400",
  email: "mailto:adarshmaurya13272@gmail.com",
  
  // Resume — place your PDF at public/resume.pdf
  resumeUrl: "/resume.pdf",
  
  // Profile photo — placed in public/profile.jpg
  profilePhoto: "/profile.jpg",
};

export const roles = [
  "B.Tech Student",
  "Aspiring Developer",
  "Technology Enthusiast",
  "Future Software Engineer",
  "Problem Solver",
];

export const stats = [
  { label: "Projects Built", value: 0, suffix: "+" },
  { label: "Technologies", value: 8, suffix: "+" },
  { label: "Learning Days", value: 365, suffix: "+" },
  { label: "GitHub Commits", value: 0, suffix: "+" },
];

export const aboutHighlights = [
  {
    icon: "Code2",
    title: "Passionate Coder",
    desc: "Love turning problems into elegant code solutions, one line at a time.",
  },
  {
    icon: "BookOpen",
    title: "Continuous Learner",
    desc: "Always exploring new technologies, frameworks, and industry best practices.",
  },
  {
    icon: "Lightbulb",
    title: "Creative Thinker",
    desc: "Combining technical knowledge with creative thinking to build impactful solutions.",
  },
  {
    icon: "Target",
    title: "Goal-Oriented",
    desc: "Focused on building a strong foundation for a successful career in software development.",
  },
];

export const skills = [
  {
    category: "Languages",
    icon: "Code2",
    items: [
      { name: "C Programming", level: 70, tag: "Beginner-Intermediate" },
      { name: "C++", level: 60, tag: "Beginner" },
      { name: "Python", level: 65, tag: "Beginner-Intermediate" },
      { name: "JavaScript", level: 55, tag: "Learning" },
    ],
  },
  {
    category: "Web Technologies",
    icon: "Globe",
    items: [
      { name: "HTML5", level: 75, tag: "Intermediate" },
      { name: "CSS3", level: 70, tag: "Intermediate" },
      { name: "JavaScript (DOM)", level: 55, tag: "Learning" },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "Wrench",
    items: [
      { name: "Git", level: 60, tag: "Beginner-Intermediate" },
      { name: "GitHub", level: 60, tag: "Beginner-Intermediate" },
      { name: "VS Code", level: 80, tag: "Comfortable" },
      { name: "AI Tools (ChatGPT, etc.)", level: 75, tag: "Intermediate" },
    ],
  },
];

export const education = [
  {
    id: 1,
    degree: "B.Tech — [Your Branch Here]",
    institution: "[Your College Name Here]",
    duration: "2024 — 2028 (Expected)",
    year: "1st Year",
    description: "Currently pursuing Bachelor of Technology. Focusing on core programming fundamentals, data structures, and software engineering principles.",
    status: "ongoing",
    // Replace above fields with your actual college info
  },
  {
    id: 2,
    degree: "Higher Secondary (Class XII)",
    institution: "[Your School Name Here]",
    duration: "[Year]",
    year: "Class XII",
    description: "Completed higher secondary education with Science stream.",
    status: "completed",
  },
  {
    id: 3,
    degree: "Secondary (Class X)",
    institution: "[Your School Name Here]",
    duration: "[Year]",
    year: "Class X",
    description: "Completed secondary education.",
    status: "completed",
  },
];

export const projects = [
  {
    id: 1,
    title: "[Your Project Title]",
    description: "Replace this placeholder with your actual project description. Explain what the project does, the problem it solves, and your role in building it.",
    longDescription: "This is a placeholder project card. Once you have built a real project, update this with detailed information about your project — the architecture, challenges faced, solutions implemented, and what you learned.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "", // Add a screenshot at public/projects/project1.png
    github: "https://github.com/adarshmaurya13272-sys",
    demo: "#",
    category: "Web",
    featured: true,
  },
  {
    id: 2,
    title: "[Project 2 Placeholder]",
    description: "Another placeholder for your upcoming or in-progress project. Update this when you have a real project to showcase.",
    longDescription: "Replace this with your actual project details. Consider including: what tech stack you used, what you built, what challenges you overcame, and what results or outcomes you achieved.",
    tech: ["Python", "C++"],
    image: "",
    github: "https://github.com/adarshmaurya13272-sys",
    demo: "#",
    category: "Programming",
    featured: false,
  },
  {
    id: 3,
    title: "[Project 3 Placeholder]",
    description: "A third placeholder project. As you complete more projects, replace these placeholders with your actual work.",
    longDescription: "Every great developer starts somewhere. These cards will soon be filled with your real projects. Keep building, keep learning!",
    tech: ["C", "Git"],
    image: "",
    github: "https://github.com/adarshmaurya13272-sys",
    demo: "#",
    category: "Programming",
    featured: false,
  },
];

export const achievements = [
  {
    id: 1,
    title: "[Add Your Achievement Here]",
    issuer: "[Organization / Institution]",
    date: "[Month, Year]",
    description: "Replace this placeholder with a real certificate, award, hackathon participation, or achievement once you have one to add.",
    type: "certificate",
    icon: "Award",
  },
  {
    id: 2,
    title: "[Add Your Achievement Here]",
    issuer: "[Organization / Institution]",
    date: "[Month, Year]",
    description: "Another placeholder for achievements or certifications. Never fabricate achievements — only add real ones when earned.",
    type: "achievement",
    icon: "Trophy",
  },
];

export const contactInfo = [
  {
    icon: "Mail",
    label: "Email",
    value: "adarshmaurya13272@gmail.com",
    href: "mailto:adarshmaurya13272@gmail.com",
  },
  {
    icon: "Github",
    label: "GitHub",
    value: "github.com/adarshmaurya13272-sys",
    href: "https://github.com/adarshmaurya13272-sys",
  },
  {
    icon: "Linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/adarsh-maurya-a72102400",
    href: "https://linkedin.com/in/adarsh-maurya-a72102400",
  },
];

export const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "education", label: "Education", href: "#education" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "achievements", label: "Achievements", href: "#achievements" },
  { id: "contact", label: "Contact", href: "#contact" },
];
