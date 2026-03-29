/**
 * Dashboard utility functions
 */

/**
 * Calculate skill level color
 * @param {number} level - Skill level (0-100)
 * @returns {string} Color class
 */
export const getSkillColor = (level) => {
  if (level >= 80) return "green";
  if (level >= 60) return "yellow";
  return "red";
};

/**
 * Calculate skill gap
 * @param {number} level - Current skill level
 * @returns {number} Gap percentage
 */
export const calculateGap = (level) => 100 - level;

/**
 * Format percentage for display
 * @param {number} value - Value to format
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value) => {
  return Math.round(value) + "%";
};

/**
 * Get AI score feedback message
 * @param {number} score - AI score
 * @returns {string} Feedback message
 */
export const getScoreFeedback = (score) => {
  if (score >= 95) return "Outstanding!";
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  return "Needs Work";
};

/**
 * Calculate average score
 * @param {Array} questions - Questions array
 * @returns {number} Average score
 */
export const calculateAverageScore = (questions) => {
  if (!questions.length) return 0;
  const total = questions.reduce((sum, q) => sum + (q.aiScore || 0), 0);
  return Math.round(total / questions.length);
};

/**
 * Group questions by category
 * @param {Array} questions - Questions array
 * @returns {Object} Grouped questions
 */
export const groupByCategory = (questions) => {
  return questions.reduce((acc, question) => {
    const category = question.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(question);
    return acc;
  }, {});
};

/**
 * Truncate text to specific length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + "...";
};

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return d.toLocaleDateString("en-US", options);
};

/**
 * Calculate total time from questions
 * @param {Array} questions - Questions array
 * @returns {string} Formatted time
 */
export const calculateTotalTime = (questions) => {
  const total = questions.reduce((sum, q) => sum + (q.timeSpent || 0), 0);
  const minutes = Math.round(total / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.round(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
};

/**
 * Generate PDF export data
 * @param {Object} data - Dashboard data
 * @returns {Object} PDF ready data
 */
export const generatePDFData = (data) => {
  return {
    title: "Interview Report",
    date: formatDate(new Date()),
    matchScore: data.matchScore,
    technicalScore: data.technicalScore,
    behavioralScore: data.behavioralScore,
    questions: data.questions,
    skillGaps: data.skillGaps,
  };
};

/**
 * Get recommendation based on score
 * @param {number} score - AI score
 * @returns {string} Recommendation
 */
export const getRecommendation = (score) => {
  if (score >= 90)
    return "Excellent performance! You're ready for advanced interviews.";
  if (score >= 80)
    return "Good performance. Focus on deepening your knowledge in weak areas.";
  if (score >= 70)
    return "Solid foundation. Practice more to improve weak skills.";
  return "Needs improvement. Dedicate time to practice and learn fundamentals.";
};

/**
 * Calculate progress towards goal
 * @param {number} current - Current score
 * @param {number} target - Target score
 * @returns {number} Progress percentage
 */
export const calculateProgress = (current, target) => {
  if (target <= 0) return 0;
  return Math.round((current / target) * 100);
};

/**
 * Sort questions by score
 * @param {Array} questions - Questions array
 * @param {string} order - "asc" or "desc"
 * @returns {Array} Sorted questions
 */
export const sortByScore = (questions, order = "desc") => {
  return [...questions].sort((a, b) => {
    const scoreA = a.aiScore || 0;
    const scoreB = b.aiScore || 0;
    return order === "desc" ? scoreB - scoreA : scoreA - scoreB;
  });
};

/**
 * Filter questions by score range
 * @param {Array} questions - Questions array
 * @param {number} min - Minimum score
 * @param {number} max - Maximum score
 * @returns {Array} Filtered questions
 */
export const filterByScoreRange = (questions, min = 0, max = 100) => {
  return questions.filter((q) => {
    const score = q.aiScore || 0;
    return score >= min && score <= max;
  });
};
