# Bag Shop

A modern, high-performance e-commerce storefront for a bag shop. This project features a stunning UI with glassmorphism effects, smooth scrolling, and a hybrid architecture leveraging both Supabase and a custom Express/MongoDB backend.

## 🚀 Features

- **Dynamic Hero Section**: Engaging visuals with a premium feel.
- **Category Launchpad**: Browse products by category, dynamically fetched from Supabase.
- **Featured Drop**: Real-time product listings fetched from a custom Node.js/Express API connected to MongoDB.
- **Testimonials Section**: Customer reviews fetched from Supabase with interactive star ratings.
- **Cart System**: Fully functional cart with a sliding sidebar for easy checkout management.
- **Smooth Scrolling**: Powered by `lenis` for a premium user experience.
- **Animations**: Subtle micro-animations using `framer-motion`.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: CSS Modules (Vanilla CSS)
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis

## 📁 Project Structure

```text
bag_shop/
├── Backend/               # Express server & MongoDB models
│   ├── config/            # Database connection config
│   ├── models/            # Mongoose models (Product)
│   ├── routes/            # API routes
│   └── server.js          # Server entry point
├── src/                   # React Frontend
│   ├── components/        # UI Components (Hero, Navbar, etc.)
│   ├── context/           # React Context (Cart)
│   ├── lib/               # Libs (Supabase client)
│   └── App.tsx            # Main application component
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and add your credentials:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate back to the root directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   # Optional: If you have custom Supabase keys
   # VITE_SUPABASE_URL=your_supabase_url
   # VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📜 License
This project is for educational purposes.
