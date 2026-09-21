import React from 'react';
import { Language } from '../../types';
import { GamosaBorder } from '../GamosaBorder';
import { TShirtGamosaIcon, AssamTeaLeafIcon } from '../BrandIcons';
import { ShieldCheck, Clock, MapPin, ArrowRight, RotateCcw } from 'lucide-react';

interface SurveyWelcomeProps {
  language: Language;
  onStart: () => void;
  onResume?: () => void;
  savedQuestionIndex?: number;
  totalQuestions: number;
}

export const SurveyWelcome: React.FC<SurveyWelcomeProps> = ({
  language,
  onStart,
  onResume,
  savedQuestionIndex = 0,
  totalQuestions = 15
}) => {
  const content = {
    en: {
      badge1: 'Anonymous',
      badge2: '3 mins',
      badge3: 'Made for students in Assam',
      title: 'College T-Shirt Survey',
      subtitle: "15 quick questions, about 3 minutes. Tell us what merch you'd actually wear on campus.",
      studentNote: 'Hey! We are working on real, high-quality college merchandise for campuses across Assam — Cotton, GU, Dibrugarh, Tezpur, IITG, AEC, and colleges in every district. No corporate junk. Honest student opinions only!',
      startBtn: 'Start survey',
      resumeBtn: `Resume from Question ${savedQuestionIndex} of ${totalQuestions}`,
      restartBtn: 'Start fresh instead'
    },
    as: {
      badge1: 'সম্পূৰ্ণ গোপনীয় (Anonymous)',
      badge2: '৩ মিনিট',
      badge3: 'অসমৰ ছাত্ৰ-ছাত্ৰীৰ বাবে প্ৰস্তুত',
      title: 'কলেজ টি-চাৰ্ট জৰীপ',
      subtitle: '১৫ টা চমু প্ৰশ্ন, মাত্ৰ ৩ মিনিট। আপুনি কেম্পাছত সঁচাকৈয়ে কি মাৰ্চেণ্ডাইজ পিন্ধিব বিচাৰে আমাক জনাওক।',
      studentNote: 'নমস্কাৰ! আমি অসমৰ বিভিন্ন কলেজ আৰু বিশ্ববিদ্যালয়ৰ বাবে মানসম্পন্ন ছাত্ৰ-উপযোগী মাৰ্চেণ্ডাইজ আনিবলৈ এই জৰীপ কৰিছোঁ। আপোনাৰ স্পষ্ট আৰু অকপট মতামত আমাৰ বাবে অতি মূল্যৱান!',
      startBtn: 'জৰীপ আৰম্ভ কৰক',
      resumeBtn: `প্ৰশ্ন ${savedQuestionIndex} ৰ পৰা আকৌ আৰম্ভ কৰক`,
      restartBtn: 'পুনৰ নতুনকৈ আৰম্ভ কৰক'
    },
    bn: {
      badge1: 'বেনামী ও গোপনীয়',
      badge2: '৩ মিনিট',
      badge3: 'আসামের শিক্ষার্থীদের জন্য তৈরি',
      title: 'কলেজ টি-শার্ট জরিপ',
      subtitle: '১৫টি সহজ প্রশ্ন, প্রায় ৩ মিনিট। আপনি ক্যাম্পাসে প্রকৃতপক্ষে কোন মার্চেন্ডাইজ পরতে চান আমাদের জানান।',
      studentNote: 'হ্যালো! আসামের বিভিন্ন কলেজ এবং বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য উপযোগী আধুনিক কলেজ মার্চেন্ডাইজ ডিজাইন করার লক্ষ্যে এই উদ্যোগ। কোনো কর্পোরেট চাপ নেই, কেবল শিক্ষার্থীদের মতামত!',
      startBtn: 'জরিপ শুরু করুন',
      resumeBtn: `প্রশ্ন ${savedQuestionIndex} থেকে শুরু করুন`,
      restartBtn: 'প্রথম থেকে শুরু করুন'
    }
  }[language];

  const hasSavedProgress = savedQuestionIndex > 1;

  return (
    <div className="w-full max-w-md mx-auto px-3 sm:px-4 py-4 sm:py-8 flex flex-col justify-center min-h-[82vh]">
      {/* Main Card */}
      <div
        id="survey-welcome-card"
        className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-200/70 dark:border-stone-800 overflow-hidden flex flex-col transition-all"
      >
        {/* Subtle Top Gamosa Border accent */}
        <GamosaBorder variant="card-accent" />

        <div className="p-6 sm:p-7 flex flex-col items-center text-center">
          {/* Brand Icon Header */}
          <div className="relative mb-5 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center text-[#166534] dark:text-emerald-400 shadow-sm">
              <TShirtGamosaIcon className="w-12 h-12" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-700 p-1.5 rounded-full shadow-2xs">
              <AssamTeaLeafIcon className="w-4 h-4" />
            </div>
          </div>

          {/* Badges Pill Row */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {content.badge1}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-[#805600] dark:text-amber-300 border border-amber-200/60 dark:border-amber-800">
              <Clock className="w-3.5 h-3.5 text-[#CA8A04]" />
              {content.badge2}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#166534] dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
              <MapPin className="w-3.5 h-3.5 text-[#166534]" />
              {content.badge3}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight leading-snug mb-3">
            {content.title}
          </h1>

          {/* Subtext */}
          <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed mb-5 font-normal">
            {content.subtitle}
          </p>

          {/* Student Relatable Note */}
          <div className="w-full bg-[#FFFDF9] dark:bg-stone-800/60 border border-amber-200/70 dark:border-stone-700 rounded-xl p-3.5 mb-6 text-left">
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
              "{content.studentNote}"
            </p>
          </div>

          {/* Actions */}
          <div className="w-full space-y-2.5">
            {hasSavedProgress && onResume ? (
              <>
                <button
                  type="button"
                  id="resume-survey-btn"
                  onClick={onResume}
                  className="w-full min-h-[50px] px-6 py-3 bg-[#166534] hover:bg-[#12532b] active:scale-[0.99] text-white font-bold text-base rounded-full shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{content.resumeBtn}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  id="restart-survey-btn"
                  onClick={onStart}
                  className="w-full min-h-[44px] px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{content.restartBtn}</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                id="start-survey-btn"
                onClick={onStart}
                className="w-full min-h-[52px] px-6 py-3.5 bg-[#166534] hover:bg-[#12532b] active:scale-[0.99] text-white font-bold text-lg rounded-full shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{content.startBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Traditional Gamosa woven red border at bottom of card */}
        <div className="w-full mt-auto">
          <GamosaBorder variant="ribbon" />
        </div>
      </div>

      {/* Trust & Local context footer */}
      <div className="mt-4 text-center">
        <p className="text-[12px] text-stone-500 dark:text-stone-400">
          Guwahati • Dibrugarh • Jorhat • Tezpur • Silchar • Nagaon
        </p>
      </div>
    </div>
  );
};
