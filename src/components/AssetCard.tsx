import React from 'react';
import { MarketAsset } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AssetCardProps {
  asset: MarketAsset;
  isSelected?: boolean;
  onSelect: (asset: MarketAsset) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  isSelected = false,
  onSelect,
}) => {
  const isUp = asset.changePercent >= 0;

  // Mini sparkline SVG generator based on 1D chart points
  const points = asset.chartData['1D'] || [];
  const minPrice = Math.min(...points.map((p) => p.price));
  const maxPrice = Math.max(...points.map((p) => p.price));
  const range = maxPrice - minPrice || 1;
  const svgPoints = points
    .map((p, idx) => {
      const x = (idx / (points.length - 1 || 1)) * 60;
      const y = 24 - ((p.price - minPrice) / range) * 20;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      id={`asset-card-${asset.id}`}
      onClick={() => onSelect(asset)}
      className={`rounded-full p-2 pr-5 flex items-center justify-between cursor-pointer transition-all duration-150 group border ${
        isSelected
          ? 'bg-[#e2e8f0] border-[#cbd5e1] shadow-xs'
          : 'bg-[#f0f3fa] hover:bg-[#e4e8f2] border-transparent hover:border-[#d1d4dc]'
      }`}
    >
      {/* Left: Badge & Name */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-10 h-10 rounded-full ${asset.badgeBgColor} ${
            asset.badgeTextColor || 'text-white'
          } flex items-center justify-center font-bold text-xs sm:text-sm tracking-tight flex-shrink-0 shadow-xs`}
        >
          {asset.badge}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-[#131722] group-hover:text-[#2962ff] transition-colors truncate">
            {asset.name}
          </span>
          <span className="text-[11px] text-[#787b86] uppercase font-mono tracking-wider">
            {asset.symbol}
          </span>
        </div>
      </div>

      {/* Right: Sparkline & Price Change */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Mini Sparkline Chart */}
        <div className="hidden sm:block w-14 h-6">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 60 24">
            <polyline
              fill="none"
              stroke={isUp ? '#089981' : '#f23645'}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={svgPoints}
            />
          </svg>
        </div>

        {/* Price & Change Pill */}
        <div className="text-right">
          <div className="text-sm font-semibold text-[#131722]">
            {asset.priceFormatted}
          </div>
          <div
            className={`text-xs font-semibold inline-flex items-center gap-0.5 ${
              isUp ? 'text-[#089981]' : 'text-[#f23645]'
            }`}
          >
            {isUp ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>
              {isUp ? '+' : ''}
              {asset.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
