import React from "react";
import {
  BookOpen,
  Lightbulb,
  Zap,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ activeSection, onSectionChange }) => {
  const sections = [
    {
      id: "technical",
      label: "Technical Questions",
      icon: Zap,
      count: 3,
    },
    {
      id: "behavioral",
      label: "Behavioral Questions",
      icon: Lightbulb,
      count: 2,
    },
    {
      id: "roadmap",
      label: "Growth Roadmap",
      icon: BookOpen,
      count: 3,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-badge">
          <div className="logo-icon">✨</div>
          <span>NextHire</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">Interview Results</p>
        <ul className="nav-list">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={`nav-item ${isActive ? "active" : ""}`}
                >
                  <div className="nav-icon-wrapper">
                    <Icon size={20} className="nav-icon" />
                    {isActive && <div className="active-indicator" />}
                  </div>
                  <div className="nav-content">
                    <span className="nav-text">{section.label}</span>
                    <span className="nav-count">{section.count}</span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`nav-chevron ${isActive ? "visible" : ""}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="footer-card">
          <div className="footer-icon">📊</div>
          <p className="footer-title">Need Help?</p>
          <p className="footer-text">
            Check out our interview preparation guide
          </p>
          <button className="footer-btn">
            Learn More <span>→</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
