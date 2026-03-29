import React, { useState, useEffect } from "react";
import {
  Download,
  TrendingUp,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "../../style/right-panel.scss";

const RightPanel = ({ matchScore, skillGaps }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let interval;
    let currentScore = 0;

    interval = setInterval(() => {
      if (currentScore < matchScore) {
        currentScore += 2;
        setAnimatedScore(Math.min(currentScore, matchScore));
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [matchScore]);

  const getSkillStatus = (level) => {
    if (level >= 80) return { label: "Strong", color: "green", icon: "✓" };
    if (level >= 60) return { label: "Moderate", color: "yellow", icon: "○" };
    return { label: "Needs Work", color: "red", icon: "!" };
  };

  return (
    <aside className="right-panel">
      {/* Match Score Section */}
      <div className="panel-section match-score-section">
        <h3 className="section-label">Match Score</h3>

        <div className="score-container">
          <svg className="score-ring" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              className="score-ring-bg"
              fill="none"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              className="score-ring-progress"
              fill="none"
              strokeWidth="8"
              strokeDasharray={`${(animatedScore / 100) * 339.29} 339.29`}
            />
          </svg>

          <div className="score-content">
            <div className="score-percentage">{animatedScore}%</div>
            <p className="score-label">Match Score</p>
          </div>
        </div>

        <div className="score-details">
          <div className="detail-row">
            <span className="detail-label">Technical</span>
            <span className="detail-value">90%</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Behavioral</span>
            <span className="detail-value">85%</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Communication</span>
            <span className="detail-value">82%</span>
          </div>
        </div>
      </div>

      {/* Skill Gaps Section */}
      <div className="panel-section skill-gaps-section">
        <h3 className="section-label">Skill Gaps</h3>

        <div className="skills-list">
          {skillGaps.map((skill, index) => {
            const status = getSkillStatus(skill.level);
            const gapPercentage = 100 - skill.level;

            return (
              <div
                key={index}
                className={`skill-card skill-${status.color}`}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className={`skill-badge skill-badge-${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="skill-progress">
                  <div className="progress-bar">
                    <div
                      className={`progress-fill progress-${status.color}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="progress-text">{skill.level}%</span>
                </div>

                <div className="skill-gap">
                  <AlertCircle size={14} />
                  <span>Gap: {gapPercentage}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="skill-tip">
          <TrendingUp size={16} />
          <p>Focus on System Design to improve overall score</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="panel-section cta-section">
        <button className="download-btn">
          <Download size={20} />
          <div className="btn-content">
            <span className="btn-title">Download Report</span>
            <span className="btn-subtitle">PDF + Analytics</span>
          </div>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="panel-section stats-section">
        <div className="stat-item">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <p className="stat-label">Improvement</p>
            <p className="stat-value">+15% this week</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <p className="stat-label">Next Goal</p>
            <p className="stat-value">95% Match Score</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <p className="stat-label">Streak</p>
            <p className="stat-value">7 days active</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
