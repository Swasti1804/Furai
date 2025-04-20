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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showImage, setShowImage] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger image animation after component mounts
    setShowImage(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Try demo@example.com / password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@example.com');
    setPassword('password');
    setIsLoading(true);

    try {
      await login('demo@example.com', 'password');
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred with the demo login. Please try again.');
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
            alt="Happy dog and cat together"
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
                Welcome Back!
              </motion.h2>
              <motion.p 
                className="text-white/90 text-sm md:text-base"
                initial={{ y: 20 }}
                animate={showImage ? { y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Your pets miss you
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Login Form Section */}
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
                <CardTitle className="text-2xl font-bold text-center">Log in to your account</CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password to sign in
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <motion.div 
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {error}
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="#" className="text-sm text-pet hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-pet hover:bg-pet/90 text-white"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>
                  </motion.div>
                </form>
                
                <motion.div 
                  className="relative my-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Demo Login
                  </Button>
                </motion.div>
              </CardContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-pet hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;