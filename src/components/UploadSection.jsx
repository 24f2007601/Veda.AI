'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Trash2, ArrowRight, AlertCircle, FileCheck2 } from 'lucide-react';
import TeacherAvatar from './TeacherAvatar';

export default function UploadSection({ onStartMapping }) {
  const [questionPaper, setQuestionPaper] = useState(null);
  const [answerSheet, setAnswerSheet] = useState(null);

  const [dragQP, setDragQP] = useState(false);
  const [dragAS, setDragAS] = useState(false);

  const qpInputRef = useRef(null);
  const asInputRef = useRef(null);

  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (file, type) => {
    setErrorMsg('');
    if (!file) return;

    // Check size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg(`File "${file.name}" exceeds the 10MB size limit.`);
      return;
    }

    const fileData = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type || 'Document',
      raw: file
    };

    if (type === 'QP') {
      setQuestionPaper(fileData);
    } else {
      setAnswerSheet(fileData);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    if (type === 'QP') setDragQP(false);
    if (type === 'AS') setDragAS(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0], type);
    }
  };

  const bothFilesUploaded = Boolean(questionPaper && answerSheet);

  return (
    <div className="flex-1 flex flex-col items-center justify-start py-8 px-4 md:px-8 max-w-5xl mx-auto w-full select-none">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-gray-900 tracking-tight leading-snug">
          Upload{' '}
          <span className="inline-block bg-[#FFF0EB] border border-[#FFDACD] text-[#FF5722] px-4 py-1 rounded-2xl font-extrabold shadow-2xs my-1">
            Question Paper & Answer Sheets
          </span>
        </h1>
        <p className="text-gray-500 font-normal text-base md:text-lg mt-3">
          Upload both files to get started
        </p>
      </div>

      {/* Center 3D Teacher Avatar Illustration */}
      <TeacherAvatar />

      {/* Error Feedback Message */}
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Dual Upload Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-2">
        {/* Card 1: Question Paper Upload */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragQP(true); }}
          onDragLeave={() => setDragQP(false)}
          onDrop={(e) => handleDrop(e, 'QP')}
          onClick={() => !questionPaper && qpInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[190px] ${
            dragQP 
              ? 'border-[#FF5722] bg-orange-50/40 scale-[1.01]' 
              : questionPaper 
                ? 'border-emerald-400 bg-emerald-50/20' 
                : 'border-gray-300 hover:border-[#FF5722] hover:bg-orange-50/20 bg-white/80 cursor-pointer shadow-xs hover:shadow-md'
          }`}
        >
          <input
            type="file"
            ref={qpInputRef}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.docx"
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0], 'QP')}
          />

          {!questionPaper ? (
            <>
              {/* Upload Icon Box */}
              <div className="w-13 h-13 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center mb-3 shadow-2xs group-hover:bg-orange-100 group-hover:text-[#FF5722] transition-colors">
                <Upload className="w-6 h-6 stroke-[2.5]" />
              </div>
              <p className="font-bold text-base text-gray-900">
                Upload <span className="text-[#FF5722]">Question Paper</span>
              </p>
              <p className="text-xs text-gray-400 font-medium mt-1">Max 10MB</p>
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-2 animate-in fade-in">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div className="overflow-hidden max-w-full">
                <p className="font-bold text-sm text-gray-900 truncate max-w-[200px]" title={questionPaper.name}>
                  {questionPaper.name}
                </p>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                  Ready ({questionPaper.size})
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuestionPaper(null);
                }}
                className="mt-2 text-xs font-semibold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove file
              </button>
            </div>
          )}
        </div>

        {/* Card 2: Answer Sheet Upload */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragAS(true); }}
          onDragLeave={() => setDragAS(false)}
          onDrop={(e) => handleDrop(e, 'AS')}
          onClick={() => !answerSheet && asInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[190px] ${
            dragAS 
              ? 'border-[#FF5722] bg-orange-50/40 scale-[1.01]' 
              : answerSheet 
                ? 'border-emerald-400 bg-emerald-50/20' 
                : 'border-gray-300 hover:border-[#FF5722] hover:bg-orange-50/20 bg-white/80 cursor-pointer shadow-xs hover:shadow-md'
          }`}
        >
          <input
            type="file"
            ref={asInputRef}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.docx"
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0], 'AS')}
          />

          {!answerSheet ? (
            <>
              {/* Upload Icon Box */}
              <div className="w-13 h-13 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center mb-3 shadow-2xs group-hover:bg-orange-100 group-hover:text-[#FF5722] transition-colors">
                <Upload className="w-6 h-6 stroke-[2.5]" />
              </div>
              <p className="font-bold text-base text-gray-900">
                Upload <span className="text-[#FF5722]">Answer Sheet</span>
              </p>
              <p className="text-xs text-gray-400 font-medium mt-1">Max 10MB</p>
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-2 animate-in fade-in">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div className="overflow-hidden max-w-full">
                <p className="font-bold text-sm text-gray-900 truncate max-w-[200px]" title={answerSheet.name}>
                  {answerSheet.name}
                </p>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                  Ready ({answerSheet.size})
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAnswerSheet(null);
                }}
                className="mt-2 text-xs font-semibold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove file
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Demo Preset Helper Button */}
      {(!questionPaper || !answerSheet) && (
        <button
          onClick={() => {
            setQuestionPaper({ name: 'Mathematics_Class_10_Term2_QP.pdf', size: '2.40 MB', type: 'application/pdf' });
            setAnswerSheet({ name: 'Student_Roll42_AnswerSheet.pdf', size: '4.85 MB', type: 'application/pdf' });
          }}
          className="mt-4 text-xs font-medium text-[#FF5722] hover:underline cursor-pointer flex items-center gap-1"
        >
          ✨ Load Sample Class 10 Math Exam Files (1-Click Demo)
        </button>
      )}

      {/* Bottom CTA Action Button */}
      <div className="mt-8 flex flex-col items-center">
        <button
          disabled={!bothFilesUploaded}
          onClick={() => bothFilesUploaded && onStartMapping(questionPaper, answerSheet)}
          className={`px-8 py-3.5 rounded-full font-bold text-sm md:text-base flex items-center justify-center gap-2.5 transition-all duration-300 ${
            bothFilesUploaded
              ? 'bg-[#A8ACB4] hover:bg-[#FF5722] text-white shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95 cursor-pointer bg-gradient-to-r from-[#FF5722] to-[#FF7A59]'
              : 'bg-[#A8ACB4] text-white cursor-not-allowed opacity-90'
          }`}
        >
          <span>Start Mapping</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <p className="text-xs text-gray-400 font-medium text-center mt-3">
          Once both files are uploaded, you'll able to map answers with questions
        </p>
      </div>
    </div>
  );
}
