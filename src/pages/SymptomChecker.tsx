import { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, ArrowRight, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PetServiceIcon } from '@/components/PetServiceIcons';

// Mock symptom data
const petTypes = ['dog', 'cat', 'bird', 'rabbit', 'mouse'] as const;
type PetType = typeof petTypes[number];

type Symptom = {
  id: string;
  name: string;
  description: string;
  petTypes: PetType[];
  severity: 'low' | 'medium' | 'high';
  commonCauses: string[];
  recommendations: string[];
  emergencyWarning?: string;
};

const symptoms: Symptom[] = [
  {
    id: 'vomiting',
    name: 'Vomiting',
    description: 'Expulsion of stomach contents through the mouth',
    petTypes: ['dog', 'cat'],
    severity: 'medium',
    commonCauses: ['Food intolerance', 'Eating too quickly', 'Parasites', 'Infection'],
    recommendations: ['Temporary fasting', 'Small bland meals', 'Plenty of water', 'Veterinary visit if persists more than 24 hours']
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    description: 'Loose, watery stools',
    petTypes: ['dog', 'cat', 'rabbit'],
    severity: 'medium',
    commonCauses: ['Diet change', 'Food intolerance', 'Parasites', 'Infection'],
    recommendations: ['Temporary fasting', 'Small bland meals', 'Plenty of water', 'Veterinary visit if persists more than 24 hours or contains blood']
  },
  {
    id: 'lethargy',
    name: 'Lethargy/Weakness',
    description: 'Unusual tiredness, lack of energy',
    petTypes: ['dog', 'cat', 'bird', 'rabbit', 'mouse'],
    severity: 'high',
    commonCauses: ['Illness', 'Pain', 'Anemia', 'Dehydration', 'Poisoning'],
    recommendations: ['Immediate veterinary attention', 'Keep pet warm and comfortable during transport'],
    emergencyWarning: 'This could indicate a serious condition requiring immediate care.'
  },
  {
    id: 'loss-of-appetite',
    name: 'Loss of Appetite',
    description: 'Refusing to eat or decreased interest in food',
    petTypes: ['dog', 'cat', 'bird', 'rabbit', 'mouse'],
    severity: 'medium',
    commonCauses: ['Illness', 'Dental problems', 'Stress', 'New food rejection'],
    recommendations: ['Try different food', 'Check for dental issues', 'Veterinary visit if persists more than 24 hours']
  },
  {
    id: 'excessive-thirst',
    name: 'Excessive Thirst',
    description: 'Drinking more water than usual',
    petTypes: ['dog', 'cat'],
    severity: 'medium',
    commonCauses: ['Diabetes', 'Kidney disease', 'Infection', 'Medication side effects'],
    recommendations: ['Monitor water intake', 'Provide clean, fresh water', 'Veterinary visit for diagnosis']
  },
  {
    id: 'coughing',
    name: 'Coughing/Sneezing',
    description: 'Forceful expulsion of air from the lungs or nasal passages',
    petTypes: ['dog', 'cat', 'bird'],
    severity: 'medium',
    commonCauses: ['Respiratory infection', 'Allergies', 'Foreign object', 'Kennel cough'],
    recommendations: ['Humidifier in sleeping area', 'Avoid smoke exposure', 'Veterinary visit if persists more than a few days']
  },
  {
    id: 'breathing-difficulties',
    name: 'Breathing Difficulties',
    description: 'Labored breathing, wheezing, or shortness of breath',
    petTypes: ['dog', 'cat', 'bird', 'rabbit', 'mouse'],
    severity: 'high',
    commonCauses: ['Asthma', 'Heart disease', 'Pneumonia', 'Obstruction'],
    recommendations: ['Immediate veterinary emergency care', 'Keep pet calm during transport'],
    emergencyWarning: 'This is a medical emergency requiring immediate care.'
  },
  {
    id: 'itching',
    name: 'Itching/Scratching',
    description: 'Excessive scratching, licking, or biting at skin',
    petTypes: ['dog', 'cat', 'rabbit'],
    severity: 'low',
    commonCauses: ['Allergies', 'Parasites', 'Dry skin', 'Infection'],
    recommendations: ['Check for fleas/ticks', 'Oatmeal bath', 'Veterinary visit for persistent cases']
  },
  {
    id: 'limping',
    name: 'Limping',
    description: 'Favoring one or more limbs when walking',
    petTypes: ['dog', 'cat', 'rabbit'],
    severity: 'medium',
    commonCauses: ['Injury', 'Arthritis', 'Growth pains', 'Foreign object'],
    recommendations: ['Rest', 'Limit activity', 'Veterinary visit if persists more than 24 hours']
  },
  {
    id: 'unusual-behavior',
    name: 'Unusual Behavior',
    description: 'Acting differently than normal',
    petTypes: ['dog', 'cat', 'bird', 'rabbit', 'mouse'],
    severity: 'medium',
    commonCauses: ['Pain', 'Illness', 'Stress', 'Cognitive issues'],
    recommendations: ["Note what's different", "Minimize stress", "Veterinary visit for evaluation"]
  }
];

type SelectedSymptom = {
  id: string;
  isChecked: boolean;
};

const SymptomChecker = () => {
  const [petType, setPetType] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>([]);
  const [results, setResults] = useState<Symptom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredSymptoms = petType
    ? symptoms.filter(symptom => 
        symptom.petTypes.includes(petType as PetType) && 
        (searchQuery === '' || 
         symptom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         symptom.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      const exists = prev.find(s => s.id === symptomId);
      if (exists) {
        return prev.map(s => 
          s.id === symptomId ? { ...s, isChecked: !s.isChecked } : s
        );
      } else {
        return [...prev, { id: symptomId, isChecked: true }];
      }
    });
  };

  const handleCheckResults = () => {
    const checkedSymptomIds = selectedSymptoms
      .filter(s => s.isChecked)
      .map(s => s.id);
    
    const matchedSymptoms = symptoms.filter(s => 
      checkedSymptomIds.includes(s.id) && s.petTypes.includes(petType as PetType)
    );
    
    setResults(matchedSymptoms);
    setShowResults(true);
  };

  const hasEmergencyCondition = results.some(r => r.severity === 'high');

  return (
    <Layout requireAuth>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pet Symptom Checker</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Identify potential health issues by selecting your pet type and symptoms.
              This tool provides general guidance but does not replace professional veterinary care.
            </p>
          </div>

          <Tabs defaultValue="checker" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="checker">Symptom Checker</TabsTrigger>
              <TabsTrigger value="info">How It Works</TabsTrigger>
            </TabsList>
            
            <TabsContent value="checker">
              <Card>
                <CardHeader>
                  <CardTitle>Check Your Pet's Symptoms</CardTitle>
                  <CardDescription>
                    Select your pet type and symptoms to get possible causes and recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showResults ? (
                    <div className="space-y-6">
                      {/* Pet Type Selection */}
                      <div className="space-y-2">
                        <Label htmlFor="pet-type">Pet Type</Label>
                        <Select 
                          value={petType} 
                          onValueChange={setPetType}
                        >
                          <SelectTrigger id="pet-type">
                            <SelectValue placeholder="Select your pet type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dog">Dog</SelectItem>
                            <SelectItem value="cat">Cat</SelectItem>
                            <SelectItem value="bird">Bird</SelectItem>
                            <SelectItem value="rabbit">Rabbit</SelectItem>
                            <SelectItem value="mouse">Small Pet (Hamster, Guinea Pig, etc.)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {petType && (
                        <>
                          {/* Symptom Search */}
                          <div className="space-y-2">
                            <Label htmlFor="symptom-search">Search Symptoms</Label>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                              <Input
                                id="symptom-search"
                                placeholder="Search symptoms..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                          </div>

                          {/* Symptom Selection */}
                          <div className="space-y-2">
                            <Label>Select Symptoms</Label>
                            <Card className="border border-gray-200">
                              <CardContent className="p-4 max-h-[300px] overflow-y-auto space-y-2">
                                {filteredSymptoms.length > 0 ? (
                                  filteredSymptoms.map(symptom => (
                                    <div key={symptom.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md">
                                      <Checkbox 
                                        id={symptom.id}
                                        checked={selectedSymptoms.find(s => s.id === symptom.id)?.isChecked || false}
                                        onCheckedChange={() => handleSymptomToggle(symptom.id)}
                                      />
                                      <div className="space-y-1">
                                        <label 
                                          htmlFor={symptom.id} 
                                          className="font-medium text-gray-900 cursor-pointer"
                                        >
                                          {symptom.name}
                                        </label>
                                        <p className="text-sm text-gray-500">{symptom.description}</p>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-center py-8 text-gray-500">
                                    {searchQuery 
                                      ? "No symptoms match your search" 
                                      : "No symptoms available for selected pet type"}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Results Section */}
                      <div>
                        <div className="flex items-center mb-4">
                          <PetServiceIcon 
                            petType={petType as 'dog' | 'cat' | 'bird' | 'rabbit' | 'mouse'} 
                            size={28} 
                            className="mr-2" 
                          />
                          <h3 className="text-xl font-semibold">Results for your {petType}</h3>
                        </div>

                        {/* Emergency Warning */}
                        {hasEmergencyCondition && (
                          <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Emergency Warning</AlertTitle>
                            <AlertDescription>
                              One or more symptoms indicate a potentially serious condition. 
                              Please seek immediate veterinary care.
                            </AlertDescription>
                          </Alert>
                        )}

                        {/* Results Display */}
                        {results.length > 0 ? (
                          <div className="space-y-6">
                            {results.map(result => (
                              <Card key={result.id} className={
                                result.severity === 'high' 
                                  ? 'border-red-300 bg-red-50' 
                                  : result.severity === 'medium'
                                    ? 'border-yellow-300 bg-yellow-50'
                                    : 'border-green-300 bg-green-50'
                              }>
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-start">
                                    <CardTitle>{result.name}</CardTitle>
                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      result.severity === 'high' 
                                        ? 'bg-red-200 text-red-800' 
                                        : result.severity === 'medium'
                                          ? 'bg-yellow-200 text-yellow-800'
                                          : 'bg-green-200 text-green-800'
                                    }`}>
                                      {result.severity === 'high' ? 'Urgent' : result.severity === 'medium' ? 'Moderate' : 'Mild'}
                                    </div>
                                  </div>
                                  <CardDescription>{result.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  {result.emergencyWarning && (
                                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 text-sm">
                                      <p className="font-bold">Warning:</p>
                                      <p>{result.emergencyWarning}</p>
                                    </div>
                                  )}
                                  <div>
                                    <h4 className="font-semibold mb-1">Common Causes:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                      {result.commonCauses.map((cause, i) => (
                                        <li key={i} className="text-sm">{cause}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Recommendations:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                      {result.recommendations.map((rec, i) => (
                                        <li key={i} className="text-sm">{rec}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">No specific information found for the selected symptoms.</p>
                            <p className="text-sm">If your pet is showing concerning symptoms, please consult a veterinarian.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {showResults ? (
                    <Button variant="outline" onClick={() => setShowResults(false)}>
                      Back to Symptom Checker
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setPetType('');
                          setSelectedSymptoms([]);
                          setSearchQuery('');
                        }}
                      >
                        Reset
                      </Button>
                      <Button 
                        onClick={handleCheckResults}
                        disabled={!petType || selectedSymptoms.filter(s => s.isChecked).length === 0}
                        className="bg-pet hover:bg-pet/90"
                      >
                        Check Results
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>How the Symptom Checker Works</CardTitle>
                  <CardDescription>
                    Understand how to use this tool effectively and its limitations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Using the Symptom Checker</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Select your pet type (dog, cat, bird, etc.)</li>
                      <li>Search or browse through the list of common symptoms</li>
                      <li>Check all symptoms that your pet is exhibiting</li>
                      <li>Review the results for possible causes and recommendations</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Important Limitations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>This tool provides general guidance only, not a diagnosis</li>
                      <li>It does not replace professional veterinary care</li>
                      <li>If your pet is in distress, seek immediate veterinary help</li>
                      <li>Results are based on common symptoms and causes, but your pet's situation may be different</li>
                    </ul>
                  </div>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>When to See a Veterinarian Immediately</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Difficulty breathing or choking</li>
                        <li>Severe bleeding or trauma</li>
                        <li>Ingestion of toxic substances</li>
                        <li>Severe pain or distress</li>
                        <li>Inability to stand or walk</li>
                        <li>Loss of consciousness</li>
                        <li>Persistent vomiting or diarrhea</li>
                        <li>Seizures</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>
              Disclaimer: This tool is for informational purposes only and does not constitute veterinary advice.
              Always consult with a qualified veterinarian for proper diagnosis and treatment of pet health issues.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SymptomChecker;
