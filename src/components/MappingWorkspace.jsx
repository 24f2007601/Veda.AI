'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Minus, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Maximize2,
  Minimize2,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function MappingWorkspace({ apiData, onBack }) {
  const [expandedAll, setExpandedAll] = useState(false);
  const [activeQId, setActiveQId] = useState(2); // Q2 expanded by default matching Screenshot 3
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullQuestionsView, setFullQuestionsView] = useState(false);

  const defaultQuestions = [
    { id: 1, qNum: '1', text: 'Which blood vessel carries blood away from the heart?', obtained: 2, total: 2, status: 'full', feedback: 'Correct! Artery / Aorta correctly identified.' },
    { id: 2, qNum: '2', text: 'Which of the following organelles is primarily involved in photosynthesis?', obtained: 2, total: 2, status: 'full', feedback: 'Excellent work! You correctly identified the chloroplast as the organelle responsible for photosynthesis. Keep it up!' },
    { id: 3, qNum: '3', text: 'Explain the role of chloroplasts in photosynthesis, naming the main pigments involved and briefly outlining the two major stages of the process.', obtained: 2, total: 2, status: 'full', feedback: 'Detailed explanation covering Chlorophyll A & B, Light reactions (thylakoids) and Dark reactions (stroma).' },
    { id: 4, qNum: '4', text: 'Describe the flow of blood through the human heart starting from the right atrium and ending at the aorta; include the names of valves crossed.', obtained: 0, total: 2, status: 'zero', feedback: 'Incorrect sequence. Right ventricle and tricuspid/pulmonary valve references were missing in the submission.' },
    { id: 5, qNum: '5', text: 'Draw a labelled diagram of an alveolus showing capillaries and air space (label alveolar sac, capillary, and direction of gas exchange).', obtained: 2, total: 2, status: 'full', feedback: 'Diagram accurately rendered with clear O₂ and CO₂ gas diffusion arrows.' },
    { id: 6, qNum: '6', text: 'Draw a neat labelled diagram of the human digestive system (stomach, small intestine, large intestine, liver, pancreas) and label the site where most absorption occurs.', obtained: 4, total: 5, status: 'partial', feedback: 'Digestion site marked. Pancreas labeling slightly offset.' },
    { id: 7, qNum: '7', text: "Draw and label a nephron (Bowman's capsule, glomerulus, proximal tubule, loop of Henle, distal tubule, collecting duct).", obtained: 5, total: 5, status: 'full', feedback: 'Flawless anatomical drawing of renal nephron and renal corpuscle.' },
    { id: 8, qNum: '8', text: 'Explain the structural differences between palisade mesophyll and spongy mesophyll and state how each structure aids its function in the leaf.', obtained: 3, total: 5, status: 'partial', feedback: 'Air space difference noted. Palisade cell arrangement missing.' },
    { id: 9, qNum: '9', text: 'Describe the process of transpiration in plants in two to three sentences and name two environmental factors that increase its rate.', obtained: 5, total: 5, status: 'full', feedback: 'Stomatal water evaporation and temperature/wind speed factors correctly identified.' },
    { id: 10, qNum: '10', text: 'Explain how the structure of xylem vessels facilitates water transport in plants (mention one structural feature and its role).', obtained: 4, total: 5, status: 'partial', feedback: 'Lignified walls & continuous lumen features correctly identified.' },
    { id: 11, qNum: '11a', text: 'A diagram shows two potted plants — Plant A in bright light with broad green leaves, Plant B kept in dim light with pale, elongated leaves.', obtained: 2, total: 2, status: 'full', feedback: 'Etiolation phenomenon identified correctly.' },
    { id: 12, qNum: '11b', text: 'Suggest one practical measure to help Plant B recover.', obtained: 1, total: 3, status: 'partial', feedback: 'Partial credit awarded for sunlight exposure recommendation.' },
    { id: 13, qNum: '12', text: 'A resting person has tidal volume (air per breath) of 0.5 L and breathes 12 times per minute.', obtained: 4, total: 5, status: 'partial', feedback: 'Minute volume calculated accurately as 6.0 L/min.' },
    { id: 14, qNum: '13', text: 'If dead space is 0.15 L per breath, calculate the alveolar ventilation per minute. Show working.', obtained: 4, total: 5, status: 'partial', feedback: 'Working steps verified: (0.5 - 0.15) * 12 = 4.2 L/min.' }
  ];

  const [questions, setQuestions] = useState(defaultQuestions);

  useEffect(() => {
    if (apiData && apiData.questions && apiData.questions.length > 0) {
      setQuestions(apiData.questions);
    }
  }, [apiData]);

  const toggleQuestion = (id) => {
    setActiveQId(activeQId === id ? null : id);
  };

  return (
    <div className="flex-1 flex bg-[#F8FAFC] overflow-hidden select-none animate-in fade-in duration-300">
      {/* Extracted Questions Column (50% or 100% full width when toggled) */}
      <div 
        className={`${
          fullQuestionsView ? 'w-full' : 'w-1/2'
        } flex flex-col border-r border-gray-200/80 bg-[#F3F4F6]/60 overflow-hidden transition-all duration-300`}
      >
        {/* Extracted Questions Header Bar matching Screenshot 3 */}
        <div className="p-4 px-6 flex items-center justify-between shrink-0 bg-white border-b border-gray-200/80 shadow-2xs">
          <div className="flex items-center gap-3">
            <h2 className="font-extrabold text-sm md:text-base text-gray-900 tracking-tight">
              Extracted Questions <span className="text-gray-400 font-medium text-xs">(from question paper)</span>
            </h2>
            <span className="text-[11px] font-bold bg-orange-100 text-[#FF5722] px-2.5 py-0.5 rounded-full">
              {questions.length} Questions Extracted
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Expand / Collapse All Button */}
            <button
              onClick={() => setExpandedAll(!expandedAll)}
              className="px-3.5 py-1.5 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs rounded-full border border-gray-300 shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{expandedAll ? 'Collapse All' : 'Expand All'}</span>
            </button>

            {/* Toggle Full Screen Questions View */}
            <button
              onClick={() => setFullQuestionsView(!fullQuestionsView)}
              title={fullQuestionsView ? "Split view with Answer Sheet" : "Full width Questions view"}
              className="p-1.5 bg-white hover:bg-gray-100 text-gray-600 rounded-full border border-gray-300 shadow-2xs transition-colors cursor-pointer"
            >
              {fullQuestionsView ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Scrollable Questions Cards List */}
        <div className="flex-1 overflow-y-auto p-4 px-6 flex flex-col gap-3 custom-scrollbar">
          {questions.map((q) => {
            const isExpanded = expandedAll || activeQId === q.id;
            const isQ2 = q.id === 2;

            return (
              <div
                key={q.id}
                onClick={() => toggleQuestion(q.id)}
                className={`rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden ${
                  isExpanded || isQ2
                    ? 'bg-white border-2 border-[#FF5722] shadow-md ring-2 ring-[#FF5722]/10'
                    : 'bg-white hover:bg-gray-50 border border-gray-200/80 shadow-2xs hover:shadow-xs'
                }`}
              >
                {/* Main Question Header Row */}
                <div className="p-4 px-5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Dark / Orange Circular Badge matching Screenshot 3 */}
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 transition-transform ${
                        isQ2 || isExpanded
                          ? 'bg-[#FF5722] text-white shadow-xs scale-105' 
                          : 'bg-[#334155] text-white'
                      }`}
                    >
                      {q.qNum}
                    </div>

                    {/* Question Text matching Screenshot 3 */}
                    <p className="text-xs md:text-sm font-semibold text-gray-900 leading-snug pt-0.5">
                      {q.text}
                    </p>
                  </div>

                  {/* Score Pill Badge & Expand Chevron */}
                  <div className="flex items-center gap-2.5 shrink-0 pt-0.5">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full shadow-2xs ${
                      q.status === 'full' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : q.status === 'zero' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-[#FFF0EB] text-[#FF5722]'
                    }`}>
                      {q.obtained}/{q.total}
                    </span>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* AI Feedback Accordion Content Drawer (Expanded State) */}
                {(isExpanded || isQ2) && (
                  <div className="px-5 pb-4 pt-0 animate-in fade-in duration-150">
                    <div className="bg-[#FFF8F5] border border-[#FFDACD] p-3.5 px-4 rounded-xl flex flex-col gap-1.5 shadow-2xs">
                      <span className="font-extrabold text-xs text-gray-900 tracking-tight flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" /> AI Feedback
                      </span>
                      <p className="text-xs text-gray-700 font-medium leading-relaxed">
                        {q.feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Scanned Handwritten Answer Sheet Document Viewer (Hidden if full questions view) */}
      {!fullQuestionsView && (
        <div className="w-1/2 flex flex-col bg-gray-900 overflow-hidden">
          {/* Dark Top Toolbar */}
          <div className="bg-[#18181B] text-white px-4 py-2.5 flex items-center justify-between shrink-0 border-b border-zinc-800 shadow-md">
            <span className="font-bold text-sm text-gray-100 tracking-tight">
              Answer Sheet
            </span>

            {/* Controls: Zoom & Page Navigation */}
            <div className="flex items-center gap-3">
              {/* Zoom controls */}
              <div className="bg-[#27272A] px-2.5 py-1 rounded-lg flex items-center gap-2 text-xs font-semibold text-gray-300 shadow-2xs">
                <button 
                  onClick={() => setZoomLevel(Math.max(75, zoomLevel - 15))}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-9 text-center font-mono">{zoomLevel}%</span>
                <button 
                  onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Page selector */}
              <div className="bg-[#27272A] px-2.5 py-1 rounded-lg flex items-center gap-2 text-xs font-semibold text-gray-300 shadow-2xs">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="font-medium">Page {currentPage} of 4</span>
                <button 
                  onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Scanned Handwritten Ruled Document View */}
          <div className="flex-1 overflow-y-auto p-4 flex justify-center bg-[#202023] custom-scrollbar">
            <div 
              className="w-full max-w-xl bg-[#FAF8F5] rounded-xl shadow-2xl p-6 md:p-8 flex flex-col gap-6 relative transition-all duration-200 border border-amber-900/10 min-h-[750px]"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              {/* Red Margin Line on Ruled Paper */}
              <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-red-300/60 pointer-events-none" />

              {/* Handwritten Question 1 Section */}
              <div className="pl-6 flex flex-col gap-3">
                <span className="font-serif font-bold text-lg text-indigo-900 tracking-wide">Q1.</span>
                
                <div className="font-serif text-slate-800 text-sm md:text-base leading-relaxed pl-2">
                  Photosynthesis is the process used by green plants and some other organisms to convert light energy into chemical energy.
                </div>

                {/* Chemical Equation Box */}
                <div className="my-2 p-2.5 bg-white/80 border border-slate-300 rounded-lg text-center font-serif text-slate-900 text-sm tracking-widest shadow-2xs">
                  6CO₂ + 6H₂O &nbsp;&nbsp;
                  <span className="text-xs text-slate-500 font-sans border-b border-slate-400 px-1">Light / Chlorophyll</span>
                  &nbsp;&nbsp;&rarr;&nbsp;&nbsp; C₆H₁₂O₆ + 6O₂
                </div>

                {/* Plant Photosynthesis Diagram SVG */}
                <div className="my-2 flex justify-center">
                  <svg viewBox="0 0 240 140" className="w-56 h-32 stroke-slate-800 fill-none" strokeWidth="1.5">
                    {/* Sun */}
                    <circle cx="120" cy="20" r="12" strokeDasharray="2 2" />
                    <path d="M120 4 L120 0 M120 36 L120 40 M104 20 L100 20 M140 20 L136 20 M108 8 L104 4 M132 32 L136 36" />
                    <text x="140" y="24" className="font-serif text-[11px] fill-slate-700 stroke-none">Sunlight</text>

                    {/* Plant Stem & Leaf */}
                    <path d="M120 40 L120 110 M120 70 C100 50 70 70 120 90 M120 80 C140 60 170 80 120 100" />
                    <path d="M120 110 L100 135 M120 110 L120 140 M120 110 L140 135" strokeDasharray="3 2" />

                    {/* Gas Labels */}
                    <text x="35" y="70" className="font-serif text-[11px] fill-slate-700 stroke-none">Carbon</text>
                    <text x="35" y="82" className="font-serif text-[11px] fill-slate-700 stroke-none">dioxide</text>
                    <path d="M75 75 L100 75" />

                    <text x="165" y="75" className="font-serif text-[11px] fill-slate-700 stroke-none">Oxygen</text>
                    <path d="M140 75 L160 75" />

                    <text x="145" y="125" className="font-serif text-[11px] fill-slate-700 stroke-none">Water</text>
                  </svg>
                </div>
              </div>

              {/* LIVE AI BOUNDING BOX OVERLAY FOR Q2 */}
              <div className="relative pl-6">
                {/* Green Pill Badge */}
                <div className="inline-block bg-emerald-600 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-md shadow-sm mb-1 z-10 relative">
                  Q2
                </div>

                {/* Highlighted Bounding Box Container */}
                <div className="border-2 border-emerald-500 bg-emerald-500/10 rounded-xl p-3.5 flex flex-col gap-2 relative shadow-xs">
                  <span className="font-serif font-bold text-lg text-indigo-900">Q2.</span>
                  <p className="font-serif text-slate-900 text-sm md:text-base leading-relaxed">
                    The process mainly occurs in the chloroplast of the plant cell. It has two main stages:
                  </p>
                  <ol className="list-decimal list-inside font-serif text-slate-900 text-sm md:text-base pl-2 flex flex-col gap-1">
                    <li><strong>Light reaction</strong> – Captures light energy.</li>
                    <li><strong>Dark reaction</strong> – Uses energy to make glucose.</li>
                  </ol>
                </div>
              </div>

              {/* Second Page Fragment */}
              <div className="border-t-2 border-dashed border-slate-300 pt-6 mt-4 opacity-70">
                <div className="pl-6 flex flex-col gap-2">
                  <span className="font-serif font-bold text-lg text-indigo-900">Q3.</span>
                  <p className="font-serif text-slate-800 text-sm leading-relaxed">
                    Chloroplasts contain chlorophyll pigments that absorb light wavelengths during the light-dependent reactions...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
