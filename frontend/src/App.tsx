import React from 'react'

export const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#121316] text-[#F3F4F6] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Subtle background glow element */}
      <div 
        className="absolute w-72 h-72 rounded-full bg-[#F05A28]/10 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-sm w-full flex flex-col items-center space-y-6">
        {/* Brand logo representation matching dark-brand accent */}
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1C1D21] border border-[#2A2C33] shadow-xl">
          <span className="text-[#F05A28] font-extrabold text-3xl tracking-tighter">V</span>
        </div>

        {/* Brand Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-wider text-white uppercase">
            VUQORA
          </h1>
          <p className="text-[#9CA3AF] text-lg font-medium tracking-wide">
            From menu to meal.
          </p>
        </div>

        {/* Foundation Indicator */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1C1D21] border border-[#2A2C33] text-xs font-semibold text-[#D1D5DB] shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F05A28] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F05A28]"></span>
            </span>
            <span>Foundation ready</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
