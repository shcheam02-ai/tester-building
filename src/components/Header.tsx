import React, { useState } from 'react';
import { Globe, User, Search, Menu, X, Bell, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const LANGUAGES = [
  { code: 'EN', name: 'English (US)' },
  { code: 'ES', name: 'Español' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'FR', name: 'Français' },
  { code: 'JA', name: '日本語' },
  { code: 'ZH', name: '中文 (简体)' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenGetStarted,
  activeNav,
  setActiveNav,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = ['Products', 'Community', 'Markets', 'Brokers', 'More'];

  return (
    <header className="border-b border-[#e0e3eb] sticky top-0 bg-white z-40">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Left Side: Logo & Search */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Authentic TradingView Logo */}
          <button
            id="header-brand-logo-btn"
            onClick={() => setActiveNav('Markets')}
            className="flex items-center gap-1.5 focus:outline-none group"
            aria-label="TradingView Home"
          >
            <svg
              className="w-8 h-8 text-[#131722] group-hover:text-[#2962ff] transition-colors"
              fill="none"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.5 12H8L5.5 17H10L12.5 12Z" fill="currentColor" />
              <path d="M16.5 12H14.5L12 17H14L16.5 12Z" fill="currentColor" />
              <path d="M22 12H20L15.5 21H17.5L22 12Z" fill="currentColor" />
              <path d="M27 12H25L21.5 19H23.5L27 12Z" fill="currentColor" />
            </svg>
            <span className="font-extrabold text-xl tracking-tight text-[#131722] hidden sm:inline">
              Trading<span className="text-[#2962ff]">View</span>
            </span>
          </button>

          {/* Quick Search Bar */}
          <button
            id="global-search-trigger"
            onClick={onOpenSearch}
            className="flex items-center bg-[#f0f3fa] hover:bg-[#e4e8f2] rounded-full px-3.5 py-1.5 md:w-64 text-left border border-transparent hover:border-[#d1d4dc] transition-all group"
            title="Search symbols, markets and ideas (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-[#787b86] mr-2 flex-shrink-0 group-hover:text-[#131722] transition-colors" />
            <span className="text-sm text-[#787b86] group-hover:text-[#131722] hidden sm:inline truncate">
              Search (Ctrl+K)
            </span>
            <span className="text-xs text-[#787b86] sm:hidden">Search</span>
            <kbd className="hidden lg:inline-block ml-auto text-[10px] uppercase font-mono px-1.5 py-0.5 bg-white rounded border border-[#e0e3eb] text-[#787b86]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium h-full">
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                id={`nav-link-${item.toLowerCase()}`}
                onClick={() => setActiveNav(item)}
                className={`relative h-full flex items-center transition-colors px-1 ${
                  isActive
                    ? 'text-[#2962ff] font-semibold'
                    : 'text-[#131722] hover:text-[#2962ff]'
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2962ff] rounded-t-sm" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              id="lang-selector-btn"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="hidden md:flex items-center gap-1 text-sm font-medium text-[#131722] hover:text-[#2962ff] px-2 py-1.5 rounded-md hover:bg-[#f0f3fa] transition-colors"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-4 h-4 text-[#787b86]" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#787b86]" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-[#e0e3eb] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-xs font-semibold text-[#787b86] uppercase tracking-wider">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-[#f0f3fa] transition-colors ${
                      selectedLang === lang.code ? 'font-semibold text-[#2962ff]' : 'text-[#131722]'
                    }`}
                  >
                    <span>{lang.name}</span>
                    {selectedLang === lang.code && <Check className="w-4 h-4 text-[#2962ff]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Button */}
          <div className="relative">
            <button
              id="user-profile-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="p-2 text-[#131722] hover:text-[#2962ff] hover:bg-[#f0f3fa] rounded-full transition-colors"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#e0e3eb] p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-[#e0e3eb] mb-1">
                  <p className="text-sm font-semibold text-[#131722]">Guest Trader</p>
                  <p className="text-xs text-[#787b86]">Standard Free Plan</p>
                </div>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onOpenGetStarted();
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#2962ff] font-medium hover:bg-[#f0f3fa] rounded-lg transition-colors"
                >
                  Sign in or Register
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 text-sm text-[#131722] hover:bg-[#f0f3fa] rounded-lg transition-colors"
                >
                  Dark theme: Off
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 text-sm text-[#131722] hover:bg-[#f0f3fa] rounded-lg transition-colors"
                >
                  Help Center
                </button>
              </div>
            )}
          </div>

          {/* Get Started Button */}
          <button
            id="get-started-header-btn"
            onClick={onOpenGetStarted}
            className="bg-gradient-to-r from-[#0094ff] to-[#a855f7] hover:from-[#0080e0] hover:to-[#9333ea] text-white font-semibold text-sm px-4 md:px-5 py-2 rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all whitespace-nowrap"
          >
            Get started
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-nav-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#131722] hover:bg-[#f0f3fa] rounded-lg"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e0e3eb] bg-white px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveNav(item);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                activeNav === item ? 'bg-[#f0f3fa] text-[#2962ff] font-semibold' : 'text-[#131722]'
              }`}
            >
              {item}
            </button>
          ))}
          <div className="pt-2 border-t border-[#e0e3eb] flex items-center justify-between text-sm text-[#787b86] px-3">
            <span>Language: {selectedLang}</span>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-[#2962ff] font-medium"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
