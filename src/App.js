import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import Header from './components/Header';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

const AppRoutes = () => {
  const { user } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={user ? <ProfilePage /> : <LoginPage />} />
      <Route
        path="/admin"
        element={user && user.role === 'admin' ? <AdminPage /> : <LoginPage />}
      />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
