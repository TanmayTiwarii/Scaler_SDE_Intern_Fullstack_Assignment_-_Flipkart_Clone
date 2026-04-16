# Flipkart Clone - Fullstack E-Commerce Application

A pixel-perfect, highly responsive, and fully functional full-stack e-commerce web application inspired by Flipkart. This project handles a complete product lifecycle—from responsive browsing and guest cart management to multi-step checkout and persistent order placement.

---

## 🚀 Features & Functionalities

- **Stunning UI / UX**: Deep attention to detail using standard Flipkart design systems, including grouped product rows, hover effects, collapsible navigation menus, interactive UI micro-animations, and full mobile responsiveness.
- **Robust Authentication**: Secure sign-up and login utilizing `bcrypt` and JWT validation.
- **Smart Cart Persistence**: 
  - Allows **guest users** to freely add or modify items using local browser storage.
  - Automatically **syncs and migrates** the guest cart into a secure database session the moment the user signs in.
- **Rich Product Detail Pages**: Includes conditional interactive widgets (e.g., Size charts restricted to "Fashion" category), high-quality image carousels, pricing breakdowns, and offer banners.
- **Multi-Step Checkout Flow**: 
  - Dynamic 3-step checkout process (Delivery Address -> Order Summary -> Payment).
  - Ability to seamlessly save, swap, and manage multiple delivery addresses.
  - Generates authentic Order IDs post-confirmation.
- **Global Search & Filtering**: Built to accommodate real-time search queries mapping exactly to backend catalogs.

---

## 💻 Tech Stack

### Frontend
- **Framework**: React.js 18
- **Bundler**: Vite
- **Routing**: React Router DOM v6
- **State Management**: React Context API (`AuthContext`, `CartContext`)
- **Styling**: Context-scoped CSS Modules (`.module.css`) for high modularity.
- **Icons**: Lucide React

### Backend
- **Framework**: Node.js & Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom JWT-based authentication
- **API Architecture**: REST APIs focusing on clean MVC controller/routing splits.

---

## 🗄️ Database Schema (Supabase)

This app utilizes a robust normalized relational database defined by:

- **`users`**: Manages credentials (`id`, `name`, `email`, `password_hash`, `created_at`).
- **`categories`**: Identifies product types (`id`, `name`).
- **`products`**: Central catalog index (`id`, `title`, `description`, `price`, `original_price`, `rating`, `category_id`, `in_stock`).
- **`product_images`**: Secondary table attaching multiple image URLs to a `product_id`.
- **`cart_items`**: Manages persistent carts (`id`, `user_id`, `product_id`, `quantity`).
- **`addresses`**: Maps fulfillment data to users (`id`, `user_id`, `name`, `phone`, `pincode`, `locality`, `address_line`, `city`, `state`, `address_type`, `is_default`).
- **`orders` & `order_items`**: Ties confirmed checkout flows securely (`order_id`, `user_id`, `total_amount`, `shipping_address`, `status`, attached items with `price_at_purchase`).

---

## 🌐 Deployed Links

- **Live Frontend Application**: https://scaler-sde-intern-fullstack-assignm-chi.vercel.app/ & https://www.tiwaritanmay.me/
- **Live Backend Server Endpoint**: https://scaler-sde-intern-fullstack-assignment-0uk6.onrender.com/

> Note: Ensure your backend deployed URL matches the `VITE_API_URL` environment variable configured inside the frontend's deployment settings.

---

## 🛠️ Local Development Setup

To run this application efficiently on your local machine, complete the following steps.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16.0 or higher)
- Setting up a free [Supabase](https://supabase.com/) Account.

### 1. Clone the repository
```bash
git clone <repository_url>
cd Scaler_SDE_Intern_Fullstack_Assignment_-_Flipkart_Clone
```

### 2. Backend Setup
Navigate to the \`backend\` directory and install dependencies:
```bash
cd backend
npm install
```

Configure your environment variables by creating a \`.env\` file in the \`backend\` directory:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_api_key
```

Run the Express server:
```bash
npm run dev
# The backend will typically run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal window, navigate to the \`frontend\` directory, and install dependencies:
```bash
cd frontend
npm install
```

Configure your frontend environment variables by creating a \`.env\` file in the \`frontend\` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
# The UI will load at http://localhost:5173
```

### 4. Seeding Mock Data
If your database is empty, there is a built-in script specifically designed to seed realistic products across all categories. Ensure your `.env` has appropriate keys inside `/backend/` and run:
```bash
node seed.js
```

---
*Created carefully as a demonstration of high-level full-stack e-commerce architecture capabilities.*
