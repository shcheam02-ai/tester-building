export type MarketCategory = 
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures'
  | 'Forex'
  | 'Government bonds'
  | 'Corporate bonds'
  | 'ETFs'
  | 'Economy';

export type Timeframe = '1D' | '5D' | '1M' | '6M' | '1Y' | '5Y' | 'ALL';

export interface ChartPoint {
  time: string;
  price: number;
  volume?: number;
}

export interface Constituent {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  weight?: string;
}

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  badge: string; // e.g. "500", "100", "30", "BTC", "OIL"
  badgeBgColor: string; // e.g. "bg-red-500", "bg-blue-500", "bg-emerald-500"
  badgeTextColor?: string;
  category: MarketCategory;
  price: number;
  priceFormatted: string;
  change: number;
  changePercent: number;
  isPositive: boolean;
  currency?: string;
  unit?: string;
  high24h: number;
  low24h: number;
  week52High: number;
  week52Low: number;
  volume: string;
  marketCap?: string;
  peRatio?: string;
  dividendYield?: string;
  description: string;
  exchange?: string;
  technicalRating: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  constituents?: Constituent[];
  chartData: Record<Timeframe, ChartPoint[]>;
}

export interface MarketNewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  url?: string;
}

export interface EconomicEvent {
  id: string;
  time: string;
  country: string;
  countryFlag: string;
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  actual?: string;
  forecast: string;
  previous: string;
}

export interface RegionOption {
  id: string;
  name: string;
  description: string;
  flag: string;
}
