import React, { useState } from 'react';
import { SurveyResponse, Question, Language } from '../../types';
import { DashboardOverview } from './DashboardOverview';
import { DashboardInsights } from './DashboardInsights';
import { ResponsesTable } from './ResponsesTable';
import { QuestionsManager } from './QuestionsManager';
import { GamosaBorder } from '../GamosaBorder';
import { TShirtGamosaIcon, AssamRhinoIcon } from '../BrandIcons';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileQuestion,
  Settings,
  ArrowLeft,
  Download,
  Copy,
  Check,
  Moon,
  Sun,
  Shield,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface SurveyDashboardProps {
  responses: SurveyResponse[];
  questions: Question[];
  onUpdateQuestions: (newQuestions: Question[]) => void;
  onResetQuestions: () => void;
  onBackToSurvey: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export type DashboardTab = 'overview' | 'responses' | 'insights' | 'questions' | 'settings';

export const SurveyDashboard: React.FC<SurveyDashboardProps> = ({
  responses,
  questions,
  onUpdateQuestions,
  onResetQuestions,
  onBackToSurvey,
  isDark,
  onToggleDark
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [filteredCollege, setFilteredCollege] = useState<string>('');

  const surveyUrl = window.location.origin;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(surveyUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Real CSV Export
  const handleExportCsv = () => {
    // Header row
    const headers = [
      'Respondent ID',
      'Submitted At',
      'Language',
      'College',
      'District',
      'Region',
      'Study Year',
      'Q1_Represent_College',
      'Q2_Likelihood_Buy',
      'Q3_Merchandise_Types',
      'Q4_Design_Preference',
      'Q5_Fit_Preference',
      'Q6_Price_Comfortable',
      'Q7_Top_Priorities',
      'Q8_Official_Approval',
      'Q9_Pay_More_Premium',
      'Q10_Annual_Quantity',
      'Q11_Want_Factor_Transcript',
      'Q12_Reason_Not_Buy',
      'Q13_Brand_Collection_Interest',
      'Q14_Study_Year',
      'Q15_College_Name'
    ];

    const escapeCsv = (str: any) => {
      if (str === null || str === undefined) return '""';
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = responses.map((r) => {
      const q11Val = r.answers[11];
      let q11Text = '';
      if (typeof q11Val === 'string') {
        q11Text = q11Val;
      } else if (typeof q11Val === 'object' && q11Val) {
        q11Text = (q11Val as any).transcript || (q11Val as any).text || '';
      }

      const q3 = Array.isArray(r.answers[3]) ? (r.answers[3] as string[]).join('; ') : r.answers[3];
      const q7 = Array.isArray(r.answers[7]) ? (r.answers[7] as string[]).join('; ') : r.answers[7];

      return [
        escapeCsv(r.id),
        escapeCsv(r.submittedAt),
        escapeCsv(r.language),
        escapeCsv(r.college),
        escapeCsv(r.district),
        escapeCsv(r.region),
        escapeCsv(r.studyYear),
        escapeCsv(r.answers[1]),
        escapeCsv(r.answers[2]),
        escapeCsv(q3),
        escapeCsv(r.answers[4]),
        escapeCsv(r.answers[5]),
        escapeCsv(r.answers[6]),
        escapeCsv(q7),
        escapeCsv(r.answers[8]),
        escapeCsv(r.answers[9]),
        escapeCsv(r.answers[10]),
        escapeCsv(q11Text),
        escapeCsv(r.answers[12]),
        escapeCsv(r.answers[13]),
        escapeCsv(r.answers[14]),
        escapeCsv(typeof r.answers[15] === 'object' ? (r.answers[15] as any)?.college : r.answers[15])
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `respondr_assam_survey_responses_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
    { id: 'responses', label: 'Responses', icon: Users, badge: responses.length },
    { id: 'questions', label: 'Questions', icon: FileQuestion, badge: questions.length },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col">
      {/* Top Bar with Brand & Back to Survey */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToSurvey}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-[#166534] dark:text-emerald-300 text-xs font-bold transition-all cursor-pointer border border-emerald-200/70 dark:border-emerald-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Take Survey (Student View)</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-700">
            <TShirtGamosaIcon className="w-6 h-6 text-[#166534]" />
            <span className="font-extrabold text-sm tracking-tight text-stone-900 dark:text-stone-50">
              Respondr Admin
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-[#805600] dark:text-amber-300 uppercase">
              Assam 2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleDark}
            className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 flex items-center justify-center text-stone-600 dark:text-stone-300 transition-colors cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-semibold cursor-pointer border border-stone-200 dark:border-stone-700"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share Link'}</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container with Sidebar on Desktop */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full pb-20 md:pb-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-60 shrink-0 p-4 border-r border-stone-200/80 dark:border-stone-800 bg-white/50 dark:bg-stone-900/30">
          <div className="mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3">
              Navigation
            </span>
          </div>

          <nav className="flex flex-col gap-1.5" aria-label="Dashboard Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id as DashboardTab)}
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#166534] text-white shadow-sm shadow-emerald-950/20'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Gamosa aesthetic accent */}
          <div className="mt-auto pt-6">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/60 dark:border-amber-800/50 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#805600] dark:text-amber-300">
                <AssamRhinoIcon className="w-4 h-4" />
                <span>Assam Campus Cohort</span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
                Designed for mobile-first survey responses across Brahmaputra & Barak valleys.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 sm:px-8 max-w-5xl overflow-x-hidden">
          {activeTab === 'overview' && (
            <DashboardOverview
              responses={responses}
              onExportCsv={handleExportCsv}
              onCopyLink={handleCopyLink}
              copiedLink={copiedLink}
              onFilterCollege={(col) => {
                setFilteredCollege(col);
                setActiveTab('responses');
              }}
            />
          )}

          {activeTab === 'insights' && <DashboardInsights responses={responses} />}

          {activeTab === 'responses' && (
            <ResponsesTable
              responses={responses}
              onExportCsv={handleExportCsv}
              onCopyLink={handleCopyLink}
              copiedLink={copiedLink}
              initialCollegeFilter={filteredCollege}
            />
          )}

          {activeTab === 'questions' && (
            <QuestionsManager
              questions={questions}
              onUpdateQuestions={onUpdateQuestions}
              onResetToDefault={onResetQuestions}
            />
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  Survey Settings &amp; Data Controls
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Manage survey accessibility, export datasets, and configure platform settings
                </p>
              </div>

              <div className="flex flex-col gap-4 divide-y divide-stone-100 dark:divide-stone-800 text-xs">
                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-900 dark:text-stone-100">Survey Status</div>
                    <div className="text-stone-500">Currently accepting student responses live</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#166534] dark:text-emerald-300 font-bold uppercase text-[10px]">
                    ● Active
                  </span>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-900 dark:text-stone-100">Download Raw Data</div>
                    <div className="text-stone-500">Includes all 15 question answers, voice transcripts, and timestamps</div>
                  </div>
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="px-3.5 py-1.5 bg-[#166534] text-white font-bold rounded-lg cursor-pointer"
                  >
                    Download CSV
                  </button>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-900 dark:text-stone-100">Appearance</div>
                    <div className="text-stone-500">Toggle light canvas vs dark night variant</div>
                  </div>
                  <button
                    type="button"
                    onClick={onToggleDark}
                    className="px-3.5 py-1.5 bg-stone-100 dark:bg-stone-800 font-semibold rounded-lg cursor-pointer text-stone-800 dark:text-stone-200"
                  >
                    {isDark ? 'Switch to Light' : 'Switch to Dark'}
                  </button>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-900 dark:text-stone-100">Survey URL</div>
                    <div className="text-stone-500">{surveyUrl}</div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded font-semibold text-stone-700 dark:text-stone-300 cursor-pointer"
                  >
                    {copiedLink ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar as requested in prompt: "On mobile, use a bottom navigation bar." */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg border-t border-stone-200/80 dark:border-stone-800 px-2 py-1 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id as DashboardTab)}
              className={`min-h-[48px] px-2 py-1 flex flex-col items-center justify-center gap-0.5 flex-1 transition-colors cursor-pointer ${
                isActive
                  ? 'text-[#166534] dark:text-emerald-400 font-bold'
                  : 'text-stone-500 dark:text-stone-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
