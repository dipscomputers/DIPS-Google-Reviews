import React, { useState } from 'react';
import {
  Star,
  Copy,
  ExternalLink,
  Shuffle,
  Share2,
  Edit3,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { ReviewItem, GOOGLE_REVIEW_URL } from '../data/reviews';

interface ReviewCardProps {
  review: ReviewItem | null;
  onCopyAndOpen: (customText?: string) => void;
  onCopyOnly: (customText?: string) => void;
  onShuffleNext: () => void;
  totalRemaining: number;
  isAllCompleted: boolean;
  onReset: () => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onCopyAndOpen,
  onCopyOnly,
  onShuffleNext,
  totalRemaining,
  isAllCompleted,
  onReset,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(review ? review.text : '');
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Sync edited text whenever active review changes
  React.useEffect(() => {
    if (review) {
      setEditedText(review.text);
      setIsEditing(false);
    }
  }, [review]);

  if (isAllCompleted || !review) {
    return (
      <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center shadow-xl animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-400 mx-auto flex items-center justify-center text-slate-950 font-bold mb-4 shadow-lg shadow-amber-500/20">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">अभिनंदन! सर्व रिव्ह्यूज पूर्ण झाले 🎉</h3>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-xs mx-auto">
          या कॅटेगरीमधील सर्व रिव्ह्यूज वापरले गेले आहेत. नवीन सायकल सुरू करण्यासाठी खालील बटण दाबा.
        </p>
        <button
          onClick={onReset}
          className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
        >
          सायकल पुन्हा सुरू करा (रीसेट)
        </button>
      </div>
    );
  }

  const handleCopyOnlyClick = () => {
    onCopyOnly(editedText);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const textToShare = editedText || review.text;
    const message = `नमस्कार! DIPS Computers & CSC Center, शिरपूर जैन ला भेट दिल्याबद्दल धन्यवाद 🙏\n\nकृपया आमच्या सेवेबद्दल आपला बहुमूल्य ५ स्टार गुगल रिव्ह्यू द्या:\n\n"${textToShare}"\n\nरिव्ह्यू देण्यासाठी येथे क्लिक करा:\n${GOOGLE_REVIEW_URL}`;
    const encoded = encodeURIComponent(message);
    const link = document.createElement('a');
    link.href = `https://api.whatsapp.com/send?text=${encoded}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Google Preview Style Review Box */}
      <div className="relative bg-slate-900/95 border border-slate-800 rounded-3xl p-5 shadow-xl transition-all">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="font-bold text-amber-400 tabular-nums">#{review.id}</span>
            <span>·</span>
            <span className="font-medium text-slate-300">{review.categoryTitle}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                isEditing
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="रिव्ह्यू एडिट करा"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">{isEditing ? 'पूर्ण' : 'बदल करा'}</span>
            </button>
          </div>
        </div>

        {/* Google 5-Star Rating Badge */}
        <div className="flex items-center gap-2 mb-3 bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/80">
          {/* Google G Logo icon */}
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm font-bold text-[13px] text-blue-600">
            G
          </div>

          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_1px_4px_rgba(251,191,36,0.5)]"
              />
            ))}
          </div>

          <span className="text-[11px] font-semibold text-slate-300 ml-auto">
            5.0 रेटिंग
          </span>
        </div>

        {/* Review Text or Editable Area */}
        <div className="mb-4">
          {isEditing ? (
            <div>
              <label className="block text-[11px] font-semibold text-blue-400 mb-1">
                रिव्ह्यू मजकूर एडिट करा (ऐच्छिक):
              </label>
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows={3}
                className="w-full p-3 text-sm bg-slate-950 border border-blue-500/60 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed font-normal resize-none"
                placeholder="रिव्ह्यू लिहा..."
              />
            </div>
          ) : (
            <div className="relative py-1">
              <p className="text-base sm:text-lg font-medium text-white leading-relaxed tracking-normal select-all">
                "{editedText || review.text}"
              </p>
            </div>
          )}
        </div>

        {/* Single-use assurance tag */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800/80">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>युनिक रिव्ह्यू (पुन्हा रिपीट होणार नाही)</span>
          </span>
          <span className="text-slate-500 tabular-nums">
            {totalRemaining} शिल्लक
          </span>
        </div>
      </div>

      {/* Primary Action Button: Large Full-Width Thumb CTA */}
      <div className="space-y-2">
        <button
          onClick={() => onCopyAndOpen(editedText)}
          className="w-full min-h-[54px] py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/25 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Copy className="w-5 h-5 shrink-0" />
          <span className="truncate">कॉपी करा आणि गुगल रिव्ह्यू उघडा</span>
          <ExternalLink className="w-4 h-4 shrink-0 opacity-80" />
        </button>

        {/* Secondary Auxiliary Controls */}
        <div className="grid grid-cols-3 gap-2">
          {/* Next / Shuffle */}
          <button
            onClick={onShuffleNext}
            className="py-2.5 px-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors active:scale-95"
            title="दुसरा युनिक रिव्ह्यू दाखवा"
          >
            <Shuffle className="w-3.5 h-3.5 text-blue-400" />
            <span className="truncate">दुसरा दाखवा</span>
          </button>

          {/* Copy Only */}
          <button
            onClick={handleCopyOnlyClick}
            className="py-2.5 px-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors active:scale-95"
            title="फक्त क्लिपबोर्डवर कॉपी करा"
          >
            {copyFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 truncate">कॉपी झाले!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate">फक्त कॉपी</span>
              </>
            )}
          </button>

          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="py-2.5 px-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors active:scale-95"
            title="व्हॉट्सॲपवर पाठवा"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate">व्हॉट्सॲप</span>
          </button>
        </div>
      </div>
    </div>
  );
};
