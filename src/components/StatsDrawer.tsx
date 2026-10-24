import React, { useState } from 'react';
import { X, RotateCcw, Award, CheckCircle, Clock, AlertTriangle, ShieldCheck, Download } from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviews';

interface StatsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  usedReviewIds: number[];
  onResetAll: () => void;
}

export const StatsDrawer: React.FC<StatsDrawerProps> = ({
  isOpen,
  onClose,
  usedReviewIds,
  onResetAll,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const total = REVIEWS_DATA.length;
  const usedCount = usedReviewIds.length;
  const pendingCount = total - usedCount;
  const percent = Math.round((usedCount / total) * 100);

  // Breakdown by category
  const cscUsed = usedReviewIds.filter((id) => (id >= 1 && id <= 50) || (id >= 201 && id <= 250)).length;
  const compUsed = usedReviewIds.filter((id) => (id >= 51 && id <= 100) || (id >= 151 && id <= 200)).length;
  const onlineUsed = usedReviewIds.filter((id) => (id >= 101 && id <= 150) || (id >= 251 && id <= 300)).length;

  const handleExportUsed = () => {
    const usedTexts = REVIEWS_DATA.filter((r) => usedReviewIds.includes(r.id)).map(
      (r) => `${r.id}. [${r.categoryTitle}] ${r.text}`
    );
    const blob = new Blob([usedTexts.join('\n\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dips-used-reviews-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">गुगल रिव्ह्यू प्रगती</h3>
            <p className="text-xs text-slate-400">DIPS Computers & CSC सेंटर</p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-medium">एकूण प्रगती ({percent}%)</span>
            <span className="font-bold text-amber-400 tabular-nums">
              {usedCount} / {total}
            </span>
          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(percent, 2)}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 text-center">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-400 mb-0.5 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> वापरलेले
              </div>
              <div className="text-xl font-bold text-white tabular-nums">{usedCount}</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-center gap-1 text-[11px] text-blue-400 mb-0.5 font-medium">
                <Clock className="w-3.5 h-3.5" /> शिल्लक
              </div>
              <div className="text-xl font-bold text-white tabular-nums">{pendingCount}</div>
            </div>
          </div>
        </div>

        {/* Breakdown by Category */}
        <div className="space-y-2 mb-4 bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800 text-xs">
          <div className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider mb-2">
            कॅटेगरीनुसार वापर:
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-300 flex items-center gap-1.5">
              🏛️ CSC व आपले सरकार
            </span>
            <span className="font-bold text-slate-200 tabular-nums">
              {cscUsed} / 100
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-300 flex items-center gap-1.5">
              💻 कॉम्प्युटर इन्स्टिट्यूट
            </span>
            <span className="font-bold text-slate-200 tabular-nums">
              {compUsed} / 100
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-300 flex items-center gap-1.5">
              🖨️ ऑनलाइन कामे व पॅन कार्ड
            </span>
            <span className="font-bold text-slate-200 tabular-nums">
              {onlineUsed} / 100
            </span>
          </div>
        </div>

        {/* Anti-Repeat Guarantee Note */}
        <div className="flex items-start gap-2 p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl mb-4 text-[11px] text-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">नो-रिपीट सुरक्षा:</strong> वापरलेला कोणताही रिव्ह्यू पुन्हा स्क्रीनवर येणार नाही.
            ३०० रिव्ह्यू पूर्ण होईपर्यंत प्रत्येक ग्राहकाला नवीनच रिव्ह्यू मिळेल.
          </p>
        </div>

        {/* Export & Reset Actions */}
        <div className="space-y-2">
          {usedCount > 0 && (
            <button
              onClick={handleExportUsed}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>वापरलेल्या रिव्ह्यूजची लिस्ट सेव्ह करा</span>
            </button>
          )}

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-rose-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>सर्व वापरलेले रिव्ह्यू रीसेट करा (नव्याने सुरू)</span>
            </button>
          ) : (
            <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>तुम्हाला खात्री आहे का? सर्व नोंद रीसेट होईल.</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  रद्द करा
                </button>
                <button
                  onClick={() => {
                    onResetAll();
                    setConfirmReset(false);
                    onClose();
                  }}
                  className="py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm"
                >
                  होय, रीसेट करा
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
