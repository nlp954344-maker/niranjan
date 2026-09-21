import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, CheckCircle2, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface NetworkToastProps {
  lastSavedAt?: number | null;
  language?: Language;
}

export const SavedIndicator: React.FC<{ status: 'idle' | 'saving' | 'saved' }> = ({ status }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
        status === 'saving'
          ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
          : status === 'saved'
          ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
          : 'text-stone-400 opacity-60'
      }`}
    >
      <span className="relative flex h-2 w-2">
        {status === 'saving' ? (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        ) : (
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        )}
      </span>
      <span className="text-[11px] tracking-tight">
        {status === 'saving' ? 'Saving...' : 'Saved'}
      </span>
    </div>
  );
};

export const NetworkToast: React.FC<NetworkToastProps> = ({ lastSavedAt = null, language = 'en' }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showSavedPill, setShowSavedPill] = useState<boolean>(false);
  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (lastSavedAt) {
      setShowSavedPill(true);
      const timer = setTimeout(() => {
        setShowSavedPill(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [lastSavedAt]);

  const effectiveOnline = isOnline && !simulatedOffline;

  const savedText = {
    en: 'Progress Saved',
    as: 'সংৰক্ষিত হ’ল',
    bn: 'সংরক্ষিত হয়েছে'
  }[language];

  const reconnectingText = {
    en: 'Reconnecting to network...',
    as: 'ইণ্টাৰনেট সংযোগ পুনৰ স্থাপন কৰা হৈছে...',
    bn: 'পুনরায় সংযোগ স্থাপন করা হচ্ছে...'
  }[language];

  const offlineNoticeText = {
    en: 'Answers saved offline. Will sync automatically.',
    as: 'উত্তৰ অফলাইনত সুৰক্ষিত। সংযোগ পালে সংলগ্ন হ’ব।',
    bn: 'উত্তর অফলাইনে সংরক্ষিত। সংযোগ পেলে সিঙ্ক হবে।'
  }[language];

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-1.5 transition-all duration-300">
      {/* Reconnecting banner if offline */}
      {!effectiveOnline && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 bg-amber-600/95 text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg border border-amber-400/40 animate-pulse backdrop-blur-md"
        >
          <WifiOff className="w-4 h-4 shrink-0 animate-spin" />
          <span>{reconnectingText}</span>
          <span className="text-amber-200 text-[11px] hidden sm:inline">({offlineNoticeText})</span>
          <button
            type="button"
            onClick={() => setSimulatedOffline(false)}
            className="ml-1.5 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-[11px] font-bold tracking-wide uppercase transition-colors"
          >
            Reconnect
          </button>
        </div>
      )}

      {/* Small Saved Indicator */}
      {effectiveOnline && (
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            showSavedPill
              ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs opacity-100 scale-100'
              : 'text-stone-500 dark:text-stone-400 opacity-60 scale-95'
          }`}
        >
          <span className="relative flex h-2 w-2">
            {showSavedPill && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium tracking-tight">
            {savedText}
          </span>
        </div>
      )}
    </div>
  );
};
