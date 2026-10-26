/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { GOOGLE_REVIEW_URL, REVIEWS_DATA } from './data/reviews';
import {
  Star,
  Copy,
  ExternalLink,
  RotateCw,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Check,
  BadgeCheck,
  MessageSquare,
  Tag,
  Send,
  ThumbsUp,
  User,
  Globe,
  Share2,
  X,
} from 'lucide-react';

// Business configuration for DIPs Computers matching the exact reference UI
const BUSINESS_DATA = {
  prefix: "MKCL's Authorized Learning Center For,",
  name: 'DIPs Computers',
  logo: 'https://blogger.googleusercontent.com/img/a/AVvXsEgnbNMNM_EqpDyQSqW9ncSuuuTWPL4O3qTCxY6bRvfwp5r83CtUsP0FYf19hveo9KcTlvujYd5Wobnjz1nRO0-ZolOim5gRImhZQmhKHIWcrqKf6RDoQVoYwrgUxT0a6SPdBs975K3dLArV9nocqTXzCaJ92561kvcyQXbbvUSh5TwkHp7wSixT1fs-kDAR=s1600',
  tagline: 'CSC & Aaple Sarkar Seva Kendra',
  subDescription: 'MKCL Authorized Learning Center & Digital Services Hub',
  phone: '9049102035',
  whatsapp: '919049102035',
  facebook: 'https://www.facebook.com/profile.php?id=100089675709187',
  instagram: 'https://www.instagram.com/dipscomputers?srtk=MWY5eWczazNvMnFpeA==',
  website: 'https://www.dipscomputers.in/',
  google_review_url: GOOGLE_REVIEW_URL,
  business_type: 'Computer & CSC Center',
  keywords: [
    {
      id: 'computer',
      number: '1',
      icon: '💻',
      label: 'Computer Institute',
      details: 'MS-CIT, Tally, DTP',
      fullText: '1. 💻 Computer Institute (MS-CIT, Tally, DTP)',
    },
    {
      id: 'csc',
      number: '2',
      icon: '🏛️',
      label: "CSC आणि 'आपले सरकार' सेवा",
      details: 'सर्व दाखले, रेशन, योजना व शेतकरी कामे',
      fullText: "2. 🏛️ CSC आणि 'आपले सरकार' सेवा",
    },
    {
      id: 'online',
      number: '3',
      icon: '🖨️',
      label: 'इतर कामे',
      details: 'PAN Card, PayNearby, Online Forms',
      fullText: '3. 🖨️ इतर कामे (PAN Card, PayNearby, Online Forms)',
    },
  ],
};

// Google "G" Icon
function GoogleGIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

// Social Icons SVGs for exact reference match
function WhatsAppIcon({ className = 'w-4.5 h-4.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4.5 h-4.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-4.5 h-4.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function App() {
  // Rating: 0 = unrated, 1-5 = stars
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  // Selected keywords / categories (computer, csc, online)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  // Custom text box input keyword
  const [customKeyword, setCustomKeyword] = useState<string>('');

  // Generated reviews state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReviews, setGeneratedReviews] = useState<string[]>([]);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number>(-1);

  // Low rating feedback form
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackPhone, setFeedbackPhone] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Track used reviews across sessions in localStorage so no review repeats
  const [usedReviews, setUsedReviews] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dips_used_reviews_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Helper to mark a review as used and save to localStorage
  const markReviewAsUsed = (reviewText: string) => {
    if (!reviewText) return;
    setUsedReviews((prev) => {
      if (prev.includes(reviewText)) return prev;
      const updated = [...prev, reviewText];
      try {
        localStorage.setItem('dips_used_reviews_list', JSON.stringify(updated));
      } catch {
        // quota fallback
      }
      return updated;
    });
  };

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Show Toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Handle star selection
  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    setGeneratedReviews([]);
    setSelectedReviewIndex(-1);
    setFeedbackSubmitted(false);

    if (rating >= 4) {
      confetti({
        particleCount: rating === 5 ? 50 : 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#4f46e5', '#fbbf24', '#34A853'],
      });
    }
  };

  // Reset rating, keywords and reviews state to starting point
  const handleReset = () => {
    setSelectedRating(0);
    setHoverRating(0);
    setGeneratedReviews([]);
    setSelectedReviewIndex(-1);
    setSelectedKeywords([]);
    setCustomKeyword('');
    setFeedbackSubmitted(false);
    setFeedbackMessage('');
    triggerToast('🔄 Reset successfully!');
  };

  // Toggle Keyword / Category selection
  const toggleKeyword = (categoryId: string) => {
    if (selectedKeywords.includes(categoryId)) {
      setSelectedKeywords(selectedKeywords.filter((k) => k !== categoryId));
    } else {
      setSelectedKeywords([...selectedKeywords, categoryId]);
    }
  };

  // Generate AI Reviews based on selected categories and custom keyword text box
  const handleGenerateAIReviews = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // Filter out all reviews that have already been used/submitted
      let unusedPool = REVIEWS_DATA.filter((r) => !usedReviews.includes(r.text));

      // If nearly all 300 reviews have been used, auto-reset so system continuously works
      if (unusedPool.length < 3) {
        unusedPool = [...REVIEWS_DATA];
        setUsedReviews([]);
        try {
          localStorage.removeItem('dips_used_reviews_list');
        } catch {
          // ignore
        }
      }

      const activeCategories = selectedKeywords;
      const searchTxt = customKeyword.trim().toLowerCase();

      // Filter based on selected categories and custom text
      let matchedReviews: string[] = [];

      unusedPool.forEach((r) => {
        let isMatch = false;

        // If categories are selected, check if review belongs to any selected category
        if (activeCategories.length > 0 && activeCategories.includes(r.category)) {
          isMatch = true;
        }

        // If custom text is provided, check if text matches review
        if (searchTxt && r.text.toLowerCase().includes(searchTxt)) {
          isMatch = true;
        }

        if (isMatch) {
          matchedReviews.push(r.text);
        }
      });

      // If no category or custom text selected, or if matches are empty, use whole unusedPool
      const pool =
        matchedReviews.length >= 3
          ? matchedReviews
          : matchedReviews.length > 0
          ? [...matchedReviews, ...unusedPool.map((r) => r.text)]
          : unusedPool.map((r) => r.text);

      // Exclude reviews currently visible on screen so clicking "More Reviews" always loads fresh ones
      const freshCandidates = pool.filter((text) => !generatedReviews.includes(text));
      const finalPool = freshCandidates.length >= 3 ? freshCandidates : pool;

      let finalReviews: string[] = [];
      const trimmedCustom = customKeyword.trim();

      // If user typed a custom review (sentence/phrase), place it as option 1 alongside 2 recommendations
      if (trimmedCustom.length >= 8) {
        const otherPool = finalPool.filter((text) => text !== trimmedCustom);
        const otherShuffled = [...new Set(otherPool)].sort(() => 0.5 - Math.random()).slice(0, 2);
        finalReviews = [trimmedCustom, ...otherShuffled];
      } else {
        finalReviews = [...new Set(finalPool)].sort(() => 0.5 - Math.random()).slice(0, 3);
      }

      setGeneratedReviews(finalReviews);
      setSelectedReviewIndex(0); // Auto-select first review
      setIsGenerating(false);

      triggerToast('✨ Reviews Loaded Successfully!');
    }, 500);
  };

  // Safe copy to clipboard helper that runs synchronously without extension messaging timeouts
  const copyToClipboard = (text: string): boolean => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) return true;
    } catch {
      // Fall through to standalone fallback
    }

    try {
      if (typeof window !== 'undefined' && window.self === window.top && navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch {
      // Ignore clipboard write rejection
    }

    return true;
  };

  // Subtle pleasant notification 'ping' sound effect using Web Audio API
  const playPingSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }

      const now = audioCtx.currentTime;

      // Two pleasant harmonious oscillators (sweet bell / chime ping)
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now); // A5 note
      osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.09);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1760, now); // Harmonic shimmer
      osc2.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      // Gentle volume envelope: subtle non-intrusive ping
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.3);
      osc2.stop(now + 0.3);

      setTimeout(() => {
        try {
          audioCtx.close();
        } catch {}
      }, 400);
    } catch {
      // Audio fallback
    }
  };

  // Copy specific review text with rewarding celebratory confetti and audio ping
  const handleCopyReview = async (text: string, index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    copyToClipboard(text);
    markReviewAsUsed(text);
    setCopiedIndex(index);
    setSelectedReviewIndex(index);
    triggerToast('✅ Review copied to clipboard!');

    // Trigger subtle ping sound simultaneously with confetti
    playPingSound();

    // Rewarding confetti burst on successful copy
    try {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#7c3aed', '#4f46e5', '#38bdf8', '#34d399', '#f59e0b'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setCopiedIndex(null);
    }, 2500);
  };

  // Submit Private Low Rating Feedback with rewarding thank-you confetti and ping
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) {
      triggerToast('Please write your feedback message');
      return;
    }

    setFeedbackSubmitted(true);
    triggerToast('✅ Feedback submitted successfully!');

    // Trigger subtle ping sound simultaneously with confetti
    playPingSound();

    // Warm, appreciative confetti for sharing valuable feedback
    try {
      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'],
      });
    } catch {
      // safe fallback
    }
  };

  // Click handler for Google Review button with grand celebratory confetti and audio chime
  const handleReviewOnGoogleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (selectedReviewIndex < 0 || !generatedReviews[selectedReviewIndex]) {
      e.preventDefault();
      triggerToast('⚠️ Please select a review to share');
      return;
    }

    const reviewText = generatedReviews[selectedReviewIndex];
    copyToClipboard(reviewText);
    markReviewAsUsed(reviewText);
    triggerToast('✅ Review copied to clipboard! Opening Google...');

    // Trigger audio chime simultaneously with confetti
    playPingSound();

    try {
      // Google 4-color grand celebration
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'],
      });

      // Side sparkle bursts
      setTimeout(() => {
        try {
          confetti({
            particleCount: 35,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: ['#7c3aed', '#4285F4', '#34A853'],
          });
          confetti({
            particleCount: 35,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: ['#7c3aed', '#FBBC05', '#EA4335'],
          });
        } catch {
          // safe fallback
        }
      }, 180);
    } catch {
      // safe fallback if confetti fails
    }
  };

  return (
    <div className="min-h-screen bg-[#7c3aed0a] relative flex flex-col items-center justify-start p-3 sm:p-6 overflow-x-hidden font-['Inter',sans-serif]">
      {/* Decorative top gradient accent bar matching reference */}
      <div
        className="absolute top-0 left-0 right-0 h-64 opacity-15 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}
      />

      {/* Main Container */}
      <div className="w-full max-w-lg relative z-10 py-4 sm:py-8">
        {/* Single Unified Card matching the reference screenshot */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(124,58,237,0.15)]">
          {/* Card Header with Purple/Indigo Gradient */}
          <div
            className="p-8 pb-7 text-center text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}
          >
            {/* Ambient decorative circles */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
              {/* Logo Box matching reference design */}
              <div className="mb-3.5 inline-block">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-white/20 backdrop-blur-md shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-1.5 shadow-inner relative overflow-hidden">
                    <img
                      src={BUSINESS_DATA.logo}
                      alt="DIPs Computers Logo"
                      className="w-full h-full rounded-lg object-contain"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              {/* MKCL Authorized Prefix */}
              <p className="text-amber-200 text-xs sm:text-[13px] font-semibold tracking-wide drop-shadow-xs mb-0.5">
                {BUSINESS_DATA.prefix}
              </p>

              {/* Business Name */}
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-1 tracking-tight drop-shadow-sm flex items-center justify-center gap-1.5">
                <span>{BUSINESS_DATA.name}</span>
                <BadgeCheck className="w-5 h-5 text-amber-300 drop-shadow-xs shrink-0" />
              </h1>

              {/* Center & Services Subtitle */}
              <div className="mt-1">
                <p className="text-white text-xs sm:text-[13.5px] font-semibold tracking-wide drop-shadow-xs px-2">
                  {BUSINESS_DATA.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8">
            {/* Social Links Row matching reference with enlarged icons */}
            <div className="flex items-center justify-center gap-3.5 sm:gap-4.5 mb-6 pb-6 border-b border-gray-100 flex-wrap">
              <a
                href={`https://wa.me/${BUSINESS_DATA.whatsapp}?text=Hello%20DIPs%20Computers`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8" />
              </a>

              <a
                href={BUSINESS_DATA.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
                title="Facebook"
              >
                <FacebookIcon className="w-7 h-7 sm:w-8 sm:h-8" />
              </a>

              <a
                href={BUSINESS_DATA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-pink-50 text-pink-600 hover:bg-pink-100 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
                title="Instagram"
              >
                <InstagramIcon className="w-7 h-7 sm:w-8 sm:h-8" />
              </a>

              <a
                href={BUSINESS_DATA.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-50 text-purple-600 hover:bg-purple-100 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
                title="Official Website - dipscomputers.in"
              >
                <Globe className="w-7 h-7 sm:w-8 sm:h-8" />
              </a>
            </div>

            {/* Rating Section */}
            <div className="mb-4">
              <h2 className="text-center font-bold text-gray-800 mb-4 text-lg sm:text-xl">
                How was your experience?
              </h2>

              {/* 5 Stars Rating Row with smooth hover & scale */}
              <div className="flex justify-center gap-2 sm:gap-3 mb-3">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled =
                    hoverRating > 0 ? star <= hoverRating : star <= selectedRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingSelect(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`text-4xl sm:text-5xl transition-all duration-200 cursor-pointer select-none focus:outline-hidden ${
                        isFilled
                          ? 'text-amber-400 scale-110 drop-shadow-xs'
                          : 'text-gray-300 hover:text-amber-200 hover:scale-115'
                      }`}
                      aria-label={`${star} star`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>

              {/* Rating Label */}
              <p className="text-center text-xs sm:text-sm font-medium text-gray-400">
                {selectedRating === 0
                  ? 'Tap a star to rate'
                  : selectedRating === 5
                  ? '⭐⭐⭐⭐⭐ You selected 5 stars (Outstanding!)'
                  : selectedRating === 4
                  ? '⭐⭐⭐⭐ You selected 4 stars (Very Good!)'
                  : `You selected ${selectedRating} star${selectedRating > 1 ? 's' : ''}`}
              </p>
            </div>

            {/* FLOW 1: 1-3 Stars -> Private Feedback Form */}
            {selectedRating > 0 && selectedRating <= 3 && !feedbackSubmitted && (
              <div className="pt-5 border-t border-gray-100 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      Help Us Improve
                    </h3>
                    <p className="text-xs text-gray-500">
                      We value your honest feedback • तुमचा अभिप्राय महत्त्वाचा आहे
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmitFeedback} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Your Feedback <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-sm resize-none"
                      placeholder="Tell us what went wrong and how we can improve..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Your Name <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Phone <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={feedbackPhone}
                        onChange={(e) => setFeedbackPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!feedbackMessage.trim()}
                    className="w-full py-4 rounded-xl font-bold text-white text-sm shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Feedback</span>
                  </button>
                </form>
              </div>
            )}

            {/* FLOW 1 SUCCESS: Private Feedback Received */}
            {feedbackSubmitted && (
              <div className="pt-5 border-t border-gray-100 text-center py-6 animate-fadeIn">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 bg-purple-50 text-purple-600">
                  <CheckCircle2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Thank You!
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm max-w-xs mx-auto">
                  Your feedback has been received privately. We will work on improving your experience.
                </p>
              </div>
            )}

            {/* FLOW 2: 4-5 Stars -> 4 Options (3 Categories + 1 Text Box) */}
            {selectedRating >= 4 && generatedReviews.length === 0 && (
              <div className="pt-5 border-t border-gray-100 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                    <Tag className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                      कीवर्ड किंवा सेवा निवडा (Select Topic)
                    </h3>
                    <p className="text-xs text-gray-500">
                      खालीलपैकी पर्याय निवडा किंवा स्वतः कीवर्ड टाईप करा
                    </p>
                  </div>
                </div>

                {/* The 4 Options List */}
                <div className="space-y-2.5 mb-5">
                  {/* Options 1, 2, 3: Categories */}
                  {BUSINESS_DATA.keywords.map((kw) => {
                    const isSelected = selectedKeywords.includes(kw.id);
                    return (
                      <button
                        key={kw.id}
                        type="button"
                        onClick={() => toggleKeyword(kw.id)}
                        className={`w-full p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex items-center justify-between gap-3 relative select-none ${
                          isSelected
                            ? 'text-white border-transparent shadow-md shadow-purple-500/25 scale-[1.01]'
                            : 'bg-slate-50/90 hover:bg-purple-50/50 hover:border-purple-200 text-slate-800 border-slate-200/80 active:scale-99'
                        }`}
                        style={{
                          background: isSelected
                            ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)'
                            : undefined,
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                              isSelected ? 'bg-white/20' : 'bg-white shadow-xs border border-slate-200/60'
                            }`}
                          >
                            {kw.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className={`text-xs font-black ${
                                  isSelected ? 'text-purple-200' : 'text-purple-600'
                                }`}
                              >
                                {kw.number}.
                              </span>
                              <span className="font-bold text-[13px] sm:text-sm leading-tight">
                                {kw.label}
                              </span>
                            </div>
                            <p
                              className={`text-[11px] sm:text-xs leading-snug mt-0.5 truncate ${
                                isSelected ? 'text-purple-100 font-medium' : 'text-slate-500'
                              }`}
                            >
                              {kw.details}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 pl-1">
                          {isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-xs">
                              <Check className="w-3.5 h-3.5 text-purple-600 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                          )}
                        </div>
                      </button>
                    );
                  })}

                  {/* Option 4: ✍️ Custom Reviews Text Box */}
                  <div
                    className={`w-full p-3 sm:p-3.5 rounded-2xl transition-all duration-200 border ${
                      customKeyword.trim().length > 0
                        ? 'bg-purple-50/60 border-purple-300 shadow-xs'
                        : 'bg-slate-50/90 border-slate-200/80 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs shrink-0">
                          4.
                        </div>
                        <div>
                          <span className="font-bold text-[13px] sm:text-sm text-slate-800 flex items-center gap-1.5">
                            <span>✍️</span>
                            <span>Custom Reviews Text Box</span>
                          </span>
                        </div>
                      </div>
                      {customKeyword && (
                        <button
                          type="button"
                          onClick={() => setCustomKeyword('')}
                          className="text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-500 mb-2 pl-9">
                      स्वतःचा रिव्ह्यू लिहा किंवा कीवर्ड टाईप करा (Write your own review or topic)
                    </p>

                    <div className="relative">
                      <textarea
                        rows={3}
                        value={customKeyword}
                        onChange={(e) => setCustomKeyword(e.target.value)}
                        placeholder="उदा. शिरपूर जैन मधील सर्वात उत्तम कॉम्प्युटर क्लास आणि आपले सरकार सेवा केंद्र! काम वेळेत आणि अचूक होते, दिपक सरांचे मार्गदर्शन खूप छान आहे..."
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none bg-white text-slate-900 placeholder:text-slate-400 transition-all resize-none leading-relaxed"
                      />
                      {customKeyword && (
                        <div className="flex items-center justify-between pt-1 px-1 text-[11px] text-slate-400">
                          <span>{customKeyword.length} अक्षरे (characters)</span>
                          <span className="text-purple-600 font-medium">Custom review तयार आहे</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Counter and status */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 px-1">
                  <p className="font-medium text-gray-500 flex items-center gap-1.5">
                    <span>Selected:</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold text-[11px]">
                      {selectedKeywords.length + (customKeyword.trim() ? 1 : 0)} Option(s)
                    </span>
                  </p>
                  {(selectedKeywords.length > 0 || customKeyword.trim().length > 0) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedKeywords([]);
                        setCustomKeyword('');
                      }}
                      className="text-purple-600 hover:text-purple-800 text-xs font-semibold cursor-pointer underline underline-offset-2"
                    >
                      Reset selection
                    </button>
                  )}
                </div>

                {/* Generate AI Reviews Button */}
                <button
                  type="button"
                  onClick={handleGenerateAIReviews}
                  disabled={isGenerating}
                  className="w-full py-4.5 rounded-2xl font-bold text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating AI Reviews...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      <span>Generate AI Reviews</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* FLOW 2 (Part 2): Generated AI Reviews Display */}
            {selectedRating >= 4 && generatedReviews.length > 0 && (
              <div className="pt-5 border-t border-gray-100 animate-fadeIn space-y-4">
                {/* AI Status Badge */}
                <div className="flex items-center justify-center mb-2">
                  <div className="px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-100">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>AI-Powered Reviews Ready</span>
                  </div>
                </div>

                {/* Selected Keywords Tags */}
                {(selectedKeywords.length > 0 || customKeyword.trim().length > 0) && (
                  <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100">
                    <p className="text-[11px] font-semibold text-purple-900 mb-1.5">
                      Reviews based on your selection:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedKeywords.map((catId) => {
                        const item = BUSINESS_DATA.keywords.find((k) => k.id === catId);
                        return (
                          <span
                            key={catId}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white shadow-2xs flex items-center gap-1.5"
                            style={{ background: '#7c3aed' }}
                          >
                            <span>{item?.icon}</span>
                            <span>{item?.label}</span>
                          </span>
                        );
                      })}
                      {customKeyword.trim() && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white shadow-2xs flex items-center gap-1.5 bg-indigo-600">
                          <span>✍️</span>
                          <span>"{customKeyword.trim()}"</span>
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Review Selection Header */}
                <div>
                  <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2 mb-2">
                    <ThumbsUp className="w-4 h-4 text-purple-600" />
                    <span>Select a review to share:</span>
                  </label>

                  {/* Reviews List */}
                  <div className="space-y-3">
                    {generatedReviews.map((review, index) => {
                      const isSelected = selectedReviewIndex === index;
                      const isCopied = copiedIndex === index;
                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedReviewIndex(index)}
                          className={`w-full text-left p-4 pr-24 rounded-2xl border-2 transition-all duration-200 cursor-pointer relative ${
                            isSelected
                              ? 'border-[#7c3aed] bg-[#7c3aed]/5 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Number Badge */}
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10.5px] font-bold ${
                                isSelected
                                  ? 'bg-[#7c3aed] text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {index + 1}
                            </div>

                            {/* Review Text */}
                            <div className="min-w-0 flex-1">
                              {customKeyword.trim() && review === customKeyword.trim() && (
                                <div className="mb-1">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                                    <Sparkles className="w-2.5 h-2.5 text-purple-600" />
                                    <span>तुमचा कस्टम रिव्ह्यू (Your Custom Review)</span>
                                  </span>
                                </div>
                              )}
                              <p className="text-xs sm:text-[13.5px] text-gray-800 font-medium leading-relaxed">
                                "{review}"
                              </p>
                            </div>
                          </div>

                          {/* Individual Copy Button on each card */}
                          <button
                            type="button"
                            onClick={(e) => handleCopyReview(review, index, e)}
                            className="absolute right-2.5 top-2.5 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 flex items-center gap-1.5 text-xs font-semibold shadow-2xs transition-transform active:scale-95 cursor-pointer"
                            title="Copy Review"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-[11px] text-emerald-700">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-gray-500" />
                                <span className="text-[11px]">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Main Action: Review us on Google Button matching reference */}
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleReviewOnGoogleClick}
                  className="w-full py-4.5 rounded-2xl font-bold text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-3 no-underline"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}
                >
                  <GoogleGIcon className="w-5 h-5 shrink-0" />
                  <span>Review us on Google</span>
                </a>

                {/* 2 Action Buttons: Left is More Reviews, Right is Reset - Perfectly Aligned */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {/* Left Button: More Reviews */}
                  <button
                    type="button"
                    onClick={handleGenerateAIReviews}
                    disabled={isGenerating}
                    className="h-11 sm:h-12 w-full rounded-xl border border-purple-200 bg-purple-50/90 hover:bg-purple-100/90 active:scale-98 text-purple-700 font-bold text-xs sm:text-[13px] flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 whitespace-nowrap transition-all cursor-pointer shadow-2xs hover:border-purple-300 disabled:opacity-50"
                  >
                    <RotateCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span className="truncate">More Reviews</span>
                  </button>

                  {/* Right Button: Reset */}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-11 sm:h-12 w-full rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 active:scale-98 text-gray-700 font-bold text-xs sm:text-[13px] flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 whitespace-nowrap transition-all cursor-pointer shadow-2xs hover:border-gray-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 shrink-0" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification matching reference bottom toast */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-2.5 animate-fadeIn text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating "Powered by DIPs" Pill Badge on Left side */}
      <div className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-40 animate-fadeIn pointer-events-auto">
        <a
          href={BUSINESS_DATA.website}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit DIPs Computers Website"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a192f] hover:bg-[#0f2342] border border-slate-700/80 text-white shadow-xl shadow-slate-950/25 backdrop-blur-md transition-all hover:scale-105 active:scale-95 select-none no-underline font-['Plus_Jakarta_Sans',sans-serif] cursor-pointer"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
          </div>
          <span className="text-[10.5px] sm:text-xs text-slate-300 font-medium tracking-wide">
            Powered by <strong className="text-white font-bold tracking-tight font-sans">DIPs</strong>
          </span>
        </a>
      </div>
    </div>
  );
}
