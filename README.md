# 📄 Cadastral Document Automation

### Full-Stack AI-Powered Legal Description Generator for Bulgarian Cadastral Documents

A production-oriented full-stack web application that **extracts data from Bulgarian cadastral PDFs and generates professional legal property descriptions using AI**.

This project focuses on **real-world document processing pipelines, AI-driven structured extraction, authentication, and scalable deployment architecture** — not just file uploads.

---

## 🎯 Project Purpose

Bulgarian notaries, lawyers, and property professionals frequently work with cadastral documents (скици) that must be manually reviewed and transcribed into legal descriptions — a repetitive, error-prone process.

**Cadastral Document Automation** addresses this by:

- accepting uploaded Bulgarian cadastral PDF documents
- automatically detecting the document type (land property, building, independent object)
- extracting structured cadastral data using AI
- generating a professional legal property description in Bulgarian
- validating extracted data against required fields per document type
- storing history with user-scoped access for future reference

The system is designed to simulate a **real internal legal tool**, where AI is integrated into a structured document processing workflow rather than treated as a standalone feature.

---

## 🚀 Core Features

### Document Upload & Processing

- Drag-and-drop PDF upload with file validation
- Server-side PDF text extraction with automatic OCR fallback for scanned PDFs
- Automatic document type detection

### AI-Powered Extraction & Generation

- Structured data extraction via Claude AI
- Field-level validation per document type
- Professional Bulgarian legal description generation
- Editable results with copy-to-clipboard and download

### Authentication & History

- Supabase Auth (login / signup)
- User-scoped history management
- View, inspect, and delete past records
- Detailed performance metrics per generation

### UX & Localization

- Bulgarian and English language support
- Dark / light theme toggle
- Animated loading states
- Responsive layout

---

## 🌐 Live Demo

- **Frontend (Vercel):** https://cadastral-doc-automation.vercel.app
- **Backend API (Render):** https://cadastral-doc-automation.onrender.com

> ⚠️ Note:
> This is a portfolio deployment.
> The backend is hosted on a free tier (Render), so cold starts may occur after inactivity.

---

## 🖼️ Screenshots

### 1️⃣ Upload & Generate

![Upload & Generate](views/Screenshot%202026-06-03%20181530.png)

### 2️⃣ Document Type Detection & Validation

![Document Type Detection & Validation](views/Screenshot%202026-06-03%20181615.png)

### 3️⃣ Generated Legal Description & Editing

![Generated Legal Description & Editing](views/Screenshot%202026-06-03%20181320.png)

### 4️⃣ History Management

![History Management](views/Screenshot%202026-06-03%20181639.png)

### 5️⃣ Performance Metrics

![Performance Metrics](views/Screenshot%202026-06-03%20181623.png)

---

## 🏗️ Architecture Overview

The application follows a layered client–server architecture:

### Client Layer (React + Vite)

- Component-based UI with drag-and-drop uploads
- Context-based state management (auth, theme, language)
- Custom hooks for API communication and history CRUD
- Routing with protected routes for authenticated pages

### Backend API (Express + TypeScript)

- RESTful endpoints for document processing and history
- Service-layer architecture for extraction, validation, and generation
- Authentication middleware via Supabase JWT verification
- Multer-based file upload handling in memory

### AI Layer (Anthropic Claude)

- Structured data extraction from raw PDF text
- Bulgarian legal description generation
- Prompt engineering for domain-specific cadastral terminology
- Vision-based OCR for scanned/image PDFs without embedded text

### Data Layer (PostgreSQL + Prisma)

- Document description history with user-scoped isolation
- JSON fields for extracted data, validation errors, and performance metrics
- Indexed queries for efficient history retrieval

This mirrors real-world systems where **AI processing is integrated into a structured document pipeline with authentication and persistence**.

---

## 🛠️ Tech Stack

### Frontend

- React 19 (Vite)
- Tailwind CSS 4
- React Router 7
- Supabase JS (auth)

### Backend

- Node.js
- Express 5
- TypeScript
- Prisma ORM 6
- PostgreSQL (Supabase)
- Anthropic Claude SDK
- pdf-parse + Claude Vision (OCR fallback for scanned PDFs)

### Deployment

- Frontend: Vercel
- Backend: Render
- Database & Auth: Supabase

---

## 🗄️ Document Processing Flow (Important)

1. User uploads a Bulgarian cadastral PDF
2. Backend extracts raw text via pdf-parse (falls back to Claude Vision OCR for scanned/image PDFs)
3. Backend detects document type (land property / building / independent object)
4. Claude AI extracts structured cadastral data
5. Extracted data is validated against required fields
6. Claude AI generates a professional legal description
7. Result is saved to PostgreSQL with user association
8. Frontend displays the description, stats, and validation warnings

---

## 🔒 Security Considerations

- JWT-based authentication via Supabase
- Bearer token injection on all protected API routes
- CORS restricted to trusted frontend origin
- Security headers via Helmet middleware
- Rate limiting on generate endpoint
- Environment variables for all sensitive configuration

---

## ▶️ Running Locally

### 1️⃣ Backend

```bash
cd backend
npm install
npm run dev
```

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Environment Variables

#### Backend `.env`

```env
PORT=3030
ANTHROPIC_API_KEY=
DATABASE_URL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
FRONTEND_URL=http://localhost:5173
```

#### Frontend `.env`

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_URL=http://localhost:3030
```

Backend runs on: `http://localhost:3030`

Frontend runs on: `http://localhost:5173`

---

## 🌱 Future Improvements

- Support for additional cadastral document types
- Batch document processing
- Export to PDF / DOCX
- Email delivery of generated descriptions
- Enhanced error handling for edge-case documents
- Mobile-responsive UX improvements

---

## 👤 Author Note

Built with a production mindset, focusing on real-world document workflows, AI-driven structured extraction, and secure full-stack architecture.

This project demonstrates practical experience with **document processing, AI integration, authentication, and deployment across multiple services**, reflecting real production scenarios beyond basic CRUD applications.
