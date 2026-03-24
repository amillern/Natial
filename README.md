# Natial - E-commerce Store Management Guide

Welcome to the Natial e-commerce platform. This guide explains how to manage and configure your website.

## 1. Managing Products
All product data is stored in a simple JSON file. To add, edit, or remove products:
1. Open `src/data/products.json`.
2. Each product is an object with properties like `id`, `name`, `description`, `price`, `image`, `colors`, and `sizes`.
3. Note that `name` and `description` are objects containing translations for each supported language (en, uk, es, it, fr, de).
4. To add a new product, simply copy an existing product block, change the `id`, and update the details.

## 2. Configuring the AI Chatbot
The chatbot uses Google Gemini to answer customer queries.
1. Open `src/components/Chatbot.tsx`.
2. Locate the `systemInstruction` variable.
3. You can modify this text to change the bot's personality, update brand information, or add specific instructions (e.g., "Always mention our summer sale").

## 3. Changing Static Links (Social Media & Etsy)
To update the links in the footer:
1. Open `src/components/Footer.tsx`.
2. Locate the `<a>` tags for Etsy, Instagram, Facebook, and Pinterest.
3. Replace the `href="#"` attributes with your actual profile URLs.

## 4. Managing Translations
All text on the website is managed centrally:
1. Open `src/i18n/translations.ts`.
2. You will see objects for each language (`en`, `uk`, `es`, etc.).
3. To change a piece of text, find its key (e.g., `heroTitle`) and update the string.
4. If you add new text to the site, add a new key to all language objects here.

## 5. SEO & Indexing
- **Meta Tags**: The site's title, description, and keywords are located in `index.html`. Update these to improve Google search rankings.
- **Sitemap**: Located at `public/sitemap.xml`. If you add new pages (like a blog), add them to this file so Google can find them.
- **AI Indexing**: The file `public/llms.txt` provides a summary of your brand for AI agents (like ChatGPT or Gemini) so they can recommend your brand accurately.

## 6. Payments Integration
The cart currently has placeholder buttons for PayPal and Credit Card. To make these functional:
- **Credit Cards**: We recommend integrating **Stripe** using `@stripe/react-stripe-js`.
- **PayPal**: We recommend integrating the **PayPal JS SDK** using `@paypal/react-paypal-js`.
*(Note: These require setting up a backend server or serverless functions to securely process payments).*
