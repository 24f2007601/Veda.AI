import "./globals.css";

export const metadata = {
  title: "VedaAI - AI Teacher's Toolkit & Exam Grading",
  description: "Upload question papers and answer sheets to auto-evaluate, map questions, and manage classroom assessments with VedaAI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
