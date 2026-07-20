# ShopVault - Premium E-Commerce Product Explorer

## Vercel live Link: https://shopvault-beta.vercel.app/

## Project Overview

ShopVault is a premium, production-ready, fully responsive E-Commerce Product Explorer web application. It fetches real product data from the Fake Store API and provides a seamless user experience with search, category filtering, and a modern UI.

Built exclusively with **HTML5, CSS3, Bootstrap 5, Vanilla JavaScript (ES6+), and GSAP**, this project demonstrates advanced frontend architecture, component-based design, and professional animation techniques.

## Features

- **Live Data Fetching:** Retrieves product data from the Fake Store API using `fetch` and `async/await`.
- **Robust Loading State:** Displays professional skeleton cards with a shimmer effect while data is loading.
- **Comprehensive Error Handling:** Shows a friendly error UI with a "Retry" button if the API call fails.
- **Instant Search:** Filters products by title in real-time (case-insensitive).
- **Category Filter:** Dropdown to filter products by specific categories (Electronics, Jewelery, Men's/Women's Clothing).
- **Responsive Design:** Fully optimized for Desktop, Laptop, Tablet, and Mobile devices.
- **Premium UI/UX:** Inspired by Stripe and Linear, featuring glassmorphism, soft gradients, and clean typography.
- **GSAP Animations:** Subtle, high-performance animations including hero fade-ins, card reveals, and scroll-triggered effects.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure |
| **CSS3** | Custom styling and design system |
| **Bootstrap 5** | Grid system and responsive layout |
| **JavaScript (ES6+)** | Fetch API, DOM manipulation, logic |
| **GSAP** | High-performance animations |
| **Font Awesome** | Professional icons |
| **Google Fonts** | Inter font family |

## Project Structure

```text
Product-Explorer/
│
├── index.html          # Main entry point
├── README.md           # Documentation
│
├── css/
│   ├── style.css       # Main styling
│   └── responsive.css  # Media queries
│
├── js/
│   ├── api.js          # API fetch logic
│   ├── main.js         # App initialization
│   ├── search.js       # Search logic
│   ├── filter.js       # Category filter logic
│   └── animation.js    # GSAP animations
│
├── components/         # HTML templates loaded via JS
│   ├── navbar.html
│   ├── hero.html
│   ├── search.html
│   ├── filters.html
│   ├── products.html
│   └── footer.html
│
├── assets/             # Favicon, etc.
├── images/             # Static images
└── icons/              # Custom SVGs