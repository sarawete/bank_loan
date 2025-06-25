import React from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`w-full bg-[#005072] relative z-50 ${className}`}>
      <div className="container mx-auto px-4 lg:px-6">
        <nav className="flex items-center justify-between h-16 lg:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-baseline space-x-0">
              <span className="text-[#99D1FF] text-lg lg:text-xl font-normal">
                Loan
              </span>
              <span className="text-black text-2xl lg:text-3xl font-normal">
                Simulator
              </span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Language Selector */}
            <button className="flex items-center gap-2 text-white hover:text-[#99D1FF] transition-colors">
              <Globe className="w-5 h-5" />
              <span className="text-sm lg:text-lg font-medium">EN</span>
            </button>

            {/* CTA Button */}
            <Link
              href="/start"
              className="bg-[#8FC920] text-white font-bold text-sm lg:text-xl px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg hover:bg-[#7FB519] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};