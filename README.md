Copy🚀 Udaan — Hyper-Personalized AI Learning for Underserved College Students

Hackathon: Problem Statement PS1
Team: Argus
Members: Akhil Dwivedi · Hrishit Nagar · Pranjali Dangi · Pranjal Mourya


📌 Problem Statement (PS1)
Millions of college students from tier-2 and tier-3 cities in India are pursuing degrees without access to personalized mentorship, career clarity, or learning resources that match their pace, language, or background. Generic online platforms fail them — they're built for students who already have a head start.
Udaan is a hyper-personalized AI system that caters to underserved college students by adapting to their career goals, learning pace, preferred language, and real-world experience — delivering education that actually fits their life.

💡 What is Udaan?
Udaan (उड़ान) means flight in Hindi — and that's exactly what this platform enables.
It is an AI-powered adaptive learning platform that:

Personalizes every explanation based on the student's level, style, and language (English / Hindi / Hinglish)
Generates quizzes tailored to their subject and progress
Surfaces hyper-local, free career opportunities relevant to their city and degree
Builds a hidden skill profile based on their real-world experience (delivery work, farming, shop, etc.)
Tracks learning progress and adapts over time


🧠 How It Works
Student Onboards (7 steps)
        ↓
Profile Built (degree, subject, level, language, city, experience)
        ↓
AI Engine (Gemini 2.5 Flash) personalizes every interaction
        ↓
Explain → Quiz → Re-Explain → Opportunities
        ↓
Progress tracked in MongoDB Atlas

🛠️ Tech Stack
Backend
TechnologyPurposeFastAPI + UvicornPython web framework & ASGI serverMongoDB AtlasCloud NoSQL databaseMotorAsync MongoDB driverGemini 2.5 FlashAI explanations, quizzes, opportunitiespython-joseJWT authenticationpasslib[bcrypt]Secure password hashing
Frontend
TechnologyPurposeReact 18 + ViteUI framework & build toolTailwind CSSUtility-first stylingReact Router v6Client-side routingLucide ReactIcon library
Infrastructure
TechnologyPurposeDocker + Docker ComposeContainerizationAWS EC2 (t2.micro)Cloud deploymentNginxStatic frontend serving & reverse proxy

📁 Project Structure
Argus_Ai/
├── Udaan/                  # Backend (FastAPI)
│   ├── main.py             # App entry point + all routes
│   ├── models.py           # Pydantic request/response schemas
│   ├── auth.py             # JWT + bcrypt security
│   ├── database.py         # MongoDB Atlas CRUD helpers
│   ├── prompts.py          # Gemini prompt engineering
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env                # Secrets (never commit)
├── frontend/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/          # LandingPage, Onboarding, Dashboard, etc.
│   │   ├── components/     # ChatBox, QuizCard, SidebarLayout
│   │   ├── services/       # api.js, auth.js
│   │   └── utils/          # profileLogic.js
│   └── Dockerfile
└── docker-compose.yml      # Orchestrates backend + frontend

🔌 API Endpoints
MethodEndpointAuthDescriptionGET/NoHealth checkPOST/auth/registerNoRegister new userPOST/auth/loginNoLogin + get JWTGET/auth/meYesGet user profilePATCH/auth/progressYesUpdate learning progressPOST/explainYesAI explanation of a topicPOST/quizYesGenerate personalized quizPOST/reexplainYesRe-explain from a different angleGET/opportunitiesYesHyper-local career opportunities

🗺️ Frontend Routes
RoutePage/Landing Page/onboarding7-step profile builder/appDashboard/app/coursesCourse topics grid/app/courses/:topicAI chat + quiz for a topic/app/opportunitiesReal-time local events/app/profileFull profile view

⚙️ Local Setup
Prerequisites

Python 3.11+
Node.js 18+
Docker Desktop
MongoDB Atlas account
Google Gemini API key

Backend
bashcd Udaan
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Fill in GEMINI_API_KEY, MONGO_URI, JWT_SECRET, JWT_EXPIRE_MINUTES

uvicorn main:app --reload --port 8000
Frontend
bashcd frontend
npm install
npm run dev
# Runs at http://54.226.99.254


Frontend: http://54.226.99.254:80
Backend: http://54.226.99.254:8000
Swagger docs: http://localhost:8000/docs


🎯 Key Features

Multilingual AI — explains in English, Hindi, or Hinglish
Adaptive difficulty — beginner / intermediate / advanced
Learning styles — definition-first or example-first
Subject tracks — Python, Data Science, DSA (B.Tech) · Accounting, Finance, Govt Exam Prep (B.Com)
Hidden skill discovery — maps real-world experience to career-relevant strengths
Hyper-local opportunities — AI-generated free events, workshops, and jobs by city
Progress tracking — 0–100 score, increments with correct quiz answers


👥 Team Argus
NameRoleAkhil DwivediBackend & DeploymentHrishit NagarAI & Prompt EngineeringPranjali DangiFrontend & UI/UXPranjal MouryaDatabase & Integration

📄 License
Built for hackathon purposes. All rights reserved by Team Argus.
