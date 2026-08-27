import React from 'react';
import { MarketAsset } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerTapeProps {
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
}

export const TickerTape: React.FC<TickerTapeProps> = ({ assets, onSelectAsset }) => {
  const displayAssets = assets.slice(0, 10);

  return (
    <div className="bg-[#131722] text-white border-b border-black/40 overflow-hidden select-none py-1.5 px-2">
      <div className="flex items-center gap-6 animate-pulse-slow overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 whitespace-nowrap text-xs font-medium">
          {displayAssets.map((asset) => {
            const isUp = asset.changePercent >= 0;
            return (
              <button
                key={asset.id}
                onClick={() => onSelectAsset(asset)}
                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span className="font-bold tracking-wider text-slate-200">{asset.symbol}</span>
                <span className="font-mono text-slate-100">{asset.priceFormatted}</span>
                <span
                  className={`inline-flex items-center font-mono text-[11px] font-semibold ${
                    isUp ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isUp ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%
                </span>
                <span className="text-slate-600">|</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
