# Nigerian Restaurant Web App

A full-stack Nigerian restaurant food ordering web application built with React, TypeScript, Tailwind CSS, Zustand, React Query, and Sanity CMS.

## Project Structure

- **`restaurant-app/`** — Customer-facing React frontend (Vite, port 5000)
- **`restaurant-studio/`** — Sanity CMS studio for managing content (not hosted here)

## Running the App

The frontend runs automatically via the "Start application" workflow on port 5000.

## Environment Variables

The frontend requires a `.env` file inside `restaurant-app/`. Copy `.env.example` and fill in the values:

```
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

Without these, the app will show a loading spinner since it can't fetch content from Sanity.

## Tech Stack

- React 18 + TypeScript
- Vite (dev server on port 5000)
- Tailwind CSS
- Zustand (cart state)
- React Query / TanStack Query (data fetching)
- Sanity CMS (headless CMS for menu content)
- Paystack (payment processing)

## Deployment

Configured as a static site — builds via `npm run build` inside `restaurant-app/`, output in `restaurant-app/dist/`.

## User Preferences

- Keep the monorepo structure (`restaurant-app/` and `restaurant-studio/` as separate packages)
