import React from 'react';
import { Landmark, Laptop, Printer, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/reviews';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: 'all' | 'csc' | 'computer' | 'online') => void;
  categoryRemainingCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryRemainingCounts,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'csc':
        return <Landmark className="w-3.5 h-3.5 shrink-0" />;
      case 'computer':
        return <Laptop className="w-3.5 h-3.5 shrink-0" />;
      case 'online':
        return <Printer className="w-3.5 h-3.5 shrink-0" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  const getShortName = (id: string) => {
    switch (id) {
      case 'csc':
        return 'CSC व सरकार';
      case 'computer':
        return 'कम्प्युटर क्लास';
      case 'online':
        return 'ऑनलाइन व पॅन';
      default:
        return 'सर्व रिव्ह्यूज';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          कॅटेगरी निवडा
        </span>
        <span className="text-[11px] text-blue-400 font-medium tabular-nums">
          {categoryRemainingCounts[selectedCategory] ?? 0} शिल्लक
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const remaining = categoryRemainingCounts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as 'all' | 'csc' | 'computer' | 'online')}
              className={`p-2.5 rounded-2xl flex items-center justify-between text-left transition-all border ${
                isSelected
                  ? 'bg-blue-600/15 border-blue-500/80 shadow-md shadow-blue-500/10 text-white'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`p-1.5 rounded-xl transition-colors ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {getIcon(cat.id)}
                </div>
                <div className="truncate">
                  <div
                    className={`text-xs font-semibold truncate ${
                      isSelected ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {getShortName(cat.id)}
                  </div>
                  <div className="text-[10px] text-slate-500 tabular-nums">
                    {remaining} बाकी
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 ml-1 shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
