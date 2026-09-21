export type Language = 'en' | 'as' | 'bn';

export type QuestionType =
  | 'single-choice'
  | 'multi-select'
  | 'open-ended'
  | 'short-answer-college';

export interface MultilingualText {
  en: string;
  as: string;
  bn: string;
}

export interface QuestionOption {
  id: string;
  text: MultilingualText;
  hasCustomInput?: boolean;
}

export interface Question {
  id: number;
  questionNumber: number;
  title: MultilingualText;
  type: QuestionType;
  options?: QuestionOption[];
  maxSelections?: number;
  helperText?: MultilingualText;
  isOptional?: boolean;
}

export type AnswerValue =
  | string
  | string[]
  | {
      type: 'text' | 'voice' | 'video';
      text?: string;
      audioUrl?: string;
      videoUrl?: string;
      duration?: number;
      transcript?: string;
      language?: string;
    }
  | {
      college: string;
      district?: string;
    };

export interface SurveyResponse {
  id: string;
  submittedAt: string;
  completionTimeSeconds: number;
  language: Language;
  college: string;
  district: string;
  region: AssamRegion;
  studyYear: string;
  answers: Record<number, AnswerValue>;
}

export type AssamRegion =
  | 'Upper Assam'
  | 'Central Assam'
  | 'Lower Assam'
  | 'Barak Valley'
  | 'Hill Districts';

export interface AssamDistrictInfo {
  name: string;
  region: AssamRegion;
  hq: string;
  shortCode: string;
}

export interface SurveyState {
  currentQuestionIndex: number; // 0 is welcome, 1-15 are questions, 16 is thank-you
  answers: Record<number, AnswerValue>;
  language: Language;
  startTime: number;
  isCompleted: boolean;
  lastSavedAt: number | null;
}
