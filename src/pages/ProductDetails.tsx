import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart, Product } from '../context/CartContext';
import productsData from '../data/products.json';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { addToCart, items } = useCart();
  
  const product = (productsData as Product[]).find(p => p.id === id);
  
  const colorVariation = product?.variations.find(v => v.type === 'Color');
  const sizeVariation = product?.variations.find(v => v.type === 'Size');

  const colorValues = colorVariation?.values as Record<string, string[]>;
  const sizeValues = sizeVariation?.values as string[];

  const [selectedColor, setSelectedColor] = useState<string>(colorValues?.[language]?.[0] || colorValues?.['en']?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(sizeValues?.[0] || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isAdded = items.some(item => 
    item.id === product?.id && 
    item.selectedColor === selectedColor && 
    item.selectedSize === selectedSize
  );

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize);
  };

  const fullDescription = product.description[language] || product.description['en'];
  const [shortDescription, ...detailsParts] = fullDescription.split("\n\nCOAT DETAILS");
  const detailedInfo = detailsParts.length > 0 ? "COAT DETAILS" + detailsParts.join("\n\nCOAT DETAILS") : "";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24 bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[#8B7E6A] hover:text-[#3A352F] mb-12 transition-colors uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Carousel */}
          <div className="relative aspect-[3/4] bg-[#FDFBF7] overflow-hidden">
            <motion.img 
              key={currentImageIndex}
              src={product.images[currentImageIndex]} 
              alt={`${product.name[language] || product.name['en']} ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Carousel Navigation */}
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition-colors"
            >
              &#8592;
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition-colors"
            >
              &#8594;
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentImageIndex === index ? 'bg-[#3A352F]' : 'bg-[#E8E4D9]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start">
            <h1 className="font-serif text-3xl md:text-4xl text-[#3A352F] mb-4">
              {product.name[language] || product.name['en']}
            </h1>
            <p className="text-xl text-[#8B7E6A] mb-8">{product.price.amount} {product.price.currency}</p>
            
            <div className="mb-10">
              <p className="text-[#5C554B] font-light leading-relaxed whitespace-pre-line">
                {shortDescription}
              </p>
            </div>

            {colorVariation && (
              <div className="mb-10">
                <h3 className="text-sm uppercase tracking-widest text-[#3A352F] mb-4">
                  {typeof colorVariation.name === 'string' ? colorVariation.name : (colorVariation.name[language] || colorVariation.name['en'])}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {colorValues[language]?.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border text-sm transition-colors ${
                        selectedColor === color 
                          ? 'border-[#3A352F] bg-[#3A352F] text-white' 
                          : 'border-[#E8E4D9] text-[#5C554B] hover:border-[#8B7E6A]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizeVariation && (
              <div className="mb-10">
                <h3 className="text-sm uppercase tracking-widest text-[#3A352F] mb-4">
                  {typeof sizeVariation.name === 'string' ? sizeVariation.name : (sizeVariation.name[language] || sizeVariation.name['en'])}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {sizeValues.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 flex items-center justify-center border text-sm transition-colors ${
                        selectedSize === size 
                          ? 'border-[#3A352F] bg-[#3A352F] text-white' 
                          : 'border-[#E8E4D9] text-[#5C554B] hover:border-[#8B7E6A]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-4 uppercase tracking-widest text-sm transition-all duration-300 mb-8 ${
                isAdded 
                  ? 'bg-[#4A5D23] text-white' 
                  : 'bg-[#8B7E6A] text-white hover:bg-[#7A6D59]'
              }`}
            >
              {isAdded ? t('addedToCart') : t('addToCart')}
            </motion.button>
          </div>
        </div>

        {/* Detailed Info Section */}
        <div className="mt-24 border-t border-[#E8E4D9] pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-[#3A352F] mb-6">{t('details')}</h3>
              <p className="text-[#5C554B] font-light leading-relaxed whitespace-pre-line">
                {detailedInfo}
              </p>
            </div>
            
            <div className="space-y-8">
              {product.attributes?.care && (
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-[#3A352F] mb-4">{t('care')}</h3>
                  <ul className="list-disc list-inside text-[#5C554B] font-light">
                    {product.attributes.care.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}
              
              {product.materials && (
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-[#3A352F] mb-4">{t('materials')}</h3>
                  <p className="text-[#5C554B] font-light">
                    {product.materials[language]?.join(', ') || product.materials['en']?.join(', ')}
                  </p>
                </div>
              )}

              {product.attributes?.measurements && (
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-[#3A352F] mb-4">{t('measurements')}</h3>
                  <div className="text-[#5C554B] font-light">
                    {Object.entries(product.attributes.measurements).map(([key, value]) => (
                      <p key={key}>{key}: {value}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
