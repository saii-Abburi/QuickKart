# 🛒 QuickCart – Fastest Way to Shop Smart

QuickCart is a full-stack e-commerce platform that connects users with time-sensitive product deals, especially near-expiry grocery or FMCG products. It aims to reduce waste, support sustainable shopping, and deliver lightning-fast shopping experiences.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based)
- 🛍️ **Product Browsing** with sorting & filtering
- ❤️ **Save/Unsave Products** (Wishlist)
- 🛒 **Add to Cart** and quantity management
- 💳 **Payment Page with Checkout**
- 📱 **Mobile Responsive UI**
- 📤 **Social Share** of products
- 🔔 **Toast Notifications** for user feedback
- 🔄 **Persistent Cart** for logged-out users
- 📦 **Admin Dashboard** (Optional)

---

## 🧩 Tech Stack

### Frontend
- **React.js + Vite**
- **Tailwind CSS**
- **Lucide Icons**
- **Axios** for API requests
- **React Router v6**

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Auth**
- **RESTful APIs**

---

## 📂 Folder Structure (Frontend)

src/
│
├── components/ # Reusable UI components (e.g. ProductCard, Toast)
├── pages/ # Page-level components (e.g. UserPage, PaymentPage)
├── hooks/ # Custom hooks (e.g. useFetchProducts)
├── context/ # Global state context (optional)
├── App.jsx # Main App Router
└── main.jsx # App entry point


---

## 🔧 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/quickcart.git
cd quickcart

cd frontend
npm install

npm run dev

cd backend
npm install
npm start

👨‍💻 Developed by
Sai Praveen
Frontend & Fullstack Developer
RVR & JC | AIML Student
