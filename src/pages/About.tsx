import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export const About = () => {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24 bg-[#FAFAFA]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-[#3A352F] mb-6">{t('ourStory')}</h1>
          <div className="w-16 h-px bg-[#E8E4D9] mx-auto"></div>
        </div>

        <div className="space-y-16">
          <div className="prose prose-lg mx-auto text-[#5C554B] font-light leading-relaxed">
            <p className="text-xl text-center mb-12 italic text-[#8B7E6A]">
              "Natial was born from a personal journey to find clothing that feels just right — natural to the skin, thoughtfully designed, and lovingly handmade."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <p className="mb-6">
                  {t('storyText')}
                </p>
              </div>
              <div>
                <img 
                  src="https://picsum.photos/seed/sisters/600/800" 
                  alt="Sisters working together" 
                  className="w-full h-auto rounded-sm shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="https://picsum.photos/seed/slow-fashion/600/800" 
                  alt="Slow fashion philosophy" 
                  className="w-full h-auto rounded-sm shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="font-serif text-2xl text-[#3A352F] mb-4">{t('slowFashion')}</h2>
                <p>
                  {t('slowFashionText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
