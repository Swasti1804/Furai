import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import FeatureCard from '@/components/FeatureCard';
import { Search, Hospital, MessageSquare, Calendar, Plus, Stethoscope, PawPrint, X, User, PlusCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.1 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.1} }
};

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [pets, setPets] = useState([]);
  
  // Image slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const sliderImages = [
    "https://i.pinimg.com/736x/36/54/a5/3654a5f814f8603a8b6eb3a7303e1b64.jpg",
    "https://i.pinimg.com/736x/fe/ce/7c/fece7c7e797c22f72349762917cb9ac8.jpg",
    "https://i.pinimg.com/736x/3c/31/9a/3c319a98a89211dfd6d2df85a831bdd1.jpg",
    "https://i.pinimg.com/736x/23/e0/3b/23e03b102c122b5f44767083a951404c.jpg"
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Slider functions
  const goToNext = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, autoPlay]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout requireAuth>
      <div className="min-h-[calc(100vh-64px)] bg-gray-50">
        {/* Hero Welcome Section */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="bg-gradient-to-r from-pet to-pet-secondary text-white py-12"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 bg-white">
                  <img 
                    src="https://i.pinimg.com/474x/d5/f1/b8/d5f1b8ee7fb98223dc1567af6e0d8395.jpg" 
                    alt="User profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {getGreeting()}, {user?.name || 'Pet Lover'}!
                  </h1>
                  <p className="text-white/80">
                    Welcome to your personal pet healthcare dashboard.
                  </p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 mt-4 md:mt-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddPetModal(true)}
                >
                  Add a Pet
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Pet Welcome Image Slider Section */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="container mx-auto px-4 py-12"
        >
          <div 
            className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <div className="relative h-64 sm:h-80 md:h-96 w-full">
              {/* Slider Images */}
              {sliderImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    zIndex: currentSlide === index ? 10 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={image} 
                    alt={`Pet slider ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
              
              {/* Navigation Arrows */}
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all"
                onClick={goToPrev}
              >
                ❮
              </button>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all"
                onClick={goToNext}
              >
                ❯
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <motion.section 
          className="py-8 md:py-12"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Services Section */}
              <div className="md:col-span-2 space-y-8">
                <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-gray-800">
                  Pet Care Services
                </motion.h2>
                
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants}>
                    <FeatureCard
                      title="Symptom Checker"
                      description="Check your pet's symptoms and get recommendations."
                      icon={<Search className="w-8 h-8 text-pet" />}
                      link="/symptom-checker"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <FeatureCard
                      title="Find Hospitals"
                      description="Locate nearby veterinary hospitals for emergencies."
                      icon={<Hospital className="w-8 h-8 text-pet" />}
                      link="/find-hospitals"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <FeatureCard
                      title="AI Chat Assistant"
                      description="Get instant answers to your pet health questions."
                      icon={<MessageSquare className="w-8 h-8 text-pet" />}
                      link="/chat-assistant"
                    />
                  </motion.div>
                </motion.div>
                
                {/* Pet Health Tips */}
                <motion.div variants={itemVariants} className="mt-12">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Pet Health Tips
                  </h2>
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    variants={containerVariants}
                  >
                    {[
                      {
                        title: "Regular Exercise",
                        content: "Most dogs need at least 30 minutes of exercise daily. Regular activity helps prevent obesity and behavioral issues."
                      },
                      {
                        title: "Proper Nutrition",
                        content: "Feed your pets high-quality food appropriate for their age, size, and health condition. Always provide fresh water."
                      },
                      {
                        title: "Dental Care",
                        content: "Brush your pet's teeth regularly and provide dental treats. Poor dental health can lead to serious health issues."
                      },
                      {
                        title: "Regular Check-ups",
                        content: "Schedule annual vet visits even if your pet seems healthy. Prevention is always better than treatment."
                      }
                    ].map((tip, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <Card 
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{tip.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600">{tip.content}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Enhanced Pet Profile Card */}
                <motion.div variants={itemVariants}>
                  <Card
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative overflow-hidden"
                  >
                    {/* Animated Paw Background */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-pet/10"
                          animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            rotate: [0, 360],
                            scale: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 15 + i * 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        >
                          <PawPrint size={40} />
                        </motion.div>
                      ))}
                    </div>

                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>My Pets</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-pet hover:text-pet-dark transition-colors"
                          onClick={() => setShowAddPetModal(true)}
                        >
                          <PlusCircle className="w-6 h-6" />
                        </motion.button>
                      </CardTitle>
                      <CardDescription>Manage your furry friends</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="text-center py-4 relative z-10">
                        {/* Animated Pet Avatar */}
                        <motion.div
                          className="mx-auto w-24 h-24 mb-6 relative"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="absolute inset-0 rounded-full bg-pet/10 flex items-center justify-center">
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 2
                              }}
                            >
                              <PawPrint className="text-pet/30" size={48} />
                            </motion.div>
                          </div>
                          <div className="w-full h-full rounded-full bg-white border-2 border-pet/30 overflow-hidden flex items-center justify-center">
                            <User className="text-pet w-10 h-10" />
                          </div>
                        </motion.div>

                        <p className="text-gray-500 mb-6">
                          {pets.length > 0 ? `${pets.length} pets registered` : "You haven't added any pets yet."}
                        </p>
                        
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button 
                            variant="outline" 
                            className="w-full border-pet/30 text-pet hover:bg-pet/5"
                            onClick={() => setShowAddPetModal(true)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            {pets.length > 0 ? 'Add Another Pet' : 'Add Your First Pet'}
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Upcoming Appointments */}
                <motion.div variants={itemVariants}>
                  <Card
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Upcoming Appointments
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-6">
                        <p className="text-gray-500 mb-4">
                          No upcoming appointments.
                        </p>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Schedule an Appointment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Recent Activity */}
                <motion.div variants={itemVariants}>
                  <Card
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <motion.div 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="w-2 h-2 mt-2 bg-pet rounded-full mr-3"></div>
                          <div>
                            <p className="text-sm font-medium">Account Created</p>
                            <p className="text-xs text-gray-500">Today</p>
                          </div>
                        </motion.div>
                        <motion.div 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <div className="w-2 h-2 mt-2 bg-gray-300 rounded-full mr-3"></div>
                          <div>
                            <p className="text-sm font-medium">Welcome to FurryFriendAid</p>
                            <p className="text-xs text-gray-500">Today</p>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Add Pet Modal */}
        {showAddPetModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowAddPetModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Pet</h3>
                <button 
                  onClick={() => setShowAddPetModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pet/50"
                    placeholder="e.g. Fluffy"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pet/50">
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload</p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => setShowAddPetModal(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-pet hover:bg-pet-dark">
                  Save Pet
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;