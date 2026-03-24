import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export const Home = () => {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/linen-fabric/1920/1080" 
            alt="Linen fabric texture" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#FDFBF7]/40 mix-blend-overlay"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#3A352F] mb-6 leading-tight"
          >
            {t('heroTitle')}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-[#5C554B] mb-10 max-w-2xl mx-auto font-light"
          >
            {t('heroSubtitle')}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link 
              to="/catalog" 
              className="inline-block bg-[#8B7E6A] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#7A6D59] transition-colors"
            >
              {t('shopNow')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://picsum.photos/seed/sewing/800/1000" 
                alt="Handmade process" 
                className="w-full h-[600px] object-cover rounded-sm shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-serif text-3xl md:text-4xl text-[#3A352F] mb-6">{t('ourStory')}</h2>
              <p className="text-[#5C554B] leading-relaxed mb-8 font-light">
                {t('storyText')}
              </p>
              <Link 
                to="/about" 
                className="inline-block border-b border-[#8B7E6A] text-[#8B7E6A] pb-1 uppercase tracking-widest text-sm hover:text-[#3A352F] hover:border-[#3A352F] transition-colors"
              >
                {t('about')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
