import React from 'react';

interface LogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ showTagline = false, size = 'md', className = '' }) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2.5">
        {/* Stylized rounded gradient polygon icon */}
        <div className={`relative ${iconSize} flex-shrink-0 flex items-center justify-center`}>
          <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d2ff" />
                <stop offset="45%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="innerGlow" x1="20%" y1="20%" x2="80%" y2="80%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Smooth rounded triangle play shape */}
            <path
              d="M12.5 8.8C10.2 7.4 7.2 9.1 7.2 11.8V32.2C7.2 34.9 10.2 36.6 12.5 35.2L34.2 25.1C36.6 23.7 36.6 20.3 34.2 18.9L12.5 8.8Z"
              fill="url(#logoGrad)"
            />
            {/* Inner soft highlight */}
            <path
              d="M12.5 10C10.8 9 8.5 10.3 8.5 12.3V31.7C8.5 33.7 10.8 35 12.5 34L32.8 24.5C34.6 23.5 34.6 20.5 32.8 19.5L12.5 10Z"
              stroke="url(#innerGlow)"
              strokeWidth="1.2"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="flex items-baseline tracking-tight font-bold">
          <span className={`${textSize} text-white font-extrabold tracking-tight`}>Desing</span>
          <span className={`${textSize} ml-1 font-black bg-gradient-to-r from-[#00d2ff] via-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent`}>
            AI
          </span>
        </div>
      </div>

      {showTagline && (
        <span className="text-[11px] text-slate-400 font-medium tracking-wide mt-0.5 ml-0.5">
          Create • Design • Inspire
        </span>
      )}
    </div>
  );
};
