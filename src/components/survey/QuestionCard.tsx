import React, { useState, useEffect, useRef } from 'react';
import { Question, Language, AnswerValue } from '../../types';
import { ASSAM_COLLEGES, ASSAM_DISTRICTS } from '../../data/assamData';
import { OpenEndedRecorder } from './OpenEndedRecorder';
import { GamosaBorder } from '../GamosaBorder';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Sparkles,
  Search,
  MapPin,
  School
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  totalQuestions: number;
  currentAnswer: AnswerValue | undefined;
  onAnswer: (ans: AnswerValue, autoAdvance?: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  language: Language;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  totalQuestions,
  currentAnswer,
  onAnswer,
  onNext,
  onBack,
  onSkip,
  language
}) => {
  // Autocomplete state for Q15 (colleges)
  const [collegeSearch, setCollegeSearch] = useState<string>(() => {
    if (typeof currentAnswer === 'object' && currentAnswer && 'college' in currentAnswer) {
      return currentAnswer.college;
    }
    return typeof currentAnswer === 'string' ? currentAnswer : '';
  });

  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    if (typeof currentAnswer === 'object' && currentAnswer && 'district' in currentAnswer) {
      return (currentAnswer as any).district || '';
    }
    return '';
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Custom text for "Other" options in single or multi select
  const [customOtherText, setCustomOtherText] = useState<string>('');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update Q15 answer
  useEffect(() => {
    if (question.type === 'short-answer-college') {
      if (collegeSearch.trim().length > 0) {
        onAnswer({
          college: collegeSearch.trim(),
          district: selectedDistrict || undefined
        });
      }
    }
  }, [collegeSearch, selectedDistrict, question.type]);

  // Milestone micro-copy
  const getMilestoneCopy = () => {
    const qNum = question.questionNumber;
    if (qNum === 8) {
      return {
        en: 'Halfway there! Keep going 🎉',
        as: 'অৰ্ধেক শেষ হ’ল! আৰু অলপ বাকী 🎉',
        bn: 'অর্ধেক শেষ! আর কিছুক্ষণ 🎉'
      }[language];
    }
    if (qNum >= 12 && qNum < 15) {
      return {
        en: 'Last few questions! You’re doing great ⚡',
        as: 'আৰু কেইটামান মাত্ৰ প্ৰশ্ন! অতি শীঘ্ৰে শেষ হ’ব ⚡',
        bn: 'শেষ কয়েকটি প্রশ্ন! আপনি দারুণ করছেন ⚡'
      }[language];
    }
    if (qNum === 15) {
      return {
        en: 'Final question! 🎓',
        as: 'অন্তিম প্ৰশ্ন! 🎓',
        bn: 'সর্বশেষ প্রশ্ন! 🎓'
      }[language];
    }
    return null;
  };

  const milestoneText = getMilestoneCopy();

  // Progress percentage
  const progressPercent = Math.round((question.questionNumber / totalQuestions) * 100);

  // Check if answer is provided to enable "Next"
  const isAnswered = (): boolean => {
    if (!currentAnswer) return false;
    if (question.type === 'single-choice') {
      return typeof currentAnswer === 'string' && currentAnswer.length > 0;
    }
    if (question.type === 'multi-select') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    if (question.type === 'open-ended') {
      if (typeof currentAnswer === 'string') return currentAnswer.trim().length > 0;
      if (typeof currentAnswer === 'object' && currentAnswer) {
        return (
          (currentAnswer as any).text?.trim().length > 0 ||
          (currentAnswer as any).transcript?.trim().length > 0 ||
          Boolean((currentAnswer as any).audioUrl) ||
          Boolean((currentAnswer as any).videoUrl)
        );
      }
      return false;
    }
    if (question.type === 'short-answer-college') {
      if (typeof currentAnswer === 'object' && currentAnswer) {
        return Boolean((currentAnswer as any).college?.trim().length > 1);
      }
      return typeof currentAnswer === 'string' && currentAnswer.trim().length > 1;
    }
    return false;
  };

  // Single choice handler with auto-advance
  const handleSingleSelect = (optionText: string) => {
    onAnswer(optionText);
    // Auto-advance after 380ms as requested
    setTimeout(() => {
      onNext();
    }, 380);
  };

  // Multi-select handler
  const handleMultiSelect = (optionText: string) => {
    const currentList = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    const index = currentList.indexOf(optionText);

    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      if (question.maxSelections && currentList.length >= question.maxSelections) {
        // If limit reached, swap last or prevent
        currentList.shift(); // remove oldest
      }
      currentList.push(optionText);
    }

    onAnswer(currentList);
  };

  // Filtered colleges for autocomplete
  const filteredColleges = ASSAM_COLLEGES.filter((c) =>
    c.toLowerCase().includes(collegeSearch.toLowerCase())
  ).slice(0, 6);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col justify-between min-h-[85vh] px-3 sm:px-4 py-2 sm:py-4">
      {/* Top Header & Progress Bar */}
      <div className="w-full mb-3">
        {/* Progress Navigation Bar */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] min-w-[44px] p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Previous question"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Question counter pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 text-xs font-semibold">
            <span>
              {language === 'as' ? 'প্ৰশ্ন' : language === 'bn' ? 'প্রশ্ন' : 'Question'}{' '}
              {question.questionNumber} / {totalQuestions}
            </span>
          </div>

          <div className="text-[11px] font-bold text-[#E0A526] dark:text-amber-400">
            {progressPercent}%
          </div>
        </div>

        {/* Progress Track (Muga Gold filled) */}
        <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#166534] via-[#CA8A04] to-[#E0A526] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Milestone Badge if applicable */}
        {milestoneText && (
          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/80 rounded-full text-[11px] font-bold text-[#805600] dark:text-amber-300 shadow-2xs animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-[#E0A526]" />
              {milestoneText}
            </span>
          </div>
        )}
      </div>

      {/* Center Question Card */}
      <div
        id={`question-card-${question.id}`}
        className="w-full my-auto bg-white dark:bg-stone-900 rounded-2xl p-5 sm:p-6 shadow-xl shadow-stone-200/40 dark:shadow-none border border-stone-200/80 dark:border-stone-800 relative transition-all"
      >
        {/* Subtle Gamosa accent on question card top */}
        <div className="absolute top-0 left-0 right-0 rounded-t-2xl overflow-hidden">
          <GamosaBorder variant="card-accent" />
        </div>

        {/* Question Heading */}
        <div className="mb-4 mt-2">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 leading-snug tracking-tight">
            {question.title[language] || question.title.en}
          </h2>

          {/* Helper Text */}
          {question.helperText && (
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 font-normal">
              {question.helperText[language] || question.helperText.en}
            </p>
          )}

          {/* Multi-select live counter ("2 of 3 selected") */}
          {question.type === 'multi-select' && (
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-stone-500 dark:text-stone-400">
                {Array.isArray(currentAnswer) ? currentAnswer.length : 0}
                {question.maxSelections ? ` of ${question.maxSelections}` : ''} selected
              </span>
              {question.maxSelections && (
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                  Max {question.maxSelections}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Answer UI by Type */}

        {/* Type 1: Single Choice */}
        {question.type === 'single-choice' && question.options && (
          <div className="flex flex-col gap-2.5" role="radiogroup">
            {question.options.map((opt) => {
              const optionLabel = opt.text[language] || opt.text.en;
              // Check selection matching English label or translated
              const isSelected =
                currentAnswer === opt.text.en || currentAnswer === optionLabel;

              return (
                <div key={opt.id} className="w-full flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleSingleSelect(opt.text.en)}
                    className={`w-full min-h-[50px] px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/70 border-2 border-[#166534] shadow-xs text-stone-900 dark:text-stone-100 ring-2 ring-[#E0A526]/30'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-emerald-300 hover:bg-stone-50/80 dark:hover:bg-stone-800/60'
                    }`}
                    role="radio"
                    aria-checked={isSelected}
                  >
                    <span className="text-sm sm:text-base font-medium leading-tight">
                      {optionLabel}
                    </span>

                    {/* Radio Indicator (green with gold accent) */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? 'border-[#166534] bg-[#166534]'
                          : 'border-stone-300 dark:border-stone-600'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-[#E0A526]" />
                      )}
                    </div>
                  </button>

                  {/* Other custom text field if chosen */}
                  {opt.hasCustomInput && isSelected && (
                    <input
                      type="text"
                      value={customOtherText}
                      onChange={(e) => {
                        setCustomOtherText(e.target.value);
                        onAnswer(`Other: ${e.target.value}`);
                      }}
                      placeholder={
                        language === 'as'
                          ? 'অনুগ্ৰহ কৰি উল্লেখ কৰক...'
                          : language === 'bn'
                          ? 'অনুগ্রহ করে উল্লেখ করুন...'
                          : 'Please specify details...'
                      }
                      className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-[#166534]"
                      autoFocus
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Type 2: Multi-select */}
        {question.type === 'multi-select' && question.options && (
          <div className="flex flex-col gap-2.5">
            {question.options.map((opt) => {
              const optionLabel = opt.text[language] || opt.text.en;
              const isChecked =
                Array.isArray(currentAnswer) &&
                (currentAnswer.includes(opt.text.en) || currentAnswer.includes(optionLabel));

              return (
                <div key={opt.id} className="w-full flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleMultiSelect(opt.text.en)}
                    className={`w-full min-h-[50px] px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/70 border-2 border-[#166534] text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-emerald-300 hover:bg-stone-50/80 dark:hover:bg-stone-800/60'
                    }`}
                    role="checkbox"
                    aria-checked={isChecked}
                  >
                    <span className="text-sm sm:text-base font-medium leading-tight">
                      {optionLabel}
                    </span>

                    {/* Checkbox indicator */}
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                        isChecked
                          ? 'border-[#166534] bg-[#166534] text-white'
                          : 'border-stone-300 dark:border-stone-600'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>

                  {/* Other custom input for multi-select */}
                  {opt.hasCustomInput && isChecked && (
                    <input
                      type="text"
                      value={customOtherText}
                      onChange={(e) => {
                        setCustomOtherText(e.target.value);
                      }}
                      placeholder="Please specify..."
                      className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-[#166534]"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Type 3: Open-ended (Q11: Type, Voice, Video) */}
        {question.type === 'open-ended' && (
          <OpenEndedRecorder
            value={currentAnswer}
            onChange={(val) => onAnswer(val)}
            language={language}
          />
        )}

        {/* Type 4: Short answer with Assam College Autocomplete & District dropdown (Q15) */}
        {question.type === 'short-answer-college' && (
          <div className="flex flex-col gap-4">
            {/* College Autocomplete Input */}
            <div className="relative" ref={dropdownRef}>
              <label
                htmlFor="college-input"
                className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5"
              >
                {language === 'as'
                  ? 'কলেজ বা বিশ্ববিদ্যালয়ৰ নাম'
                  : language === 'bn'
                  ? 'কলেজ বা বিশ্ববিদ্যালয়ের নাম'
                  : 'College / University Name'}
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <School className="w-4 h-4 text-[#166534]" />
                </div>
                <input
                  id="college-input"
                  type="text"
                  value={collegeSearch}
                  onChange={(e) => {
                    setCollegeSearch(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={
                    language === 'as'
                      ? 'যেনে: Cotton University, Gauhati University...'
                      : language === 'bn'
                      ? 'যেমন: Cotton University, Gauhati University...'
                      : 'e.g. Cotton University, IIT Guwahati, Dibrugarh Univ...'
                  }
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#166534] text-sm sm:text-base"
                />
              </div>

              {/* Suggestions Dropdown */}
              {isDropdownOpen && collegeSearch.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl shadow-lg z-30 max-h-56 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
                  {filteredColleges.map((col, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCollegeSearch(col);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm text-stone-800 dark:text-stone-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <School className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{col}</span>
                    </button>
                  ))}
                  {filteredColleges.length === 0 && (
                    <div className="p-3 text-xs text-stone-500 italic">
                      "{collegeSearch}" (will be recorded as custom college name)
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Optional District Dropdown */}
            <div>
              <label
                htmlFor="district-select"
                className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5"
              >
                {language === 'as'
                  ? 'জিলা (District) বাছক (ঐচ্ছিক)'
                  : language === 'bn'
                  ? 'জেলা (District) নির্বাচন করুন (ঐচ্ছিক)'
                  : 'Assam District (Optional)'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <MapPin className="w-4 h-4 text-[#CA8A04]" />
                </div>
                <select
                  id="district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-[#166534] text-sm sm:text-base cursor-pointer"
                >
                  <option value="">-- Select Assam District --</option>
                  {ASSAM_DISTRICTS.map((dist) => (
                    <option key={dist.name} value={dist.name}>
                      {dist.name} ({dist.region})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 w-full pt-3 pb-2 bg-gradient-to-t from-[#FFFBF5] via-[#FFFBF5] dark:from-stone-950 dark:via-stone-950 to-transparent flex flex-col items-center gap-2">
        <button
          type="button"
          id="next-question-btn"
          onClick={onNext}
          disabled={!isAnswered()}
          className={`w-full min-h-[50px] px-6 py-3 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
            isAnswered()
              ? 'bg-[#166534] hover:bg-[#12532b] text-white shadow-emerald-900/20 active:scale-[0.99]'
              : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed shadow-none'
          }`}
        >
          <span>
            {question.questionNumber === totalQuestions
              ? language === 'as'
                ? 'জৰীপ জমা দিয়ক'
                : language === 'bn'
                ? 'জরিপ জমা দিন'
                : 'Submit Survey'
              : language === 'as'
              ? 'পৰৱৰ্তী'
              : language === 'bn'
              ? 'পরবর্তী'
              : 'Next'}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Skip button for optional questions */}
        {question.isOptional && onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 py-1 underline underline-offset-2 cursor-pointer"
          >
            {language === 'as'
              ? 'এই প্ৰশ্নটো এৰি দিয়ক'
              : language === 'bn'
              ? 'এই প্রশ্নটি বাদ দিন'
              : 'Skip this question'}
          </button>
        )}
      </div>
    </div>
  );
};
