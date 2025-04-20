import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import FeatureCard from '@/components/FeatureCard';
import { Search, Hospital, MessageSquare } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <section className="relative py-20 md:py-32 overflow-hidden bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Expert Veterinary <span className="text-pet">Care</span> for Your Furry Friends
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Your one-stop solution for pet health. Check symptoms, find local veterinary hospitals, and get advice from our AI assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-pet text-white hover:bg-pet/90 px-8 py-6 text-lg" 
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  className="border-pet text-pet hover:bg-pet/5 px-8 py-6 text-lg"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://i.pinimg.com/736x/46/c6/14/46c614c1a56791ddda3ef5a1666267dd.jpg"
                  alt="Happy pets together" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div className="absolute top-[-10%] right-[10%] bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-float">
                <span className="text-foreground font-semibold">24/7 Support</span>
              </div>
              <div className="absolute bottom-[-5%] left-[5%] bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <span className="text-foreground font-semibold">Expert Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive tools and resources to help you take care of your pets' health needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Symptom Checker"
              description="Identify potential health issues based on your pet's symptoms and get guidance on next steps."
              icon={<Search className="w-8 h-8 text-pet" />}
              link="/symptom-checker"
            />
            <FeatureCard
              title="Find Hospitals"
              description="Locate veterinary clinics and emergency animal hospitals near you when you need them most."
              icon={<Hospital className="w-8 h-8 text-pet" />}
              link="/find-hospitals"
            />
            <FeatureCard
              title="AI Chat Assistant"
              description="Get instant answers to your pet health questions from our AI-powered veterinary assistant."
              icon={<MessageSquare className="w-8 h-8 text-pet" />}
              link="/chat-assistant"
            />
            <FeatureCard 
              title="PetCare"
              description="Know About your pets."
              icon={<Search className="w-8 h-8 text-pet" />}
              link="/PetCare"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">We Support All Pets</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our services cater to a wide range of pets, ensuring every furry, feathery, or scaly friend gets the care they deserve.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-pet/10 rounded-full flex items-center justify-center mb-4">
                <img src="https://i.pinimg.com/474x/82/97/de/8297dee2d3f3e92a18cca6191d35938d.jpg" alt="Dogs" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Dogs</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-pet-secondary/10 rounded-full flex items-center justify-center mb-4">
                <img src="https://i.pinimg.com/474x/16/ca/b1/16cab153397fc070d5369635ba891e8d.jpg" alt="Cats" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Cats</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-pet-accent/10 rounded-full flex items-center justify-center mb-4">
                <img src="https://i.pinimg.com/736x/7d/c0/fa/7dc0fae6c6818a02d7857ad3f74e74ee.jpg" alt="Birds" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Birds</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-pet/10 rounded-full flex items-center justify-center mb-4">
                <img src="https://tse1.mm.bing.net/th/id/OIP.oT89fNt7WpTwcIKw6B-VmgHaJQ?pid=ImgDet&w=185&h=231&c=7&dpr=1.3" alt="Rabbits" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Rabbits</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-pet-secondary/10 rounded-full flex items-center justify-center mb-4">
                <img src="https://tse1.mm.bing.net/th/id/OIP.AyTQfiDIPKQydQSU9nDmPQAAAA?pid=ImgDet&w=185&h=169&c=7&dpr=1.3" alt="Small Pets" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Small Pets</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            What Pet Parents Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Found immediate help for my dog when I needed it most.",
                author: "Aditi",
                image: "/lovable-uploads/13eaf7da-9609-49cf-80cd-328870f105bc.png"
              },
              {
                quote: "The symptom checker helped me understand when to visit the vet.",
                author: "Ajay.",
                image: "/lovable-uploads/853554a6-69a4-43ab-aee3-66499e4cd23e.png"
              },
              {
                quote: "Amazing resource for bird owners like me!",
                author: "Raghav",
                image: "/lovable-uploads/042622b6-1a3b-4180-9a0e-2bb49b779739.png"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-background p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="text-foreground font-medium">{testimonial.author}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-pet text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Care for Your Pet?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of pet owners who trust FurryFriendAid for their pet healthcare needs.
          </p>
          <Button 
            className="bg-white text-pet hover:bg-gray-100 px-8 py-6 text-lg font-medium"
            onClick={() => navigate('/register')}
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;