# VedaAI - AI Teacher's Toolkit & Exam Evaluation Platform

> A modern, high-contrast EdTech dashboard for educators to upload Question Papers and Answer Sheets, auto-evaluate handwriting, and map marks line-by-line with AI precision.

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
- **CORS Configuration**:
  ```json
  [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST"],
      "AllowedOrigins": ["http://localhost:3000", "https://your-domain.vercel.app"],
      "ExposeHeaders": []
    }
  ]
  ```

---

### 3. AI OCR & Handwriting Evaluation Microservice
Connect the 3-stage pipeline (Upload -> Extraction -> Mapping):

- **OCR Engine**: Tesseract OCR, AWS Textract, or PaddleOCR to convert handwritten student answers to structured text.
- **LLM Evaluator**: OpenAI GPT-4o / Claude 3.5 Sonnet for step-marking, rubric matching, and generating constructive feedback.

#### Next.js Server Action API Route (`src/app/api/extract/route.js`):
```js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const data = await req.formData();
  const qpFile = data.get('questionPaper');
  const asFile = data.get('answerSheet');

  // 1. Upload files to S3 Object Storage
  // 2. Pass document buffer to AI OCR Pipeline
  // 3. Store extracted questions and bounding box coordinates in DB
  
  return NextResponse.json({
    success: true,
    examId: 'exam_101',
    extractedCount: 14,
  });
}
```

---

## 🌐 Production Deployment

### Option A: Vercel (Recommended for Next.js)

1. Push your code to GitHub / GitLab / Bitbucket.
2. Import the project in [Vercel Dashboard](https://vercel.com/new).
3. Set the Environment Variables from `.env.example`.
4. Click **Deploy**.

### Option B: Docker Container Deployment

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run Docker image:
```bash
docker build -t veda-ai-dashboard .
docker run -p 3000:3000 veda-ai-dashboard
```

---

## 📄 License
MIT License. Built for EdTech evaluations and teacher toolkits.
