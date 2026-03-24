import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    postalCode: ''
  });
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === 'number') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
    } else if (e.target.name === 'cvc') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }
    setCardData({ ...cardData, [e.target.name]: value });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name.trim().length < 2) {
      setError(t('errName'));
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError(t('errEmail'));
      return;
    }
    if (formData.phone.trim().length < 5) {
      setError(t('errPhone'));
      return;
    }
    if (formData.country.trim().length < 2 || formData.city.trim().length < 2 || formData.address.trim().length < 5 || formData.postalCode.trim().length < 2) {
      setError(t('errAddress'));
      return;
    }

    setError('');
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cardData.number.replace(/\s/g, '').length < 15) {
      setError(t('errCardNum'));
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      setError(t('errExpiry'));
      return;
    }
    if (cardData.cvc.length < 3) {
      setError(t('errCvc'));
      return;
    }
    if (cardData.name.trim().length < 2) {
      setError(t('errCardName'));
      return;
    }

    if (items.length === 0) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 1. Save order to Firestore
      const orderData = {
        customer: formData,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize
        })),
        total,
        status: 'pending',
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);

      // 2. Send confirmation email via backend
      await fetch('/api/orders/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: docRef.id,
          customer: formData,
          items: orderData.items,
          total
        }),
      });

      // 3. Clear cart and show success
      clearCart();
      setOrderSuccess(true);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
        <div className="text-center max-w-md">
          <h2 className="font-serif text-3xl text-[#3A352F] mb-4">{t('thankYou')}</h2>
          <p className="text-[#5C554B] mb-8">
            {t('orderReceived')} {formData.email}.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#8B7E6A] text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-[#7A6D59] transition-colors"
          >
            {t('continueShopping')}
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <p className="text-[#5C554B] mb-4">{t('emptyCart')}</p>
          <button onClick={() => navigate('/catalog')} className="text-[#8B7E6A] uppercase tracking-widest text-sm hover:text-[#3A352F] transition-colors">
            {t('shopNow')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-16 md:py-24 bg-[#FAFAFA] min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl md:text-4xl text-[#3A352F] mb-12 text-center">{t('checkoutTitle')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {step === 1 ? (
              <>
                <h2 className="text-lg uppercase tracking-widest text-[#3A352F] mb-6">{t('shippingDetails')}</h2>
                {error && <div className="bg-red-50 text-red-600 p-4 mb-6 text-sm">{error}</div>}
                
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">{t('fullName')}</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">{t('phone')}</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">{t('country')}</label>
                      <input required type="text" name="country" value={formData.country} onChange={handleChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">{t('address')}</label>
                    <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">{t('city')}</label>
                      <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">{t('postalCode')}</label>
                      <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors" />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#3A352F] text-white py-4 uppercase tracking-widest text-sm hover:bg-[#2A2520] transition-colors mt-8"
                  >
                    {t('continueToPayment')}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center mb-6">
                  <button onClick={() => setStep(1)} className="text-[#8B7E6A] hover:text-[#3A352F] text-sm uppercase tracking-widest mr-4">
                    &larr; {t('backToShipping')}
                  </button>
                </div>
                <h2 className="text-lg uppercase tracking-widest text-[#3A352F] mb-6">{t('paymentDetails')}</h2>
                {error && <div className="bg-red-50 text-red-600 p-4 mb-6 text-sm">{error}</div>}
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">{t('cardNumber')}</label>
                    <input required type="text" name="number" placeholder="0000 0000 0000 0000" value={cardData.number} onChange={handleCardChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors font-mono" />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">{t('expiryDate')}</label>
                      <input required type="text" name="expiry" placeholder="MM/YY" value={cardData.expiry} onChange={handleCardChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">{t('cvc')}</label>
                      <input required type="text" name="cvc" placeholder="123" value={cardData.cvc} onChange={handleCardChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8B7E6A] mb-2">{t('nameOnCard')}</label>
                    <input required type="text" name="name" value={cardData.name} onChange={handleCardChange} className="w-full border border-[#E8E4D9] bg-white px-4 py-3 text-[#3A352F] focus:outline-none focus:border-[#8B7E6A] transition-colors" />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#3A352F] text-white py-4 uppercase tracking-widest text-sm hover:bg-[#2A2520] transition-colors disabled:opacity-50 mt-8"
                  >
                    {isSubmitting ? t('processing') : t('payNow')}
                  </button>
                </form>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 border border-[#E8E4D9]">
            <h2 className="text-lg uppercase tracking-widest text-[#3A352F] mb-6">{t('orderSummary')}</h2>
            <div className="space-y-6 mb-8">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`} className="flex gap-4">
                  <img src={item.image} alt="Product" className="w-20 h-24 object-cover" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-[#3A352F] uppercase tracking-wider mb-1">
                      {item.name[language] || item.name['en']}
                    </h3>
                    <p className="text-xs text-[#8B7E6A] mb-1">{t('color')}: {item.selectedColor} | {t('size')}: {item.selectedSize}</p>
                    <p className="text-xs text-[#5C554B]">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-[#3A352F]">€{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-[#E8E4D9] pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-[#5C554B]">{t('subtotal')}</span>
                <span className="text-sm text-[#3A352F]">€{total}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-[#5C554B]">{t('shipping')}</span>
                <span className="text-sm text-[#3A352F]">{t('calculatedNext')}</span>
              </div>
              <div className="flex justify-between items-center border-t border-[#E8E4D9] pt-6">
                <span className="text-lg font-serif text-[#3A352F]">{t('total')}</span>
                <span className="text-xl font-medium text-[#3A352F]">€{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
