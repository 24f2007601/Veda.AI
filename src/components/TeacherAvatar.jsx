'use client';

export default function TeacherAvatar() {
  return (
    <div className="relative flex items-center justify-center my-6 py-2">
      {/* Outer Halo Background Ring */}
      <div className="relative w-44 h-44 rounded-full bg-gradient-to-b from-[#FFEBE4] via-[#FFF3EF] to-[#FFD8CC] p-3 flex items-center justify-center shadow-inner border border-[#FFDACD]/60">
        
        {/* Pulsing Backlight Glow */}
        <div className="absolute inset-0 rounded-full bg-[#FF5722]/10 blur-xl animate-pulse" />

        {/* Floating Orb Badges around circle */}
        {/* Orb 1: Top Left - Sparkles */}
        <div className="absolute -top-1 left-4 w-7 h-7 rounded-full bg-[#FF5722] text-white flex items-center justify-center shadow-md animate-float border-2 border-white">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>

        {/* Orb 2: Top Right - Document */}
        <div className="absolute top-2 -right-1 w-7 h-7 rounded-full bg-[#FF5722] text-white flex items-center justify-center shadow-md animate-float-reverse border-2 border-white">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* Orb 3: Bottom Left - Checkmark/Grade */}
        <div className="absolute bottom-2 -left-1 w-7 h-7 rounded-full bg-[#FF5722] text-white flex items-center justify-center shadow-md animate-float-reverse border-2 border-white">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Orb 4: Bottom Right - Pen/Edit */}
        <div className="absolute -bottom-1 right-4 w-7 h-7 rounded-full bg-[#FF5722] text-white flex items-center justify-center shadow-md animate-float border-2 border-white">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>

        {/* 3D Teacher Avatar SVG Graphic */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gradient-to-b from-[#2B2E4A] to-[#1F2238] border-2 border-white/80 shadow-lg flex items-end justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1C1917" />
                <stop offset="100%" stopColor="#292524" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
              <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F1F5F9" />
              </linearGradient>
            </defs>

            {/* Hair back */}
            <path d="M50 80 C40 120 45 160 55 180 L145 180 C155 160 160 120 150 80 Z" fill="url(#hairGrad)" />

            {/* Neck */}
            <rect x="90" y="110" width="20" height="25" fill="url(#skinGrad)" rx="5" />

            {/* Shirt / Top */}
            <path d="M70 135 L130 135 L125 185 L75 185 Z" fill="url(#shirtGrad)" />

            {/* Blazer / Jacket */}
            <path d="M45 140 C55 130 75 135 85 150 L85 200 L40 200 Z" fill="url(#blazerGrad)" />
            <path d="M155 140 C145 130 125 135 115 150 L115 200 L160 200 Z" fill="url(#blazerGrad)" />

            {/* Face */}
            <ellipse cx="100" cy="85" rx="30" ry="36" fill="url(#skinGrad)" />

            {/* Hair Front / Fringe */}
            <path d="M70 70 C70 45 130 45 130 70 C120 58 80 58 70 70 Z" fill="url(#hairGrad)" />

            {/* Glasses */}
            <rect x="75" y="75" width="20" height="15" rx="4" fill="none" stroke="#0F172A" strokeWidth="3" />
            <rect x="105" y="75" width="20" height="15" rx="4" fill="none" stroke="#0F172A" strokeWidth="3" />
            <line x1="95" y1="82" x2="105" y2="82" stroke="#0F172A" strokeWidth="3" />

            {/* Eyes */}
            <circle cx="85" cy="82" r="3" fill="#0F172A" />
            <circle cx="115" cy="82" r="3" fill="#0F172A" />

            {/* Smile */}
            <path d="M90 102 Q100 110 110 102" fill="none" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />

            {/* Holding Notebook/Clipboard */}
            <rect x="70" y="150" width="60" height="50" rx="4" fill="#0F172A" stroke="#FF5722" strokeWidth="2" />
            <rect x="75" y="156" width="50" height="38" rx="2" fill="#FFFFFF" />
            {/* Hand details */}
            <ellipse cx="68" cy="165" rx="6" ry="10" fill="url(#skinGrad)" />
            <ellipse cx="132" cy="165" rx="6" ry="10" fill="url(#skinGrad)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
