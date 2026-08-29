'use client';

import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  School, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import DPSLogo from './DPSLogo';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('Delhi Public School, Bokaro');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Pre-fill Demo Educator Credentials
  const fillDemoCredentials = () => {
    setEmail('madhur.rastogi@dpsbokaro.edu.in');
    setPassword('teacher2026');
    setName('Madhur Rastogi');
    setSchool('Delhi Public School, Bokaro Steel City');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Successful mock login/signup
      onLoginSuccess({
        name: isSignUp ? (name || 'New Educator') : (name || 'Madhur Rastogi'),
        email,
        school: school || 'Delhi Public School, Bokaro Steel City',
        role: 'Senior Evaluator'
      });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-slate-900 text-white p-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF5722] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/30">
              V
            </div>
            <div>
              <h2 className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                Veda<span className="text-[#FF5722]">AI</span> Educator Portal
              </h2>
              <p className="text-xs text-gray-300 font-medium mt-0.5">
                {isSignUp ? 'Create a school evaluation account' : 'Sign in to your teacher dashboard'}
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 bg-gray-50/50">
          
          {/* Quick Demo Credentials Action */}
          <div className="p-3 bg-orange-50/70 border border-orange-200/80 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF5722]" />
              <span className="text-xs font-bold text-gray-800">Quick Demo Testing</span>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="px-3 py-1 bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Autofill Demo Login
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl animate-in fade-in">
              {error}
            </div>
          )}

          {/* Additional fields for Sign Up */}
          {isSignUp && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Madhur Rastogi"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">School / Institution</label>
                <div className="relative">
                  <School className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="e.g. Delhi Public School, Bokaro"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/20 transition-all"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">School Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@school.edu.in"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/20 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isSignUp ? 'Create Educator Account' : 'Sign In to Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Toggle between Sign In & Sign Up */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-semibold text-gray-600 hover:text-[#FF5722] transition-colors cursor-pointer"
            >
              {isSignUp 
                ? 'Already have an account? Sign In' 
                : "Don't have a teacher account? Register school"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
