import React from "react";
import QuestionCard from "./QuestionCard";
import { Search } from "lucide-react";

const MainContent = ({
  questions,
  activeSection,
  expandedCard,
  onCardToggle,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredQuestions = questions.filter((q) =>
    q.question?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getHeaderInfo = () => {
    const headers = {
      technical: {
        title: "Technical Questions",
        description: "Master the core technical concepts",
        color: "from-blue-500",
      },
      behavioral: {
        title: "Behavioral Questions",
        description: "Showcase your soft skills and experience",
        color: "from-purple-500",
      },
      roadmap: {
        title: "Your Growth Roadmap",
        description: "Skills to develop for your next role",
        color: "from-green-500",
      },
    };
    return headers[activeSection];
  };

  const header = getHeaderInfo();

  return (
    <div className="main-content">
      {/* Header Section */}
      <div className={`content-header bg-gradient-to-r ${header.color} to-transparent`}>
        <div className="header-content">
          <h1 className="header-title">{header.title}</h1>
          <p className="header-description">{header.description}</p>
        </div>
      </div>

      {/* Search Bar */}
      {questions.length > 0 && (
        <div className="search-container">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}

      {/* Questions Grid */}
      <div className="questions-container">
        {filteredQuestions.length > 0 ? (
          <div className="questions-list">
            {filteredQuestions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                isExpanded={expandedCard === question.id}
                onToggle={() =>
                  onCardToggle(
                    expandedCard === question.id ? null : question.id
                  )
                }
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h3 className="empty-title">No questions found</h3>
            <p className="empty-text">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
