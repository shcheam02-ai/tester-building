import React, { useState } from 'react';
import { MarketAsset, Timeframe } from '../types';
import { X, TrendingUp, TrendingDown, Star, Share2, Maximize2, Layers, BarChart2, BellRing, Check } from 'lucide-react';

interface AssetDetailModalProps {
  asset: MarketAsset | null;
  onClose: () => void;
  onToggleWatchlist?: (symbol: string) => void;
  isWatchlisted?: boolean;
}

const TIMEFRAMES: Timeframe[] = ['1D', '5D', '1M', '6M', '1Y', '5Y', 'ALL'];

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  onToggleWatchlist,
  isWatchlisted = false,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1D');
  const [hoveredPoint, setHoveredPoint] = useState<{ time: string; price: number } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'chart' | 'constituents' | 'stats'>('chart');

  if (!asset) return null;

  const chartPoints = asset.chartData[selectedTimeframe] || asset.chartData['1D'];
  const isUp = asset.changePercent >= 0;
  const strokeColor = isUp ? '#089981' : '#f23645';
  const fillColor = isUp ? 'rgba(8, 153, 129, 0.12)' : 'rgba(242, 54, 69, 0.12)';

  // Calculate coordinates for responsive SVG chart
  const minPrice = Math.min(...chartPoints.map((p) => p.price));
  const maxPrice = Math.max(...chartPoints.map((p) => p.price));
  const priceRange = maxPrice - minPrice || 1;
  const width = 640;
  const height = 240;
  const paddingX = 20;
  const paddingY = 20;

  const getX = (index: number) => paddingX + (index / (chartPoints.length - 1 || 1)) * (width - paddingX * 2);
  const getY = (price: number) => height - paddingY - ((price - minPrice) / priceRange) * (height - paddingY * 2);

  const polylinePoints = chartPoints
    .map((pt, idx) => `${getX(idx)},${getY(pt.price)}`)
    .join(' ');

  const areaPoints = `${getX(0)},${height - paddingY} ${polylinePoints} ${getX(chartPoints.length - 1)},${height - paddingY}`;

  const currentDisplayPrice = hoveredPoint ? hoveredPoint.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : asset.priceFormatted;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="asset-detail-dialog"
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#e0e3eb] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#e0e3eb] flex items-start justify-between bg-[#fafbfc]">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-full ${asset.badgeBgColor} ${
                asset.badgeTextColor || 'text-white'
              } flex items-center justify-center font-bold text-base shadow-sm`}
            >
              {asset.badge}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#131722]">{asset.name}</h2>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-[#e0e3eb] text-[#131722] font-mono">
                  {asset.symbol}
                </span>
                {asset.exchange && (
                  <span className="text-xs text-[#787b86] hidden sm:inline">• {asset.exchange}</span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#787b86] mt-0.5 line-clamp-1">
                {asset.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="asset-watchlist-btn"
              onClick={() => onToggleWatchlist?.(asset.symbol)}
              className={`p-2 rounded-lg border transition-colors ${
                isWatchlisted
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-white border-[#e0e3eb] text-[#787b86] hover:text-[#131722]'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              id="asset-share-btn"
              onClick={handleShare}
              className="p-2 rounded-lg border border-[#e0e3eb] bg-white text-[#787b86] hover:text-[#131722] transition-colors"
              title="Share"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              id="close-asset-modal-btn"
              onClick={onClose}
              className="p-2 rounded-lg border border-[#e0e3eb] bg-white text-[#787b86] hover:text-[#131722] hover:bg-[#f0f3fa] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Price & Sentiment Banner */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-[#f0f3fa]">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#131722] font-mono tracking-tight">
                {currentDisplayPrice}
                {asset.unit && <span className="text-base text-[#787b86] font-normal ml-1">{asset.unit}</span>}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`inline-flex items-center gap-1 text-sm sm:text-base font-semibold ${
                    isUp ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {isUp ? '+' : ''}
                  {asset.change.toFixed(2)} ({isUp ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%)
                </span>
                <span className="text-xs text-[#787b86]">Today</span>
                {hoveredPoint && (
                  <span className="text-xs bg-[#f0f3fa] text-[#131722] px-2 py-0.5 rounded font-mono">
                    Time: {hoveredPoint.time}
                  </span>
                )}
              </div>
            </div>

            {/* Technical Sentiment Tag */}
            <div className="flex items-center gap-2 bg-[#f0f3fa] px-3.5 py-2 rounded-xl">
              <span className="text-xs text-[#787b86] font-medium">Technical Rating:</span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  asset.technicalRating.includes('Buy')
                    ? 'bg-emerald-100 text-emerald-700'
                    : asset.technicalRating.includes('Sell')
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {asset.technicalRating}
              </span>
            </div>
          </div>

          {/* Subtabs for Chart / Constituents / Stats */}
          <div className="flex items-center justify-between border-b border-[#e0e3eb] pb-2">
            <div className="flex items-center gap-4 text-sm font-medium">
              <button
                onClick={() => setActiveTab('chart')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'chart' ? 'text-[#2962ff] font-semibold' : 'text-[#787b86] hover:text-[#131722]'
                }`}
              >
                Interactive Chart
                {activeTab === 'chart' && (
                  <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#2962ff]" />
                )}
              </button>
              {asset.constituents && asset.constituents.length > 0 && (
                <button
                  onClick={() => setActiveTab('constituents')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'constituents' ? 'text-[#2962ff] font-semibold' : 'text-[#787b86] hover:text-[#131722]'
                  }`}
                >
                  Top Constituents ({asset.constituents.length})
                  {activeTab === 'constituents' && (
                    <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#2962ff]" />
                  )}
                </button>
              )}
              <button
                onClick={() => setActiveTab('stats')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'stats' ? 'text-[#2962ff] font-semibold' : 'text-[#787b86] hover:text-[#131722]'
                }`}
              >
                Key Statistics
                {activeTab === 'stats' && (
                  <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#2962ff]" />
                )}
              </button>
            </div>

            {/* Timeframe Filter Buttons */}
            {activeTab === 'chart' && (
              <div className="flex items-center gap-1 bg-[#f0f3fa] p-1 rounded-lg">
                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedTimeframe === tf
                        ? 'bg-white text-[#131722] shadow-xs'
                        : 'text-[#787b86] hover:text-[#131722]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab 1: Chart View */}
          {activeTab === 'chart' && (
            <div className="space-y-4">
              <div className="relative w-full h-[260px] bg-[#fafbfc] rounded-xl p-3 border border-[#f0f3fa]">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox={`0 0 ${width} ${height}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[0.25, 0.5, 0.75].map((pct, i) => (
                    <line
                      key={i}
                      x1={paddingX}
                      y1={paddingY + pct * (height - paddingY * 2)}
                      x2={width - paddingX}
                      y2={paddingY + pct * (height - paddingY * 2)}
                      stroke="#e0e3eb"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Area fill */}
                  <polygon fill="url(#chartGradient)" points={areaPoints} />

                  {/* Polyline line */}
                  <polyline
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={polylinePoints}
                  />

                  {/* Interactive hover points */}
                  {chartPoints.map((pt, idx) => {
                    const cx = getX(idx);
                    const cy = getY(pt.price);
                    return (
                      <circle
                        key={idx}
                        cx={cx}
                        cy={cy}
                        r="6"
                        className="opacity-0 hover:opacity-100 fill-white stroke-[#131722] stroke-2 cursor-pointer transition-opacity"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    );
                  })}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between text-[11px] text-[#787b86] font-mono mt-2 px-2">
                  <span>{chartPoints[0]?.time}</span>
                  <span>{chartPoints[Math.floor(chartPoints.length / 2)]?.time}</span>
                  <span>{chartPoints[chartPoints.length - 1]?.time}</span>
                </div>
              </div>

              {/* Day & 52-Week Range Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f0f3fa] p-4 rounded-xl">
                <div>
                  <div className="flex justify-between text-xs text-[#787b86] mb-1">
                    <span>Day Low: {asset.low24h.toFixed(2)}</span>
                    <span className="font-semibold text-[#131722]">Day Range</span>
                    <span>Day High: {asset.high24h.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-[#d1d4dc] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#2962ff] h-full rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(
                            5,
                            ((asset.price - asset.low24h) /
                              (asset.high24h - asset.low24h || 1)) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#787b86] mb-1">
                    <span>52W Low: {asset.week52Low.toFixed(2)}</span>
                    <span className="font-semibold text-[#131722]">52-Week Range</span>
                    <span>52W High: {asset.week52High.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-[#d1d4dc] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#2962ff] h-full rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(
                            5,
                            ((asset.price - asset.week52Low) /
                              (asset.week52High - asset.week52Low || 1)) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Constituents */}
          {activeTab === 'constituents' && asset.constituents && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#787b86] uppercase tracking-wider mb-2">
                Major Index Constituents & Holdings
              </div>
              <div className="divide-y divide-[#f0f3fa] border border-[#e0e3eb] rounded-xl overflow-hidden">
                {asset.constituents.map((item) => (
                  <div
                    key={item.symbol}
                    className="p-3 flex items-center justify-between hover:bg-[#f0f3fa] transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#131722] text-sm">{item.symbol}</span>
                        <span className="text-xs text-[#787b86]">{item.name}</span>
                      </div>
                      {item.weight && (
                        <span className="text-[11px] text-[#787b86]">Weight: {item.weight}</span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm text-[#131722]">${item.price.toFixed(2)}</div>
                      <div
                        className={`text-xs font-semibold ${
                          item.changePercent >= 0 ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {item.changePercent >= 0 ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Key Statistics */}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#f0f3fa] rounded-xl">
                <span className="text-xs text-[#787b86]">Volume</span>
                <p className="text-base font-bold text-[#131722] mt-0.5">{asset.volume}</p>
              </div>
              {asset.marketCap && (
                <div className="p-3 bg-[#f0f3fa] rounded-xl">
                  <span className="text-xs text-[#787b86]">Market Cap</span>
                  <p className="text-base font-bold text-[#131722] mt-0.5">{asset.marketCap}</p>
                </div>
              )}
              {asset.peRatio && (
                <div className="p-3 bg-[#f0f3fa] rounded-xl">
                  <span className="text-xs text-[#787b86]">P/E Ratio</span>
                  <p className="text-base font-bold text-[#131722] mt-0.5">{asset.peRatio}</p>
                </div>
              )}
              {asset.dividendYield && (
                <div className="p-3 bg-[#f0f3fa] rounded-xl">
                  <span className="text-xs text-[#787b86]">Div Yield</span>
                  <p className="text-base font-bold text-[#131722] mt-0.5">{asset.dividendYield}</p>
                </div>
              )}
              <div className="p-3 bg-[#f0f3fa] rounded-xl">
                <span className="text-xs text-[#787b86]">Category</span>
                <p className="text-base font-bold text-[#131722] mt-0.5">{asset.category}</p>
              </div>
              <div className="p-3 bg-[#f0f3fa] rounded-xl">
                <span className="text-xs text-[#787b86]">Exchange</span>
                <p className="text-base font-bold text-[#131722] mt-0.5">{asset.exchange || 'Global'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#e0e3eb] bg-[#fafbfc] flex items-center justify-between">
          <span className="text-xs text-[#787b86]">
            Real-time indicative quotes provided for informational purposes.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#131722] hover:bg-black text-white text-sm font-semibold transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
