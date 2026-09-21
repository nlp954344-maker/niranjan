import React, { useState, useMemo } from 'react';
import { Question, SurveyResponse } from '../../types';
import { INITIAL_QUESTIONS } from '../../data/questions';
import {
  BarChart2,
  Tag,
  Quote,
  Mic,
  Video,
  FileText,
  Play,
  Volume2,
  Sparkles,
  IndianRupee,
  Layers
} from 'lucide-react';

interface DashboardInsightsProps {
  responses: SurveyResponse[];
}

export const DashboardInsights: React.FC<DashboardInsightsProps> = ({ responses }) => {
  const [q11Filter, setQ11Filter] = useState<'all' | 'voice' | 'video' | 'text'>('all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const total = Math.max(1, responses.length);

  // Helper to tally single-choice questions
  const tallySingleChoice = (qNum: number, options: string[]) => {
    const counts: Record<string, number> = {};
    options.forEach((opt) => (counts[opt] = 0));

    responses.forEach((r) => {
      const ans = r.answers[qNum];
      if (typeof ans === 'string') {
        counts[ans] = (counts[ans] || 0) + 1;
      }
    });

    return options.map((opt) => ({
      label: opt,
      count: counts[opt] || 0,
      percent: Math.round(((counts[opt] || 0) / total) * 100)
    }));
  };

  // Helper to tally multi-select questions
  const tallyMultiSelect = (qNum: number, options: string[]) => {
    const counts: Record<string, number> = {};
    options.forEach((opt) => (counts[opt] = 0));

    responses.forEach((r) => {
      const ans = r.answers[qNum];
      if (Array.isArray(ans)) {
        ans.forEach((item) => {
          counts[item] = (counts[item] || 0) + 1;
        });
      }
    });

    return options
      .map((opt) => ({
        label: opt,
        count: counts[opt] || 0,
        percent: Math.round(((counts[opt] || 0) / total) * 100)
      }))
      .sort((a, b) => b.count - a.count); // Ranked
  };

  // Q11 Quotes extract
  const q11Quotes = useMemo(() => {
    const quotes: {
      id: string;
      respondentId: string;
      college: string;
      type: 'text' | 'voice' | 'video';
      text: string;
      duration?: number;
      lang?: string;
    }[] = [];

    responses.forEach((r) => {
      const a = r.answers[11];
      if (!a) return;
      if (typeof a === 'string') {
        quotes.push({
          id: r.id,
          respondentId: r.id,
          college: r.college,
          type: 'text',
          text: a
        });
      } else if (typeof a === 'object') {
        quotes.push({
          id: r.id,
          respondentId: r.id,
          college: r.college,
          type: (a as any).type || 'text',
          text: (a as any).transcript || (a as any).text || '',
          duration: (a as any).duration,
          lang: (a as any).language
        });
      }
    });

    return quotes;
  }, [responses]);

  // Q11 Word Cloud tags
  const wordCloudTags = [
    { text: 'Heavyweight 240 GSM', count: 18, color: '#166534', size: 'text-lg sm:text-xl font-bold' },
    { text: 'Drop-Shoulder Cut', count: 15, color: '#CA8A04', size: 'text-base sm:text-lg font-bold' },
    { text: 'Muga Silk Gold Thread', count: 14, color: '#E0A526', size: 'text-base sm:text-lg font-bold' },
    { text: 'Brahmaputra Wave', count: 12, color: '#0284c7', size: 'text-sm sm:text-base font-semibold' },
    { text: 'Subtle Embroidery', count: 11, color: '#166534', size: 'text-sm sm:text-base font-semibold' },
    { text: 'College Gate Line Sketch', count: 9, color: '#475569', size: 'text-xs sm:text-sm font-medium' },
    { text: 'Streetwear Aesthetic', count: 8, color: '#CA8A04', size: 'text-xs sm:text-sm font-semibold' },
    { text: 'No Neon Rubbery Prints', count: 7, color: '#DC2626', size: 'text-xs sm:text-sm font-semibold' },
    { text: 'Uzanbazar / Panbazar Cafe Wear', count: 6, color: '#166534', size: 'text-xs sm:text-sm font-medium' },
    { text: 'Pre-Shrunk Breathable Cotton', count: 5, color: '#0284c7', size: 'text-xs font-medium' },
    { text: 'Collegiate Varsity Crest', count: 4, color: '#CA8A04', size: 'text-xs font-medium' }
  ];

  const filteredQuotes = q11Quotes.filter((q) => {
    if (q11Filter === 'all') return true;
    return q.type === q11Filter;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
          Question-by-Question Insights
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
          Detailed metrics matched to single choice, multi-select, and voice/video open-ended answers
        </p>
      </div>

      {/* Grid of Question Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Q1: Would you buy a T-shirt representing your college? */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-[#166534] dark:text-emerald-300 uppercase">
              Question 1 • Single Choice
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
              Would you buy a T-shirt representing your college?
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {tallySingleChoice(1, [
              'Definitely yes',
              'Probably yes',
              'Maybe',
              'Probably not',
              'Definitely not'
            ]).map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                  <span>{item.label}</span>
                  <span className="font-bold">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#166534] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Q2: Likelihood of buying if good-quality & stylish */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-[#166534] dark:text-emerald-300 uppercase">
              Question 2 • Single Choice
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
              Likelihood to buy if stylish & designed for students
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {tallySingleChoice(2, [
              'Very likely',
              'Likely',
              'Not sure',
              'Unlikely',
              'Very unlikely'
            ]).map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                  <span>{item.label}</span>
                  <span className="font-bold">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#166534] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Q3: Merchandise Interested In (Ranked Multi-Select) */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-[#805600] dark:text-amber-300 uppercase">
              Question 3 • Ranked Multi-Select
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
              Type of merchandise interested in (Select all that apply)
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {tallyMultiSelect(3, [
              'Oversized T-shirt',
              'Hoodie',
              'Regular-fit T-shirt',
              'Sweatshirt',
              'Cap',
              'Tote bag',
              'Polo T-shirt'
            ]).map((item, idx) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                  <span>
                    #{idx + 1} {item.label}
                  </span>
                  <span className="font-bold">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#166534] to-[#E0A526] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Q4: Preferred Design */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-[#166534] dark:text-emerald-300 uppercase">
              Question 4 • Single Choice
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
              Preferred college T-shirt design style
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {tallySingleChoice(4, [
              'Premium minimal streetwear design',
              'Creative campus illustration',
              'College inside jokes / student culture',
              'College emblem/crest',
              'Minimal college logo',
              'Campus landmarks',
              'College name + logo'
            ]).map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                  <span className="truncate max-w-[240px]">{item.label}</span>
                  <span className="font-bold">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#166534] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Q5: T-Shirt Fit */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-[#166534] dark:text-emerald-300 uppercase">
              Question 5 • Single Choice
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
              Which T-shirt fit would you prefer?
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {tallySingleChoice(5, ['Oversized', 'Regular', 'Relaxed', 'Slim', 'Not sure']).map(
              (item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                    <span>{item.label}</span>
                    <span className="font-bold">
                      {item.count} ({item.percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#166534] rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Q6: Price-range distribution chart with ₹ labels */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-[#166534] dark:text-emerald-300 uppercase">
                Question 6 • Price Distribution
              </span>
              <span className="text-xs font-bold text-[#E0A526] flex items-center gap-0.5">
                <IndianRupee className="w-3 h-3" />
                INR (₹)
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
              What price would you comfortably pay?
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            {tallySingleChoice(6, [
              'Below ₹299',
              '₹299–399',
              '₹400–499',
              '₹500–599',
              '₹600–799',
              '₹800+'
            ]).map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                  <span className="font-mono">{item.label}</span>
                  <span className="font-bold">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#CA8A04] to-[#166534] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Q7: What matters most (Select up to 3) */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-[#805600] dark:text-amber-300 uppercase">
              Question 7 • Priority Factors
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
              What matters most when buying college merch? (Up to 3)
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {tallyMultiSelect(7, [
              'Fabric quality',
              'Design',
              'Fit',
              'Comfort',
              'College identity',
              'Price',
              'Print quality',
              'Durability',
              'Exclusivity',
              'Brand'
            ]).map((item, idx) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                  <span>
                    #{idx + 1} {item.label}
                  </span>
                  <span className="font-bold">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#166534] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Q12: Biggest reason NOT to buy */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 dark:bg-red-950 text-[#DC2626] uppercase">
              Question 12 • Friction Analysis
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
              Biggest reason you might NOT buy college merchandise
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {tallySingleChoice(12, [
              "Design isn't attractive",
              'Poor fabric',
              'Too expensive',
              'Bad fit',
              'Prefer regular fashion brands',
              "Don't need another T-shirt",
              "Don't like wearing college-branded clothing",
              'Lack of trust in the brand'
            ]).map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                  <span className="truncate max-w-[220px]">{item.label}</span>
                  <span className="font-bold">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#DC2626] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Feature: Q11 Open-ended Word Cloud + Student Voice & Video Quotes */}
      <div className="w-full bg-white dark:bg-stone-900 rounded-2xl p-5 sm:p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E0A526]" />
              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
                Question 11 • Voice, Video & Text Student Voices
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              "What would make you look at a college T-shirt and immediately think, 'I want this'?"
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-full text-xs font-semibold">
            <button
              type="button"
              onClick={() => setQ11Filter('all')}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                q11Filter === 'all' ? 'bg-[#166534] text-white' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              All ({q11Quotes.length})
            </button>
            <button
              type="button"
              onClick={() => setQ11Filter('voice')}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer ${
                q11Filter === 'voice' ? 'bg-[#DC2626] text-white' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              <Mic className="w-3 h-3" />
              <span>Voice</span>
            </button>
            <button
              type="button"
              onClick={() => setQ11Filter('video')}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer ${
                q11Filter === 'video' ? 'bg-[#E0A526] text-white' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              <Video className="w-3 h-3" />
              <span>Video</span>
            </button>
            <button
              type="button"
              onClick={() => setQ11Filter('text')}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer ${
                q11Filter === 'text' ? 'bg-stone-800 text-white' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Text</span>
            </button>
          </div>
        </div>

        {/* Word Cloud Visualizer */}
        <div className="bg-[#FFFDF9] dark:bg-stone-950/60 p-4 rounded-xl border border-amber-100 dark:border-stone-800 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 py-6">
          {wordCloudTags.map((tag, idx) => (
            <span
              key={idx}
              style={{ color: tag.color }}
              className={`inline-block px-3 py-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 shadow-2xs hover:scale-105 transition-transform cursor-default ${tag.size}`}
            >
              {tag.text}
            </span>
          ))}
        </div>

        {/* List of Quotes & Transcripts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className="p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/70 dark:border-stone-700/80 flex flex-col justify-between gap-2 text-xs"
            >
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-stone-200/60 dark:border-stone-700">
                <span className="font-bold text-stone-900 dark:text-stone-100 truncate">
                  {quote.college.split(',')[0]}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                  {quote.type === 'voice' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 dark:bg-red-950 text-[#DC2626] rounded-full font-bold text-[10px]">
                      <Mic className="w-3 h-3" />
                      {quote.duration ? `${quote.duration}s Voice` : 'Voice note'}
                    </span>
                  )}
                  {quote.type === 'video' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-[#805600] dark:text-amber-300 rounded-full font-bold text-[10px]">
                      <Video className="w-3 h-3" />
                      {quote.duration ? `${quote.duration}s Video` : 'Video note'}
                    </span>
                  )}
                  {quote.type === 'text' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full font-semibold text-[10px]">
                      <FileText className="w-3 h-3" />
                      Typed
                    </span>
                  )}
                </div>
              </div>

              {/* Quote text / transcript */}
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed italic">
                "{quote.text}"
              </p>

              {/* Simulated Audio preview trigger if voice */}
              {quote.type === 'voice' && (
                <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500">
                  <button
                    type="button"
                    onClick={() =>
                      setPlayingAudioId(playingAudioId === quote.id ? null : quote.id)
                    }
                    className="flex items-center gap-1 font-semibold text-[#166534] dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    {playingAudioId === quote.id ? (
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {playingAudioId === quote.id ? 'Playing audio clip...' : 'Listen to voice note'}
                    </span>
                  </button>
                  <span>{quote.respondentId}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
