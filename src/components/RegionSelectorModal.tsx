import React from 'react';
import { Check, X, Globe, Sparkles } from 'lucide-react';
import { REGIONS } from '../data/marketData';
import { RegionOption } from '../types';

interface RegionSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegion: string;
  onSelectRegion: (region: RegionOption) => void;
}

export const RegionSelectorModal: React.FC<RegionSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedRegion,
  onSelectRegion,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="region-selector-modal"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#e0e3eb] overflow-hidden"
      >
        <div className="p-5 border-b border-[#e0e3eb] flex items-center justify-between bg-[#fafbfc]">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-[#2962ff]" />
            <h3 className="font-bold text-lg text-[#131722]">Select Market Scope</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#787b86] hover:text-[#131722] hover:bg-[#f0f3fa] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 divide-y divide-[#f0f3fa] space-y-1">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region.id;
            return (
              <button
                key={region.id}
                onClick={() => {
                  onSelectRegion(region);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-xl flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'bg-[#f0f3fa] border border-[#d1d4dc] text-[#131722]'
                    : 'hover:bg-[#fafbfc] text-[#131722]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">{region.flag}</span>
                  <div>
                    <div className="font-bold text-base">{region.name}</div>
                    <div className="text-xs text-[#787b86] mt-0.5">{region.description}</div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#2962ff] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-[#fafbfc] border-t border-[#e0e3eb] flex items-center justify-between text-xs text-[#787b86]">
          <span>Customizable regional filters update all benchmark indicators.</span>
          <button
            onClick={onClose}
            className="font-semibold text-[#2962ff] hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
