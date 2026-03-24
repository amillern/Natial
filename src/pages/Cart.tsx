import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Trash2 } from 'lucide-react';

export const Cart = () => {
  const { t, language } = useLanguage();
  const { items, removeFromCart, total } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24 bg-[#FAFAFA] min-h-[70vh]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-[#3A352F] mb-6">{t('cart')}</h1>
          <div className="w-16 h-px bg-[#E8E4D9] mx-auto"></div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#5C554B] mb-8">{t('emptyCart')}</p>
            <Link 
              to="/catalog" 
              className="inline-block bg-[#8B7E6A] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#7A6D59] transition-colors"
            >
              {t('shopNow')}
            </Link>
          </div>
        ) : (
          <div className="bg-white p-6 md:p-8 shadow-sm border border-[#E8E4D9]">
            <div className="space-y-8">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} className="flex items-center border-b border-[#E8E4D9] pb-8 last:border-0 last:pb-0">
                  <div className="w-24 h-32 flex-shrink-0 overflow-hidden bg-[#FDFBF7]">
                    <img 
                      src={item.image} 
                      alt={item.name[language] || item.name['en']} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="ml-6 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-[#3A352F] uppercase tracking-wider mb-1">
                          {item.name[language] || item.name['en']}
                        </h3>
                        <p className="text-sm text-[#8B7E6A] mb-1">{t('color')}: {item.selectedColor}</p>
                        <p className="text-sm text-[#8B7E6A] mb-2">{t('size')}: {item.selectedSize}</p>
                        <p className="text-sm text-[#5C554B]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-[#3A352F]">€{item.price * item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                      className="mt-4 text-[#8B7E6A] hover:text-red-500 transition-colors self-start flex items-center text-xs uppercase tracking-widest"
                    >
                      <Trash2 size={14} className="mr-1" /> {t('remove')}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-[#E8E4D9]">
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-serif text-[#3A352F]">{t('total')}</span>
                <span className="text-xl font-medium text-[#3A352F]">€{total}</span>
              </div>
              <div className="space-y-4">
                <Link to="/checkout" className="block text-center w-full bg-[#3A352F] text-white py-4 uppercase tracking-widest text-sm hover:bg-[#2A2520] transition-colors">
                  {t('checkout')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
