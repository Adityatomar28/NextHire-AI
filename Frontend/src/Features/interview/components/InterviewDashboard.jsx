import React, { useState, useEffect } from "react";
import Sidebar from "./dashboard/Sidebar";
import MainContent from "./dashboard/MainContent";
import RightPanel from "./dashboard/RightPanel";
import "../../../style/dashboard.scss";

const InterviewDashboard = () => {
  const [activeSection, setActiveSection] = useState("technical");
  const [expandedCard, setExpandedCard] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const questionData = {
    technical: [
      {
        id: 1,
        question: "Explain the difference between var, let, and const in JavaScript",
        preview: "var is function-scoped, let and const are block-scoped...",
        fullAnswer: `
          var: Function-scoped, hoisted with undefined value, can be redeclared
          let: Block-scoped, hoisted but not accessible before declaration (TDZ), cannot be redeclared in same scope
          const: Block-scoped, immutable binding, cannot be redeclared, must be initialized at declaration
          
          Best practice: Use const by default, let when you need to reassign, avoid var in modern JavaScript.
        `,
        feedback: "Excellent understanding of JavaScript scoping. Mention hoisting and temporal dead zone for more depth.",
        aiScore: 92,
        category: "JavaScript",
      },
      {
        id: 2,
        question: "What is event delegation and why is it useful?",
        preview: "Event delegation is a technique that leverages event bubbling...",
        fullAnswer: `
          Event delegation is a technique where you attach an event listener to a parent element instead of individual child elements.
          
          Benefits:
          - Reduced memory footprint (single listener vs multiple)
          - Handles dynamically added elements
          - Cleaner code for large lists
          
          Implementation: Check event.target to identify which child was clicked.
        `,
        feedback: "Great explanation! Consider mentioning event.currentTarget vs event.target differences.",
        aiScore: 88,
        category: "DOM",
      },
      {
        id: 3,
        question: "Explain async/await and Promises in detail",
        preview: "Async/await is syntactic sugar built on top of Promises...",
        fullAnswer: `
          Promises represent eventual completion or failure of an async operation.
          States: pending → fulfilled/rejected
          
          Async/await makes async code look synchronous, improving readability.
          
          Error handling: try/catch blocks
          Parallel execution: Promise.all() for multiple promises
          Sequential: await each promise in order
        `,
        feedback: "Solid grasp of async patterns. Try explaining microtask vs macrotask queue for advanced understanding.",
        aiScore: 90,
        category: "Async",
      },
    ],
    behavioral: [
      {
        id: 4,
        question: "Tell us about a time you handled a conflict with a team member",
        preview: "I proactively communicated and found a mutually beneficial solution...",
        fullAnswer: `
          During a project, I disagreed with a colleague on the architectural approach. Instead of pushing my solution, I:
          
          1. Listened to their perspective thoroughly
          2. Documented both approaches with pros/cons
          3. Scheduled a meeting with our tech lead
          4. Presented both options objectively
          5. Agreed on a hybrid approach combining best of both
          
          Outcome: The solution worked better than either original proposal.
        `,
        feedback: "Good conflict resolution! Add specific metrics/outcomes for stronger impact.",
        aiScore: 85,
        category: "Teamwork",
      },
      {
        id: 5,
        question: "Describe your experience with code reviews",
        preview: "I believe code reviews are essential for quality and team learning...",
        fullAnswer: `
          I actively participate in code reviews as both reviewer and author.
          
          As reviewer:
          - Focus on logic, performance, and readability
          - Ask questions rather than criticize
          - Approve with suggestions for future improvement
          
          As author:
          - Welcome all feedback positively
          - Explain my thought process
          - Learn from suggestions
          - Implement improvements promptly
        `,
        feedback: "Strong team player mindset. Mention specific examples of improvements made through reviews.",
        aiScore: 87,
        category: "Collaboration",
      },
    ],
    roadmap: [
      {
        id: 6,
        skill: "React Hooks",
        proficiency: 85,
        gap: 15,
      },
      {
        id: 7,
        skill: "System Design",
        proficiency: 72,
        gap: 28,
      },
      {
        id: 8,
        skill: "Web Performance",
        proficiency: 78,
        gap: 22,
      },
    ],
  };

  const questions = activeSection === "roadmap" ? [] : questionData[activeSection] || [];
  const matchScore = 87;
  const skillGaps = [
    { name: "React Advanced Patterns", level: 72, status: "moderate" },
    { name: "System Design", level: 65, status: "weak" },
    { name: "Web Performance Optimization", level: 78, status: "moderate" },
  ];

  return (
    <div className="interview-dashboard">
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }} />

      <div className="dashboard-container">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        <main className="dashboard-main">
          <MainContent
            questions={questions}
            activeSection={activeSection}
            expandedCard={expandedCard}
            onCardToggle={setExpandedCard}
          />
        </main>

        <RightPanel matchScore={matchScore} skillGaps={skillGaps} />
      </div>
    </div>
  );
};

export default InterviewDashboard;
