'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Zap, 
  BarChart3, 
  BrainCircuit,
  Sliders,
  ArrowRight,
  Upload,
  BookOpen
} from 'lucide-react';

export default function TeacherToolkitModal({ isOpen, onClose, onSelectTool }) {
  if (!isOpen) return null;

  const tools = [
    {
      id: 'auto-grade',
      title: 'Auto-Grade Exam & Answer Sheets',
      description: 'AI extracts handwritten answers, matches against question keys, and calculates step-wise marks instantly.',
      icon: Zap,
      badge: 'Popular',
      badgeColor: 'bg-orange-100 text-[#FF5722]'
    },
    {
      id: 'question-gen',
      title: 'AI Question Paper Generator',
      description: 'Create customized exam papers by grade, difficulty, and subject topic in accordance with CBSE/ICSE standards.',
      icon: BrainCircuit,
      badge: 'New',
      badgeColor: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'rubric-builder',
      title: 'Dynamic Rubric & Marking Scheme Builder',
      description: 'Generate step-by-step marking rubrics with partial credit rules for complex subjective questions.',
      icon: Sliders,
      badge: 'AI Powered',
      badgeColor: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'plagiarism-check',
      title: 'Handwriting & Similarity Scanner',
      description: 'Detect copied answers and unauthorized similarity across all submitted answer booklets.',
      icon: FileText,
      badge: 'Security',
      badgeColor: 'bg-emerald-100 text-emerald-600'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-slate-900 text-white p-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF5722] text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                AI Teacher's Toolkit
              </h2>
              <p className="text-xs text-gray-300 font-medium mt-0.5">
                Intelligent evaluation & assessment tools tailored for educators
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Tools Grid */}
        <div className="p-6 bg-gray-50/50 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-3.5">
            {tools.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.id);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-[#FF5722] hover:shadow-md transition-all duration-200 cursor-pointer group flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-gray-100 text-gray-700 group-hover:bg-orange-50 group-hover:text-[#FF5722] transition-colors shrink-0">
                    <ToolIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#FF5722] transition-colors">
                        {tool.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-normal mt-1 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <div className="self-center p-2 text-gray-300 group-hover:text-[#FF5722] group-hover:translate-x-1 transition-all shrink-0">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between px-6 text-xs text-gray-500">
          <span className="flex items-center gap-1.5 font-medium">
            <BookOpen className="w-4 h-4 text-[#FF5722]" /> Powered by Veda AI Evaluation Engine v3.4
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
