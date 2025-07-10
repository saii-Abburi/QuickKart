import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import AboutSection from "./components/About";
import LegalSection from "./components/PrivacyPolicies";
import Header from "./components/Header";
import Herosection from "./pages/Herosection";
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import UserPage from "./pages/UserPage";
import SellerPage from "./pages/SellerPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./components/Profile";
import ProductDetail from "./components/Productdetail";
import SavedProducts from "./components/SavedProducts";
import PaymentPage from "./components/PaymentPage";
import CreateProductPage from "./components/CreateProductPage";
import SellerProducts from "./components/SellerProducts";
import SellerDashboardHome from "./components/SellerDashboardHome";
import SellerUpdatePage from './components/SellerUpdatePage'

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";
  const userType = window.localStorage.getItem("userType");

  return (
    <div className="bg-purple-400">
      <Header loggedIn={isLoggedIn} userType={userType} />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              userType === "seller" ? (
                <Navigate to="/dashboard" />
              ) : userType === "user" ? (
                <Navigate to="/products" />
              ) : (
                <Navigate to="/admin-board" />
              )
            ) : (
              <Herosection />
            )
          }
        />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/faq" element={<FaqSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<LegalSection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<UserPage />} />
        <Route path="/saved" element={<SavedProducts />} />

        <Route path="/products/:id" element={<ProductDetail />} />

        {/* Login Route only if not logged in */}
        {!isLoggedIn && <Route path="/login" element={<SignIn />} />}

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          {/* Redirect to specific dashboard based on role */}
          <Route
            path="/login"
            element={
              userType === "seller" ? (
                <Navigate to="/dashboard" />
              ) : userType === "user" ? (
                <Navigate to="/products" />
              ) : (
                <Navigate to="/admin-board" />
              )
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<UserPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin-board" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<SellerPage />} />
          <Route path="/saved" element={<SavedProducts />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/seller" element={<SellerPage />}>
            <Route path="products" element={<SellerProducts />} />
            <Route path="products/new" element={<CreateProductPage />} />
            <Route path="/seller/dashboard" element={<SellerDashboardHome />} />
            <Route path="products/edit/:id" element={<SellerUpdatePage/>}/>
          </Route>
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
