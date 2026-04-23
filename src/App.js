import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AdminPage from './pages/AdminPage';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<CatalogPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/products/:productId" element={<ProductPage />} />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <RoleRoute role="admin">
          <AdminPage />
        </RoleRoute>
      }
    />
  </Routes>
);

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
