'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import UploadSection from '@/components/UploadSection';
import ExtractionLoadingScreen from '@/components/ExtractionLoadingScreen';
import MappingWorkspace from '@/components/MappingWorkspace';
import TeacherToolkitModal from '@/components/TeacherToolkitModal';
import AuthModal from '@/components/AuthModal';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('exams');
  const [viewMode, setViewMode] = useState('upload'); // 'upload' | 'extracting' | 'mapping'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Modals
  const [toolkitOpen, setToolkitOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Authenticated Educator State
  const [currentUser, setCurrentUser] = useState({
    name: 'Madhur Rastogi',
    email: 'madhur.rastogi@dpsbokaro.edu.in',
    school: 'Delhi Public School, Bokaro Steel City',
    role: 'Senior Evaluator'
  });

  const [uploadedQP, setUploadedQP] = useState(null);
  const [uploadedAS, setUploadedAS] = useState(null);
  const [evaluationApiData, setEvaluationApiData] = useState(null);

  // Triggered when user clicks "Start Mapping" on Upload section
  const handleStartMapping = (qpFile, asFile) => {
    setUploadedQP(qpFile);
    setUploadedAS(asFile);
    // Switch to Extraction Loading screen with NVIDIA Nemotron OCR
    setViewMode('extracting');
    // Collapse sidebar to icon-only mode as shown in screenshot 2 & 3
    setSidebarCollapsed(true);
  };

  // Triggered when Extraction completes
  const handleExtractionComplete = (aiResultData) => {
    if (aiResultData) {
      setEvaluationApiData(aiResultData);
    }
    setViewMode('mapping');
  };

  return (
    <div className="h-screen w-screen bg-[#F8FAFC] text-[#0F172A] flex flex-row overflow-hidden font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar 
        onOpenToolkit={() => setToolkitOpen(true)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'exams') setViewMode('upload');
        }}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentUser={currentUser}
      />

      {/* Main Container Column */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar 
          onOpenToolkit={() => setToolkitOpen(true)} 
          currentUser={currentUser}
          onOpenAuthModal={() => setAuthModalOpen(true)}
          onLogout={() => setCurrentUser(null)}
        />

        {/* Workspace Views Flow */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          {activeTab === 'exams' ? (
            viewMode === 'upload' ? (
              <UploadSection onStartMapping={handleStartMapping} />
            ) : viewMode === 'extracting' ? (
              <ExtractionLoadingScreen 
                qpFile={uploadedQP}
                asFile={uploadedAS}
                onCompleteExtraction={handleExtractionComplete} 
              />
            ) : (
              <MappingWorkspace 
                apiData={evaluationApiData}
                onBack={() => setViewMode('upload')} 
              />
            )
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center my-auto">
              <div className="w-16 h-16 rounded-3xl bg-orange-100 text-[#FF5722] flex items-center justify-center shadow-lg shadow-orange-500/20 mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 capitalize">
                {activeTab} Workspace
              </h2>
              <p className="text-sm text-gray-500 max-w-md mt-2">
                Viewing {activeTab} details for {currentUser?.school || 'Delhi Public School, Bokaro Steel City'}. Switch back to <strong>Exams</strong> to upload and evaluate question papers.
              </p>
              <button
                onClick={() => {
                  setActiveTab('exams');
                  setViewMode('upload');
                }}
                className="mt-6 px-6 py-2.5 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs rounded-full shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Go to Exams & Uploads</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Teacher's Toolkit Modal Drawer */}
      <TeacherToolkitModal 
        isOpen={toolkitOpen} 
        onClose={() => setToolkitOpen(false)}
        onSelectTool={(toolId) => {
          if (toolId === 'auto-grade') {
            setActiveTab('exams');
            setViewMode('upload');
          }
        }}
      />

      {/* Educator Auth (Login & Register) Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    </div>
  );
}
