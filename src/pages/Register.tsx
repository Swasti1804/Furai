import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Dog } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showImage, setShowImage] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setShowImage(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await register(formData.name, formData.email, formData.password, formData.phone);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row">
        {/* Animated Image Section */}
        <motion.div 
          className="w-full md:w-1/3 h-48 md:h-[calc(100vh-64px)] relative overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={showImage ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.img 
            src="https://i.pinimg.com/736x/87/1c/a3/871ca3d4d3b0bece192bf6f21ff3f900.jpg" 
            alt="Happy pets together"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={showImage ? { scale: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={showImage ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="text-white">
              <motion.h2 
                className="text-xl md:text-2xl font-bold"
                initial={{ y: 20 }}
                animate={showImage ? { y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Join Our Community
              </motion.h2>
              <motion.p 
                className="text-white/90 text-sm md:text-base"
                initial={{ y: 20 }}
                animate={showImage ? { y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Your pet's health matters to us
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Registration Form Section */}
        <div className="w-full md:w-2/3 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div 
                className="w-12 h-12 bg-pet rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Dog className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            
            <Card className="border-0 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                <CardDescription className="text-center">
                  Enter your details to register for FurryFriendAid
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <motion.div 
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    {error}
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoFocus
                    />
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Label htmlFor="password">Password (min 8 characters)</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
                  </motion.div>

                  {/* Confirm Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-pet hover:bg-pet/90 text-white"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? 'Creating account...' : 'Create account'}
                    </Button>
                  </motion.div>
                </form>

                <motion.div 
                  className="relative my-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <CardFooter className="flex justify-center">
                    <Link 
                      to="/login" 
                      className="text-sm text-pet hover:underline font-medium"
                    >
                      Log in instead
                    </Link>
                  </CardFooter>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;