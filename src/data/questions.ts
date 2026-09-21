import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 1,
    questionNumber: 1,
    title: {
      en: 'Would you buy a T-shirt representing your college?',
      as: 'আপোনাৰ কলেজক প্ৰতিনিধিত্ব কৰা টি-চাৰ্ট এখন কিনিবনে?',
      bn: 'আপনি কি আপনার কলেজকে প্রতিনিধিত্ব করে এমন একটি টি-শার্ট কিনবেন?'
    },
    type: 'single-choice',
    options: [
      { id: '1-1', text: { en: 'Definitely yes', as: 'নিশ্চয় কিনিম', bn: 'অবশ্যই হ্যাঁ' } },
      { id: '1-2', text: { en: 'Probably yes', as: 'সম্ভৱতঃ কিনিম', bn: 'সম্ভবত হ্যাঁ' } },
      { id: '1-3', text: { en: 'Maybe', as: 'কিনিবও পাৰোঁ', bn: 'হতেও পারে' } },
      { id: '1-4', text: { en: 'Probably not', as: 'সম্ভৱতঃ নকিনো', bn: 'সম্ভবত না' } },
      { id: '1-5', text: { en: 'Definitely not', as: 'একেবাৰে নকিনো', bn: 'একেবারেই না' } }
    ]
  },
  {
    id: 2,
    questionNumber: 2,
    title: {
      en: 'If your college had a good-quality, stylish T-shirt designed specifically for students, how likely would you be to buy one?',
      as: 'যদি আপোনাৰ কলেজৰ বাবে ছাত্ৰ-ছাত্ৰী উপযোগী উন্নত মানৰ আৰু ষ্টাইলিশ টি-চাৰ্ট থাকে, আপুনি কিনাৰ সম্ভাৱনা কিমান?',
      bn: 'যদি আপনার কলেজের জন্য শিক্ষার্থীদের উপযোগী ভালো মানের এবং স্টাইলিশ টি-শার্ট থাকত, আপনি কেনার সম্ভাবনা কতটা?'
    },
    type: 'single-choice',
    options: [
      { id: '2-1', text: { en: 'Very likely', as: 'খুব সম্ভাৱনা আছে', bn: 'খুব বেশি সম্ভাবনা' } },
      { id: '2-2', text: { en: 'Likely', as: 'সম্ভাৱনা আছে', bn: 'সম্ভাবনা আছে' } },
      { id: '2-3', text: { en: 'Not sure', as: 'নিশ্চিত নহয়', bn: 'নিশ্চিত নই' } },
      { id: '2-4', text: { en: 'Unlikely', as: 'সম্ভাৱনা কম', bn: 'সম্ভাবনা কম' } },
      { id: '2-5', text: { en: 'Very unlikely', as: 'একেবাৰে সম্ভাৱনা নাই', bn: 'একেবারেই সম্ভাবনা নেই' } }
    ]
  },
  {
    id: 3,
    questionNumber: 3,
    title: {
      en: 'What type of college merchandise would you be interested in? Select all that apply.',
      as: 'আপুনি কি ধৰণৰ কলেজ মাৰ্চেণ্ডাইজত আগ্ৰহী? প্ৰযোজ্য সকলোবোৰ বাছক।',
      bn: 'আপনি কোন ধরনের কলেজ মার্চেন্ডাইজে আগ্রহী? প্রযোজ্য সব নির্বাচন করুন।'
    },
    helperText: {
      en: 'Select all that you would personally wear or use',
      as: 'আপুনি পিন্ধিব বা ব্যৱহাৰ কৰিব বিচৰা সকলো বাছক',
      bn: 'আপনি ব্যবহার বা পরতে চান এমন সব নির্বাচন করুন'
    },
    type: 'multi-select',
    options: [
      { id: '3-1', text: { en: 'Oversized T-shirt', as: 'ওভাৰছাইজড টি-চাৰ্ট', bn: 'ওভারসাইজড টি-শার্ট' } },
      { id: '3-2', text: { en: 'Regular-fit T-shirt', as: 'ৰেগুলাৰ-ফিট টি-চাৰ্ট', bn: 'রেগুলার-ফিট টি-শার্ট' } },
      { id: '3-3', text: { en: 'Polo T-shirt', as: 'প’লো টি-চাৰ্ট', bn: 'পোলো টি-শার্ট' } },
      { id: '3-4', text: { en: 'Hoodie', as: 'হুডী', bn: 'হুডি' } },
      { id: '3-5', text: { en: 'Sweatshirt', as: 'ছুৱেটচাৰ্ট', bn: 'সোয়েটশার্ট' } },
      { id: '3-6', text: { en: 'Cap', as: 'টুপী (Cap)', bn: 'টুপি (Cap)' } },
      { id: '3-7', text: { en: 'Tote bag', as: 'টোট বেগ (Tote bag)', bn: 'টোট ব্যাগ (Tote bag)' } },
      { id: '3-8', text: { en: 'Other', as: 'অন্যান্য', bn: 'অন্যান্য' }, hasCustomInput: true }
    ]
  },
  {
    id: 4,
    questionNumber: 4,
    title: {
      en: 'What kind of college T-shirt design would you prefer?',
      as: 'আপুনি কেনে ধৰণৰ কলেজ টি-চাৰ্ট ডিজাইন পছন্দ কৰিব?',
      bn: 'আপনি কী ধরনের কলেজ টি-শার্ট ডিজাইন পছন্দ করবেন?'
    },
    type: 'single-choice',
    options: [
      { id: '4-1', text: { en: 'Minimal college logo', as: 'মিনিমেলিষ্ট কলেজ ল’গ’', bn: 'মিনিমাল কলেজ লোগো' } },
      { id: '4-2', text: { en: 'College name + logo', as: 'কলেজৰ নাম + ল’গ’', bn: 'কলেজের নাম + লোগো' } },
      { id: '4-3', text: { en: 'College emblem/crest', as: 'কলেজ এমব্লেম বা প্ৰতীক', bn: 'কলেজ এমব্লেম বা প্রতীক' } },
      { id: '4-4', text: { en: 'Creative campus illustration', as: 'কেম্পাছৰ ক্ৰিয়েটিভ চিত্ৰাংকন', bn: 'ক্যাম্পাসের সৃজনশীল চিত্রাঙ্কন' } },
      { id: '4-5', text: { en: 'Campus landmarks', as: 'কেম্পাছৰ চিনাকি স্থানসমূহ', bn: 'ক্যাম্পাসের ল্যান্ডমার্ক' } },
      { id: '4-6', text: { en: 'College inside jokes / student culture', as: 'কলেজৰ ছাত্ৰ সংস্কৃতি / ইনচাইড জোক্স', bn: 'কলেজের ছাত্র সংস্কৃতি / ইনসাইড জোকস' } },
      { id: '4-7', text: { en: 'Premium minimal streetwear design', as: 'প্ৰিমিয়াম মিনিমাল ষ্ট্ৰীটৱেৰ ডিজাইন', bn: 'প্রিমিয়াম মিনিমাল স্ট্রিটওয়্যার ডিজাইন' } },
      { id: '4-8', text: { en: 'Other', as: 'অন্যান্য', bn: 'অন্যান্য' }, hasCustomInput: true }
    ]
  },
  {
    id: 5,
    questionNumber: 5,
    title: {
      en: 'Which T-shirt fit would you prefer?',
      as: 'আপুনি কোনটো টি-চাৰ্ট ফিট বেছি পছন্দ কৰিব?',
      bn: 'কোন টি-শার্ট ফিট আপনার সবচেয়ে পছন্দ?'
    },
    type: 'single-choice',
    options: [
      { id: '5-1', text: { en: 'Oversized', as: 'ওভাৰছাইজড (Oversized)', bn: 'ওভারসাইজড (Oversized)' } },
      { id: '5-2', text: { en: 'Regular', as: 'ৰেগুলাৰ (Regular)', bn: 'রেগুলার (Regular)' } },
      { id: '5-3', text: { en: 'Relaxed', as: 'ৰিলাক্সড (Relaxed)', bn: 'রিল্যাক্সড (Relaxed)' } },
      { id: '5-4', text: { en: 'Slim', as: 'শ্লিম (Slim)', bn: 'স্লিম (Slim)' } },
      { id: '5-5', text: { en: 'Not sure', as: 'নিশ্চিত নহয়', bn: 'নিশ্চিত নই' } }
    ]
  },
  {
    id: 6,
    questionNumber: 6,
    title: {
      en: 'What price would you comfortably pay for a good-quality college T-shirt?',
      as: 'ভাল গুণমানৰ কলেজ টি-চাৰ্টৰ বাবে আপুনি সহজে কিমান দাম দিবলৈ সাজু?',
      bn: 'ভালো মানের কলেজ টি-শার্টের জন্য আপনি স্বাচ্ছন্দ্যে কত টাকা দিতে প্রস্তুত?'
    },
    type: 'single-choice',
    options: [
      { id: '6-1', text: { en: 'Below ₹299', as: '₹২৯৯ ৰ তলত', bn: '₹২৯৯ এর নিচে' } },
      { id: '6-2', text: { en: '₹299–399', as: '₹২৯৯–৩৯৯', bn: '₹২৯৯–৩৯৯' } },
      { id: '6-3', text: { en: '₹400–499', as: '₹৪০০–৪৯৯', bn: '₹৪০০–৪৯৯' } },
      { id: '6-4', text: { en: '₹500–599', as: '₹৫০০–৫৯৯', bn: '₹৫০০–৫৯৯' } },
      { id: '6-5', text: { en: '₹600–799', as: '₹৬০০–৭৯৯', bn: '₹৬০০–৭৯৯' } },
      { id: '6-6', text: { en: '₹800+', as: '₹৮০০+', bn: '₹৮০০+' } }
    ]
  },
  {
    id: 7,
    questionNumber: 7,
    title: {
      en: 'What matters most when buying college merchandise? Select up to 3.',
      as: 'কলেজ মাৰ্চেণ্ডাইজ কিনাৰ সময়ত আপোনাৰ বাবে কি আটাইতকৈ গুৰুত্বপূৰ্ণ? সৰ্বাধিক ৩ টা বাছক।',
      bn: 'কলেজ মার্চেন্ডাইজ কেনার সময় আপনার কাছে সবচেয়ে গুরুত্বপূর্ণ কী? সর্বোচ্চ ৩টি নির্বাচন করুন।'
    },
    helperText: {
      en: 'Choose up to 3 priority factors',
      as: 'প্ৰয়োজনীয় ৩ টা মুখ্য কাৰণ বাছক',
      bn: 'সর্বোচ্চ ৩টি গুরুত্বপূর্ণ কারণ নির্বাচন করুন'
    },
    maxSelections: 3,
    type: 'multi-select',
    options: [
      { id: '7-1', text: { en: 'Design', as: 'ডিজাইন (Design)', bn: 'ডিজাইন (Design)' } },
      { id: '7-2', text: { en: 'Fabric quality', as: 'কাপোৰৰ মান (Fabric quality)', bn: 'কাপড়ের মান (Fabric quality)' } },
      { id: '7-3', text: { en: 'Fit', as: 'ফিটিং (Fit)', bn: 'ফিটিং (Fit)' } },
      { id: '7-4', text: { en: 'Price', as: 'দাম (Price)', bn: 'দাম (Price)' } },
      { id: '7-5', text: { en: 'College identity', as: 'কলেজৰ পৰিচয় (College identity)', bn: 'কলেজের পরিচয় (College identity)' } },
      { id: '7-6', text: { en: 'Print quality', as: 'প্ৰিণ্টৰ মান (Print quality)', bn: 'প্রিন্টের মান (Print quality)' } },
      { id: '7-7', text: { en: 'Comfort', as: 'আৰামদায়ক (Comfort)', bn: 'আরাম (Comfort)' } },
      { id: '7-8', text: { en: 'Brand', as: 'ব্ৰেণ্ড (Brand)', bn: 'ব্র্যান্ড (Brand)' } },
      { id: '7-9', text: { en: 'Exclusivity', as: 'অনন্যতা (Exclusivity)', bn: 'স্বতন্ত্রতা (Exclusivity)' } },
      { id: '7-10', text: { en: 'Durability', as: 'স্থায়িত্ব (Durability)', bn: 'স্থায়িত্ব (Durability)' } }
    ]
  },
  {
    id: 8,
    questionNumber: 8,
    title: {
      en: 'How important is it that the merchandise is officially approved or associated with your college?',
      as: 'মাৰ্চেণ্ডাইজটো আপোনাৰ কলেজৰ দ্বাৰা আনুষ্ঠানিকভাৱে স্বীকৃত বা জড়িত হোৱাটো কিমান গুৰুত্বপূৰ্ণ?',
      bn: 'মার্চেন্ডাইজটি আপনার কলেজের দ্বারা আনুষ্ঠানিকভাবে অনুমোদিত বা সম্পর্কিত হওয়া কতটা জরুরি?'
    },
    type: 'single-choice',
    options: [
      { id: '8-1', text: { en: 'Very important', as: 'অতি গুৰুত্বপূৰ্ণ', bn: 'খুব গুরুত্বপূর্ণ' } },
      { id: '8-2', text: { en: 'Somewhat important', as: 'কিছু পৰিমাণে গুৰুত্বপূৰ্ণ', bn: 'কিছুটা গুরুত্বপূর্ণ' } },
      { id: '8-3', text: { en: 'Neutral', as: 'বিশেষ গুৰুত্বপূৰ্ণ নহয়', bn: 'নিরপেক্ষ' } },
      { id: '8-4', text: { en: 'Not very important', as: 'বৰ বিশেষ প্ৰয়োজন নাই', bn: 'তেমন গুরুত্বপূর্ণ নয়' } },
      { id: '8-5', text: { en: 'Not important at all', as: 'একেবাৰেই গুৰুত্বপূৰ্ণ নহয়', bn: 'একেবারেই জরুরি নয়' } }
    ]
  },
  {
    id: 9,
    questionNumber: 9,
    title: {
      en: 'If the T-shirt had a premium design and better fabric instead of being a basic college-logo T-shirt, would you pay more?',
      as: 'সাধাৰণ কলেজ ল’গ’ টি-চাৰ্টৰ সলনি যদি প্ৰিমিয়াম ডিজাইন আৰু উন্নত ফেব্ৰিক থাকে, আপুনি বেছি টকা দিবনে?',
      bn: 'সাধারণ কলেজ লোগো টি-শার্টের বদলে যদি প্রিমিয়াম ডিজাইন ও আরও ভালো কাপড় থাকে, আপনি কি বেশি দাম দিতে রাজি?'
    },
    type: 'single-choice',
    options: [
      { id: '9-1', text: { en: 'Yes', as: 'হয় (Yes)', bn: 'হ্যাঁ (Yes)' } },
      { id: '9-2', text: { en: 'Maybe', as: 'হব পাৰে (Maybe)', bn: 'হতে পারে (Maybe)' } },
      { id: '9-3', text: { en: 'No', as: 'নহয় (No)', bn: 'না (No)' } }
    ]
  },
  {
    id: 10,
    questionNumber: 10,
    title: {
      en: 'How many college T-shirts would you potentially buy in a year?',
      as: 'বছৰত আপুনি সম্ভৱতঃ কিমানখন কলেজ টি-চাৰ্ট কিনিব পাৰে?',
      bn: 'এক বছরে আপনি সম্ভবত কয়টি কলেজ টি-শার্ট কিনতে পারেন?'
    },
    type: 'single-choice',
    options: [
      { id: '10-1', text: { en: '0', as: '০', bn: '০' } },
      { id: '10-2', text: { en: '1', as: '১', bn: '১' } },
      { id: '10-3', text: { en: '2', as: '২', bn: '২' } },
      { id: '10-4', text: { en: '3', as: '৩', bn: '৩' } },
      { id: '10-5', text: { en: '4+', as: '৪+', bn: '৪+' } }
    ]
  },
  {
    id: 11,
    questionNumber: 11,
    title: {
      en: 'What would make you look at a college T-shirt and immediately think, "I want this"?',
      as: 'কলেজ টি-চাৰ্ট এখন দেখি আপোনাৰ তৎক্ষণাৎ "মোক এইটো লাগে" বুলি ভবাবলৈ কিহে আকৰ্ষিত কৰিব?',
      bn: 'একটি কলেজ টি-শার্ট দেখে সাথে সাথে "এটা আমার চাই" ভাবতে আপনাকে কী আকৃষ্ট করবে?'
    },
    helperText: {
      en: 'Voice and video are optional. Typing works too.',
      as: 'ভইচ আৰু ভিডিঅ’ বৈকল্পিক। টাইপ কৰিলেও হ’ব।',
      bn: 'ভয়েস এবং ভিডিও ঐচ্ছিক। টাইপ করলেও চলবে।'
    },
    type: 'open-ended',
    isOptional: false
  },
  {
    id: 12,
    questionNumber: 12,
    title: {
      en: 'What is the biggest reason you might NOT buy college merchandise?',
      as: 'কলেজ মাৰ্চেণ্ডাইজ নকিনাৰ আটাইতকৈ ডাঙৰ কাৰণটো কি হ’ব পাৰে?',
      bn: 'কলেজ মার্চেন্ডাইজ না কেনার সবচেয়ে বড় কারণ কী হতে পারে?'
    },
    type: 'single-choice',
    options: [
      { id: '12-1', text: { en: 'Too expensive', as: 'অত্যধিক দাম', bn: 'খুব বেশি দাম' } },
      { id: '12-2', text: { en: "Design isn't attractive", as: 'ডিজাইনটো আকৰ্ষণীয় নহয়', bn: 'ডিজাইন আকর্ষণীয় নয়' } },
      { id: '12-3', text: { en: 'Poor fabric', as: 'কাপোৰৰ গুণমান বেয়া', bn: 'কাপড়ের মান খারাপ' } },
      { id: '12-4', text: { en: 'Bad fit', as: 'ফিটিং বেয়া', bn: 'খারাপ ফিটিং' } },
      { id: '12-5', text: { en: "Don't like wearing college-branded clothing", as: 'কলেজ ব্ৰেণ্ডযুক্ত কাপোৰ পিন্ধি ভাল নাপাওঁ', bn: 'কলেজ ব্র্যান্ডের পোশাক পরতে ভালো লাগে না' } },
      { id: '12-6', text: { en: "Don't need another T-shirt", as: 'আৰু টি-চাৰ্টৰ প্ৰয়োজন নাই', bn: 'আর টি-শার্টের প্রয়োজন নেই' } },
      { id: '12-7', text: { en: 'Prefer regular fashion brands', as: 'নিয়মীয়া ফেশ্বন ব্ৰেণ্ড বেছি পছন্দ কৰোঁ', bn: 'সাধারণ ফ্যাশন ব্র্যান্ড বেশি পছন্দ করি' } },
      { id: '12-8', text: { en: 'Lack of trust in the brand', as: 'ব্ৰেণ্ডটোৰ প্ৰতি বিশ্বাসৰ অভাৱ', bn: 'ব্র্যান্ডের প্রতি আস্থার অভাব' } },
      { id: '12-9', text: { en: 'Other', as: 'অন্যান্য', bn: 'অন্যান্য' }, hasCustomInput: true }
    ]
  },
  {
    id: 13,
    questionNumber: 13,
    title: {
      en: 'If a student-focused brand launched premium college merchandise specifically for your college, would you want to see the collection?',
      as: 'যদি কোনো ছাত্ৰ-কেন্দ্ৰিক ব্ৰেণ্ডে বিশেষভাৱে আপোনাৰ কলেজৰ বাবে প্ৰিমিয়াম মাৰ্চেণ্ডাইজ লন্স কৰে, আপুনি কালেকচনটো চাব বিচাৰিবনে?',
      bn: 'যদি কোনও ছাত্র-কেন্দ্রিক ব্র্যান্ড বিশেষভাবে আপনার কলেজের জন্য প্রিমিয়াম মার্চেন্ডাইজ আনে, আপনি কি কালেকশন দেখতে চাইবেন?'
    },
    type: 'single-choice',
    options: [
      { id: '13-1', text: { en: 'Yes, definitely', as: 'হয়, নিশ্চিতভাৱে', bn: 'হ্যাঁ, অবশ্যই' } },
      { id: '13-2', text: { en: "Yes, I'd check it out", as: 'হয়, এবাৰ চাই চাম', bn: 'হ্যাঁ, একবার দেখব' } },
      { id: '13-3', text: { en: 'Maybe', as: 'হব পাৰে', bn: 'হতে পারে' } },
      { id: '13-4', text: { en: 'No', as: 'নহয়', bn: 'না' } }
    ]
  },
  {
    id: 14,
    questionNumber: 14,
    title: {
      en: 'Which year are you currently studying?',
      as: 'আপুনি বৰ্তমান কোন বৰ্ষত পঢ়ি আছে?',
      bn: 'আপনি বর্তমানে কোন বর্ষে অধ্যয়নরত?'
    },
    type: 'single-choice',
    options: [
      { id: '14-1', text: { en: '1st Year', as: 'প্ৰথম বৰ্ষ (1st Year)', bn: 'প্রথম বর্ষ (1st Year)' } },
      { id: '14-2', text: { en: '2nd Year', as: 'দ্বিতীয় বৰ্ষ (2nd Year)', bn: 'দ্বিতীয় বর্ষ (2nd Year)' } },
      { id: '14-3', text: { en: '3rd Year', as: 'তৃতীয় বৰ্ষ (3rd Year)', bn: 'তৃতীয় বর্ষ (3rd Year)' } },
      { id: '14-4', text: { en: '4th Year', as: 'চতুৰ্থ বৰ্ষ (4th Year)', bn: 'চতুর্থ বর্ষ (4th Year)' } },
      { id: '14-5', text: { en: '5th Year / Integrated', as: 'পঞ্চম বৰ্ষ / ইন্টিগ্ৰেটেড', bn: 'পঞ্চম বর্ষ / ইন্টিগ্রেটেড' } },
      { id: '14-6', text: { en: 'Postgraduate', as: 'স্নাতকোত্তৰ (PG)', bn: 'স্নাতকোত্তর (PG)' } }
    ]
  },
  {
    id: 15,
    questionNumber: 15,
    title: {
      en: 'What is your college name?',
      as: 'আপোনাৰ কলেজৰ নাম কি?',
      bn: 'আপনার কলেজের নাম কী?'
    },
    helperText: {
      en: 'Type to search Assam universities and colleges, or enter manually',
      as: 'অসমৰ কলেজ বা বিশ্ববিদ্যালয় বিচাৰক, বা নিজে লিখক',
      bn: 'আসামের কলেজ বা বিশ্ববিদ্যালয় অনুসন্ধান করুন, বা নিজে লিখুন'
    },
    type: 'short-answer-college'
  }
];
