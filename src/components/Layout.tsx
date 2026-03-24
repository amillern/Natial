import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Chatbot } from './Chatbot';
import { useLanguage } from '../context/LanguageContext';

export const Layout = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Update Document Title
    document.title = t('seoTitle');
    
    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('seoDescription'));
    }
    
    // Update Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', t('seoKeywords'));
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t('seoTitle'));
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', t('seoDescription'));
    }
  }, [t, language]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAFAFA] text-[#3A352F]">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};
