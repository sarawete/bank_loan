import React from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`w-full bg-[#005072] relative z-50 ${className}`}>
      <div className=" mx-auto px-4 lg:px-16">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-baseline space-x-0">
              <Image src='/images/loan_logo.png' width={180} height={180} alt='loan Simulator logo' />
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
              href="/login"
              className="bg-[#8FC920] text-white font-bold text-sm lg:text-xl px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg hover:bg-[#7FB519] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Connexion
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};