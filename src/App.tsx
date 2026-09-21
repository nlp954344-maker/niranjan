import React, { useState, useEffect, useRef } from 'react';
import { Language, Question, SurveyResponse, AnswerValue } from './types';
import { INITIAL_QUESTIONS } from './data/questions';
import { SEED_RESPONSES } from './data/seedResponses';
import { ASSAM_DISTRICTS } from './data/assamData';
import { LanguageToggle } from './components/LanguageToggle';
import { NetworkToast, SavedIndicator } from './components/NetworkToast';
import { GamosaBorder } from './components/GamosaBorder';
import { TShirtGamosaIcon, AssamRhinoIcon } from './components/BrandIcons';
import { SurveyWelcome } from './components/survey/SurveyWelcome';
import { QuestionCard } from './components/survey/QuestionCard';
import { ThankYouScreen } from './components/survey/ThankYouScreen';
import { SurveyDashboard } from './components/dashboard/SurveyDashboard';
import {
  Sun,
  Moon,
  BarChart3
} from 'lucide-react';

const STORAGE_KEY_ANSWERS = 'respondr_draft_answers_v1';
const STORAGE_KEY_INDEX = 'respondr_draft_index_v1';
const STORAGE_KEY_LANG = 'respondr_lang_v1';
const STORAGE_KEY_DARK = 'respondr_theme_dark_v1';
const STORAGE_KEY_RESPONSES = 'respondr_all_responses_v1';
const STORAGE_KEY_QUESTIONS = 'respondr_custom_questions_v1';

export default function App() {
  // Navigation View State
  const [view, setView] = useState<'welcome' | 'survey' | 'thankyou' | 'dashboard'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [language, setLanguage] = useState<Language>('en');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Survey Data State
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [responses, setResponses] = useState<SurveyResponse[]>(SEED_RESPONSES);
  const [hasSavedProgress, setHasSavedProgress] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Load persisted state from localStorage on initial render
  useEffect(() => {
    try {
      // Theme
      const savedDark = localStorage.getItem(STORAGE_KEY_DARK);
      if (savedDark !== null) {
        const darkVal = savedDark === 'true';
        setIsDark(darkVal);
        if (darkVal) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }

      // Language
      const savedLang = localStorage.getItem(STORAGE_KEY_LANG) as Language;
      if (savedLang && ['en', 'as', 'bn'].includes(savedLang)) {
        setLanguage(savedLang);
      }

      // Questions
      const savedQuestions = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (savedQuestions) {
        setQuestions(JSON.parse(savedQuestions));
      }

      // Responses
      const savedResponses = localStorage.getItem(STORAGE_KEY_RESPONSES);
      if (savedResponses) {
        setResponses(JSON.parse(savedResponses));
      }

      // Draft Answers
      const savedDraft = localStorage.getItem(STORAGE_KEY_ANSWERS);
      const savedIdx = localStorage.getItem(STORAGE_KEY_INDEX);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (Object.keys(parsed).length > 0) {
          setAnswers(parsed);
          setHasSavedProgress(true);
          if (savedIdx) {
            setCurrentQuestionIndex(parseInt(savedIdx, 10) || 0);
          }
        }
      }
    } catch (e) {
      console.warn('Error loading localStorage state:', e);
    }
  }, []);

  // Sync Dark mode with DOM
  const handleToggleDark = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem(STORAGE_KEY_DARK, String(nextDark));
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Sync Language
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  };

  // Auto-Save Answer with visual indicator
  const handleAnswerChange = (questionId: number, value: any) => {
    setSaveStatus('saving');
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    setHasSavedProgress(true);

    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(updated));
      localStorage.setItem(STORAGE_KEY_INDEX, String(currentQuestionIndex));
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      setSaveStatus('saved');
    }, 280);
  };

  // Auto-advance helper for single choice options
  const handleAutoAdvance = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Navigation within survey
  const handleStartSurvey = () => {
    setStartTime(Date.now());
    setView('survey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeSurvey = () => {
    setStartTime(Date.now());
    setView('survey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem(STORAGE_KEY_INDEX, String(next));
        } catch {}
        return next;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Last question reached - submit survey!
      handleSubmitSurvey();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => {
        const next = prev - 1;
        try {
          localStorage.setItem(STORAGE_KEY_INDEX, String(next));
        } catch {}
        return next;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('welcome');
    }
  };

  const handleClearProgress = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setHasSavedProgress(false);
    try {
      localStorage.removeItem(STORAGE_KEY_ANSWERS);
      localStorage.removeItem(STORAGE_KEY_INDEX);
    } catch {}
  };

  // Complete submission
  const handleSubmitSurvey = () => {
    const elapsedSeconds = Math.max(45, Math.round((Date.now() - startTime) / 1000));

    // Resolve college & district from Q15
    const q15Ans = answers[15];
    let resolvedCollege = 'Gauhati University';
    let resolvedDistrict = 'Kamrup Metropolitan (Guwahati)';
    let resolvedRegion = 'Central Assam';

    if (typeof q15Ans === 'object' && q15Ans) {
      resolvedCollege = q15Ans.college || resolvedCollege;
      resolvedDistrict = q15Ans.district || resolvedDistrict;
    } else if (typeof q15Ans === 'string') {
      resolvedCollege = q15Ans;
    }

    // Find region from district
    const matchedDist = ASSAM_DISTRICTS.find((d) => d.name === resolvedDistrict);
    if (matchedDist) {
      resolvedRegion = matchedDist.region;
    }

    const resolvedStudyYear = (answers[14] as string) || '2nd Year';

    const newResponse: SurveyResponse = {
      id: `RESP-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedAt: new Date().toISOString(),
      language,
      college: resolvedCollege,
      district: resolvedDistrict,
      region: resolvedRegion as any,
      studyYear: resolvedStudyYear,
      answers: { ...answers },
      completionTimeSeconds: elapsedSeconds
    };

    const updatedResponses = [newResponse, ...responses];
    setResponses(updatedResponses);

    try {
      localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(updatedResponses));
      localStorage.removeItem(STORAGE_KEY_ANSWERS);
      localStorage.removeItem(STORAGE_KEY_INDEX);
    } catch {}

    setHasSavedProgress(false);
    setView('thankyou');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Question manager updates
  const handleUpdateQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(newQuestions));
    } catch {}
  };

  const handleResetQuestions = () => {
    setQuestions(INITIAL_QUESTIONS);
    try {
      localStorage.removeItem(STORAGE_KEY_QUESTIONS);
    } catch {}
  };

  // Current active question
  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const currentAnswer = answers[currentQuestion?.id];

  // Validation: can proceed?
  const canProceed = (() => {
    if (!currentQuestion) return false;
    if (currentQuestion.isOptional) return true;
    if (currentAnswer === undefined || currentAnswer === null || currentAnswer === '') return false;
    if (Array.isArray(currentAnswer) && currentAnswer.length === 0) return false;
    if (currentQuestion.id === 15 && typeof currentAnswer === 'object') {
      return Boolean((currentAnswer as any).college?.trim());
    }
    return true;
  })();

  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  // If in Dashboard View, render the administrative workspace
  if (view === 'dashboard') {
    return (
      <SurveyDashboard
        responses={responses}
        questions={questions}
        onUpdateQuestions={handleUpdateQuestions}
        onResetQuestions={handleResetQuestions}
        onBackToSurvey={() => setView(hasSavedProgress ? 'survey' : 'welcome')}
        isDark={isDark}
        onToggleDark={handleToggleDark}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      {/* Network offline/online toast */}
      <NetworkToast />

      {/* Top Application Header */}
      <header
        id="app-header"
        className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 px-3.5 sm:px-6 py-2.5 flex items-center justify-between"
      >
        {/* Left: Brand with Gamosa icon & auto-save badge */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setView('welcome')}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="p-1.5 rounded-xl bg-[#166534]/10 dark:bg-emerald-950/60 border border-[#166534]/20 group-hover:scale-105 transition-transform">
              <TShirtGamosaIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#166534] dark:text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-stone-900 dark:text-stone-50">
                  Respondr
                </span>
                <span className="hidden xs:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-[#805600] dark:text-amber-300 uppercase">
                  Assam
                </span>
              </div>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 -mt-0.5 hidden sm:block">
                College T-Shirt &amp; Merch Survey
              </p>
            </div>
          </button>

          {/* Auto-save indicator: visible when taking survey */}
          {view === 'survey' && (
            <div className="ml-1 sm:ml-2">
              <SavedIndicator status={saveStatus} />
            </div>
          )}
        </div>

        {/* Right Controls: Trilingual toggle, dark mode, dashboard button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Trilingual Toggle (English / অসমীয়া / বাংলা) */}
          <LanguageToggle currentLanguage={language} onLanguageChange={handleLanguageChange} />

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={handleToggleDark}
            className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Switch to Admin / Results Dashboard */}
          <button
            type="button"
            onClick={() => setView('dashboard')}
            className="min-h-[38px] px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold flex items-center gap-1.5 border border-stone-200/80 dark:border-stone-700 cursor-pointer transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#166534] dark:text-emerald-400" />
            <span className="hidden sm:inline">Live Results</span>
            <span className="sm:hidden">Results</span>
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 flex flex-col justify-between">
        {/* Welcome Screen */}
        {view === 'welcome' && (
          <SurveyWelcome
            language={language}
            onStart={handleStartSurvey}
            onResume={handleResumeSurvey}
            savedQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        )}

        {/* Question by Question Flow (Designed at 360px width first for college students on Android phones) */}
        {view === 'survey' && currentQuestion && (
          <div className="w-full flex-1 flex flex-col justify-between">
            {/* Top Gamosa motif border */}
            <GamosaBorder variant="ribbon" className="w-full" />

            {/* Question Card Viewport */}
            <div className="flex-1 flex items-center justify-center py-2">
              <QuestionCard
                question={currentQuestion}
                totalQuestions={questions.length}
                currentAnswer={currentAnswer}
                onAnswer={(ans: AnswerValue) => handleAnswerChange(currentQuestion.id, ans)}
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleNext}
                language={language}
              />
            </div>
          </div>
        )}

        {/* Thank You Screen */}
        {view === 'thankyou' && (
          <ThankYouScreen
            language={language}
            onRestart={() => {
              handleClearProgress();
              setView('welcome');
            }}
            onViewDashboard={() => setView('dashboard')}
          />
        )}
      </main>

      {/* Footnote Branding */}
      <footer className="w-full py-3 px-4 text-center border-t border-stone-100 dark:border-stone-800/60 bg-transparent text-[11px] text-stone-600 dark:text-stone-300 flex items-center justify-center gap-2">
        <AssamRhinoIcon className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />
        <span>Respondr Assam • College T-Shirt &amp; Merchandise Survey</span>
      </footer>
    </div>
  );
}
