import React from 'react';

interface GamosaBorderProps {
  className?: string;
  variant?: 'ribbon' | 'thin' | 'card-accent' | 'divider';
}

export const GamosaBorder: React.FC<GamosaBorderProps> = ({
  className = '',
  variant = 'ribbon'
}) => {
  if (variant === 'thin') {
    return (
      <div className={`h-[3px] w-full overflow-hidden flex items-center ${className}`} aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #DC2626 0px, #DC2626 6px, #FFFFFF 6px, #FFFFFF 9px, #DC2626 9px, #DC2626 12px, #FFFFFF 12px, #FFFFFF 16px)`
          }}
        />
      </div>
    );
  }

  if (variant === 'card-accent') {
    return (
      <div className={`h-[5px] w-full overflow-hidden flex items-center ${className}`} aria-hidden="true">
        <svg className="w-full h-[5px]" preserveAspectRatio="repeat-x" viewBox="0 0 24 5">
          <pattern id="gamosa-card-pattern" x="0" y="0" width="24" height="5" patternUnits="userSpaceOnUse">
            {/* Woven traditional geometric red motif on white */}
            <rect width="24" height="5" fill="#FFFFFF" />
            <polygon points="4,0 6,2.5 4,5 2,2.5" fill="#DC2626" />
            <polygon points="12,0 14,2.5 12,5 10,2.5" fill="#DC2626" />
            <polygon points="20,0 22,2.5 20,5 18,2.5" fill="#DC2626" />
            <line x1="0" y1="0.5" x2="24" y2="0.5" stroke="#DC2626" strokeWidth="0.8" />
            <line x1="0" y1="4.5" x2="24" y2="4.5" stroke="#DC2626" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="5" fill="url(#gamosa-card-pattern)" />
        </svg>
      </div>
    );
  }

  if (variant === 'divider') {
    return (
      <div className={`relative flex items-center justify-center py-2 ${className}`}>
        <div className="grow border-t border-slate-200 dark:border-slate-800" />
        <div className="mx-3 px-2 py-0.5 bg-amber-50 dark:bg-slate-900 border border-amber-200/60 dark:border-slate-700 rounded-full flex items-center gap-1.5 shadow-2xs">
          <svg className="w-16 h-3.5" viewBox="0 0 64 14" fill="none">
            {/* Assamese Gamosa center floral/geometric mini-selvedge */}
            <path d="M4 7 L8 3 L12 7 L8 11 Z" fill="#DC2626" />
            <path d="M16 7 L20 2 L24 7 L20 12 Z" fill="#DC2626" />
            <circle cx="32" cy="7" r="3" fill="#DC2626" />
            <path d="M40 7 L44 2 L48 7 L44 12 Z" fill="#DC2626" />
            <path d="M52 7 L56 3 L60 7 L56 11 Z" fill="#DC2626" />
            <line x1="2" y1="1" x2="62" y2="1" stroke="#DC2626" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="2" y1="13" x2="62" y2="13" stroke="#DC2626" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        </div>
        <div className="grow border-t border-slate-200 dark:border-slate-800" />
      </div>
    );
  }

  // Default 'ribbon'
  return (
    <div className={`h-2.5 w-full overflow-hidden relative shadow-2xs ${className}`} aria-hidden="true">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 120 10">
        <defs>
          <pattern id="gamosa-ribbon-pattern" width="16" height="10" patternUnits="userSpaceOnUse">
            <rect width="16" height="10" fill="#FFFDF9" />
            <line x1="0" y1="1" x2="16" y2="1" stroke="#DC2626" strokeWidth="1.2" />
            <line x1="0" y1="9" x2="16" y2="9" stroke="#DC2626" strokeWidth="1.2" />
            {/* Diamond weave motif */}
            <polygon points="8,2 11,5 8,8 5,5" fill="#DC2626" />
            <line x1="0" y1="5" x2="3" y2="5" stroke="#DC2626" strokeWidth="1" />
            <line x1="13" y1="5" x2="16" y2="5" stroke="#DC2626" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="10" fill="url(#gamosa-ribbon-pattern)" />
      </svg>
    </div>
  );
};
