import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export const Terms = () => {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24 bg-[#FAFAFA]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-[#3A352F] mb-6">{t('terms')}</h1>
          <div className="w-16 h-px bg-[#E8E4D9] mx-auto mb-8"></div>
        </div>

        <div className="space-y-12 text-[#5C554B] font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-[#3A352F] mb-4">{t('termsTitle')}</h2>
            <p className="mb-4">
              {t('termsIntro1')}
            </p>
            <p>
              {t('termsIntro2')}
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#3A352F] mb-4">{t('paymentTitle')}</h2>
            <p className="mb-4">
              {t('paymentText1')}
            </p>
            <p>
              {t('paymentText2')}
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#3A352F] mb-4">{t('returnsTitle')}</h2>
            <p className="mb-4">
              {t('returnsText1')}
            </p>
            <p>
              {t('returnsText2')}
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#3A352F] mb-4">{t('shippingTitle')}</h2>
            
            <h3 className="font-medium text-[#3A352F] mb-2 mt-6">{t('shippingPolicyTitle')}</h3>
            <p className="mb-4">
              {t('shippingPolicyText')}
            </p>

            <h3 className="font-medium text-[#3A352F] mb-2 mt-6">{t('processingTimeTitle')}</h3>
            <p className="mb-4">
              {t('processingTimeText1')}<br />
              {t('processingTimeText2')}
            </p>

            <h3 className="font-medium text-[#3A352F] mb-2 mt-6">{t('shippingTimeTitle')}</h3>
            <p className="mb-2">{t('shippingTimeSubtitle')}</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>{t('shippingTimeEurope')}</li>
              <li>{t('shippingTimeUS')}</li>
              <li>{t('shippingTimeOther')}</li>
            </ul>
            <p className="mb-4">
              {t('shippingTimeTracking')}
            </p>

            <h3 className="font-medium text-[#3A352F] mb-2 mt-6">{t('shippingCostTitle')}</h3>
            <p className="mb-4">
              {t('shippingCostText')}
            </p>

            <h3 className="font-medium text-[#3A352F] mb-2 mt-6">{t('customsTitle')}</h3>
            <p className="mb-4">
              {t('customsText')}
            </p>

            <h3 className="font-medium text-[#3A352F] mb-2 mt-6">{t('importantNotesTitle')}</h3>
            <p className="mb-4">
              {t('importantNotesText')}
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
