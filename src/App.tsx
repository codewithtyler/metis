import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { APP_NAME, APP_DESCRIPTION } from './config/app';
import RoleRouter from './components/RoleRouter';
import LoginPage from './components/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import TeamManagement from './pages/TeamManagement';
import Analytics from './pages/Analytics';
import TicketDetail from './pages/TicketDetail';
import ProductManagement from './pages/ProductManagement';
import TemplateManagement from './pages/TemplateManagement';
import CategoryManagement from './pages/CategoryManagement';
import NewTicket from './pages/NewTicket';
import ProductDiscovery from './pages/ProductDiscovery';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <HelmetProvider>
            <Helmet defaultTitle={APP_NAME}>
              <meta name="description" content={APP_DESCRIPTION} />
            </Helmet>
            <div className="min-h-screen bg-dark-900 text-dark-100">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/discover" element={<ProductDiscovery />} />

              {/* Protected routes */}
              <Route element={<RoleRouter />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tickets" element={<TicketList />} />
                <Route path="/tickets/new" element={<NewTicket />} />
                <Route path="/tickets/:id" element={<TicketDetail />} />
                <Route path="/team" element={<TeamManagement />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="/templates" element={<TemplateManagement />} />
                <Route path="/categories" element={<CategoryManagement />} />
                <Route path="/analytics" element={<Analytics />} />
              </Route>
            </Routes>
          </div>
          </HelmetProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;