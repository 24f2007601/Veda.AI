/**
 * NVIDIA Nemotron v2 OCR Helper Client
 * Communicates with NVIDIA NIM (Inference Microservices) API endpoints
 */

export async function callNemotronOCR({ questionPaperBase64, answerSheetBase64 }) {
  const apiKey = process.env.NVIDIA_API_KEY;
  const baseUrl = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';

  // If no API key configured, return null to trigger graceful local fallback
  if (!apiKey || apiKey === 'nvapi-your_key_from_build.nvidia.com') {
    console.log('[NVIDIA Nemotron v2] No NVIDIA_API_KEY found in environment. Using fallback evaluation engine.');
    return null;
  }

  const promptText = `
You are an expert AI Exam Evaluator and Document OCR Processor for VedaAI.
Analyze the provided Question Paper document and Student Answer Sheet document images.

Perform the following tasks:
1. Extract all questions from the question paper, noting question numbers, text, and maximum marks.
2. OCR and transcribe the student's handwritten answers from the answer sheet.
3. Compare student answers against standard model solutions.
4. Award obtained marks for each question and provide constructive AI feedback explaining the grading rationale.

Return ONLY a valid JSON object matching the following structure:
{
  "questions": [
    {
      "id": 1,
      "qNum": "1",
      "text": "Question text here",
      "obtained": 2,
      "total": 2,
      "status": "full", // "full" | "partial" | "zero"
      "feedback": "AI feedback rationale"
    }
  ],
  "handwrittenAnswers": [
    {
      "qNum": "Q1",
      "text": "Transcribed student handwriting..."
    }
  ]
}
`;

  try {
    const payload = {
      model: "meta/llama-3.2-90b-vision-instruct", // High-performing vision model on NVIDIA NIM
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: promptText },
            ...(questionPaperBase64 ? [{ type: "image_url", image_url: { url: `data:image/jpeg;base64,${questionPaperBase64}` } }] : []),
            ...(answerSheetBase64 ? [{ type: "image_url", image_url: { url: `data:image/jpeg;base64,${answerSheetBase64}` } }] : [])
          ]
        }
      ],
      temperature: 0.2,
      max_tokens: 2048,
      response_format: { type: "json_object" }
    };

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[NVIDIA Nemotron API Error]:', response.status, errText);
      return null;
    }

    const data = await response.json();
    const contentText = data.choices[0]?.message?.content;
    if (!contentText) return null;

    return JSON.parse(contentText);
  } catch (error) {
    console.error('[NVIDIA Nemotron Exception]:', error);
    return null;
  }
}
