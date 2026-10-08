import React from 'react';

export const AppHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#121316]/90 backdrop-blur-md border-b border-[#2A2C33]/60 px-4 py-3 sm:px-6">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {/* Brand Treatment */}
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#1C1D21] border border-[#2A2C33] text-[#F05A28] font-bold text-lg shadow-sm select-none"
            title="VUQORA Wordmark Badge (Temporary Brand Treatment)"
          >
            V
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-wider text-white uppercase leading-none">
              VUQORA
            </span>
            <span className="text-[11px] font-medium text-[#9CA3AF] tracking-tight leading-tight hidden sm:inline-block">
              From menu to meal.
            </span>
          </div>
        </div>

        {/* Minimal PWA / Status badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1C1D21] border border-[#2A2C33] text-[11px] font-medium text-[#9CA3AF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28] animate-pulse"></span>
            <span>M1 Preview</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
