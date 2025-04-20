// src/App.tsx

import { StrictMode, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

// Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import SymptomChecker from "@/pages/SymptomChecker";
import FindHospitals from "@/pages/FindHospitals";
import ChatAssistant from "@/pages/ChatAssistant";
import PetCare from "@/pages/PetCare";
import PetProfile from "@/pages/PetProfile";

// Query Client Setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter> {/* ✅ Moved BrowserRouter outside */}
            <AuthProvider> {/* ✅ Now useNavigate will work */}
              <TooltipProvider delayDuration={300}>
                <Toaster />
                <Sonner position="top-center" richColors />
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/dashboard" element={
                      <ProtectedRoute><Dashboard /></ProtectedRoute>
                    } />
                    <Route path="/symptom-checker" element={
                      <ProtectedRoute><SymptomChecker /></ProtectedRoute>
                    } />
                    <Route path="/find-hospitals" element={
                      <ProtectedRoute><FindHospitals /></ProtectedRoute>
                    } />
                    <Route path="/chat-assistant" element={
                      <ProtectedRoute><ChatAssistant /></ProtectedRoute>
                    } />
                    <Route path="/pet-care" element={
                      <ProtectedRoute><PetCare /></ProtectedRoute>
                    } />
                    <Route path="/pets/:petId" element={
                      <ProtectedRoute><PetProfile /></ProtectedRoute>
                    } />

                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </Suspense>
              </TooltipProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
