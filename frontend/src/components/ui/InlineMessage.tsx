import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface InlineMessageProps {
  type?: 'error' | 'warning' | 'info' | 'success';
  title?: string;
  message: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const InlineMessage: React.FC<InlineMessageProps> = ({
  type = 'info',
  title,
  message,
  action,
  className = '',
}) => {
  const styles = {
    error: {
      container: 'bg-red-500/10 border-red-500/30 text-red-200',
      icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />,
    },
    warning: {
      container: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />,
    },
    info: {
      container: 'bg-[#F05A28]/10 border-[#F05A28]/30 text-[#F3F4F6]',
      icon: <Info className="w-5 h-5 text-[#F05A28] shrink-0 mt-0.5" aria-hidden="true" />,
    },
    success: {
      container: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />,
    },
  };

  const selected = styles[type];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all ${selected.container} ${className}`}
    >
      {selected.icon}
      <div className="flex-1 space-y-1">
        {title && <h4 className="font-semibold tracking-wide text-white">{title}</h4>}
        <div className="text-[#D1D5DB] text-xs sm:text-sm">{message}</div>
        {action && <div className="pt-2">{action}</div>}
      </div>
    </div>
  );
};

export default InlineMessage;
