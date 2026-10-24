import React from 'react';
import { CheckCircle2, ExternalLink, ArrowRight, Star, Copy, Sparkles, MessageSquare } from 'lucide-react';
import { GOOGLE_REVIEW_URL } from '../data/reviews';

interface ReviewCompletionModalProps {
  isOpen: boolean;
  copiedReviewText: string;
  reviewId: number;
  onClose: () => void;
  onNextReview: () => void;
}

export const ReviewCompletionModal: React.FC<ReviewCompletionModalProps> = ({
  isOpen,
  copiedReviewText,
  reviewId,
  onClose,
  onNextReview,
}) => {
  if (!isOpen) return null;

  const handleOpenGoogle = () => {
    const link = document.createElement('a');
    link.href = GOOGLE_REVIEW_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReCopy = () => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = copiedReviewText;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Top Handle on mobile */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Success Header */}
        <div className="text-center mb-5">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
            रिव्ह्यू कॉपी झाला आहे! <Sparkles className="w-5 h-5 text-amber-400" />
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            रिव्ह्यू #{reviewId} सिस्टीममध्ये 'पूर्ण' म्हणून नोंदवला गेला आहे (हा पुन्हा दिसणार नाही).
          </p>
        </div>

        {/* Copied Review Text Card */}
        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl mb-4 relative group">
          <div className="flex items-center justify-between text-[11px] text-amber-400 font-medium mb-1.5">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> ५ स्टार रिव्ह्यू मजकूर:
            </span>
            <button
              onClick={handleReCopy}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 py-0.5 px-2 rounded-lg bg-blue-500/10"
              title="पुन्हा कॉपी करा"
            >
              <Copy className="w-3 h-3" /> पुन्हा कॉपी
            </button>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-normal italic">
            "{copiedReviewText}"
          </p>
        </div>

        {/* 3 Step Instructions */}
        <div className="space-y-2.5 mb-6 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> गुगलवर पोस्ट करण्याच्या ३ सोप्या पायऱ्या:
          </h4>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              १
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              गुगल पेजवर जाऊन <span className="font-semibold text-amber-300">५ स्टार (⭐⭐⭐⭐⭐)</span> वर क्लिक करा.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              २
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              रिव्ह्यू लिहिण्याच्या बॉक्सवर बोट दाबून धरा आणि <span className="font-semibold text-emerald-300">'पेस्ट' (Paste)</span> करा.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              ३
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              वर उजव्या कोपऱ्यात <span className="font-semibold text-white">'Post' (पोस्ट)</span> बटणावर क्लिक करा.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            onClick={handleOpenGoogle}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-transform"
          >
            <span>गुगल रिव्ह्यू पेज उघडा</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onClose();
              onNextReview();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
          >
            <span>पुढील युनिक रिव्ह्यू दाखवा</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
