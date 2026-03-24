import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          text: language === 'uk' 
            ? 'Вітаємо в Natial! Чим я можу вам допомогти?' 
            : 'Welcome to Natial! How can I help you today?',
          sender: 'bot'
        }
      ]);
    }
  }, [isOpen, language, messages.length]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `You are a helpful customer support assistant for "Natial", a sustainable clothing brand making handmade linen and cotton pieces in Kyiv, Ukraine. 
      The brand philosophy: "Natial was born from a personal journey to find clothing that feels just right — natural to the skin, thoughtfully designed, and lovingly handmade. I design every piece, and my sister — a skilled seamstress — brings them to life with care. We use only 100% linen and cotton, embracing eco-friendly values and mindful creation. Each item is crafted to feel as beautiful on the inside as it looks on the outside, with delicate linings and seams for true everyday comfort. Following the slow fashion philosophy, we make everything to order, avoiding overproduction and offering custom options to create something just for you. Whether you’re traveling, relaxing at home, or enjoying sunny days, our pieces are made to move with you and feel like a gentle hug along the way. Made with love in Kyiv, Ukraine."
      Respond in the language the user is speaking. Be polite, warm, and helpful. Keep responses concise.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction,
        }
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || 'Sorry, I could not process that.',
        sender: 'bot'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I am having trouble connecting right now. Please try again later.',
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-[#8B7E6A] text-white shadow-lg hover:bg-[#7A6D59] transition-all transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-[#E8E4D9]">
          {/* Header */}
          <div className="bg-[#FDFBF7] p-4 border-b border-[#E8E4D9] flex justify-between items-center">
            <div>
              <h3 className="font-serif text-[#3A352F] text-lg">Natial Support</h3>
              <p className="text-xs text-[#8B7E6A]">{t('chatWithUs')}</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#8B7E6A] hover:text-[#3A352F]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAFA]">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[#8B7E6A] text-white rounded-tr-sm' 
                      : 'bg-[#FDFBF7] text-[#3A352F] border border-[#E8E4D9] rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#FDFBF7] text-[#8B7E6A] border border-[#E8E4D9] p-3 rounded-2xl rounded-tl-sm text-sm flex space-x-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#E8E4D9]">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('typeMessage')}
                className="flex-1 p-2 border border-[#E8E4D9] rounded-lg focus:outline-none focus:border-[#8B7E6A] text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-[#8B7E6A] text-white rounded-lg hover:bg-[#7A6D59] disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
