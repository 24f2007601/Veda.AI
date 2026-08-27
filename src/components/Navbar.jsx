'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ClipboardCheck, 
  HelpCircle, 
  Bell, 
  Sparkles, 
  ChevronDown,
  User,
  LogOut,
  Sliders,
  Check
} from 'lucide-react';

export default function Navbar({ onOpenToolkit }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <header className="w-full h-16 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-6 flex items-center justify-between shrink-0 z-20 shadow-2xs">
      {/* Left Breadcrumb Section */}
      <div className="flex items-center gap-4">
        {/* Back Navigation Button */}
        <button 
          aria-label="Go back"
          className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Page Icon & Title */}
        <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
          <ClipboardCheck className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700 font-semibold text-base">Exams</span>
        </div>
      </div>

      {/* Right User & Actions Bar */}
      <div className="flex items-center gap-3">
        {/* Help Center Button */}
        <button 
          title="Help & Support"
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            title="Notifications"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setUnreadCount(0);
            }}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
                <span className="font-bold text-sm text-gray-900">Notifications</span>
                <span className="text-xs text-[#FF5722] font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-gray-50 flex gap-3 items-start cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Mathematics Exam Auto-Graded</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Class X-A exam sheets evaluated with 98.4% accuracy.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">5 mins ago</span>
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-50 flex gap-3 items-start cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">AI Teacher's Toolkit Updated</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">New Rubric Generator model enabled for DPS Bokaro.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Sparkles Shortcut */}
        <button 
          onClick={onOpenToolkit}
          title="Open AI Toolkit"
          className="p-2 text-gray-600 hover:text-[#FF5722] hover:bg-orange-50 rounded-full transition-all cursor-pointer group"
        >
          <Sparkles className="w-5 h-5 text-gray-700 group-hover:text-[#FF5722] group-hover:rotate-12 transition-transform" />
        </button>

        {/* User Profile Capsule */}
        <div className="relative ml-1">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 pr-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200/60"
          >
            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 shadow-xs">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs overflow-hidden">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="36" height="36" fill="#1E293B"/>
                  <circle cx="18" cy="13" r="7" fill="#FDBA74"/>
                  <path d="M6 32C6 24.268 11.373 18 18 18C24.627 18 30 24.268 30 32H6Z" fill="#0F172A"/>
                </svg>
              </div>
            </div>
            <span className="font-semibold text-sm text-gray-900">Madhur Rastogi</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-bold text-sm text-gray-900">Madhur Rastogi</p>
                <p className="text-xs text-gray-500">Senior Evaluator • DPS Bokaro</p>
              </div>
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5">
                  <User className="w-4 h-4 text-gray-400" /> Account Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5">
                  <Sliders className="w-4 h-4 text-gray-400" /> Evaluation Preferences
                </button>
                <div className="border-t border-gray-100 my-1" />
                <button className="w-full px-4 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5">
                  <LogOut className="w-4 h-4 text-red-500" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
