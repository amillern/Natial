import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Language } from '../i18n/translations';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { items } = useCart();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'uk', label: 'UK' },
    { code: 'es', label: 'ES' },
    { code: 'it', label: 'IT' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
  ];

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#5C554B] hover:text-[#3A352F]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link to="/" className="font-serif text-3xl tracking-wider text-[#3A352F]">
              NATIAL
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-[#5C554B] hover:text-[#3A352F] transition-colors uppercase text-sm tracking-widest">
              {t('home')}
            </Link>
            <Link to="/catalog" className="text-[#5C554B] hover:text-[#3A352F] transition-colors uppercase text-sm tracking-widest">
              {t('catalog')}
            </Link>
            <Link to="/about" className="text-[#5C554B] hover:text-[#3A352F] transition-colors uppercase text-sm tracking-widest">
              {t('about')}
            </Link>
            <Link to="/contact" className="text-[#5C554B] hover:text-[#3A352F] transition-colors uppercase text-sm tracking-widest">
              {t('contact')}
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center text-[#5C554B] hover:text-[#3A352F]"
              >
                <Globe size={20} className="mr-1" />
                <span className="text-sm uppercase">{language}</span>
              </button>
              
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white border border-[#E8E4D9] rounded-md shadow-lg py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-[#5C554B] hover:bg-[#FDFBF7]"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="text-[#5C554B] hover:text-[#3A352F] relative">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B7E6A] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-t border-[#E8E4D9]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-[#5C554B] hover:bg-[#F5F2EA] rounded-md text-base uppercase tracking-wider"
            >
              {t('home')}
            </Link>
            <Link
              to="/catalog"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-[#5C554B] hover:bg-[#F5F2EA] rounded-md text-base uppercase tracking-wider"
            >
              {t('catalog')}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-[#5C554B] hover:bg-[#F5F2EA] rounded-md text-base uppercase tracking-wider"
            >
              {t('about')}
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-[#5C554B] hover:bg-[#F5F2EA] rounded-md text-base uppercase tracking-wider"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
