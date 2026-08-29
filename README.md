# VedaAI - AI Teacher's Toolkit & Exam Evaluation Platform

> A modern, high-contrast EdTech dashboard for educators to upload Question Papers and Answer Sheets, auto-evaluate handwriting, and map marks line-by-line with AI precision.

---

## 📂 Google Drive Upload Storage Folder

All uploaded question papers and student answer booklets are organized and archived in the shared Google Drive folder:

- **Google Drive Storage URL**: [https://drive.google.com/drive/folders/1XGTV7IEurZN7Pj4dRVu0cEirYE-gRY31](https://drive.google.com/drive/folders/1XGTV7IEurZN7Pj4dRVu0cEirYE-gRY31)
- **Folder ID**: `1XGTV7IEurZN7Pj4dRVu0cEirYE-gRY31`

---

## 🔑 Demo Educator Credentials

For quick demo testing, use the built-in 1-click **Autofill Demo Login** button or sign in with:

| Field | Demo Credential |
| :--- | :--- |
| **Email** | `madhur.rastogi@dpsbokaro.edu.in` |
| **Password** | `teacher2026` |
| **School** | `Delhi Public School, Bokaro Steel City` |
| **Role** | `Senior Evaluator` |

---

## 🚀 Quick Start

### Prerequisites
- Node.js `18.17.0` or higher
- npm `9.0.0` or higher

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/veda-ai.git
   cd veda-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   Add your NVIDIA API key & Google Drive configuration:
   ```env
   NVIDIA_API_KEY=nvapi-your_key_from_build.nvidia.com
   GOOGLE_DRIVE_FOLDER_URL=https://drive.google.com/drive/folders/1XGTV7IEurZN7Pj4dRVu0cEirYE-gRY31
   ```

4. **Run the Next.js Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Backend Storage & AI Pipeline Requirements

### 1. Document Storage (Google Drive / S3 / Supabase)
For archiving uploaded PDF question papers and high-resolution scanned answer booklets.

- **Shared Google Drive Folder**: `1XGTV7IEurZN7Pj4dRVu0cEirYE-gRY31`
- **Link**: [Open Drive Folder](https://drive.google.com/drive/folders/1XGTV7IEurZN7Pj4dRVu0cEirYE-gRY31)

---

### 2. AI OCR & Handwriting Evaluation Microservice (NVIDIA Nemotron v2)
Connect the 3-stage pipeline (Upload -> Extraction -> Mapping):

- **NVIDIA NIM Model**: `meta/llama-3.2-90b-vision-instruct` / `nvidia/llama-3.1-nemotron-70b-instruct`.
- **Endpoint**: `/api/evaluate` for OCR handwriting recognition, question parsing, and bounding box mapping.

---

## 🌐 Production Deployment (Vercel & Render)

### Option A: Vercel (Recommended for Next.js)

1. Push your code to GitHub / GitLab.
2. Import the project in [Vercel Dashboard](https://vercel.com/new).
3. Set Environment Variables from `.env.example`.
4. Click **Deploy**.

---

## 📄 License
MIT License. Built for EdTech evaluations and teacher toolkits.
