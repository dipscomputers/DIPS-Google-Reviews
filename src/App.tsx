/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  REVIEWS_DATA,
  ReviewItem,
  GOOGLE_REVIEW_URL,
} from './data/reviews';
import {
  Star,
  Copy,
  ExternalLink,
  RotateCw,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Check,
  BadgeCheck,
  Quote,
} from 'lucide-react';

const STORAGE_KEY = 'dips_used_reviews_simple';

// Authentic Google "G" Icon
function GoogleGIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.13z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

// Customer avatar initials for authentic Google Review appearance
const AVATAR_INITIALS = ['अ', 'र', 'स', 'म', 'व', 'क', 'प', 'न', 'द', 'ग'];
const AVATAR_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
];

export default function App() {
  // Used review IDs in localStorage so reviews NEVER repeat
  const [usedReviewIds, setUsedReviewIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Category filter: 'all' | 'csc' | 'computer' | 'online'
  const [category, setCategory] = useState<'all' | 'csc' | 'computer' | 'online'>('all');

  // Currently displayed review
  const [currentReview, setCurrentReview] = useState<ReviewItem | null>(null);

  // Subtle 3D Card flip animation state
  const [isFlipping, setIsFlipping] = useState(false);

  // Status message after copying
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // In-card copy only feedback
  const [cardCopied, setCardCopied] = useState(false);

  // In-app Reset confirmation state (avoiding window.confirm in iframe)
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Save used reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usedReviewIds));
    } catch (e) {
      console.error(e);
    }
  }, [usedReviewIds]);

  const usedSet = useMemo(() => new Set(usedReviewIds), [usedReviewIds]);

  // Filter available unused reviews
  const availableReviews = useMemo(() => {
    return REVIEWS_DATA.filter((r) => {
      if (usedSet.has(r.id)) return false;
      if (category === 'all') return true;
      return r.category === category;
    });
  }, [category, usedSet]);

  // Total reviews count
  const totalReviews = REVIEWS_DATA.length;
  const usedCount = usedReviewIds.length;
  const progressPercent = Math.min(100, Math.round((usedCount / totalReviews) * 100));

  // Category counts
  const categoryCounts = useMemo(() => {
    const csc = REVIEWS_DATA.filter((r) => r.category === 'csc').length;
    const computer = REVIEWS_DATA.filter((r) => r.category === 'computer').length;
    const online = REVIEWS_DATA.filter((r) => r.category === 'online').length;
    return { all: totalReviews, csc, computer, online };
  }, [totalReviews]);

  // Pick next unused review
  const getNextReview = (excludeId?: number) => {
    if (availableReviews.length === 0) {
      setCurrentReview(null);
      return;
    }
    const pool =
      excludeId && availableReviews.length > 1
        ? availableReviews.filter((r) => r.id !== excludeId)
        : availableReviews;

    const randomIndex = Math.floor(Math.random() * pool.length);
    setCurrentReview(pool[randomIndex] || pool[0] || null);
  };

  // Sync active review on change or start
  useEffect(() => {
    if (!currentReview || usedSet.has(currentReview.id)) {
      getNextReview();
    } else if (category !== 'all' && currentReview.category !== category) {
      getNextReview();
    }
  }, [category, availableReviews, currentReview, usedSet]);

  // Safe clipboard copy using execCommand to prevent iframe extension bridge timeouts
  const copyToClipboard = (text: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (copied) return;
    } catch {
      // execCommand fallback
    }

    // Non-blocking fire-and-forget fallback without await
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        navigator.clipboard.writeText(text).catch(() => {});
      } catch {
        // Ignore clipboard errors
      }
    }
  };

  // Main Action: Copy text & directly open Google Review Link
  const handleCopyAndOpen = (e: React.MouseEvent) => {
    if (isFlipping) {
      e.preventDefault();
      return;
    }

    if (!currentReview) return;

    const reviewText = currentReview.text;
    const reviewId = currentReview.id;

    // 1. Copy to clipboard synchronously without blocking
    copyToClipboard(reviewText);

    // 2. Mark as used so it never repeats
    setUsedReviewIds((prev) => (prev.includes(reviewId) ? prev : [...prev, reviewId]));

    // 3. Trigger celebratory confetti & toast
    try {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'],
      });
    } catch {}

    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 3800);

    // 4. Instantly show next fresh review with smooth flip
    handleNextReviewWithFlip(reviewId);
  };

  // Quick In-Card Copy Only
  const handleQuickCardCopy = () => {
    if (!currentReview) return;
    copyToClipboard(currentReview.text);
    setCardCopied(true);
    setTimeout(() => setCardCopied(false), 2000);
  };

  // Flip animation handler when 'दुसरा रिव्ह्यू' is clicked
  const handleNextReviewWithFlip = (excludeId?: number) => {
    if (isFlipping) return;
    setIsFlipping(true);

    // At midpoint of flip (190ms), switch review text seamlessly
    setTimeout(() => {
      getNextReview(excludeId ?? currentReview?.id);
    }, 190);

    // Conclude flip animation
    setTimeout(() => {
      setIsFlipping(false);
    }, 410);
  };

  // Execute in-app reset
  const executeReset = () => {
    setUsedReviewIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setShowResetConfirm(false);
    getNextReview();
  };

  // Consistent avatar for review ID
  const avatarIndex = currentReview ? (currentReview.id % AVATAR_INITIALS.length) : 0;
  const avatarColorIndex = currentReview ? (currentReview.id % AVATAR_COLORS.length) : 0;
  const avatarLetter = AVATAR_INITIALS[avatarIndex];
  const avatarColor = AVATAR_COLORS[avatarColorIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-[#f4f7fb] to-[#e8edf5] text-slate-800 flex flex-col items-center justify-start p-3 sm:p-4 pt-2.5 sm:pt-3.5 pb-10 sm:pb-8 relative overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 font-['Noto_Sans_Devanagari',sans-serif]">
      {/* Background Decorative Ambient Radial Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[540px] h-[340px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md mx-auto flex flex-col relative z-10 space-y-3 sm:space-y-3.5">

        {/* 1. Header: Professional Google Verified Business Badge */}
        <header className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden shrink-0">
          {/* Authentic Google 4-Color Signature Accent Bar */}
          <div className="h-1.5 w-full flex">
            <div className="flex-1 bg-[#4285F4]" />
            <div className="flex-1 bg-[#EA4335]" />
            <div className="flex-1 bg-[#FBBC05]" />
            <div className="flex-1 bg-[#34A853]" />
          </div>

          <div className="px-3.5 py-2.5 sm:py-3 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {/* Google G Logo Emblem */}
              <div className="w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                <GoogleGIcon className="w-5 h-5" />
              </div>

              {/* Business Name and Rating Details */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                    DIPs Computers
                  </h1>
                  <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-50 shrink-0" />
                </div>

                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span className="text-slate-700 font-semibold">शिरपूर जैन</span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center text-amber-500 font-bold gap-0.5">
                    <span>4.9</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-medium whitespace-nowrap">450+ रिव्ह्यूज</span>
                </div>
              </div>
            </div>

            {/* Google Verified Status Badge */}
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-[10.5px] font-bold text-emerald-700 shadow-2xs font-['Plus_Jakarta_Sans',sans-serif]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified</span>
              </span>
            </div>
          </div>
        </header>

        {/* 2. Category Navigation Tabs */}
        <div>
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/80 backdrop-blur-xs rounded-xl text-xs font-semibold">
            <button
              onClick={() => setCategory('all')}
              className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer truncate text-[11.5px] sm:text-xs ${
                category === 'all'
                  ? 'bg-white text-blue-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              सर्व ({categoryCounts.all})
            </button>

            <button
              onClick={() => setCategory('computer')}
              className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer truncate text-[11.5px] sm:text-xs ${
                category === 'computer'
                  ? 'bg-white text-blue-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              कम्प्युटर
            </button>

            <button
              onClick={() => setCategory('online')}
              className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer truncate text-[11.5px] sm:text-xs ${
                category === 'online'
                  ? 'bg-white text-blue-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ऑनलाइन
            </button>

            <button
              onClick={() => setCategory('csc')}
              className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer truncate text-[11.5px] sm:text-xs ${
                category === 'csc'
                  ? 'bg-white text-blue-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CSC सेवा
            </button>
          </div>
        </div>

        {/* 3. Copied Success Toast Message */}
        {copiedSuccess && (
          <div className="p-2.5 sm:p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-md flex items-center justify-between gap-2 text-xs font-medium animate-fadeIn">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-4.5 h-4.5 text-white shrink-0" />
              <div className="truncate">
                <div className="font-bold text-white text-xs sm:text-sm">रिव्ह्यू कॉपी झाला! ✅</div>
                <div className="text-emerald-100 text-[10.5px] truncate">
                  गुगल पेज उघडत आहे, तिथे पेस्ट करा.
                </div>
              </div>
            </div>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-[10.5px] shrink-0 border border-white/30 flex items-center gap-1 no-underline font-['Plus_Jakarta_Sans',sans-serif] active:scale-95 transition-all"
            >
              <span>Google Page</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* 4. The Hero: Authentic Google Review Card (Enlarged & Prominent) */}
        <div className="w-full" style={{ perspective: '1000px' }}>
          {currentReview ? (
            <div
              className={`bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_14px_36px_-8px_rgba(15,23,42,0.08),0_4px_14px_-3px_rgba(15,23,42,0.03)] flex flex-col justify-between min-h-[220px] sm:min-h-[245px] transition-all relative overflow-hidden ${
                isFlipping ? 'animate-card-flip' : ''
              }`}
            >
              {/* Authentic Google 4-Color Signature Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 flex z-10">
                <div className="flex-1 bg-[#4285F4]" />
                <div className="flex-1 bg-[#EA4335]" />
                <div className="flex-1 bg-[#FBBC05]" />
                <div className="flex-1 bg-[#34A853]" />
              </div>

              {/* Subtle ambient card glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Header: Reviewer Profile + Google Official Badge */}
                <div className="flex items-start justify-between gap-2.5 mb-3.5 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    {/* Customer Avatar with subtle ring & verified tick */}
                    <div className="relative">
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${avatarColor} text-white font-bold text-sm sm:text-base flex items-center justify-center shadow-xs ring-2 ring-white shrink-0`}
                      >
                        {avatarLetter}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-2xs">
                        <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-50" />
                      </div>
                    </div>

                    <div>
                      <div className="text-[13px] sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        <span>स्थानिक ग्राहक</span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100">
                          Verified
                        </span>
                      </div>
                      <div className="text-[11px] sm:text-[11.5px] text-slate-400 font-medium">
                        शिरपूर जैन • DIPs Computers
                      </div>
                    </div>
                  </div>

                  {/* Google Review Badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 shadow-2xs shrink-0">
                    <GoogleGIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] font-bold text-slate-700 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      Review
                    </span>
                  </div>
                </div>

                {/* Main Review Text: Larger Font, Generous Height & Typography */}
                <div className="py-3.5 sm:py-5 min-h-[100px] sm:min-h-[115px] flex items-center relative my-1">
                  <Quote className="w-9 h-9 text-slate-200/90 absolute -top-1 -left-2 pointer-events-none rotate-180" />
                  <p className="relative z-1 text-[16.5px] sm:text-[18px] font-semibold text-slate-800 leading-relaxed sm:leading-[1.75] select-all tracking-normal">
                    "{currentReview.text}"
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer: Category tag & Quick copy pill */}
              <div className="pt-3 sm:pt-3.5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  <span className="font-semibold text-slate-700 text-[11px] sm:text-[11.5px]">
                    {currentReview.categoryTitle}
                  </span>
                </div>

                {/* Quick copy in card & open Google */}
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleQuickCardCopy}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 no-underline font-['Plus_Jakarta_Sans',sans-serif] ${
                    cardCopied
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-2xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-200 shadow-2xs'
                  }`}
                  title="Copy review & open Google"
                >
                  {cardCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy</span>
                    </>
                  )}
                </a>
              </div>
            </div>
          ) : (
            /* All Completed State */
            <div className="bg-white border border-slate-200 rounded-3xl p-6 text-center shadow-md">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-2.5 shadow-xs">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                सर्व {totalReviews} रिव्ह्यू संपले आहेत! 🎉
              </h3>
              <p className="text-xs text-slate-500 mb-3.5">
                सर्व रिव्ह्यूज वापरले गेले आहेत. पुन्हा नव्याने सुरू करण्यासाठी खालील बटण दाबा.
              </p>
              <button
                onClick={executeReset}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                नव्याने सुरू करा (Reset Reviews)
              </button>
            </div>
          )}
        </div>

        {/* 5. The 2 Main Action Buttons: In English with Clean, Modern Styling */}
        {currentReview && (
          <div className="space-y-2.5 pt-0.5">
            {/* Primary 1-Click Action: Copy & Open Google Review Link */}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCopyAndOpen}
              className={`w-full h-12.5 sm:h-13.5 px-4 sm:px-5 rounded-2xl flex items-center justify-between text-white no-underline select-none cursor-pointer transition-all duration-200 active:scale-[0.98] font-['Plus_Jakarta_Sans',sans-serif] ${
                copiedSuccess
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-[#1a73e8] via-[#1b66c9] to-[#0d47a1] shadow-md shadow-blue-500/25 hover:brightness-105'
              } ${isFlipping ? 'pointer-events-none opacity-80' : ''}`}
            >
              {/* Left: Icon Badge */}
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/25 shrink-0">
                {copiedSuccess ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-white animate-bounce" />
                ) : (
                  <Copy className="w-4.5 h-4.5 text-white" />
                )}
              </div>

              {/* Center: English Bold Title */}
              <div className="flex-1 text-center font-bold text-[14.5px] sm:text-base tracking-tight drop-shadow-xs">
                {copiedSuccess
                  ? 'Copied! Opening Google...'
                  : 'Copy & Open Google Review'}
              </div>

              {/* Right: External Link Indicator */}
              <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                <ExternalLink className="w-3.5 h-3.5 text-white/90" />
              </div>
            </a>

            {/* Secondary: Next Review in English */}
            <button
              onClick={() => handleNextReviewWithFlip()}
              disabled={isFlipping}
              className="w-full h-11 sm:h-12 px-3.5 rounded-xl sm:rounded-2xl bg-white border border-slate-300 hover:border-blue-400 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 font-['Plus_Jakarta_Sans',sans-serif]"
            >
              <RotateCw
                className={`w-3.5 h-3.5 text-blue-600 transition-transform duration-500 ${
                  isFlipping ? 'rotate-180' : ''
                }`}
              />
              <span>Show Next Review</span>
              <span className="text-slate-400 font-normal">↻</span>
            </button>
          </div>
        )}

        {/* 6. Footer: Progress Bar & Reset Action */}
        <footer className="pt-2 sm:pt-2.5 border-t border-slate-200/90 flex flex-col gap-1.5 text-[11px] text-slate-500 relative">
          <div className="flex items-center justify-between text-[11px] pr-28 sm:pr-0">
            <div>
              वापरलेले रिव्ह्यू:{' '}
              <strong className="text-slate-900 tabular-nums">{usedCount}</strong> / {totalReviews}
              <span className="text-slate-400 ml-1">({progressPercent}%)</span>
            </div>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-[11px] text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer font-medium"
              title="सर्व रिव्ह्यू नव्याने सुरू करा"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>रीसेट करा</span>
            </button>
          </div>

          {/* Smooth Mini Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </footer>

          {/* In-App Non-Blocking Confirmation Dialog */}
          {showResetConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xl max-w-xs w-full text-center">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  सर्व रिव्ह्यू रीसेट करायचे का?
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  वापरलेल्या रिव्ह्यूंची नोंद मिटवली जाईल आणि {totalReviews} रिव्ह्यूज नव्याने सुरू होतील.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                  >
                    रद्द करा
                  </button>
                  <button
                    onClick={executeReset}
                    className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
                  >
                    होय, रीसेट करा
                  </button>
                </div>
              </div>
            </div>
          )}

      </div>
    </div>
  );
}
