import React, { useState } from "react";
import {
  ChevronDown,
  Zap,
  MessageSquare,
  Award,
  Sparkles,
} from "lucide-react";
import "../../style/card.scss";

const QuestionCard = ({ question, isExpanded, onToggle, index }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <div className={`question-card ${isExpanded ? "expanded" : ""}`}>
      <div
        className="card-header"
        onClick={onToggle}
        role="button"
        tabIndex={0}
      >
        <div className="card-header-left">
          <div className="card-number">{index + 1}</div>
          <div className="card-info">
            <h3 className="card-question">{question.question}</h3>
            <p className="card-preview">{question.preview}</p>
          </div>
        </div>
        <div className="card-header-right">
          {question.aiScore && (
            <div className={`ai-score ${getScoreColor(question.aiScore)}`}>
              <Award size={16} />
              <span>{question.aiScore}%</span>
            </div>
          )}
          <button
            className={`chevron-btn ${isExpanded ? "rotated" : ""}`}
            aria-expanded={isExpanded}
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="card-content">
          <div className="content-section">
            <h4 className="section-title">
              <Zap size={18} className="section-icon" />
              Full Answer
            </h4>
            <p className="section-text">{question.fullAnswer}</p>
          </div>

          <div className="divider" />

          <div className="content-section">
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="feedback-toggle"
            >
              <MessageSquare size={18} />
              <span>AI Feedback</span>
              <ChevronDown
                size={16}
                className={`toggle-chevron ${showFeedback ? "rotated" : ""}`}
              />
            </button>

            {showFeedback && (
              <div className="feedback-content">
                <div className="feedback-badge">
                  <Sparkles size={16} />
                  <span>AI Insights</span>
                </div>
                <p className="feedback-text">{question.feedback}</p>
              </div>
            )}
          </div>

          <div className="card-actions">
            <button className="btn-primary">
              <span>Practice Answer</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary">
              <span>Save for Later</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
