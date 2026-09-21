import React, { useEffect, useState } from 'react';
import { Language } from '../../types';
import { GamosaBorder } from '../GamosaBorder';
import { AssamRhinoIcon, AssamTeaLeafIcon } from '../BrandIcons';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Share2,
  Copy,
  Instagram,
  MessageCircle,
  BarChart3,
  RotateCcw,
  Check
} from 'lucide-react';

interface ThankYouScreenProps {
  language: Language;
  onRestart: () => void;
  onViewDashboard: () => void;
  surveyUrl?: string;
}

export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({
  language,
  onRestart,
  onViewDashboard,
  surveyUrl = window.location.origin
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Launch celebratory confetti with brand colors (#166534 tea green, #E0A526 muga gold, #DC2626 gamosa red)
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#166534', '#E0A526', '#DC2626', '#CA8A04', '#FFFFFF']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const content = {
    en: {
      title: 'Thanks for your response!',
      subtitle: 'Your feedback directly shapes the first student-designed college merchandise line in Assam.',
      shareFriendLine: 'Share it with your friends on campus.',
      whatsapp: 'Share on WhatsApp',
      copyLink: 'Copy link',
      copied: 'Link copied!',
      instagram: 'Share on Instagram',
      viewDashboard: 'View Live Survey Results',
      retake: 'Submit Another Response',
      whatsappMessage:
        "Hey! Fill out this 3-min College T-Shirt Survey for students in Assam so we get actually good merch on campus: " +
        surveyUrl
    },
    as: {
      title: 'আপোনাৰ সঁহাৰিৰ বাবে অশেষ ধন্যবাদ!',
      subtitle: 'আপোনাৰ বহুমূলীয়া মতামতে অসমৰ কেম্পাছসমূহৰ বাবে প্ৰথম ছাত্ৰ-উপযোগী মাৰ্চেণ্ডাইজ গঢ়াত সহায় কৰিব।',
      shareFriendLine: 'কেম্পাছৰ বন্ধু-বান্ধৱীসকলৰ সৈতে শ্বেয়াৰ কৰক।',
      whatsapp: 'হোৱাটছএপত শ্বেয়াৰ কৰক',
      copyLink: 'লিংক কপি কৰক',
      copied: 'লিংক কপি কৰা হ’ল!',
      instagram: 'ইনষ্টাগ্ৰামত শ্বেয়াৰ কৰক',
      viewDashboard: 'জৰীপৰ ফলাফল চাওক',
      retake: 'আন এটা সঁহাৰি দিয়ক',
      whatsappMessage:
        "নমস্কাৰ! অসমৰ কলেজ টি-চাৰ্ট আৰু মাৰ্চেণ্ডাইজৰ এই ৩ মিনিটৰ জৰীপটো পূৰণ কৰক: " +
        surveyUrl
    },
    bn: {
      title: 'আপনার উত্তরের জন্য ধন্যবাদ!',
      subtitle: 'আপনার মতামত আসামের শিক্ষার্থীদের জন্য মানসম্মত কলেজ মার্চেন্ডাইজ তৈরিতে সরাসরি সাহায্য করবে।',
      shareFriendLine: 'ক্যাম্পাসের বন্ধুদের সাথে শেয়ার করুন।',
      whatsapp: 'হোয়াটসঅ্যাপে শেয়ার করুন',
      copyLink: 'লিংক কপি করুন',
      copied: 'লিংক কপি হয়েছে!',
      instagram: 'ইনস্টাগ্রামে শেয়ার করুন',
      viewDashboard: 'লাইভ ফলাফল দেখুন',
      retake: 'আরেকটি উত্তর জমা দিন',
      whatsappMessage:
        "হ্যালো! আসামের কলেজ টি-শার্ট ও মার্চেন্ডাইজ সংক্রান্ত এই জরিপটিতে অংশ নিন: " +
        surveyUrl
    }
  }[language];

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(content.whatsappMessage);
    const url = `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(surveyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareInstagram = () => {
    // Open Instagram or copy caption
    handleCopyLink();
    window.open('https://instagram.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-10 flex flex-col justify-center min-h-[85vh]">
      <div
        id="thank-you-card"
        className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-200/80 dark:border-stone-800 p-6 sm:p-7 text-center relative overflow-hidden flex flex-col items-center"
      >
        <GamosaBorder variant="card-accent" className="absolute top-0 left-0 right-0" />

        {/* Success checkmark animation */}
        <div className="mt-4 mb-3 relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-[#166534] dark:text-emerald-400 shadow-inner">
            <CheckCircle2 className="w-12 h-12 stroke-[2.2] animate-bounce" />
          </div>
        </div>

        {/* Small Rhino and Tea-Leaf illustration motif */}
        <div className="flex items-center justify-center gap-3 my-2 text-stone-700 dark:text-stone-300">
          <div className="p-2 bg-amber-50 dark:bg-amber-950/50 rounded-full border border-amber-200 dark:border-amber-800/60 shadow-2xs">
            <AssamRhinoIcon className="w-7 h-7 text-[#CA8A04]" />
          </div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-full border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <AssamTeaLeafIcon className="w-7 h-7 text-[#166534]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight mt-2 mb-2">
          {content.title}
        </h1>

        {/* Subtitle */}
        <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4">
          {content.subtitle}
        </p>

        {/* Small Line: "Share it with your friends on campus." */}
        <div className="w-full py-2 mb-4 border-y border-stone-100 dark:border-stone-800">
          <p className="text-xs sm:text-sm font-semibold text-[#166534] dark:text-emerald-400">
            {content.shareFriendLine}
          </p>
        </div>

        {/* Social Share Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          {/* Primary: Share on WhatsApp */}
          <button
            type="button"
            id="share-whatsapp-btn"
            onClick={handleShareWhatsApp}
            className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>{content.whatsapp}</span>
          </button>

          {/* Copy Link */}
          <button
            type="button"
            id="copy-link-btn"
            onClick={handleCopyLink}
            className="w-full min-h-[46px] px-5 py-2.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-sm flex items-center justify-center gap-2 border border-stone-200/80 dark:border-stone-700 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                  {content.copied}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-500" />
                <span>{content.copyLink}</span>
              </>
            )}
          </button>

          {/* Share on Instagram */}
          <button
            type="button"
            id="share-instagram-btn"
            onClick={handleShareInstagram}
            className="w-full min-h-[46px] px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F58529]/10 via-[#DD2A7B]/10 to-[#8134AF]/10 hover:from-[#F58529]/20 hover:via-[#DD2A7B]/20 hover:to-[#8134AF]/20 text-stone-800 dark:text-stone-200 font-semibold text-sm flex items-center justify-center gap-2 border border-pink-200/80 dark:border-pink-900/40 transition-all cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-[#DD2A7B]" />
            <span>{content.instagram}</span>
          </button>
        </div>

        <GamosaBorder variant="divider" className="w-full my-4" />

        {/* Dashboard and restart options */}
        <div className="w-full flex flex-col gap-2">
          <button
            type="button"
            onClick={onViewDashboard}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-full bg-[#166534]/10 dark:bg-emerald-950/60 hover:bg-[#166534]/15 text-[#166534] dark:text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#166534]/20 transition-all cursor-pointer"
          >
            <BarChart3 className="w-4 h-4" />
            <span>{content.viewDashboard}</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 py-1 flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{content.retake}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
