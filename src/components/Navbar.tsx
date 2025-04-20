
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Cat, Dog, Bird, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pet rounded-lg flex items-center justify-center">
              <Dog className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-pet-dark">FurryFriendAid</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-pet transition-colors">
              Home
            </Link>
            <Link to="/symptom-checker" className="text-gray-600 hover:text-pet transition-colors">
              Symptom Checker
            </Link>
            <Link to="/find-hospitals" className="text-gray-600 hover:text-pet transition-colors">
              Find Hospitals
            </Link>
            <Link to="/chat-assistant" className="text-gray-600 hover:text-pet transition-colors">
              AI Assistant
            </Link>
            <Link to="/PetCare" className="text-gray-600 hover:text-pet trnsition-colors"></Link>
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      <AvatarImage src="/placeholder.svg" alt={user?.name || 'User'} />
                      <AvatarFallback className="bg-pet text-white">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button 
                  className="bg-pet hover:bg-pet/90 text-white" 
                  onClick={() => navigate('/register')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/dashboard" 
              className="text-gray-600 hover:text-pet px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/symptom-checker" 
              className="text-gray-600 hover:text-pet px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Symptom Checker
            </Link>
            <Link 
              to="/find-hospitals" 
              className="text-gray-600 hover:text-pet px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Hospitals
            </Link>
            <Link 
              to="/chat-assistant" 
              className="text-gray-600 hover:text-pet px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Assistant
            </Link>
            
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-pet text-white">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full mt-2 text-left text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Log in
                  </Button>
                  <Button 
                    className="w-full bg-pet hover:bg-pet/90 text-white" 
                    onClick={() => {
                      navigate('/register');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
