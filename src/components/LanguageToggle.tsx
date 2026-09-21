import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  isDark?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLanguage,
  onLanguageChange,
  isDark = false
}) => {
  const languages: { code: Language; label: string; script: string }[] = [
    { code: 'en', label: 'English', script: 'Eng' },
    { code: 'as', label: 'অসমীয়া', script: 'Asomiya' },
    { code: 'bn', label: 'বাংলা', script: 'Bangla' }
  ];

  return (
    <div
      id="language-selector"
      className="inline-flex items-center p-1 rounded-full bg-stone-100/90 dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700 shadow-2xs backdrop-blur-xs"
      role="radiogroup"
      aria-label="Select Survey Language"
    >
      <div className="pl-2 pr-1 text-stone-500 dark:text-stone-400 flex items-center" aria-hidden="true">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-0.5">
        {languages.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onLanguageChange(lang.code)}
              className={`min-h-[38px] px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#166534] ${
                isSelected
                  ? 'bg-[#166534] text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 hover:bg-stone-200/60 dark:hover:bg-stone-700/60'
              }`}
              role="radio"
              aria-checked={isSelected}
              aria-label={lang.label}
            >
              <span className="font-medium tracking-tight">{lang.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
