/**
 * Advanced Dashboard Components & Examples
 * Optional enhancements and variations
 */

import React, { useState } from "react";
import { BarChart3, TrendingUp, Filter, X } from "lucide-react";

/**
 * Advanced Analytics Card Component
 * Shows detailed score breakdown
 */
export const AnalyticsCard = ({ data, title }) => {
  return (
    <div className="analytics-card">
      <div className="analytics-header">
        <h3>{title}</h3>
        <BarChart3 size={20} className="analytics-icon" />
      </div>
      <div className="analytics-content">
        {data.map((item, idx) => (
          <div key={idx} className="analytics-item">
            <span className="analytics-label">{item.label}</span>
            <div className="analytics-bar">
              <div
                className="analytics-fill"
                style={{ width: `${item.value}%` }}
              />
            </div>
            <span className="analytics-value">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Filter Component for Dashboard
 * Advanced filtering with multiple options
 */
export const DashboardFilter = ({ onFilterChange, activeFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    { id: "all", label: "All Questions", value: "all" },
    { id: "strong", label: "Strong (90%+)", value: "strong" },
    { id: "moderate", label: "Moderate (70-89%)", value: "moderate" },
    { id: "weak", label: "Weak (<70%)", value: "weak" },
  ];

  return (
    <div className="filter-wrapper">
      <button
        className={`filter-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={18} />
        <span>Filter</span>
        {activeFilters.length > 0 && (
          <span className="filter-badge">{activeFilters.length}</span>
        )}
      </button>

      {isOpen && (
        <div className="filter-dropdown">
          <div className="filter-header">
            <h4>Filter by Score</h4>
            <button
              className="filter-close"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          <div className="filter-options">
            {filterOptions.map((option) => (
              <label key={option.id} className="filter-option">
                <input
                  type="checkbox"
                  checked={activeFilters.includes(option.value)}
                  onChange={() =>
                    onFilterChange(option.value, activeFilters)
                  }
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Progress Badge Component
 * Shows improvement over time
 */
export const ProgressBadge = ({ current, previous, label }) => {
  const improvement = current - previous;
  const isPositive = improvement >= 0;

  return (
    <div className={`progress-badge ${isPositive ? "positive" : "negative"}`}>
      <div className="badge-content">
        <span className="badge-label">{label}</span>
        <div className="badge-values">
          <span className="badge-current">{current}%</span>
          <span className="badge-change">
            {isPositive ? "+" : "-"}{Math.abs(improvement)}%
          </span>
        </div>
      </div>
      <TrendingUp
        size={20}
        className={`badge-icon ${isPositive ? "up" : "down"}`}
      />
    </div>
  );
};

/**
 * Recommendation Card Component
 * AI-powered recommendations
 */
export const RecommendationCard = ({ recommendation, priority, actionBtn }) => {
  const priorityColor = {
    high: "#ef4444",
    medium: "#eab308",
    low: "#4ade80",
  };

  return (
    <div
      className="recommendation-card"
      style={{ borderLeftColor: priorityColor[priority] }}
    >
      <div className="recommendation-header">
        <span className={`priority-badge priority-${priority}`}>
          {priority.toUpperCase()}
        </span>
        <span className="recommendation-title">{recommendation.title}</span>
      </div>
      <p className="recommendation-text">{recommendation.description}</p>
      {actionBtn && (
        <button className="recommendation-action">{actionBtn.label}</button>
      )}
    </div>
  );
};

/**
 * Score Gauge Component
 * Circular progress with label
 */
export const ScoreGauge = ({ score, label, size = 120 }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="score-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="gauge-svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          className="gauge-bg"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          className="gauge-progress"
          strokeDashoffset={offset}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="gauge-content">
        <span className="gauge-score">{score}</span>
        <span className="gauge-label">{label}</span>
      </div>
    </div>
  );
};

/**
 * Timeline Component
 * Show interview progress/history
 */
export const InterviewTimeline = ({ events }) => {
  return (
    <div className="timeline">
      {events.map((event, idx) => (
        <div key={idx} className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <h4 className="timeline-title">{event.title}</h4>
            <p className="timeline-description">{event.description}</p>
            <span className="timeline-time">{event.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Comparison Card
 * Compare scores across categories
 */
export const ComparisonCard = ({ yourScore, avgScore, category }) => {
  const difference = yourScore - avgScore;
  const isAboveAvg = difference > 0;

  return (
    <div className="comparison-card">
      <h4 className="comparison-title">{category}</h4>
      <div className="comparison-scores">
        <div className="comparison-item">
          <span className="comparison-label">Your Score</span>
          <span className={`comparison-value ${isAboveAvg ? "green" : "red"}`}>
            {yourScore}%
          </span>
        </div>
        <div className="comparison-divider" />
        <div className="comparison-item">
          <span className="comparison-label">Average</span>
          <span className="comparison-value">{avgScore}%</span>
        </div>
      </div>
      <div className="comparison-indicator">
        {isAboveAvg ? (
          <span className="above-avg">Above Average!</span>
        ) : (
          <span className="below-avg">Below Average</span>
        )}
      </div>
    </div>
  );
};

/**
 * Tag Cloud Component
 * Show skills with importance weighting
 */
export const SkillTagCloud = ({ skills }) => {
  return (
    <div className="tag-cloud">
      {skills.map((skill) => (
        <span
          key={skill.id}
          className={`skill-tag skill-tag-${skill.level}`}
          style={{
            fontSize: `${0.8 + (skill.importance / 100) * 0.8}rem`,
          }}
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
};

/**
 * Modal Component
 * For detailed question view
 */
export const QuestionModal = ({ question, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="modal-header">
          <h2>{question.question}</h2>
          <span className="modal-score">{question.aiScore}%</span>
        </div>
        <div className="modal-body">
          <section>
            <h3>Answer</h3>
            <p>{question.fullAnswer}</p>
          </section>
          <section>
            <h3>AI Feedback</h3>
            <p>{question.feedback}</p>
          </section>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary">Save</button>
          <button className="btn-primary">Practice</button>
        </div>
      </div>
    </div>
  );
};

/**
 * Export/Download Component
 * Multiple export formats
 */
export const ExportOptions = ({ data, onExport }) => {
  const formats = [
    { id: "pdf", label: "PDF Report", icon: "📄" },
    { id: "csv", label: "CSV Data", icon: "📊" },
    { id: "json", label: "JSON Export", icon: "⚙️" },
  ];

  return (
    <div className="export-options">
      <h3>Export Report</h3>
      <div className="export-buttons">
        {formats.map((format) => (
          <button
            key={format.id}
            className="export-btn"
            onClick={() => onExport(format.id, data)}
          >
            <span>{format.icon}</span>
            {format.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default {
  AnalyticsCard,
  DashboardFilter,
  ProgressBadge,
  RecommendationCard,
  ScoreGauge,
  InterviewTimeline,
  ComparisonCard,
  SkillTagCloud,
  QuestionModal,
  ExportOptions,
};
