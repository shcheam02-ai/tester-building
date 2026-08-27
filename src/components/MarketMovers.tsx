import React, { useState } from 'react';
import { MARKET_MOVERS } from '../data/marketData';
import { TrendingUp, TrendingDown, Activity, Flame } from 'lucide-react';
import { MarketAsset } from '../types';

interface MarketMoversProps {
  onSelectSymbol?: (symbol: string) => void;
}

export const MarketMovers: React.FC<MarketMoversProps> = ({ onSelectSymbol }) => {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers' | 'mostActive'>('gainers');

  const items = MARKET_MOVERS[activeTab];

  return (
    <div className="bg-white rounded-2xl border border-[#e0e3eb] p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-lg text-[#131722]">Movers & Volume</h3>
        </div>

        {/* Tab switch buttons */}
        <div className="flex items-center gap-1 bg-[#f0f3fa] p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('gainers')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === 'gainers' ? 'bg-white text-emerald-700 shadow-xs' : 'text-[#787b86] hover:text-[#131722]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Top Gainers
          </button>
          <button
            onClick={() => setActiveTab('losers')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === 'losers' ? 'bg-white text-rose-700 shadow-xs' : 'text-[#787b86] hover:text-[#131722]'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            Top Losers
          </button>
          <button
            onClick={() => setActiveTab('mostActive')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === 'mostActive' ? 'bg-white text-[#2962ff] shadow-xs' : 'text-[#787b86] hover:text-[#131722]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Most Active
          </button>
        </div>
      </div>

      {/* List items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => {
          const isUp = item.changePercent >= 0;
          return (
            <div
              key={item.symbol}
              onClick={() => onSelectSymbol?.(item.symbol)}
              className="p-3 bg-[#f0f3fa] hover:bg-[#e4e8f2] rounded-xl flex items-center justify-between cursor-pointer transition-colors border border-transparent hover:border-[#d1d4dc] group"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-full ${item.badgeBgColor} text-white flex items-center justify-center font-bold text-[11px] shadow-xs`}
                >
                  {item.badge}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#131722] group-hover:text-[#2962ff] transition-colors">
                    {item.symbol}
                  </div>
                  <div className="text-[11px] text-[#787b86] truncate max-w-[100px]">{item.name}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-sm text-[#131722]">${item.price.toFixed(2)}</div>
                <div
                  className={`text-xs font-semibold ${
                    isUp ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isUp ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
