
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const Layout = ({ children, requireAuth = false }: LayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // If authentication is required but user is not authenticated
  if (requireAuth && !isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
