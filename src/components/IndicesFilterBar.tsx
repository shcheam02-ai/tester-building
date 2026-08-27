import React from 'react';
import { MarketCategory } from '../types';

interface IndicesFilterBarProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
}

const CATEGORIES: MarketCategory[] = [
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures',
  'Forex',
  'Government bonds',
  'Corporate bonds',
  'ETFs',
  'Economy',
];

export const IndicesFilterBar: React.FC<IndicesFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="overflow-x-auto pb-2 -mb-2 md:pb-0 md:mb-0 no-scrollbar">
      <div className="flex items-center gap-1.5 border border-[#e0e3eb] rounded-full p-1 bg-white whitespace-nowrap text-sm font-medium shadow-xs">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              id={`filter-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-1.5 rounded-full transition-all duration-150 ${
                isActive
                  ? 'bg-[#131722] text-white shadow-xs font-semibold'
                  : 'text-[#787b86] hover:text-[#131722] hover:bg-[#f0f3fa]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};
