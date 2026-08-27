import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { MarketAsset } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  assets,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'US stocks', 'World stocks', 'Crypto', 'Futures', 'Forex', 'ETFs', 'Government bonds'];

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory =
      selectedCategoryFilter === 'All' || asset.category === selectedCategoryFilter;
    const matchesQuery =
      asset.name.toLowerCase().includes(query.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(query.toLowerCase()) ||
      asset.badge.toLowerCase().includes(query.toLowerCase()) ||
      asset.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="search-dialog-card"
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#e0e3eb] overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-[#e0e3eb] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search indices, stocks, crypto, futures, forex, bonds..."
            className="w-full text-base sm:text-lg text-[#131722] placeholder-[#787b86] outline-none border-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#787b86] hover:text-[#131722]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-[#787b86] hover:text-[#131722] bg-[#f0f3fa] rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Categories */}
        <div className="px-4 py-2 bg-[#fafbfc] border-b border-[#e0e3eb] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategoryFilter === cat
                  ? 'bg-[#131722] text-white'
                  : 'text-[#787b86] hover:text-[#131722] hover:bg-[#e0e3eb]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-2 overflow-y-auto divide-y divide-[#f0f3fa] space-y-1">
          {filteredAssets.length === 0 ? (
            <div className="p-8 text-center text-[#787b86]">
              <p className="text-sm font-medium">No financial instruments found for "{query}"</p>
              <p className="text-xs text-[#787b86] mt-1">Try searching for "S&P", "Bitcoin", "Gold", or "Nasdaq"</p>
            </div>
          ) : (
            filteredAssets.map((asset) => {
              const isUp = asset.changePercent >= 0;
              return (
                <button
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset);
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-[#f0f3fa] flex items-center justify-between transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${asset.badgeBgColor} ${
                        asset.badgeTextColor || 'text-white'
                      } flex items-center justify-center font-bold text-xs shadow-xs`}
                    >
                      {asset.badge}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#131722] group-hover:text-[#2962ff] transition-colors">
                          {asset.name}
                        </span>
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-[#e0e3eb] text-[#131722]">
                          {asset.symbol}
                        </span>
                      </div>
                      <span className="text-xs text-[#787b86]">{asset.category}</span>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <div className="font-bold text-sm text-[#131722]">{asset.priceFormatted}</div>
                      <div
                        className={`text-xs font-semibold inline-flex items-center gap-0.5 ${
                          isUp ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isUp ? '+' : ''}
                        {asset.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#787b86] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#fafbfc] border-t border-[#e0e3eb] text-xs text-[#787b86] flex justify-between">
          <span>Navigate with arrows, press Enter to view details</span>
          <span>Showing {filteredAssets.length} symbols</span>
        </div>
      </div>
    </div>
  );
};
