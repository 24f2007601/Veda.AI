'use client';

import React from 'react';
import { 
  LayoutGrid, 
  Users, 
  FileText, 
  ClipboardCheck, 
  Clock, 
  Settings, 
  Sparkles,
  PanelLeftClose,
  ChevronDown,
  ChevronsRight,
  ChevronsLeft
} from 'lucide-react';
import DPSLogo from './DPSLogo';

export default function Sidebar({ 
  onOpenToolkit, 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  onToggleCollapse 
}) {
  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutGrid },
    { id: 'classroom', label: 'My Classroom', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'exams', label: 'Exams', icon: ClipboardCheck },
    { id: 'library', label: 'My Library', icon: Clock },
  ];

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-18 px-2 py-4' : 'w-64 p-4'
      } h-full bg-white border-r border-gray-200/80 flex flex-col justify-between shrink-0 select-none shadow-xs z-30 transition-all duration-300 overflow-y-auto custom-scrollbar`}
    >
      <div className="flex flex-col gap-6 items-center">
        {/* Brand Header */}
        <div className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-2'} pt-1 shrink-0`}>
          <div 
            onClick={onToggleCollapse} 
            className="flex items-center gap-3 cursor-pointer group"
            title="VedaAI Dashboard"
          >
            {/* Dark VedaAI Icon */}
            <div className="w-9 h-9 bg-zinc-950 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform shrink-0">
              V
            </div>
            {!isCollapsed && (
              <span className="font-extrabold text-2xl tracking-tight text-gray-900 group-hover:text-[#FF5722] transition-colors">
                Veda<span className="text-[#FF5722]">AI</span>
              </span>
            )}
          </div>
          
          {/* Collapse sidebar button */}
          {!isCollapsed && (
            <button 
              onClick={onToggleCollapse}
              aria-label="Collapse sidebar"
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* AI Teacher's Toolkit Pill / Circle Button */}
        <div className="w-full flex justify-center shrink-0 px-1">
          {isCollapsed ? (
            <button
              onClick={onOpenToolkit}
              title="AI Teacher's Toolkit"
              className="w-10 h-10 bg-[#1A1A1E] hover:bg-black text-white font-semibold rounded-full border border-[#FF5722]/50 shadow-[0_0_12px_rgba(255,87,34,0.3)] hover:shadow-[0_0_18px_rgba(255,87,34,0.5)] transition-all flex items-center justify-center group cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#FF7A59] group-hover:rotate-12 group-hover:scale-110 transition-transform" />
            </button>
          ) : (
            <button
              onClick={onOpenToolkit}
              className="w-full bg-[#1A1A1E] hover:bg-black text-white font-semibold text-sm py-3 px-4 rounded-full border border-[#FF5722]/50 shadow-[0_0_15px_rgba(255,87,34,0.25)] hover:shadow-[0_0_22px_rgba(255,87,34,0.45)] transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-[#FF7A59] group-hover:rotate-12 group-hover:scale-110 transition-transform" />
              <span>AI Teacher's Toolkit</span>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="w-full flex flex-col gap-2 pt-2 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                className={`flex items-center transition-all cursor-pointer ${
                  isCollapsed
                    ? `w-11 h-11 justify-center rounded-xl ${
                        isActive
                          ? 'bg-[#F3F4F6] text-gray-900 font-semibold shadow-xs border border-gray-200/60 ring-2 ring-[#FF5722]/20'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    : `w-full gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm ${
                        isActive
                          ? 'bg-[#F3F4F6] text-gray-900 font-semibold shadow-xs border border-gray-200/50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Section: Settings & School Card */}
      <div className="w-full flex flex-col gap-3 pt-4 mt-6 border-t border-gray-100 shrink-0 items-center">
        {/* Settings button */}
        <button 
          onClick={() => setActiveTab('settings')}
          title="Settings"
          className={`flex items-center transition-colors cursor-pointer ${
            isCollapsed 
              ? `w-10 h-10 justify-center rounded-xl ${activeTab === 'settings' ? 'bg-[#F3F4F6] text-gray-900' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`
              : `w-full gap-3.5 px-4 py-2 rounded-xl text-sm font-medium ${activeTab === 'settings' ? 'bg-[#F3F4F6] text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`
          }`}
        >
          <Settings className="w-4 h-4 text-gray-400 shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </button>

        {/* School Organization Card / Collapsed Emblem */}
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            <DPSLogo className="w-9 h-9 cursor-pointer" />
            <button
              onClick={onToggleCollapse}
              title="Expand Sidebar"
              className="p-1.5 text-gray-400 hover:text-[#FF5722] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-2xl p-3 flex items-center justify-between hover:bg-gray-100/70 transition-all cursor-pointer group shadow-2xs w-full">
            <div className="flex items-center gap-3 overflow-hidden">
              <DPSLogo className="w-9 h-9" />
              <div className="flex flex-col text-left overflow-hidden">
                <span className="font-bold text-xs text-gray-900 truncate group-hover:text-[#FF5722] transition-colors">
                  Delhi Public School
                </span>
                <span className="text-[11px] text-gray-500 font-medium truncate">
                  Bokaro Steel City
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-gray-600 transition-colors" />
          </div>
        )}
      </div>
    </aside>
  );
}
