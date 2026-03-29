
# ✨ AI-Powered Interview Preparation Platform

Preparing for interviews can feel overwhelming — especially when you're unsure what to focus on.

This project solves that problem by combining **AI + your profile + job requirements** to generate a **personalized interview strategy** tailored just for you.

Instead of guessing what to study, this platform tells you exactly:

* what questions you might face
* where your weaknesses are
* how to prepare efficiently

---

## 🚀 What This Project Does

This is a full-stack MERN application that:

👉 Analyzes your **resume + job description + self-profile**
👉 Uses AI to understand your strengths and gaps
👉 Generates a **complete interview roadmap**

You get:

* 🎯 Relevant technical questions
* 💬 Behavioral interview questions
* 📉 Skill gap analysis
* 📚 Step-by-step preparation plan

---

## 🧠 Why I Built This

As a student preparing for technical interviews, I realized:

> “There’s too much to study, but no clear direction.”

So I built this tool to:

* eliminate confusion
* focus on **high-impact preparation**
* simulate real interview expectations

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Context API
* SCSS

### Backend

* Node.js & Express
* MongoDB (Mongoose)
* JWT Authentication
* Multer (file uploads)
* pdf-parse (resume analysis)

### AI Integration

* Google Generative AI / OpenAI

---

## ⚙️ How It Works

1. Enter a **job description**
2. Upload your **resume** (or write a self-description)
3. Click **Generate Interview Strategy**

Behind the scenes:

* Resume is parsed
* AI analyzes your profile vs job requirements
* A structured interview report is generated

---

## 📂 Project Structure

```id="x7k2mn"
Resume-Analyser/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── middlewares/
│
├── Frontend/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── services/
```

---

## 🔐 Environment Setup

Create a `.env` file inside the **Backend** folder:

```id="u3k5zt"
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GOOGLE_GENAI_API_KEY=your_api_key
```

---

## 🚀 Running the Project Locally

### 1. Clone the repo

```id="7u5z1c"
git clone https://github.com/your-username/interview-ai.git
cd interview-ai
```

### 2. Install dependencies

```id="g1r0cm"
cd Backend
npm install

cd ../Frontend
npm install
```

### 3. Start servers

```id="6p3ylo"
# Backend
cd Backend
npm run dev

# Frontend
cd Frontend
npm run dev
```

---

## 🌐 Local URLs

* Frontend → http://localhost:5173
* Backend → http://localhost:3000

---

## 💡 Key Highlights

* Real-world **AI integration**
* Resume parsing with PDF support
* Full authentication system (JWT)
* Clean UI with structured output
* End-to-end full-stack project

---

## 📌 Future Improvements

* 🌍 Deployment (Vercel + Render)
* 📊 Dashboard analytics
* 🎤 Mock interview simulator
* 📱 Mobile responsiveness improvements

---

## 👨‍💻 About Me

Hi, I’m **Aditya Singh Tomar** — a Computer Science student passionate about building real-world full-stack applications and solving meaningful problems.

---

## ⭐ Support

If you found this project helpful or interesting, consider giving it a ⭐
It really helps and motivates me to build more!

---
