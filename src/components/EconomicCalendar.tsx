import React from 'react';
import { ECONOMIC_EVENTS, MARKET_NEWS } from '../data/marketData';
import { Calendar, Newspaper, ExternalLink, Clock } from 'lucide-react';

export const EconomicCalendar: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Column 1: Economic Calendar */}
      <div className="bg-white rounded-2xl border border-[#e0e3eb] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2962ff]" />
              <h3 className="font-bold text-lg text-[#131722]">Economic Calendar</h3>
            </div>
            <span className="text-xs text-[#787b86] font-medium">Today's Key Releases</span>
          </div>

          <div className="divide-y divide-[#f0f3fa]">
            {ECONOMIC_EVENTS.map((event) => (
              <div key={event.id} className="py-3 flex items-center justify-between hover:bg-[#fafbfc] px-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{event.countryFlag}</span>
                  <div>
                    <div className="font-semibold text-sm text-[#131722]">{event.title}</div>
                    <div className="flex items-center gap-2 text-xs text-[#787b86] mt-0.5">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span>•</span>
                      <span
                        className={`font-semibold px-1.5 py-0.2 rounded text-[10px] ${
                          event.impact === 'High'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {event.impact} Impact
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="text-[#131722] font-semibold">Forecast: {event.forecast}</div>
                  <div className="text-[#787b86]">Prior: {event.previous}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#f0f3fa] text-center">
          <button className="text-xs font-semibold text-[#2962ff] hover:underline">
            View Full Global Economic Calendar →
          </button>
        </div>
      </div>

      {/* Column 2: Market News & Insights */}
      <div className="bg-white rounded-2xl border border-[#e0e3eb] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-lg text-[#131722]">Market News & Insights</h3>
            </div>
            <span className="text-xs text-[#787b86]">Real-time Feed</span>
          </div>

          <div className="divide-y divide-[#f0f3fa]">
            {MARKET_NEWS.map((news) => (
              <div key={news.id} className="py-3 hover:bg-[#fafbfc] px-2 rounded-lg transition-colors group cursor-pointer">
                <div className="flex items-center justify-between text-xs text-[#787b86] mb-1">
                  <span className="font-semibold text-[#2962ff]">{news.source}</span>
                  <span>{news.timeAgo}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#131722] group-hover:text-[#2962ff] transition-colors line-clamp-2">
                  {news.title}
                </h4>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#f0f3fa] text-[#787b86] rounded-full">
                    {news.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#f0f3fa] text-center">
          <button className="text-xs font-semibold text-[#2962ff] hover:underline flex items-center justify-center gap-1 mx-auto">
            <span>Read more market headlines</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
