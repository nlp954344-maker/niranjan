import React, { useState, useMemo } from 'react';
import { SurveyResponse, Language, Question } from '../../types';
import { ASSAM_DISTRICTS } from '../../data/assamData';
import { INITIAL_QUESTIONS } from '../../data/questions';
import {
  Search,
  Filter,
  Eye,
  Download,
  Copy,
  Check,
  X,
  Mic,
  Video,
  FileText,
  Calendar,
  School,
  MapPin,
  Clock,
  Play,
  Volume2
} from 'lucide-react';

interface ResponsesTableProps {
  responses: SurveyResponse[];
  onExportCsv: () => void;
  onCopyLink: () => void;
  copiedLink: boolean;
  initialCollegeFilter?: string;
}

export const ResponsesTable: React.FC<ResponsesTableProps> = ({
  responses,
  onExportCsv,
  onCopyLink,
  copiedLink,
  initialCollegeFilter = ''
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCollege, setSelectedCollege] = useState<string>(initialCollegeFilter);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedLang, setSelectedLang] = useState<string>('');
  const [viewingResponse, setViewingResponse] = useState<SurveyResponse | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Extract unique colleges
  const uniqueColleges = useMemo(() => {
    const set = new Set<string>();
    responses.forEach((r) => {
      if (r.college) set.add(r.college);
    });
    return Array.from(set).sort();
  }, [responses]);

  // Unique years
  const studyYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year / Integrated', 'Postgraduate'];

  // Filter logic
  const filteredResponses = useMemo(() => {
    return responses.filter((r) => {
      // Search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchId = r.id.toLowerCase().includes(term);
        const matchCol = r.college.toLowerCase().includes(term);
        const matchDist = r.district.toLowerCase().includes(term);
        if (!matchId && !matchCol && !matchDist) return false;
      }

      // College filter
      if (selectedCollege && r.college !== selectedCollege) {
        return false;
      }

      // District filter
      if (selectedDistrict && r.district !== selectedDistrict) {
        return false;
      }

      // Year filter
      if (selectedYear && r.studyYear !== selectedYear) {
        return false;
      }

      // Language filter
      if (selectedLang && r.language !== selectedLang) {
        return false;
      }

      return true;
    });
  }, [responses, searchTerm, selectedCollege, selectedDistrict, selectedYear, selectedLang]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCollege('');
    setSelectedDistrict('');
    setSelectedYear('');
    setSelectedLang('');
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Individual Student Responses
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Showing {filteredResponses.length} of {responses.length} total entries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopyLink}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-stone-200 dark:border-stone-700"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
          </button>
          <button
            type="button"
            onClick={onExportCsv}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#166534] hover:bg-[#12532b] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#166534]" />
            <span>Filter Responses</span>
          </div>
          {(searchTerm || selectedCollege || selectedDistrict || selectedYear || selectedLang) && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-red-600 hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search ID, college, district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-[#166534]"
            />
          </div>

          {/* College Filter */}
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden"
          >
            <option value="">All Colleges ({uniqueColleges.length})</option>
            {uniqueColleges.map((c) => (
              <option key={c} value={c}>
                {c.split(',')[0]}
              </option>
            ))}
          </select>

          {/* District Filter */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden"
          >
            <option value="">All Districts</option>
            {ASSAM_DISTRICTS.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Study Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden"
          >
            <option value="">All Study Years</option>
            {studyYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Language Used Filter */}
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden"
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="as">অসমীয়া (Assamese)</option>
            <option value="bn">বাংলা (Bengali)</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700 dark:text-stone-300">
            <thead className="bg-stone-50 dark:bg-stone-800/80 text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider text-[11px] border-b border-stone-200 dark:border-stone-700">
              <tr>
                <th className="px-4 py-3">Respondent ID</th>
                <th className="px-4 py-3">College</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Study Year</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Q11 Mode</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filteredResponses.map((r) => {
                const q11 = r.answers[11];
                const modeType = typeof q11 === 'object' && q11 ? (q11 as any).type : 'text';

                return (
                  <tr
                    key={r.id}
                    className="hover:bg-stone-50/80 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    <td className="px-4 py-3.5 font-mono font-bold text-stone-900 dark:text-stone-100 whitespace-nowrap">
                      {r.id}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-stone-800 dark:text-stone-200 max-w-[200px] truncate">
                      {r.college.split(',')[0]}
                    </td>
                    <td className="px-4 py-3.5 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                      {r.district}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-semibold">
                        {r.studyYear}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-stone-500 whitespace-nowrap">
                      {formatDate(r.submittedAt)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {modeType === 'voice' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950 text-[#DC2626] font-bold text-[10px]">
                          <Mic className="w-3 h-3" />
                          Voice
                        </span>
                      )}
                      {modeType === 'video' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-[#CA8A04] font-bold text-[10px]">
                          <Video className="w-3 h-3" />
                          Video
                        </span>
                      )}
                      {modeType === 'text' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-semibold text-[10px]">
                          <FileText className="w-3 h-3" />
                          Type
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setViewingResponse(r)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 text-[#166534] dark:text-emerald-300 font-bold text-xs flex items-center gap-1 ml-auto cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredResponses.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-stone-400 text-xs italic">
                    No responses matching the chosen filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal for Full Answer Set */}
      {viewingResponse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#166534] dark:text-emerald-400">
                    {viewingResponse.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[11px] font-semibold text-stone-600 dark:text-stone-300">
                    {viewingResponse.studyYear}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase">
                    {viewingResponse.language}
                  </span>
                </div>
                <div className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                  <span>{viewingResponse.college}</span>
                  <span>•</span>
                  <span>{viewingResponse.district}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingResponse(null)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 flex items-center justify-center text-stone-600 dark:text-stone-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: All 15 Answers */}
            <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 divide-y divide-stone-100 dark:divide-stone-800">
              {INITIAL_QUESTIONS.map((q) => {
                const ans = viewingResponse.answers[q.id];
                return (
                  <div key={q.id} className="pt-3 first:pt-0 flex flex-col gap-1.5">
                    <div className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      {q.questionNumber}. {q.title.en}
                    </div>

                    {/* Render answer value depending on format */}
                    <div className="text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/60 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-700">
                      {/* Q11 Open-ended voice/video/text */}
                      {q.id === 11 ? (
                        <div className="flex flex-col gap-2">
                          {typeof ans === 'object' && ans && 'type' in ans && (
                            <div className="flex items-center gap-2">
                              {(ans as any).type === 'voice' && (
                                <span className="inline-flex items-center gap-1 text-[#DC2626] font-bold">
                                  <Mic className="w-3.5 h-3.5" /> Voice Recording ({(ans as any).duration || 20}s)
                                </span>
                              )}
                              {(ans as any).type === 'video' && (
                                <span className="inline-flex items-center gap-1 text-[#CA8A04] font-bold">
                                  <Video className="w-3.5 h-3.5" /> Video Response ({(ans as any).duration || 25}s)
                                </span>
                              )}
                            </div>
                          )}

                          <p className="italic font-medium text-stone-900 dark:text-stone-100">
                            "{typeof ans === 'object' && ans ? (ans as any).transcript || (ans as any).text : ans}"
                          </p>

                          {typeof ans === 'object' && ans && (ans as any).type === 'voice' && (
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                type="button"
                                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                                className="px-3 py-1 bg-[#166534] text-white rounded-full text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                              >
                                {isPlayingAudio ? <Volume2 className="w-3 h-3 animate-pulse" /> : <Play className="w-3 h-3" />}
                                <span>{isPlayingAudio ? 'Playing' : 'Play Audio'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ) : q.id === 15 && typeof ans === 'object' && ans ? (
                        /* Q15 college */
                        <span>
                          {(ans as any).college} (District: {(ans as any).district || 'N/A'})
                        </span>
                      ) : Array.isArray(ans) ? (
                        /* Multi-select */
                        <div className="flex flex-wrap gap-1">
                          {ans.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#166534] dark:text-emerald-300 font-semibold"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        /* Single choice */
                        <span className="font-semibold text-[#166534] dark:text-emerald-400">
                          {String(ans || 'No response recorded')}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
