import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert(t('messageSent'));
    setFormData({ name: '', email: '', message: '' });
  };

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
          <h1 className="font-serif text-4xl md:text-5xl text-[#3A352F] mb-6">{t('contactUs')}</h1>
          <div className="w-16 h-px bg-[#E8E4D9] mx-auto mb-8"></div>
          <p className="text-[#5C554B] font-light mb-4">
            {t('contactText')}
          </p>
          <a href="mailto:hello@natialstudio.com" className="text-[#8B7E6A] hover:text-[#3A352F] transition-colors font-medium">
            hello@natialstudio.com
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 shadow-sm border border-[#E8E4D9]">
          <div>
            <label htmlFor="name" className="block text-sm uppercase tracking-widest text-[#3A352F] mb-2">{t('name')}</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-b border-[#E8E4D9] py-2 focus:outline-none focus:border-[#8B7E6A] transition-colors bg-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm uppercase tracking-widest text-[#3A352F] mb-2">{t('email')}</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-b border-[#E8E4D9] py-2 focus:outline-none focus:border-[#8B7E6A] transition-colors bg-transparent"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm uppercase tracking-widest text-[#3A352F] mb-2">{t('message')}</label>
            <textarea
              id="message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border-b border-[#E8E4D9] py-2 focus:outline-none focus:border-[#8B7E6A] transition-colors bg-transparent resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#8B7E6A] text-white py-4 uppercase tracking-widest text-sm hover:bg-[#7A6D59] transition-colors"
          >
            {t('send')}
          </button>
        </form>
      </div>
    </motion.div>
  );
};
