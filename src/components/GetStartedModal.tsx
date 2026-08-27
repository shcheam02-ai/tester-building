import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="get-started-modal"
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#e0e3eb] overflow-hidden relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#787b86] hover:text-[#131722] hover:bg-[#f0f3fa] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0094ff] to-[#a855f7] flex items-center justify-center mx-auto mb-4 text-white shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#131722]">Join 60 Million+ Traders</h3>
            <p className="text-sm text-[#787b86] mt-1.5">
              Access real-time global markets, customizable charts, screeners, and active trading communities.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-in zoom-in-95">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#131722] text-lg">Welcome to TradingView!</h4>
              <p className="text-xs text-[#787b86] mt-1">
                A verification link has been sent to <span className="font-semibold text-[#131722]">{email}</span>.
              </p>
              <button
                onClick={onClose}
                className="mt-5 w-full py-2.5 rounded-full bg-[#131722] text-white font-semibold text-sm hover:bg-black transition-colors"
              >
                Start Exploring Markets
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Quick OAuth Buttons */}
              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-full border border-[#e0e3eb] hover:bg-[#f0f3fa] text-sm font-semibold text-[#131722] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 my-3">
                <div className="h-px bg-[#e0e3eb] flex-1" />
                <span className="text-xs text-[#787b86] uppercase font-semibold">or with email</span>
                <div className="h-px bg-[#e0e3eb] flex-1" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e0e3eb] text-sm text-[#131722] placeholder-[#787b86] focus:border-[#2962ff] focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#0094ff] to-[#a855f7] hover:from-[#0080e0] hover:to-[#9333ea] text-white font-semibold text-sm shadow-md transition-all active:scale-98"
                >
                  Create Free Account
                </button>
              </form>

              <div className="pt-2 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#787b86]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No credit card required. Free tier forever.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
