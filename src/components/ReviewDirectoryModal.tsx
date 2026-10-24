import React, { useState, useMemo } from 'react';
import { X, Search, CheckCircle2, Clock, Star, ArrowUpRight, Filter } from 'lucide-react';
import { REVIEWS_DATA, ReviewItem } from '../data/reviews';

interface ReviewDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  usedReviewIds: number[];
  onSelectReview: (review: ReviewItem) => void;
  onToggleUsed: (reviewId: number) => void;
}

export const ReviewDirectoryModal: React.FC<ReviewDirectoryModalProps> = ({
  isOpen,
  onClose,
  usedReviewIds,
  onSelectReview,
  onToggleUsed,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'used'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'csc' | 'computer' | 'online'>('all');

  const usedSet = useMemo(() => new Set(usedReviewIds), [usedReviewIds]);

  const filteredReviews = useMemo(() => {
    return REVIEWS_DATA.filter((r) => {
      const matchesSearch =
        r.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toString().includes(searchTerm);

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'used'
          ? usedSet.has(r.id)
          : !usedSet.has(r.id);

      const matchesCategory =
        categoryFilter === 'all' ? true : r.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter, usedSet]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl text-slate-100 flex flex-col h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-400" /> सर्व ३०० रिव्ह्यूज डिरेक्टरी
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              वापरलेले: {usedReviewIds.length} / ३०० · शिल्लक: {300 - usedReviewIds.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="रिव्ह्यू शोधा... (उदा. Tally, उत्पन्नाचा दाखला, पॅन, आधार)"
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 placeholder-slate-500 outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Badges */}
        <div className="flex flex-col gap-2 mt-3 pb-2 border-b border-slate-800">
          {/* Status Segmented Control */}
          <div className="flex p-0.5 bg-slate-950 rounded-xl text-[11px] font-medium border border-slate-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-colors ${
                statusFilter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              सर्व ({REVIEWS_DATA.length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              शिल्लक ({300 - usedReviewIds.length})
            </button>
            <button
              onClick={() => setStatusFilter('used')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-colors ${
                statusFilter === 'used'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              वापरलेले ({usedReviewIds.length})
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              सर्व कॅटेगरी
            </button>
            <button
              onClick={() => setCategoryFilter('csc')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                categoryFilter === 'csc'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              🏛️ CSC (100)
            </button>
            <button
              onClick={() => setCategoryFilter('computer')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                categoryFilter === 'computer'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              💻 कम्प्युटर (100)
            </button>
            <button
              onClick={() => setCategoryFilter('online')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                categoryFilter === 'online'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              🖨️ ऑनलाइन (100)
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 pr-1 mt-1">
          {filteredReviews.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              कोणताही रिव्ह्यू सापडला नाही.
            </div>
          ) : (
            filteredReviews.map((item) => {
              const isUsed = usedSet.has(item.id);
              return (
                <div
                  key={item.id}
                  className={`py-3 px-2 flex items-start gap-3 rounded-xl transition-colors ${
                    isUsed ? 'bg-slate-950/40 opacity-75' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-400 tabular-nums">
                      #{item.id}
                    </span>
                    <button
                      onClick={() => onToggleUsed(item.id)}
                      className={`p-1 rounded-md transition-colors ${
                        isUsed
                          ? 'text-emerald-400 hover:text-emerald-300'
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                      title={isUsed ? 'वापरलेला खूण काढा' : 'वापरलेला म्हणून खूण करा'}
                    >
                      {isUsed ? (
                        <CheckCircle2 className="w-4 h-4 fill-emerald-500/20 text-emerald-400" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-medium text-slate-400">
                        {item.categoryTitle}
                      </span>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {isUsed && (
                        <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/50">
                          वापरलेला
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-200 leading-snug break-words">
                      {item.text}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onSelectReview(item);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors shrink-0 self-center"
                    title="हा रिव्ह्यू निवडा"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
