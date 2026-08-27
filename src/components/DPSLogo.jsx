'use client';

export default function DPSLogo({ className = "w-8 h-8" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 p-1 shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full text-emerald-800 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crest Outer Shield / Wreath */}
        <path
          d="M50 5 C20 5 5 25 5 55 C5 85 45 110 50 115 C55 110 95 85 95 55 C95 25 80 5 50 5 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
        />
        {/* Torch / Flame Emblem */}
        <path
          d="M50 20 L54 35 L62 25 L58 40 L65 42 L55 58 L52 75 L48 75 L45 58 L35 42 L42 40 L38 25 L46 35 Z"
          fill="#059669"
        />
        {/* Book Base */}
        <path
          d="M30 75 L50 82 L70 75 L70 85 L50 92 L30 85 Z"
          fill="#047857"
        />
        {/* Circular motto text arc background */}
        <circle cx="50" cy="55" r="40" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
        {/* Inner DPS Text */}
        <text
          x="50"
          y="104"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#064E3B"
        >
          DPS
        </text>
      </svg>
    </div>
  );
}
