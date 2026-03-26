const resume = `
Candidate: Ankur Sharma
Experience: 3 years in Node.js backend development
Skills: Node.js, Express.js, MongoDB, JWT, Redis
`

const selfDescription = `
Passionate backend developer with strong interest in system design and scalable applications.
`

const jobDescription = `
Looking for a Backend Developer skilled in Node.js, Express, MongoDB, and system design.
`

// 🔥 MOCK AI RESPONSE (this is what tutor shows)
const report = {
  candidate_name: "Ankur Sharma",
  position_applied: "Backend Developer (Node.js)",
  date_of_interview: "2024-01-01",
  interviewer_name: "AI Interviewer",
  overall_recommendation: "Strong Consider",

  strengths: [
    "Strong experience in Node.js and Express.js for RESTful API development.",
    "Proven track record in MongoDB optimization using indexing and aggregation pipelines.",
    "Solid understanding and implementation of authentication/authorization using JWT.",
    "Experience with caching strategies, specifically basic Redis implementation.",
    "Direct experience with migrating to modular service-based architecture.",
    "Enthusiasm for system design and performance optimization.",
    "Good foundation in MERN stack development."
  ],

  areas_for_improvement: [
    "Basic familiarity with Docker and CI/CD workflows, not extensive production experience.",
    "Limited experience with advanced data structures and algorithms.",
    "No direct experience with message queues like Kafka or RabbitMQ.",
    "Needs more exposure to distributed systems."
  ],

  technical_assessment: {
    nodejs_express:
      "Excellent. Demonstrated 3 years experience, developed scalable APIs, built real-time apps.",
    database_mongodb:
      "Excellent. Strong experience with MongoDB, Mongoose, and query optimization.",
    api_design_development:
      "Excellent. Designed and implemented RESTful APIs serving thousands of users."
  }
}

module.exports = {
  resume,
  selfDescription,
  jobDescription,
  report
}