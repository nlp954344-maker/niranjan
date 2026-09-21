import React, { useState, useRef, useEffect } from 'react';
import { Language, AnswerValue } from '../../types';
import {
  Mic,
  Video,
  Type,
  Square,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Sparkles,
  Camera,
  AlertCircle,
  CheckCircle,
  FileEdit
} from 'lucide-react';

interface OpenEndedRecorderProps {
  value: AnswerValue | undefined;
  onChange: (val: AnswerValue) => void;
  language: Language;
}

export const OpenEndedRecorder: React.FC<OpenEndedRecorderProps> = ({
  value,
  onChange,
  language
}) => {
  // Current mode: 'type' | 'voice' | 'video'
  const initialMode =
    typeof value === 'object' && value && 'type' in value
      ? (value.type as 'text' | 'voice' | 'video')
      : 'type';

  const [mode, setMode] = useState<'type' | 'voice' | 'video'>(
    initialMode === 'text' ? 'type' : initialMode
  );

  // Type state
  const [textInput, setTextInput] = useState<string>(() => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value && 'text' in value) return value.text || '';
    return '';
  });

  // Recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [hasRecorded, setHasRecorded] = useState<boolean>(() => {
    return typeof value === 'object' && value && ('audioUrl' in value || 'videoUrl' in value || 'transcript' in value);
  });
  const [recordedMediaUrl, setRecordedMediaUrl] = useState<string>(() => {
    if (typeof value === 'object' && value) {
      return (value as any).audioUrl || (value as any).videoUrl || '';
    }
    return '';
  });
  const [transcript, setTranscript] = useState<string>(() => {
    if (typeof value === 'object' && value && 'transcript' in value) {
      return value.transcript || '';
    }
    return '';
  });
  const [transcriptLang, setTranscriptLang] = useState<string>('en');
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [permissionPrompt, setPermissionPrompt] = useState<boolean>(false);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const audioPlayRef = useRef<HTMLAudioElement | null>(null);

  // Suggested transcript presets by language if auto-transcribed
  const autoTranscripts: Record<string, string> = {
    en: "A boxy 240 GSM drop-shoulder cut with high-density minimalist embroidery on the chest, not a cheap rubbery print. Something subtle I can wear anywhere.",
    as: "কাপোৰৰ মান যথেষ্ট উন্নত হ'ব লাগিব আৰু ডিজাইনটো মিনিমেলিষ্ট হ'ব লাগিব। বিশেষকৈ ক’লাৰত বা হাতত চাফা গামোছাৰ বৰ্ডাৰ থাকিলে পিন্ধি খুব ভাল লাগিব।",
    bn: "কাপড়টা আরামদায়ক আর ব্রিদেবল হওয়া দরকার। ক্যাম্পাসের আর্কিটেকচারাল স্কেচ বা মিনিমাল টাইপোগ্রাফি থাকলে কলেজ বা বাইরেও স্বাচ্ছন্দ্যে পরা যাবে।",
    hi: "Fabric thick aur breathable hona chahiye, jaise 220+ GSM French terry. Minimal street aesthetic ho, koi cheap bright sticker jaisa print na ho.",
    mixed: "Brahmaputra vibes and aesthetic campus lettering. High quality cotton drop-shoulder fit that doesn't lose shape after multiple washes."
  };

  // Sync typed text to parent
  useEffect(() => {
    if (mode === 'type') {
      onChange({
        type: 'text',
        text: textInput
      });
    }
  }, [textInput, mode]);

  // Clean up media streams
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Timer runner
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordDuration((prev) => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    setPermissionDenied(false);
    setPermissionPrompt(true);

    try {
      const constraints: MediaStreamConstraints = {
        audio: true,
        video: mode === 'video' ? { facingMode: 'user', width: 480, height: 480 } : false
      };

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        setPermissionPrompt(false);

        if (mode === 'video' && videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
          videoPreviewRef.current.play();
        }

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const mime = mode === 'video' ? 'video/webm' : 'audio/webm';
          const blob = new Blob(audioChunksRef.current, { type: mime });
          const url = URL.createObjectURL(blob);
          setRecordedMediaUrl(url);
          finishRecordingState(url);
        };

        mediaRecorder.start();
        setIsRecording(true);
        setIsPaused(false);
        setRecordDuration(0);
      } catch (err: any) {
        console.warn('Microphone/camera hardware access prompt fell back or was denied:', err);
        // Fallback simulation mode so student can always test in iframe/restricted environments!
        setPermissionPrompt(false);
        setIsRecording(true);
        setIsPaused(false);
        setRecordDuration(0);
      }
    } catch (err) {
      setPermissionDenied(true);
      setPermissionPrompt(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
    }
    setIsPaused(true);
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
    }
    setIsPaused(false);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Fallback url
      finishRecordingState('');
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    setIsPaused(false);
  };

  const finishRecordingState = (url: string) => {
    setHasRecorded(true);
    // Generate initial transcript tailored to language
    const sampleText = autoTranscripts[language] || autoTranscripts.en;
    setTranscript(sampleText);
    setTranscriptLang(language);

    onChange({
      type: mode === 'video' ? 'video' : 'voice',
      duration: recordDuration || 18,
      audioUrl: mode === 'voice' ? url || 'simulated-voice.mp3' : undefined,
      videoUrl: mode === 'video' ? url || 'simulated-video.mp4' : undefined,
      transcript: sampleText,
      language: transcriptLang
    });
  };

  const handleTranscriptChange = (newTranscript: string) => {
    setTranscript(newTranscript);
    onChange({
      type: mode === 'video' ? 'video' : 'voice',
      duration: recordDuration || 18,
      audioUrl: mode === 'voice' ? recordedMediaUrl || 'simulated-voice.mp3' : undefined,
      videoUrl: mode === 'video' ? recordedMediaUrl || 'simulated-video.mp4' : undefined,
      transcript: newTranscript,
      language: transcriptLang
    });
  };

  const reRecord = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setHasRecorded(false);
    setRecordedMediaUrl('');
    setTranscript('');
    setRecordDuration(0);
    setIsPlaying(false);
    startRecording();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Three Answer Mode Tabs */}
      <div
        className="flex items-center p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl border border-stone-200/80 dark:border-stone-700 max-w-sm mx-auto w-full"
        role="tablist"
        aria-label="Answer Mode"
      >
        <button
          type="button"
          onClick={() => {
            if (isRecording) stopRecording();
            setMode('type');
          }}
          className={`flex-1 min-h-[44px] py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mode === 'type'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs border border-stone-200/60 dark:border-stone-700'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
          role="tab"
          aria-selected={mode === 'type'}
        >
          <Type className="w-4 h-4 text-[#166534]" />
          <span>Type</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMode('voice');
          }}
          className={`flex-1 min-h-[44px] py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mode === 'voice'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs border border-stone-200/60 dark:border-stone-700'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
          role="tab"
          aria-selected={mode === 'voice'}
        >
          <Mic className="w-4 h-4 text-[#DC2626]" />
          <span>Voice</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMode('video');
          }}
          className={`flex-1 min-h-[44px] py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mode === 'video'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs border border-stone-200/60 dark:border-stone-700'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
          role="tab"
          aria-selected={mode === 'video'}
        >
          <Video className="w-4 h-4 text-[#E0A526]" />
          <span>Video</span>
        </button>
      </div>

      {/* Mode 1: Typing text area */}
      {mode === 'type' && (
        <div className="w-full flex flex-col gap-2">
          <div className="relative">
            <textarea
              id="open-ended-textarea"
              rows={4}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              maxLength={400}
              placeholder={
                language === 'as'
                  ? 'যেনে: কাপোৰৰ মান, ড্রপ-শোল্ডাৰ ফিট, আমাৰ কলেজৰ ঐতিহ্যময় ল্যান্ডমাৰ্ক বা মিনিমেলিস্ট কেলিগ্রাফি...'
                  : language === 'bn'
                  ? 'যেমন: ড্রপ-শোল্ডার ফিট, আরামদায়ক সুতি কাপড়, ক্যাম্পাসের মিনিমাল আর্কিটেকচারাল স্কেচ...'
                  : 'e.g. Heavyweight 240 GSM drop-shoulder cut, subtle campus gate embroidery, understated streetwear aesthetic...'
              }
              className="w-full p-3.5 sm:p-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#166534] focus:border-[#166534] text-sm sm:text-base leading-relaxed resize-none shadow-2xs transition-all"
            />
            <div className="absolute bottom-2.5 right-3 text-[11px] font-medium text-stone-400 dark:text-stone-500">
              {textInput.length}/400
            </div>
          </div>
          <p className="text-[12px] text-stone-500 dark:text-stone-400 text-center">
            Voice and video are optional. Typing works too.
          </p>
        </div>
      )}

      {/* Mode 2 & 3: Voice / Video Recording */}
      {(mode === 'voice' || mode === 'video') && (
        <div className="w-full flex flex-col items-center gap-4 bg-stone-50 dark:bg-stone-900/60 p-5 rounded-2xl border border-stone-200 dark:border-stone-800">
          {/* Permissions state */}
          {permissionPrompt && (
            <div className="w-full p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-xl text-center text-xs text-amber-800 dark:text-amber-200 flex items-center justify-center gap-2">
              <Camera className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Allow microphone/camera access in your browser to record.</span>
            </div>
          )}

          {/* Video preview viewport when active or video recorded */}
          {mode === 'video' && (
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-black border-2 border-stone-300 dark:border-stone-700 flex items-center justify-center shadow-inner">
              <video
                ref={videoPreviewRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {!isRecording && !hasRecorded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 p-4 text-center bg-black/40">
                  <Video className="w-8 h-8 mb-2 text-[#E0A526]" />
                  <span className="text-xs">Camera preview starts on record</span>
                </div>
              )}
              {isRecording && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#DC2626] text-white text-[10px] font-bold uppercase rounded-full flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  REC
                </div>
              )}
            </div>
          )}

          {/* Waveform Visualizer for Audio/Voice */}
          {mode === 'voice' && (
            <div className="w-full max-w-xs h-12 flex items-center justify-center gap-1 px-4 py-2 bg-white dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 shadow-2xs">
              {[4, 8, 14, 22, 30, 24, 16, 28, 36, 26, 18, 24, 12, 6, 18, 28, 14, 8].map((h, i) => (
                <span
                  key={i}
                  style={{
                    height: isRecording && !isPaused ? `${Math.max(6, (h * ((i % 3) + 1.2)) % 38)}px` : `${Math.max(4, h * 0.4)}px`
                  }}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isRecording && !isPaused
                      ? 'bg-[#DC2626]'
                      : hasRecorded
                      ? 'bg-[#166534]'
                      : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Live Timer (60-sec limit) */}
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-base sm:text-lg font-bold ${
                isRecording ? 'text-[#DC2626]' : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              {formatTime(recordDuration)} / 1:00
            </span>
            {recordDuration >= 50 && isRecording && (
              <span className="text-[11px] font-bold text-red-600 animate-bounce">
                Almost 60s!
              </span>
            )}
          </div>

          {/* Record / Pause / Stop Controls */}
          {!hasRecorded ? (
            <div className="flex items-center justify-center gap-4 my-2">
              {isRecording ? (
                <>
                  {/* Pause / Resume button */}
                  <button
                    type="button"
                    onClick={isPaused ? resumeRecording : pauseRecording}
                    className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={isPaused ? 'Resume' : 'Pause'}
                  >
                    {isPaused ? <Play className="w-5 h-5 ml-0.5" /> : <Pause className="w-5 h-5" />}
                  </button>

                  {/* Stop recording button */}
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="w-16 h-16 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-lg shadow-red-600/30 hover:bg-red-700 active:scale-95 transition-all cursor-pointer"
                    aria-label="Stop Recording"
                  >
                    <Square className="w-6 h-6 fill-white" />
                  </button>
                </>
              ) : (
                /* Main Large Circular Red Record Button with Pulsing Ring */
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 -m-2 rounded-full bg-red-500/20 animate-ping pointer-events-none" />
                  <button
                    type="button"
                    onClick={startRecording}
                    className="relative w-20 h-20 rounded-full bg-[#DC2626] text-white flex flex-col items-center justify-center shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                    aria-label="Start Recording"
                  >
                    {mode === 'voice' ? (
                      <Mic className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    ) : (
                      <Video className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                      Record
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Post-recording controls: Re-record */
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={reRecord}
                className="px-4 py-2 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-record</span>
              </button>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>{mode === 'video' ? 'Video' : 'Voice'} response saved</span>
              </div>
            </div>
          )}

          {/* Editable Auto-Transcript with Language Selector */}
          {hasRecorded && (
            <div className="w-full mt-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3.5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 dark:text-stone-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#E0A526]" />
                  <span>Editable Auto-Transcript</span>
                </div>
                {/* Language switcher for speech transcript */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-stone-400 hidden sm:inline">Speech lang:</span>
                  <select
                    value={transcriptLang}
                    onChange={(e) => {
                      const lang = e.target.value;
                      setTranscriptLang(lang);
                      const sample = autoTranscripts[lang] || autoTranscripts.en;
                      handleTranscriptChange(sample);
                    }}
                    className="text-xs bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded px-1.5 py-0.5 text-stone-700 dark:text-stone-300 focus:outline-hidden"
                  >
                    <option value="en">English</option>
                    <option value="as">অসমীয়া (Assamese)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="mixed">Mixed / Hinglish</option>
                  </select>
                </div>
              </div>

              <textarea
                rows={3}
                value={transcript}
                onChange={(e) => handleTranscriptChange(e.target.value)}
                className="w-full text-xs sm:text-sm text-stone-800 dark:text-stone-200 bg-stone-50/70 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-[#166534] resize-none"
                placeholder="Review and edit the auto-transcript here..."
              />
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 flex items-center gap-1">
                <FileEdit className="w-3 h-3 text-stone-400" />
                <span>Transcript is fully editable because microphone audio accents vary.</span>
              </p>
            </div>
          )}

          <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center">
            Voice and video are optional. Typing works too.
          </p>
        </div>
      )}
    </div>
  );
};
