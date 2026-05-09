# Nigerian Restaurant Web App

A professional, full-stack Nigerian restaurant food ordering web application built with React, TypeScript, Tailwind CSS, Zustand, React Query, and Sanity CMS.

## Project Overview

This project consists of two main parts:
- **`restaurant-app`**: The customer-facing frontend built with React (Vite) and styled with Tailwind CSS. It connects to Sanity for content and Paystack for processing payments.
- **`restaurant-studio`**: The headless CMS backend powered by Sanity.io. It allows restaurant owners to easily manage menu items, categories, and site settings without touching any code.

## Folder Structure

```text
/restaurant-app         ← The React frontend (what customers see)
  ├── src/
  │   ├── assets/       ← Static images, icons, logo
  │   ├── components/   ← UI components divided into ui/, layout/, menu/, and cart/
  │   ├── features/     ← State management (Zustand) and API hooks (React Query)
  │   ├── lib/          ← Sanity client configuration, GROQ queries, and utilities
  │   ├── pages/        ← Application Views (Home, Menu, Cart, Checkout, Order Confirmation)
  │   ├── routes/       ← React Router mapping declarations
  │   ├── types/        ← Shared TypeScript interfaces
  │   └── constants/    ← Global config (site name, currency, etc.)
  └── .env              ← Environment variables for frontend

/restaurant-studio      ← The Sanity Studio (what the admin/owner uses)
  ├── schemas/          ← Content models (menuItem, category, siteSettings)
  ├── sanity.config.ts  ← Studio configuration
  └── sanity.cli.ts     ← CLI configuration
```

## Setup Instructions

### Environment Variables
Inside `/restaurant-app`, create a `.env` file (copied from `.env.example`):
```env
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

### Running Sanity Studio
1. Open a terminal and navigate to the studio directory:
   ```bash
   cd restaurant-studio
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3333` in your browser to manage products, categories, and site settings. Ensure you have logged in via `npx sanity login` if dealing with an active remote project.

### Running the Frontend Application
1. Open a new terminal and navigate to the app directory:
   ```bash
   cd restaurant-app
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` to view the modern frontend app.

## Managing Content in Sanity
- **Site Settings**: Contains the restaurant name, hero banners, WhatsApp number, address, and opening hours. Fill this out first!
- **Categories**: Create categories (e.g., Rice, Soups, Proteins).
- **Menu Items**: Create food dishes, tie them to categories, upload images, and set their prices. Add an optional `Extra Portion Price` for upselling.

## Deployment Notes
- Build the frontend via `npm run build` inside `/restaurant-app` and deploy to any static host (e.g. Vercel, Netlify).
- Deploy the Sanity Studio via `npx sanity deploy` inside `/restaurant-studio`.
