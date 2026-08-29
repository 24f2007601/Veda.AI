# VedaAI - AI Teacher's Toolkit & Exam Evaluation Platform

> A modern, high-contrast EdTech dashboard for educators to upload Question Papers and Answer Sheets, auto-evaluate handwriting, and map marks line-by-line with AI precision.

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
   Add your NVIDIA API key (or use the built-in local fallback):
   ```env
   NVIDIA_API_KEY=nvapi-your_key_from_build.nvidia.com
   ```

4. **Run the Next.js Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Backend Storage & AI Pipeline Requirements

### 1. Database Storage (PostgreSQL + Prisma / Supabase)
Store teacher accounts, school profiles, exam metadata, parsed question papers, student submissions, and AI confidence scores.

#### Recommended Schema Entities:
- **School Organization**: `id`, `name`, `city`, `logo_url` (e.g., Delhi Public School Bokaro).
- **Exam Record**: `id`, `subject`, `grade_level`, `qp_file_url`, `total_marks`.
- **Question Entity**: `id`, `exam_id`, `q_num`, `text`, `max_marks`, `model_answer`.
- **Student Submission**: `id`, `exam_id`, `student_name`, `roll_num`, `answer_sheet_url`.
- **Question Mapping Result**: `id`, `submission_id`, `question_id`, `obtained_marks`, `ai_feedback`, `bounding_box_coordinates`.

#### Initialize Prisma Database:
```bash
npm install prisma @prisma/client
npx prisma init
npx prisma db push
```

---

### 2. Document Object Storage (AWS S3 / Supabase Storage)
For uploading and serving heavy PDF question papers and high-resolution scanned/photographed answer booklets (<10MB limit per file).

- **Bucket Structure**:
  - `s3://veda-ai-documents/question-papers/{exam_id}.pdf`
  - `s3://veda-ai-documents/answer-sheets/{student_id}.pdf`

---

### 3. AI OCR & Handwriting Evaluation Microservice (NVIDIA Nemotron v2)
Connect the 3-stage pipeline (Upload -> Extraction -> Mapping):

- **NVIDIA NIM Model**: `meta/llama-3.2-90b-vision-instruct` / `nvidia/llama-3.1-nemotron-70b-instruct`.
- **Endpoint**: `/api/evaluate` for OCR handwriting recognition, question parsing, and bounding box mapping.

---

## 🌐 Production Deployment (Vercel & Docker)

### Option A: Vercel (Recommended for Next.js)

1. Push your code to GitHub / GitLab.
2. Import the project in [Vercel Dashboard](https://vercel.com/new).
3. Set the Environment Variables from `.env.example`.
4. Click **Deploy**.

---

## 📄 License
MIT License. Built for EdTech evaluations and teacher toolkits.
