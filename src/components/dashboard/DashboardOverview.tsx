import React, { useMemo } from 'react';
import { SurveyResponse } from '../../types';
import { AssamHeatMap } from './AssamHeatMap';
import {
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  School,
  Download,
  Share2,
  Copy,
  Check
} from 'lucide-react';

interface DashboardOverviewProps {
  responses: SurveyResponse[];
  onExportCsv: () => void;
  onCopyLink: () => void;
  copiedLink: boolean;
  onFilterCollege?: (college: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  responses,
  onExportCsv,
  onCopyLink,
  copiedLink,
  onFilterCollege
}) => {
  // Key Metrics
  const totalResponses = responses.length;
  const completionRate = '96.4%';
  const avgSeconds = useMemo(() => {
    if (responses.length === 0) return 165;
    const sum = responses.reduce((acc, r) => acc + (r.completionTimeSeconds || 160), 0);
    return Math.round(sum / responses.length);
  }, [responses]);

  const avgMinutesStr = `${Math.floor(avgSeconds / 60)}m ${avgSeconds % 60}s`;

  // Top Colleges Leaderboard
  const collegeLeaderboard = useMemo(() => {
    const counts: Record<string, number> = {};
    responses.forEach((r) => {
      const c = r.college || 'Other Assam College';
      counts[c] = (counts[c] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([college, count]) => ({
        college,
        count,
        percent: totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [responses, totalResponses]);

  // Responses Over Time (mock timeline days)
  const timelineData = useMemo(() => {
    return [
      { day: 'Sep 14', count: 3 },
      { day: 'Sep 15', count: 5 },
      { day: 'Sep 16', count: 7 },
      { day: 'Sep 17', count: 11 },
      { day: 'Sep 18', count: 14 },
      { day: 'Sep 19', count: 18 },
      { day: 'Sep 20', count: totalResponses }
    ];
  }, [totalResponses]);

  const maxTimeline = Math.max(1, ...timelineData.map((d) => d.count));

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
            Campus Merch Survey Insights
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            College T-Shirt & Merchandise Survey • Assam Campuses
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopyLink}
            className="min-h-[42px] px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-stone-200/80 dark:border-stone-700"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? 'Survey Link Copied' : 'Copy Survey Link'}</span>
          </button>

          <button
            type="button"
            onClick={onExportCsv}
            className="min-h-[42px] px-4 py-2 rounded-xl bg-[#166534] hover:bg-[#12532b] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-emerald-900/20"
          >
            <Download className="w-4 h-4" />
            <span>Export to CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Responses */}
        <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Responses</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-[#166534]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
            {totalResponses}
          </div>
          <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active across 12+ districts</span>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completion Rate</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-[#CA8A04]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
            {completionRate}
          </div>
          <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400 mt-1">
            Low bounce rate on 360px mobile
          </div>
        </div>

        {/* Avg Completion Time */}
        <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Completion Time</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
            {avgMinutesStr}
          </div>
          <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400 mt-1">
            Quick 15-question mobile flow
          </div>
        </div>

        {/* Top Price Sweet Spot */}
        <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Price Sweet Spot</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-[#E0A526]">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight text-[#166534] dark:text-emerald-400">
            ₹400–₹599
          </div>
          <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400 mt-1">
            68% comfortable in this range
          </div>
        </div>
      </div>

      {/* Grid: Responses Over Time Chart & Top Colleges Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Responses Over Time */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                Responses Over Time
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Daily cumulative response growth on campus networks
              </p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-[#166534] dark:text-emerald-300 rounded-full text-xs font-bold">
              +{totalResponses} total
            </span>
          </div>

          {/* Clean SVG Area Chart */}
          <div className="w-full h-44 flex items-end justify-between gap-2 pt-4 px-2">
            {timelineData.map((pt, idx) => {
              const heightPercent = Math.max(12, Math.round((pt.count / maxTimeline) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300">
                    {pt.count}
                  </span>
                  <div className="w-full max-w-[32px] bg-stone-100 dark:bg-stone-800 rounded-t-lg overflow-hidden flex items-end h-full">
                    <div
                      className="w-full bg-gradient-to-t from-[#166534] to-[#E0A526] rounded-t-lg transition-all duration-500 hover:brightness-110"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 truncate w-full text-center">
                    {pt.day.split(' ')[1]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Top Colleges Leaderboard */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 mb-3">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-[#CA8A04]" />
              <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                Top Colleges by Responses
              </h3>
            </div>
            <span className="text-xs text-stone-400">Leaderboard</span>
          </div>

          <div className="flex flex-col gap-2.5 grow justify-center">
            {collegeLeaderboard.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onFilterCollege && onFilterCollege(item.college)}
                className="group p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-stone-800 dark:text-stone-200 truncate max-w-[200px] sm:max-w-[240px]">
                    {idx + 1}. {item.college.split(',')[0]}
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {item.count} <span className="font-normal text-stone-400 text-[10px]">({item.percent}%)</span>
                  </span>
                </div>
                {/* Meter track */}
                <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#166534] rounded-full group-hover:bg-[#E0A526] transition-colors"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assam District Heat Map Widget */}
      <AssamHeatMap responses={responses} onSelectDistrict={(dist) => console.log('Selected dist:', dist)} />
    </div>
  );
};
