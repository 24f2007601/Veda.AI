'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function ExtractionLoadingScreen({ qpFile, asFile, onCompleteExtraction }) {
  const [progress, setProgress] = useState(15);
  const [currentStage, setCurrentStage] = useState('Extracting Question Paper & Answer Sheets with NVIDIA Nemotron v2...');
  const [evalResult, setEvalResult] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function runLiveEvaluation() {
      try {
        // Stage 1: Document OCR Pipeline initialization
        setTimeout(() => isMounted && setProgress(35), 800);

        // Prepare FormData
        const formData = new FormData();
        if (qpFile?.raw) formData.append('questionPaper', qpFile.raw);
        if (asFile?.raw) formData.append('answerSheet', asFile.raw);

        // Call Next.js API Route /api/evaluate
        const res = await fetch('/api/evaluate', {
          method: 'POST',
          body: formData
        });

        const json = await res.json();
        if (isMounted && json.success) {
          setEvalResult(json.data);
          setProgress(85);
          setCurrentStage('NVIDIA Nemotron v2 OCR completed! Formatting questions...');
        }
      } catch (err) {
        console.error('Extraction API error:', err);
      } finally {
        if (isMounted) {
          setTimeout(() => {
            setProgress(100);
            setCurrentStage('Extraction Complete! Opening Mapping View...');
          }, 2400);

          setTimeout(() => {
            onCompleteExtraction(evalResult);
          }, 3200);
        }
      }
    }

    runLiveEvaluation();

    return () => {
      isMounted = false;
    };
  }, [qpFile, asFile, onCompleteExtraction]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F8FAFC] select-none relative overflow-hidden animate-in fade-in duration-300">
      {/* Outer Workspace Frame */}
      <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center p-8 bg-white/70 rounded-3xl border border-gray-200/60 shadow-2xs relative">
        
        {/* Dashed Center Card Container Box matching Screenshot 2 */}
        <div className="border-2 border-dashed border-gray-300 hover:border-[#FF5722] p-8 rounded-2xl bg-white flex flex-col items-center justify-center text-center shadow-sm max-w-xs w-full animate-in zoom-in-95 duration-200 transition-colors">
          
          {/* Glowing Orange 4-Point AI Sparkles Logo */}
          <div className="relative mb-5 flex items-center justify-center">
            {/* Background Orange Glow Pulse */}
            <div className="absolute inset-0 bg-[#FF5722]/20 rounded-full blur-xl animate-ping opacity-60" />
            
            <svg 
              viewBox="0 0 100 100" 
              className="w-20 h-20 text-[#FF5722] fill-current animate-pulse duration-1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Primary 4-Point Sparkle Star */}
              <path d="M50 10 C50 35 65 50 90 50 C65 50 50 65 50 90 C50 65 35 50 10 50 C35 50 50 35 50 10 Z" />
              
              {/* Secondary Small Top-Left Sparkle */}
              <path 
                d="M25 20 C25 28 32 35 40 35 C32 35 25 42 25 50 C25 42 18 35 10 35 C18 35 25 28 25 20 Z" 
                fill="#FF7A59"
                className="animate-bounce"
              />

              {/* Secondary Small Bottom-Right Sparkle */}
              <path 
                d="M75 60 C75 66 80 72 86 72 C80 72 75 78 75 84 C75 78 69 72 63 72 C69 72 75 66 75 60 Z" 
                fill="#FF7A59"
              />
            </svg>
          </div>

          {/* Extracting Title */}
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center justify-center gap-0.5">
            <span>Extracting</span>
            <span className="animate-pulse text-[#FF5722]">...</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs text-gray-400 font-semibold mt-1">
            This may take a while
          </p>
        </div>

        {/* Live Extraction Progress Indicator */}
        <div className="mt-8 flex flex-col items-center w-full max-w-sm">
          <div className="flex items-center justify-between w-full text-xs font-bold text-gray-600 mb-2">
            <span className="flex items-center gap-1.5 text-[#FF5722]">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> NVIDIA Nemotron v2 OCR Pipeline
            </span>
            <span>{progress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200/60 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#FF5722] to-[#FF7A59] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Current Action Subtext */}
          <p className="text-xs text-gray-500 font-medium text-center mt-3 animate-pulse">
            {currentStage}
          </p>

          {/* Skip Action */}
          <button
            onClick={() => onCompleteExtraction(evalResult)}
            className="mt-4 text-[11px] font-bold text-gray-400 hover:text-[#FF5722] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Skip preview & view results</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
