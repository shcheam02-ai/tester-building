import React, { useState, useEffect } from 'react';
import { MarketAsset, MarketCategory, RegionOption } from './types';
import { MARKET_ASSETS, REGIONS } from './data/marketData';
import { Header } from './components/Header';
import { IndicesFilterBar } from './components/IndicesFilterBar';
import { AssetCard } from './components/AssetCard';
import { AssetDetailModal } from './components/AssetDetailModal';
import { SearchModal } from './components/SearchModal';
import { RegionSelectorModal } from './components/RegionSelectorModal';
import { TickerTape } from './components/TickerTape';
import { MarketMovers } from './components/MarketMovers';
import { EconomicCalendar } from './components/EconomicCalendar';
import { GetStartedModal } from './components/GetStartedModal';
import { 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  BarChart3, 
  TrendingUp, 
  Globe2, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Users, 
  Compass, 
  ExternalLink,
  Search
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('Markets');
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('US stocks');
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<RegionOption>(REGIONS[0]);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>(['SPX', 'NDX', 'BTCUSD']);

  // Global Ctrl+K / Cmd+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleWatchlist = (symbol: string) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const handleSelectSymbolFromMovers = (symbol: string) => {
    const found = MARKET_ASSETS.find((a) => a.symbol === symbol);
    if (found) {
      setSelectedAsset(found);
    } else {
      setIsSearchOpen(true);
    }
  };

  // Filter assets by active category
  const filteredAssets = MARKET_ASSETS.filter(
    (asset) => asset.category === selectedCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#131722]">
      {/* Top Real-Time Ticker Tape */}
      <TickerTape
        assets={MARKET_ASSETS}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
      />

      {/* Primary Top Navigation Bar */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main View Router based on activeNav */}
      {activeNav === 'Markets' && (
        <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-14 w-full space-y-12">
          {/* Page Title: "Markets, everywhere ⌵" */}
          <div className="text-center">
            <button
              id="markets-scope-dropdown-btn"
              onClick={() => setIsRegionModalOpen(true)}
              className="group inline-flex items-center gap-2 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#131722] hover:opacity-80 transition-all focus:outline-none"
            >
              <span>{selectedRegion.name}</span>
              <ChevronDown className="w-8 h-8 md:w-10 md:h-10 text-[#131722] group-hover:translate-y-0.5 transition-transform stroke-[2.5]" />
            </button>
            <p className="text-sm md:text-base text-[#787b86] mt-2 font-medium">
              Real-time quotes, world indices, futures, currencies, and macroeconomic data
            </p>
          </div>

          {/* Indices & Assets Section */}
          <section id="indices-section" className="space-y-6">
            {/* Section Header & Filter Strip */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e0e3eb] pb-4">
              <button
                id="indices-heading-btn"
                onClick={() => setSelectedCategory('US stocks')}
                className="text-2xl sm:text-3xl font-bold flex items-center gap-1.5 text-[#131722] hover:text-[#2962ff] transition-colors text-left"
              >
                <span>Indices</span>
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>

              {/* Category Filter Pills (US stocks, World stocks, Crypto, Futures, Forex, Bonds, ETFs, Economy) */}
              <IndicesFilterBar
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
              />
            </div>

            {/* Indices Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  isSelected={selectedAsset?.id === asset.id}
                  onSelect={(a) => setSelectedAsset(a)}
                />
              ))}
            </div>
          </section>

          {/* Market Movers & Hot Activity */}
          <section id="movers-section">
            <MarketMovers onSelectSymbol={handleSelectSymbolFromMovers} />
          </section>

          {/* Economic Calendar & Real-Time News */}
          <section id="economic-calendar-section">
            <EconomicCalendar />
          </section>

          {/* Interactive Trading Features Highlights */}
          <section className="bg-gradient-to-br from-[#f0f3fa] to-[#e6ecf8] rounded-3xl p-6 sm:p-10 border border-[#e0e3eb]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-bold text-[#2962ff] shadow-xs mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Next-Generation Financial Tools
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#131722]">
                Supercharge your market analysis with TradingView
              </h3>
              <p className="text-[#787b86] text-sm sm:text-base mt-2 leading-relaxed">
                Connect directly with top tier brokers, automate trading strategies in Pine Script®, and collaborate with 60M+ verified global investors.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsGetStartedOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-[#2962ff] hover:bg-[#1e53e5] text-white font-semibold text-sm shadow-md transition-all active:scale-95"
                >
                  Start Free Trial
                </button>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-white hover:bg-[#fafbfc] border border-[#d1d4dc] text-[#131722] font-semibold text-sm transition-all"
                >
                  Explore All 10,000+ Symbols
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Screen 2: Products Screen */}
      {activeNav === 'Products' && (
        <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-6 py-12 w-full space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-[#131722]">TradingView Products</h2>
            <p className="text-[#787b86] mt-2 text-base">
              The world's most powerful charting platform and financial visualization suite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-[#e0e3eb] bg-white shadow-xs hover:border-[#2962ff] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#2962ff] flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-[#131722]">Supercharts</h3>
              <p className="text-sm text-[#787b86] mt-2 leading-relaxed">
                Precision charting with 100+ pre-built technical indicators, custom intervals, multi-timeframe overlays, and pattern recognition.
              </p>
              <button
                onClick={() => setActiveNav('Markets')}
                className="mt-5 text-sm font-semibold text-[#2962ff] hover:underline"
              >
                Launch Charts →
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-[#e0e3eb] bg-white shadow-xs hover:border-[#2962ff] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-[#131722]">Stock & Crypto Screeners</h3>
              <p className="text-sm text-[#787b86] mt-2 leading-relaxed">
                Filter thousands of equities, forex pairs, and crypto tokens by valuation metrics, volume spikes, and technical signals.
              </p>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="mt-5 text-sm font-semibold text-[#2962ff] hover:underline"
              >
                Open Screener →
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-[#e0e3eb] bg-white shadow-xs hover:border-[#2962ff] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-[#131722]">Pine Script® v6</h3>
              <p className="text-sm text-[#787b86] mt-2 leading-relaxed">
                Create your own custom indicators, backtest quantitative trading strategies, and execute algorithmic signals with millisecond latency.
              </p>
              <button
                onClick={() => setIsGetStartedOpen(true)}
                className="mt-5 text-sm font-semibold text-[#2962ff] hover:underline"
              >
                Learn Pine Script →
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Screen 3: Community Screen */}
      {activeNav === 'Community' && (
        <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-6 py-12 w-full space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-[#131722]">Trader Community</h2>
            <p className="text-[#787b86] mt-2 text-base">
              Share trading ideas, learn from elite market analysts, and participate in live trading discussions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-[#e0e3eb] bg-white">
              <h3 className="font-bold text-lg text-[#131722] mb-3">Trending Ideas & Setups</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#f0f3fa]">
                  <span className="text-xs font-semibold text-[#089981] uppercase">Long • SPX</span>
                  <h4 className="font-bold text-sm text-[#131722] mt-1">
                    S&P 500 Breakout Test above 6,000 Key Level with Volume Expansion
                  </h4>
                  <p className="text-xs text-[#787b86] mt-1">Published by MacroAnalystPro • 3.2k likes</p>
                </div>
                <div className="p-4 rounded-xl bg-[#f0f3fa]">
                  <span className="text-xs font-semibold text-[#2962ff] uppercase">Analysis • BTCUSD</span>
                  <h4 className="font-bold text-sm text-[#131722] mt-1">
                    Bitcoin Halving Supercycle: Wave 5 Target Projections to $110,000
                  </h4>
                  <p className="text-xs text-[#787b86] mt-1">Published by CryptoQuantLab • 5.8k likes</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[#e0e3eb] bg-white">
              <h3 className="font-bold text-lg text-[#131722] mb-3">Top Market Authors</h3>
              <div className="divide-y divide-[#f0f3fa]">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">
                      MA
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#131722]">MacroAnalystPro</div>
                      <div className="text-xs text-[#787b86]">148k Followers • Equities & Yields</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 rounded-full bg-[#f0f3fa] hover:bg-[#e0e3eb] text-xs font-semibold text-[#131722]">
                    Follow
                  </button>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center">
                      CQ
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#131722]">CryptoQuantLab</div>
                      <div className="text-xs text-[#787b86]">92k Followers • Digital Assets</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 rounded-full bg-[#f0f3fa] hover:bg-[#e0e3eb] text-xs font-semibold text-[#131722]">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Screen 4: Brokers Screen */}
      {activeNav === 'Brokers' && (
        <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-6 py-12 w-full space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-[#131722]">Integrated Trading Brokers</h2>
            <p className="text-[#787b86] mt-2 text-base">
              Connect your verified broker account and trade directly from the TradingView charts with zero latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-[#e0e3eb] bg-white text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 font-extrabold text-xl flex items-center justify-center mx-auto mb-3">
                IBKR
              </div>
              <h3 className="font-bold text-lg text-[#131722]">Interactive Brokers</h3>
              <p className="text-xs text-[#787b86] mt-1">Global stocks, options, futures, and bonds with lowest margin rates.</p>
              <button
                onClick={() => setIsGetStartedOpen(true)}
                className="mt-4 w-full py-2 rounded-full bg-[#131722] text-white text-xs font-semibold hover:bg-black"
              >
                Connect Broker
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-[#e0e3eb] bg-white text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 font-extrabold text-xl flex items-center justify-center mx-auto mb-3">
                FXCM
              </div>
              <h3 className="font-bold text-lg text-[#131722]">FXCM Global</h3>
              <p className="text-xs text-[#787b86] mt-1">Tight forex spreads, CFD indices, commodities and crypto with fast execution.</p>
              <button
                onClick={() => setIsGetStartedOpen(true)}
                className="mt-4 w-full py-2 rounded-full bg-[#131722] text-white text-xs font-semibold hover:bg-black"
              >
                Connect Broker
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-[#e0e3eb] bg-white text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 font-extrabold text-xl flex items-center justify-center mx-auto mb-3">
                TR
              </div>
              <h3 className="font-bold text-lg text-[#131722]">TradeStation</h3>
              <p className="text-xs text-[#787b86] mt-1">High speed order execution for active US equity and futures traders.</p>
              <button
                onClick={() => setIsGetStartedOpen(true)}
                className="mt-4 w-full py-2 rounded-full bg-[#131722] text-white text-xs font-semibold hover:bg-black"
              >
                Connect Broker
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Screen 5: More Screen */}
      {activeNav === 'More' && (
        <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-6 py-12 w-full space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-[#131722]">More Market Resources</h2>
            <p className="text-[#787b86] mt-2 text-base">
              Widgets, APIs, Mobile Apps, and Developer Documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-[#e0e3eb] bg-[#fafbfc]">
              <h4 className="font-bold text-base text-[#131722]">Mobile Apps</h4>
              <p className="text-xs text-[#787b86] mt-1">iOS and Android with synced cloud watchlists.</p>
            </div>
            <div className="p-5 rounded-2xl border border-[#e0e3eb] bg-[#fafbfc]">
              <h4 className="font-bold text-base text-[#131722]">Desktop App</h4>
              <p className="text-xs text-[#787b86] mt-1">Native multi-monitor performance for macOS and Windows.</p>
            </div>
            <div className="p-5 rounded-2xl border border-[#e0e3eb] bg-[#fafbfc]">
              <h4 className="font-bold text-base text-[#131722]">Market Widgets</h4>
              <p className="text-xs text-[#787b86] mt-1">Embed live ticker tapes and charts into any website.</p>
            </div>
            <div className="p-5 rounded-2xl border border-[#e0e3eb] bg-[#fafbfc]">
              <h4 className="font-bold text-base text-[#131722]">Help Center</h4>
              <p className="text-xs text-[#787b86] mt-1">Comprehensive guides, FAQs, and 24/7 technical support.</p>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-[#e0e3eb] bg-[#fafbfc] py-8 text-sm text-[#787b86]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-[#131722]"
              fill="none"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.5 12H8L5.5 17H10L12.5 12Z" fill="currentColor" />
              <path d="M16.5 12H14.5L12 17H14L16.5 12Z" fill="currentColor" />
              <path d="M22 12H20L15.5 21H17.5L22 12Z" fill="currentColor" />
              <path d="M27 12H25L21.5 19H23.5L27 12Z" fill="currentColor" />
            </svg>
            <span className="font-bold text-[#131722]">TradingView Markets</span>
            <span>• Global financial quotes & data</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium">
            <button onClick={() => setActiveNav('Markets')} className="hover:text-[#2962ff]">
              Markets
            </button>
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-[#2962ff]">
              Search (Ctrl+K)
            </button>
            <button onClick={() => setIsGetStartedOpen(true)} className="hover:text-[#2962ff]">
              Get Started
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Asset Detail Modal */}
      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onToggleWatchlist={handleToggleWatchlist}
        isWatchlisted={selectedAsset ? watchlist.includes(selectedAsset.symbol) : false}
      />

      {/* Global Quick Search Dialog */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        assets={MARKET_ASSETS}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
      />

      {/* Regional / Market Scope Dialog */}
      <RegionSelectorModal
        isOpen={isRegionModalOpen}
        onClose={() => setIsRegionModalOpen(false)}
        selectedRegion={selectedRegion.id}
        onSelectRegion={(reg) => setSelectedRegion(reg)}
      />

      {/* Get Started / Onboarding Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}
