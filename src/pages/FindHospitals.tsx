import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Search, MapPin, Phone, Clock, Star, ExternalLink, Hospital } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface HospitalType {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  distance: number;
  rating: number;
  services: string[];
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  emergency: boolean;
  petTypes: string[];
  image: string;
}

const mockHospitals: HospitalType[] = [
  {
    id: '1',
    name: 'Central Pet Hospital',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '(212) 555-1234',
    distance: 1.2,
    rating: 4.8,
    services: ['Emergency Care', 'Surgery', 'Dental', 'Vaccination', 'Boarding'],
    hours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '9:00 AM - 2:00 PM',
    },
    emergency: true,
    petTypes: ['Dogs', 'Cats', 'Birds', 'Small Pets'],
    image: 'https://images.unsplash.com/photo-1602591176419-83de9e843922?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Pawsome Care Clinic',
    address: '456 Park Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10022',
    phone: '(212) 555-5678',
    distance: 2.5,
    rating: 4.6,
    services: ['Preventive Care', 'Surgery', 'Dental', 'Grooming'],
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
    emergency: false,
    petTypes: ['Dogs', 'Cats'],
    image: 'https://images.unsplash.com/photo-1584286595398-bef59dcd3b6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    name: 'Exotic Animal Hospital',
    address: '789 Broadway',
    city: 'New York',
    state: 'NY',
    zipCode: '10003',
    phone: '(212) 555-9012',
    distance: 3.1,
    rating: 4.9,
    services: ['Exotic Pet Care', 'Surgery', 'Dental', 'Imaging'],
    hours: {
      monday: '8:00 AM - 7:00 PM',
      tuesday: '8:00 AM - 7:00 PM',
      wednesday: '8:00 AM - 7:00 PM',
      thursday: '8:00 AM - 7:00 PM',
      friday: '8:00 AM - 7:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '10:00 AM - 3:00 PM',
    },
    emergency: true,
    petTypes: ['Birds', 'Reptiles', 'Small Pets', 'Exotic'],
    image: 'https://images.unsplash.com/photo-1581131131269-9115cdaca3e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    name: '24/7 Animal Emergency',
    address: '101 Hudson Street',
    city: 'Jersey City',
    state: 'NJ',
    zipCode: '07302',
    phone: '(201) 555-3456',
    distance: 4.7,
    rating: 4.7,
    services: ['Emergency Care', 'Critical Care', 'Surgery', 'Hospitalization'],
    hours: {
      monday: 'Open 24 Hours',
      tuesday: 'Open 24 Hours',
      wednesday: 'Open 24 Hours',
      thursday: 'Open 24 Hours',
      friday: 'Open 24 Hours',
      saturday: 'Open 24 Hours',
      sunday: 'Open 24 Hours',
    },
    emergency: true,
    petTypes: ['Dogs', 'Cats', 'All Pets'],
    image: 'https://images.unsplash.com/photo-1600779547877-be592ef5aad5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    name: 'Happy Tails Veterinary',
    address: '222 5th Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10037',
    phone: '(212) 555-7890',
    distance: 1.9,
    rating: 4.3,
    services: ['Wellness Care', 'Vaccination', 'Microchipping', 'Dental'],
    hours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: '10:00 AM - 3:00 PM',
      sunday: 'Closed',
    },
    emergency: false,
    petTypes: ['Dogs', 'Cats'],
    image: 'https://images.unsplash.com/photo-1559584707-d56950d1ef6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
];

const FindHospitals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDistance, setFilterDistance] = useState('any');
  const [filterPetType, setFilterPetType] = useState('all');
  const [filterEmergency, setFilterEmergency] = useState('all');
  const [filteredHospitals, setFilteredHospitals] = useState<HospitalType[]>(mockHospitals);
  const [selectedHospital, setSelectedHospital] = useState<HospitalType | null>(null);

  useEffect(() => {
    let results = [...mockHospitals];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(hospital => 
        hospital.name.toLowerCase().includes(query) ||
        hospital.address.toLowerCase().includes(query) ||
        hospital.city.toLowerCase().includes(query) ||
        hospital.services.some(service => service.toLowerCase().includes(query))
      );
    }
    
    if (filterDistance !== 'any') {
      const maxDistance = parseInt(filterDistance);
      results = results.filter(hospital => hospital.distance <= maxDistance);
    }
    
    if (filterPetType !== 'all') {
      results = results.filter(hospital => 
        hospital.petTypes.some(pet => pet.toLowerCase() === filterPetType.toLowerCase())
      );
    }
    
    if (filterEmergency === 'yes') {
      results = results.filter(hospital => hospital.emergency);
    }
    
    setFilteredHospitals(results);
    
    if (results.length > 0 && !selectedHospital) {
      setSelectedHospital(results[0]);
    } else if (results.length === 0) {
      setSelectedHospital(null);
    } else if (selectedHospital && !results.some(h => h.id === selectedHospital.id)) {
      setSelectedHospital(results[0]);
    }
  }, [searchQuery, filterDistance, filterPetType, filterEmergency, selectedHospital]);

  const getDayOfWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayIndex = new Date().getDay();
    return days[dayIndex];
  };

  const today = getDayOfWeek();

  return (
    <Layout requireAuth>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Veterinary Hospitals</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Locate the nearest veterinary clinics and animal hospitals for your pet's healthcare needs,
            from routine check-ups to emergency care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search & Filters</CardTitle>
                <CardDescription>Find the perfect hospital for your pet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      placeholder="Search hospitals by name or location..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-2">
                  <h3 className="font-medium text-sm text-gray-700">Filter Results</h3>
                  
                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Distance</label>
                    <Select 
                      value={filterDistance} 
                      onValueChange={setFilterDistance}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any distance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any distance</SelectItem>
                        <SelectItem value="2">Within 2 miles</SelectItem>
                        <SelectItem value="5">Within 5 miles</SelectItem>
                        <SelectItem value="10">Within 10 miles</SelectItem>
                        <SelectItem value="20">Within 20 miles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Pet Type</label>
                    <Select 
                      value={filterPetType} 
                      onValueChange={setFilterPetType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All pets" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All pets</SelectItem>
                        <SelectItem value="dogs">Dogs</SelectItem>
                        <SelectItem value="cats">Cats</SelectItem>
                        <SelectItem value="birds">Birds</SelectItem>
                        <SelectItem value="small pets">Small Pets</SelectItem>
                        <SelectItem value="exotic">Exotic Pets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Emergency Care</label>
                    <Select 
                      value={filterEmergency} 
                      onValueChange={setFilterEmergency}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All hospitals" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All hospitals</SelectItem>
                        <SelectItem value="yes">Emergency care only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterDistance('any');
                    setFilterPetType('all');
                    setFilterEmergency('all');
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
            
            <div className="text-sm text-gray-600">
              Showing {filteredHospitals.length} {filteredHospitals.length === 1 ? 'result' : 'results'}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list">
                <div className="space-y-6">
                  {filteredHospitals.length > 0 ? (
                    filteredHospitals.map(hospital => (
                      <Card 
                        key={hospital.id} 
                        className={`cursor-pointer transition-all ${
                          selectedHospital?.id === hospital.id 
                            ? 'border-pet ring-1 ring-pet' 
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedHospital(hospital)}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row overflow-hidden">
                            <div className="md:w-1/3 h-48 md:h-auto relative">
                              <img 
                                src={hospital.image} 
                                alt={hospital.name} 
                                className="w-full h-full object-cover"
                              />
                              {hospital.emergency && (
                                <Badge className="absolute top-2 left-2 bg-red-500">
                                  24/7 Emergency
                                </Badge>
                              )}
                            </div>
                            
                            <div className="md:w-2/3 p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-semibold mb-1">{hospital.name}</h3>
                                  <div className="flex items-center text-sm text-gray-600 mb-2">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>
                                      {hospital.address}, {hospital.city}, {hospital.state} {hospital.zipCode}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {hospital.distance} miles away
                                </div>
                              </div>
                              
                              <div className="flex items-center mb-3">
                                <div className="flex items-center text-yellow-500 mr-2">
                                  <Star className="h-4 w-4 fill-current" />
                                  <span className="ml-1 text-sm font-medium">{hospital.rating}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                  • {hospital.petTypes.join(', ')}
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mb-3">
                                {hospital.services.slice(0, 3).map((service, index) => (
                                  <Badge key={index} variant="outline" className="bg-gray-100">
                                    {service}
                                  </Badge>
                                ))}
                                {hospital.services.length > 3 && (
                                  <Badge variant="outline" className="bg-gray-100">
                                    +{hospital.services.length - 3} more
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                  <span className={`${
                                    hospital.hours[today].includes('Closed') 
                                      ? 'text-red-500' 
                                      : hospital.hours[today].includes('24') 
                                        ? 'text-green-600' 
                                        : 'text-gray-700'
                                  }`}>
                                    {hospital.hours[today]}
                                  </span>
                                </div>
                                <Button size="sm" variant="outline" className="text-pet border-pet">
                                  <Phone className="h-4 w-4 mr-2" />
                                  Call
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                      <Hospital className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        We couldn't find any veterinary hospitals matching your search criteria. 
                        Try adjusting your filters or search for a different location.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="map">
                <Card>
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center p-8">
                        <h3 className="text-lg font-semibold mb-2">Map View Coming Soon</h3>
                        <p className="text-gray-600 mb-4">
                          We're working on integrating an interactive map to help you locate veterinary hospitals.
                        </p>
                        <Button variant="outline">Return to List View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {selectedHospital && (
              <Card className="mt-8">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedHospital.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>
                            {selectedHospital.address}, {selectedHospital.city}, {selectedHospital.state} {selectedHospital.zipCode}
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center text-yellow-500 mr-3">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="ml-1 font-medium">{selectedHospital.rating}</span>
                      </div>
                      <Badge variant={selectedHospital.emergency ? "destructive" : "secondary"}>
                        {selectedHospital.emergency ? 'Emergency Care' : 'Regular Hours'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Services</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedHospital.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Pets Treated</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedHospital.petTypes.map((pet, index) => (
                            <Badge key={index} variant="outline" className="bg-pet/10 text-pet border-pet/30">
                              {pet}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-3 text-gray-600" />
                            <span>{selectedHospital.phone}</span>
                          </div>
                          <div className="flex">
                            <Button variant="outline" className="mr-2">
                              <Phone className="h-4 w-4 mr-2" />
                              Call Now
                            </Button>
                            <Button variant="outline">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit Website
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Business Hours</h3>
                        <div className="space-y-2">
                          {Object.entries(selectedHospital.hours).map(([day, hours]) => (
                            <div 
                              key={day} 
                              className={`flex justify-between items-center py-1 ${day === today ? 'font-semibold' : ''}`}
                            >
                              <span className="capitalize">{day}</span>
                              <span className={`${
                                hours.includes('Closed') 
                                  ? 'text-red-500' 
                                  : hours.includes('24') 
                                    ? 'text-green-600' 
                                    : 'text-gray-700'
                              }`}>
                                {hours}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Hospital Photos</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={selectedHospital.image} 
                          alt="Hospital exterior" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1597413545419-4013c472be46?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                          alt="Hospital interior" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1584286596577-0c0463eddb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                          alt="Hospital equipment" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    Get Directions
                  </Button>
                  <Button className="bg-pet hover:bg-pet/90">
                    Book Appointment
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FindHospitals;
