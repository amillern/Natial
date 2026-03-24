import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import productsData from '../data/products.json';
import { Product } from '../context/CartContext';
import { motion } from 'motion/react';

export const Catalog = () => {
  const { t, language } = useLanguage();
  const products: Product[] = productsData;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24 bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-[#3A352F] mb-6">{t('catalog')}</h1>
          <div className="w-16 h-px bg-[#E8E4D9] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="relative overflow-hidden bg-[#FDFBF7] aspect-[3/4] mb-4">
                <img
                  src={product.images[0]}
                  alt={product.name[language] || product.name['en']}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-sm font-medium text-[#3A352F] mb-1 uppercase tracking-wider">
                {product.name[language] || product.name['en']}
              </h3>
              <p className="text-sm text-[#8B7E6A]">{product.price.amount} {product.price.currency}</p>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
