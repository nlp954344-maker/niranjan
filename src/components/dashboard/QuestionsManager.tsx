import React, { useState } from 'react';
import { Question, Language, QuestionType } from '../../types';
import {
  ArrowUp,
  ArrowDown,
  Edit2,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Check,
  Globe,
  Layers,
  HelpCircle
} from 'lucide-react';

interface QuestionsManagerProps {
  questions: Question[];
  onUpdateQuestions: (newQuestions: Question[]) => void;
  onResetToDefault: () => void;
}

export const QuestionsManager: React.FC<QuestionsManagerProps> = ({
  questions,
  onUpdateQuestions,
  onResetToDefault
}) => {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [activeTab, setActiveTab] = useState<Language>('en');
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [showSavedNotification, setShowSavedNotification] = useState<boolean>(false);

  // New question draft
  const [newTitleEn, setNewTitleEn] = useState<string>('');
  const [newTitleAs, setNewTitleAs] = useState<string>('');
  const [newTitleBn, setNewTitleBn] = useState<string>('');
  const [newType, setNewType] = useState<QuestionType>('single-choice');
  const [newOptionsText, setNewOptionsText] = useState<string>('Option 1 | Option 2 | Option 3');

  // Move question up
  const moveUp = (index: number) => {
    if (index === 0) return;
    const list = [...questions];
    const temp = list[index];
    list[index] = list[index - 1];
    list[index - 1] = temp;
    // Re-index questionNumber
    list.forEach((q, i) => (q.questionNumber = i + 1));
    onUpdateQuestions(list);
    triggerSaved();
  };

  // Move question down
  const moveDown = (index: number) => {
    if (index === questions.length - 1) return;
    const list = [...questions];
    const temp = list[index];
    list[index] = list[index + 1];
    list[index + 1] = temp;
    // Re-index questionNumber
    list.forEach((q, i) => (q.questionNumber = i + 1));
    onUpdateQuestions(list);
    triggerSaved();
  };

  const deleteQuestion = (id: number) => {
    if (questions.length <= 3) {
      alert('Must keep at least 3 questions in the survey.');
      return;
    }
    const updated = questions.filter((q) => q.id !== id);
    updated.forEach((q, i) => (q.questionNumber = i + 1));
    onUpdateQuestions(updated);
    triggerSaved();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    const updated = questions.map((q) => (q.id === editingQuestion.id ? editingQuestion : q));
    onUpdateQuestions(updated);
    setEditingQuestion(null);
    triggerSaved();
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleEn.trim()) return;

    const opts = newOptionsText
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((opt, i) => ({
        id: `${Date.now()}-${i}`,
        text: { en: opt, as: opt, bn: opt }
      }));

    const newQ: Question = {
      id: Date.now(),
      questionNumber: questions.length + 1,
      title: {
        en: newTitleEn,
        as: newTitleAs || newTitleEn,
        bn: newTitleBn || newTitleEn
      },
      type: newType,
      options: opts.length > 0 ? opts : undefined
    };

    onUpdateQuestions([...questions, newQ]);
    setIsAddingNew(false);
    setNewTitleEn('');
    setNewTitleAs('');
    setNewTitleBn('');
    triggerSaved();
  };

  const triggerSaved = () => {
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 2500);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Survey Questions &amp; Multilingual Translations
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Edit wording, reorder sequence, add custom questions, and maintain translations in English, অসমীয়া, and বাংলা
          </p>
        </div>

        <div className="flex items-center gap-2">
          {showSavedNotification && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 animate-pulse">
              <Check className="w-3.5 h-3.5" /> Changes saved
            </span>
          )}
          <button
            type="button"
            onClick={onResetToDefault}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-stone-200 dark:border-stone-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default 15 Questions</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddingNew(true)}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#166534] hover:bg-[#12532b] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Language preview switcher for managing translations */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-stone-500">Preview Translation:</span>
        <div className="flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-full text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('en')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeTab === 'en' ? 'bg-[#166534] text-white' : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('as')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeTab === 'as' ? 'bg-[#166534] text-white' : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            অসমীয়া (Assamese)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bn')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeTab === 'bn' ? 'bg-[#166534] text-white' : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            বাংলা (Bengali)
          </button>
        </div>
      </div>

      {/* Question List */}
      <div className="flex flex-col gap-3">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-200 transition-all"
          >
            <div className="flex items-start gap-3 grow">
              {/* Question Number Badge */}
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-[#166534] dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {q.questionNumber}
              </div>

              <div className="flex flex-col gap-1 grow">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                    {q.type}
                  </span>
                  {q.isOptional && (
                    <span className="text-[10px] text-amber-600 font-medium">Optional</span>
                  )}
                </div>

                <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {q.title[activeTab] || q.title.en}
                </div>

                {q.options && q.options.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {q.options.slice(0, 5).map((opt) => (
                      <span
                        key={opt.id}
                        className="px-2 py-0.5 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700 text-[10px] text-stone-600 dark:text-stone-300"
                      >
                        {opt.text[activeTab] || opt.text.en}
                      </span>
                    ))}
                    {q.options.length > 5 && (
                      <span className="text-[10px] text-stone-400 self-center">
                        +{q.options.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions: Reorder & Edit */}
            <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => moveUp(idx)}
                className="w-8 h-8 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 disabled:opacity-30 flex items-center justify-center cursor-pointer text-stone-600 dark:text-stone-300"
                aria-label="Move question up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={idx === questions.length - 1}
                onClick={() => moveDown(idx)}
                className="w-8 h-8 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 disabled:opacity-30 flex items-center justify-center cursor-pointer text-stone-600 dark:text-stone-300"
                aria-label="Move question down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setEditingQuestion({ ...q })}
                className="w-8 h-8 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-emerald-50 hover:border-emerald-300 flex items-center justify-center cursor-pointer text-[#166534] dark:text-emerald-400"
                aria-label="Edit question"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => deleteQuestion(q.id)}
                className="w-8 h-8 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-red-50 hover:border-red-300 flex items-center justify-center cursor-pointer text-red-600"
                aria-label="Delete question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveEdit}
            className="w-full max-w-xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 flex flex-col gap-4"
          >
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Edit Question {editingQuestion.questionNumber}
            </h3>

            {/* English Title */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Question Text (English)
              </label>
              <input
                type="text"
                value={editingQuestion.title.en}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    title: { ...editingQuestion.title, en: e.target.value }
                  })
                }
                className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-[#166534]"
                required
              />
            </div>

            {/* Assamese Title */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                অসমীয়া অনুবাদ (Assamese Translation)
              </label>
              <input
                type="text"
                value={editingQuestion.title.as}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    title: { ...editingQuestion.title, as: e.target.value }
                  })
                }
                className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-[#166534]"
              />
            </div>

            {/* Bengali Title */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                বাংলা অনুবাদ (Bengali Translation)
              </label>
              <input
                type="text"
                value={editingQuestion.title.bn}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    title: { ...editingQuestion.title, bn: e.target.value }
                  })
                }
                className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-[#166534]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#166534] text-white text-xs font-bold shadow-sm cursor-pointer hover:bg-[#12532b]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add New Question Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <form
            onSubmit={handleCreateQuestion}
            className="w-full max-w-xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 flex flex-col gap-4"
          >
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Add New Survey Question
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Question Text (English)
              </label>
              <input
                type="text"
                value={newTitleEn}
                onChange={(e) => setNewTitleEn(e.target.value)}
                placeholder="e.g. Which college fest merchandise do you like?"
                className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-[#166534]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                অসমীয়া অনুবাদ (Assamese)
              </label>
              <input
                type="text"
                value={newTitleAs}
                onChange={(e) => setNewTitleAs(e.target.value)}
                placeholder="অসমীয়া অনুবাদ লিখক..."
                className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-[#166534]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Question Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as QuestionType)}
                className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm focus:outline-hidden"
              >
                <option value="single-choice">Single Choice (Radio)</option>
                <option value="multi-select">Multi-Select (Checkboxes)</option>
                <option value="open-ended">Open-Ended (Type / Voice / Video)</option>
                <option value="short-answer-college">Short Answer (College Autocomplete)</option>
              </select>
            </div>

            {(newType === 'single-choice' || newType === 'multi-select') && (
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                  Options (separated by |)
                </label>
                <input
                  type="text"
                  value={newOptionsText}
                  onChange={(e) => setNewOptionsText(e.target.value)}
                  placeholder="Option 1 | Option 2 | Option 3"
                  className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-[#166534]"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#166534] text-white text-xs font-bold shadow-sm cursor-pointer hover:bg-[#12532b]"
              >
                Add to Survey
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
