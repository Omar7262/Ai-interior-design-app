import React from 'react';

export const StatusBar: React.FC = () => {
  return (
    <div className="w-full pt-3 pb-2 px-6 flex items-center justify-between text-white text-xs select-none">
      <span className="font-semibold text-[13px] tracking-tight">7:49</span>
      <div className="flex items-center gap-1.5 text-white">
        {/* Cellular 4 bars */}
        <div className="flex items-end gap-[1.5px] h-3 mr-0.5">
          <div className="w-[3px] h-[4px] bg-white rounded-xs"></div>
          <div className="w-[3px] h-[6px] bg-white rounded-xs"></div>
          <div className="w-[3px] h-[8px] bg-white rounded-xs"></div>
          <div className="w-[3px] h-[10px] bg-white rounded-xs"></div>
        </div>

        {/* Wi-Fi icon */}
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21L24 8.98C20.93 5.9 16.69 4 12 4ZM12 6.5C15.86 6.5 19.38 8 22.08 10.45L12 20.55L1.92 10.45C4.62 8 8.14 6.5 12 6.5Z" />
        </svg>

        {/* Battery with 73 inside */}
        <div className="flex items-center ml-0.5">
          <div className="relative border border-white/80 rounded-md px-1 py-[1px] flex items-center justify-center min-w-[26px] h-[13px]">
            <div className="absolute left-0 top-0 bottom-0 bg-white/30 rounded-xs" style={{ width: '73%' }}></div>
            <span className="relative z-10 text-[9px] font-bold leading-none text-white">73</span>
          </div>
          <div className="w-[2px] h-[4px] bg-white/70 rounded-r-xs ml-[1px]"></div>
        </div>
      </div>
    </div>
  );
};
