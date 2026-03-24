import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#FDFBF7] border-t border-[#E8E4D9] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="font-serif text-2xl tracking-wider text-[#3A352F]">NATIAL</span>
            <p className="mt-2 text-sm text-[#8B7E6A] max-w-xs text-center md:text-left">
              {t('madeIn')}
            </p>
            <a href="mailto:hello@natialstudio.com" className="mt-4 block text-sm text-[#8B7E6A] hover:text-[#3A352F] transition-colors text-center md:text-left">
              hello@natialstudio.com
            </a>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center md:justify-end">
            <a href="https://www.etsy.com/shop/Natial" target="_blank" rel="noopener noreferrer" className="text-[#8B7E6A] hover:text-[#3A352F] transition-colors">{t('etsyShop')}</a>
            <Link to="/terms" className="text-[#8B7E6A] hover:text-[#3A352F] transition-colors">{t('terms')}</Link>
            <a href="https://www.instagram.com/natial.studio" target="_blank" rel="noopener noreferrer" className="text-[#8B7E6A] hover:text-[#3A352F] transition-colors">Instagram</a>
            <a href="https://www.pinterest.com/natial_studio/" target="_blank" rel="noopener noreferrer" className="text-[#8B7E6A] hover:text-[#3A352F] transition-colors">Pinterest</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#E8E4D9] text-center">
          <p className="text-sm text-[#8B7E6A]">{t('footerText')}</p>
        </div>
      </div>
    </footer>
  );
};
