import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  email: string;
  name: string;
  pets?: Array<{
    id: string;
    name: string;
    type: string;
    breed?: string;
    age?: number;
  }>;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addPet: (pet: Omit<User['pets'][0], 'id'>) => void;
  removePet: (petId: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('petcare_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const updateUser = (updatedUser: User | null) => {
    if (updatedUser) {
      localStorage.setItem('petcare_user', JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem('petcare_user');
    }
    setUser(updatedUser);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo user with sample pet data
      const demoUser = {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        pets: [
          { id: '1', name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', age: 3 },
          { id: '2', name: 'Whiskers', type: 'Cat', breed: 'Siamese', age: 5 }
        ]
      };
      
      if (email === 'demo@example.com' && password === 'password') {
        updateUser(demoUser);
        toast({ title: "Login successful", description: "Welcome back!" });
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser = { id: Date.now().toString(), email, name, pets: [] };
      updateUser(newUser);
      toast({ title: "Registration successful", description: "Your account has been created!" });
      navigate('/pet-care'); // Redirect to pet care after registration
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    updateUser(null);
    toast({ title: "Logged out", description: "You have been logged out successfully." });
    navigate('/');
  };

  const addPet = (pet: Omit<User['pets'][0], 'id'>) => {
    if (!user) return;
    
    const newPet = { ...pet, id: Date.now().toString() };
    const updatedUser = {
      ...user,
      pets: [...(user.pets || []), newPet]
    };
    
    updateUser(updatedUser);
    toast({ title: "Pet added", description: `${pet.name} has been added to your profile!` });
  };

  const removePet = (petId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      pets: user.pets?.filter(pet => pet.id !== petId) || []
    };
    
    updateUser(updatedUser);
    toast({ title: "Pet removed", description: "Pet has been removed from your profile." });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      register, 
      logout,
      addPet,
      removePet
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};