import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Layout from './components/shared/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import { auth } from './FirebaseSetup';
import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = React.useState(null);
  const [authState, setAuthState] = React.useState(null);
  const location = useLocation();

  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth,
      async authenticatedUser => {
        if(authenticatedUser) {
          setUser(authenticatedUser.email);
          setAuthState('authenticated');
        } else {
          setUser(null);
          setAuthState('unauthenticated');
        }
      });
      return unSubscribeAuth;
  }, []);

  if(authState === null) return <div className='font-bold text-center text-5xl'>loading...</div>;

  const showNavbar = !location.pathname.startsWith('/dashboard');

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Landing page */}
        <Route path="/" element={
          <div className="max-w-7xl mx-auto pt-20 px-6">
            <HeroSection />
            <FeatureSection />
            <Pricing />
            <Testimonials />
          </div>
        } />

        {/* Authentication routes */}
        <Route path="/login" element={
          <div className="max-w-7xl mx-auto pt-20 px-6">
            <Login setAuthState={setAuthState} setUser={setUser} />
          </div>
        } />
        <Route path="/register" element={
          <div className="max-w-7xl mx-auto pt-20 px-6">
            <Register setAuthState={setAuthState} setUser={setUser} />
          </div>
        } />

        {/* Dashboard routes */}
        <Route 
          path="/dashboard"
          element={
            authState === 'authenticated'
              ? <Layout />
              : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>

        {/* Redirect to Dashboard after successful login */}
        <Route 
          path="/dashboard"
          element={
            authState === 'authenticated'
              ? <Navigate to="/pages/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
      {showNavbar && <Footer />}
    </>
  );
}

export default App;