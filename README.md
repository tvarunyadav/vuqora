# VUQORA

> **From menu to meal.**

**Status:** Early Development (Milestone 0: Project Foundation)

VUQORA is a mobile-first restaurant menu companion designed to transform physical restaurant menus into personalized dining recommendations based on user preferences, party size, appetite, categories, and budget constraints.

---

## 🏗️ Planned V1 Architecture

- **Frontend:** React + TypeScript + Vite + Tailwind CSS (Mobile-first PWA)
- **Backend:** Python + FastAPI + Pydantic + SQLAlchemy 2.x + Alembic
- **Database:** PostgreSQL (Neon PostgreSQL in production)
- **AI Services (Future Milestones):** Gemini multimodal (menu extraction), Gemini primary text intelligence, Groq fallback provider abstraction
- **Deployment (Future Milestones):** Vercel (Frontend), Render (Backend), Neon (Database)

---

## 📁 Repository Structure

```
vuqora/
├── frontend/               # React + TS + Vite + Tailwind CSS PWA
│   ├── public/             # PWA assets & favicons
│   ├── src/                # React application source
│   ├── eslint.config.js    # ESLint configuration
│   ├── vite.config.ts      # Vite & PWA configuration
│   └── .env.example        # Frontend environment example
├── backend/                # FastAPI application
│   ├── app/                # Application modules (api, core, models, schemas, services, repositories)
│   ├── tests/              # Pytest test suite
│   ├── alembic/            # Database migration scripts
│   ├── alembic.ini         # Alembic configuration
│   ├── pyproject.toml      # Project tooling & dependency metadata
│   ├── requirements.txt    # Frozen dependency specifications
│   └── .env.example        # Backend environment example
├── docs/
│   └── brand/              # Brand identity guide & asset specifications
├── .github/
│   └── workflows/          # GitHub Actions CI workflow
├── .gitignore              # Multi-stack gitignore rules
├── LICENSE                 # MIT License
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v20+ and `npm` v10+
- **Python:** v3.12+ (Production target: Python 3.12) and `pip`

---

### Environment Setup

Copy example environment files to `.env` in both frontend and backend directories:

```bash
# Frontend environment
cp frontend/.env.example frontend/.env

# Backend environment
cp backend/.env.example backend/.env
```

---

### Frontend Setup & Commands

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Run linter:**
   ```bash
   npm run lint
   ```

5. **Build production bundle:**
   ```bash
   npm run build
   ```

---

### Backend Setup & Commands

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   - **Linux / macOS:**
     ```bash
     python -m venv .venv
     source .venv/bin/activate
     ```
   - **Windows:**
     ```cmd
     python -m venv .venv
     .venv\Scripts\activate
     ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run backend development server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

5. **Run test suite:**
   ```bash
   pytest
   ```

---

## 🧪 Verification & Health Check

When the backend server is running, the health endpoint is accessible at:

- `GET /health`

**Expected Response:**
```json
{
  "status": "ok",
  "service": "vuqora-api"
}
```

---

## 🛡️ Security & AI Key Guidelines

- **NEVER** expose API keys (`GEMINI_API_KEY`, `GROQ_API_KEY`, `DATABASE_URL`) in frontend code or `VITE_*` variables.
- All AI API credentials must remain strictly backend-only.
- Secrets are excluded from version control via `.gitignore`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
