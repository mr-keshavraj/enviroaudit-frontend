# EnviroAudit Frontend

Professional ESG Audit & Compliance Platform Frontend built using:

- Next.js 15
- TypeScript
- Tailwind CSS
- Axios
- REST APIs
- ESG Workflow Architecture

---

# Features

## Dashboard
- Real-time ESG analytics
- Organization metrics
- Review metrics
- Audit metrics

## Organizations
- Multi-tenant organization management
- Live backend integration

## Upload Module
- ESG CSV Upload
- Real-time ingestion
- Backend integration

## Review Workflow
- Approve ESG records
- Reject ESG records
- Lock records for audit
- ESG analyst workflow

## Audit Logs
- Complete audit trail
- Search
- Filters
- Action badges
- Timeline tracking

---

# Tech Stack

| Technology | Usage |
|---|---|
| Next.js 15 | Frontend Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Axios | API Communication |
| Django REST API | Backend |

---

# Project Structure

```bash
frontend/
│
├── app/
├── components/
├── services/
├── types/
├── lib/
├── public/
└── ...
```

---

# Environment Setup

Create:

```bash
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/mrperfect2003/enviroaudit-frontend.git
```

---

## 2. Move Into Project

```bash
cd enviroaudit-frontend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Run Development Server

```bash
npm run dev
```

---

# Frontend URL

```bash
http://localhost:3000
```

---

# Backend Requirement

Backend should run on:

```bash
http://127.0.0.1:8000
```

Backend API Base:

```bash
http://127.0.0.1:8000/api
```

---

# API Modules

| Module | Endpoint |
|---|---|
| Organizations | /api/organizations/ |
| Upload | /api/ingestion/upload/ |
| Review | /api/review/ |
| Audit | /api/audit/ |

---

# Future Improvements

- Authentication & Authorization
- Charts & Analytics
- ESG Reports
- AI-based anomaly detection
- Pagination
- Notifications
- Role-based access

---

# Author

Keshav Raj

GitHub:
https://github.com/mrperfect2003