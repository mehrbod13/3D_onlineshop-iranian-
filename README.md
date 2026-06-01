# 3D Virtual E-Commerce Showroom

Interactive first-person apartment showroom with **live Digikala product search** — real prices, images, and buy links. Runs locally via Vite (no custom backend).

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`, enter the showroom, look at furniture with the crosshair, and **click** to open real Digikala listings.

## Digikala API (live prices)

| Detail | Value |
|--------|--------|
| Endpoint | `https://api.digikala.com/v1/search/` (unofficial public API) |
| Local proxy | `/api/digikala` → configured in `vite.config.ts` |
| Prices | API returns **Rials** → displayed as **Tomans** (÷10) |
| Buy button | Opens `https://www.digikala.com/product/...` |

**Important:** Run with `npm run dev` or `npm run preview` so the Vite proxy works. Opening `dist/index.html` directly will not reach Digikala (CORS + no proxy).

If the API fails, the app falls back to local sample data and shows a yellow notice.

## Room objects (all clickable)

| Object | Category |
|--------|----------|
| Sofa, Lamp, Coffee table, Carpet, Plant | Living room |
| TV, TV stand, Bookshelf | Media wall |
| Dining table, Chairs | Dining |
| Fridge, Cabinets, Microwave | Kitchen |
| Bed, Side table | Bedroom |

## Controls

- **Mouse** — look (pointer lock)
- **WASD** — walk
- **Click** on highlighted item — product modal
- **ESC** — release mouse
- **خرید از دیجی‌کالا** — opens product on Digikala

## Project structure

```
src/
├── services/
│   ├── digikalaApi.ts      # Live search + price mapping
│   └── productService.ts   # Digikala first, mock fallback
├── data/mockProducts.ts    # Offline fallback only
└── components/scene/furniture/  # 15 interactive items
```

## Build

```bash
npm run build
npm run preview   # preview also uses Digikala proxy
```
Copyright (c) 2026 zxARYAxz

All rights reserved.

No one is permitted to copy, distribute, modify, or use this software 
and its source code for any purpose, commercial or non-commercial, 
without the express written permission of the copyright holder.