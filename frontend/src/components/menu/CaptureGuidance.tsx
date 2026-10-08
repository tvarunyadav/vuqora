import React from 'react';
import { Sun, Scan, DollarSign } from 'lucide-react';

export const CaptureGuidance: React.FC = () => {
  return (
    <div className="bg-[#18191D] border border-[#26282E] rounded-xl p-3.5 sm:p-4 text-xs text-[#9CA3AF]">
      <h4 className="font-semibold text-[#F3F4F6] text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
        <span>For best results</span>
      </h4>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        <li className="flex items-center gap-2 bg-[#1C1D21] p-2 rounded-lg border border-[#2A2C33]/50">
          <Scan className="w-4 h-4 text-[#F05A28] shrink-0" aria-hidden="true" />
          <span>Keep menu flat</span>
        </li>
        <li className="flex items-center gap-2 bg-[#1C1D21] p-2 rounded-lg border border-[#2A2C33]/50">
          <Sun className="w-4 h-4 text-[#F05A28] shrink-0" aria-hidden="true" />
          <span>Use good lighting</span>
        </li>
        <li className="flex items-center gap-2 bg-[#1C1D21] p-2 rounded-lg border border-[#2A2C33]/50">
          <DollarSign className="w-4 h-4 text-[#F05A28] shrink-0" aria-hidden="true" />
          <span>Ensure prices are visible</span>
        </li>
      </ul>
    </div>
  );
};

export default CaptureGuidance;
