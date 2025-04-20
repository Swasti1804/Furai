
import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { MessageSquare, Send, ArrowRight, Info, Cat, Dog, Bird, Rabbit, Mouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Sample FAQs for the suggested questions
const sampleFAQs = [
  "What vaccines does my puppy need?",
  "How much exercise does a cat need daily?",
  "What human foods are toxic to dogs?",
  "How do I know if my bird is sick?",
  "How often should I take my pet to the vet?",
  "What's the best diet for an overweight cat?",
  "How do I trim my dog's nails safely?",
  "Is it normal for rabbits to shed a lot?",
  "Why is my hamster not using its wheel?"
];

// Mock AI responses
const getAIResponse = (question: string): string => {
  const responses: Record<string, string> = {
    "What vaccines does my puppy need?": 
      "Puppies typically need several core vaccines: Distemper, Parvovirus, Adenovirus (Hepatitis), and Rabies. These are usually administered in a series starting at 6-8 weeks of age, with boosters every 3-4 weeks until 16 weeks old. Additional vaccines like Bordetella (kennel cough), Leptospirosis, and Lyme disease may be recommended based on your location and puppy's lifestyle. Always consult with your veterinarian for a personalized vaccination schedule.",
    
    "How much exercise does a cat need daily?": 
      "Most cats need about 30 minutes of active play daily, though this can vary by age, health, and breed. Indoor cats especially benefit from structured play sessions to prevent boredom and obesity. Young cats and kittens typically need more activity, while senior cats may need gentler, shorter sessions. Interactive toys, climbing structures, and puzzle feeders can help keep your cat physically and mentally stimulated throughout the day.",
    
    "What human foods are toxic to dogs?": 
      "Several human foods are toxic to dogs and should be avoided: Chocolate, xylitol (in sugar-free products), grapes and raisins, onions and garlic, alcohol, caffeine, macadamia nuts, avocados, and raw bread dough. Also avoid foods high in fat or salt which can cause pancreatitis or sodium ion poisoning. If your dog consumes any of these foods, contact your veterinarian immediately as some toxicities can be life-threatening.",
    
    "How do I know if my bird is sick?": 
      "Signs of illness in birds include: changes in eating or drinking habits, unusual droppings, fluffed feathers for extended periods, tail bobbing when breathing, discharge from eyes or nostrils, decreased vocalization or activity, and changes in weight. Birds often hide illness until it's advanced, so any behavioral changes warrant attention. If you notice these symptoms, consult an avian veterinarian promptly as birds can deteriorate quickly when ill.",
    
    "How often should I take my pet to the vet?": 
      "Generally, healthy adult dogs and cats should visit the vet at least once a year for a wellness check. Puppies and kittens need more frequent visits for vaccinations and development monitoring, typically every 3-4 weeks until about 16 weeks old. Senior pets (usually 7+ years for dogs, 10+ for cats) benefit from twice-yearly check-ups. Exotic pets like birds and reptiles also need annual exams. Always schedule additional visits if you notice any concerning symptoms or behavioral changes.",
  };

  // Default response for questions not in our database
  if (!responses[question]) {
    if (question.toLowerCase().includes("food") || question.toLowerCase().includes("diet") || question.toLowerCase().includes("eat")) {
      return "A balanced diet is crucial for your pet's health. Generally, pets should eat age-appropriate commercial food that meets AAFCO standards. The specific dietary needs vary by species, breed, age, and health status. It's best to consult with your veterinarian for personalized nutrition recommendations for your specific pet.";
    } else if (question.toLowerCase().includes("sick") || question.toLowerCase().includes("health") || question.toLowerCase().includes("symptoms")) {
      return "If you're concerned about your pet's health, look for signs like changes in appetite, water consumption, energy levels, or bathroom habits. Other warning signs include unusual discharge, persistent coughing or sneezing, vomiting, diarrhea, or changes in behavior. When in doubt, it's always best to consult with your veterinarian rather than waiting to see if symptoms improve.";
    } else {
      return "Thank you for your question. While I have information on many pet health topics, I don't have specific details on this particular query. For the most accurate advice tailored to your pet's specific situation, I recommend consulting with your veterinarian directly.";
    }
  }

  return responses[question];
};

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Pet Care Assistant. I can answer questions about pet health, behavior, nutrition, and more. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [petType, setPetType] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response timing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(userMessage.content),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    // Focus the textarea after setting the question
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.focus();
    }
  };

  return (
    <Layout requireAuth>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Pet Care Assistant</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get instant answers to your pet health questions from our AI-powered assistant.
            While our AI provides helpful information, always consult a veterinarian for serious concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Assistant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Our AI Pet Assistant provides general information about pet care, health, 
                  and behavior based on available veterinary knowledge.
                </p>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription className="text-xs">
                    This AI does not replace professional veterinary advice.
                    For emergencies or serious health concerns, please contact your veterinarian immediately.
                  </AlertDescription>
                </Alert>
                
                <div className="pt-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Supported Pet Types:</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Dog className="h-3 w-3" /> Dogs
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Cat className="h-3 w-3" /> Cats
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Bird className="h-3 w-3" /> Birds
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Rabbit className="h-3 w-3" /> Rabbits
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Mouse className="h-3 w-3" /> Small Pets
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Common Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sampleFAQs.slice(0, 5).map((question, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 rounded-md text-sm hover:bg-gray-100 transition-colors text-gray-700"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full text-pet" onClick={() => {}}>
                  View More Questions
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-pet text-white">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Pet Care Assistant</CardTitle>
                    <CardDescription>Powered by AI</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex-grow overflow-hidden">
                <Tabs defaultValue="chat">
                  <TabsList className="w-full justify-start rounded-none border-b p-0">
                    <TabsTrigger 
                      value="chat" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-pet data-[state=active]:shadow-none py-3 px-4"
                    >
                      Chat
                    </TabsTrigger>
                    <TabsTrigger 
                      value="information" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-pet data-[state=active]:shadow-none py-3 px-4"
                    >
                      Information
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chat" className="h-[450px] flex flex-col p-0 m-0">
                    <ScrollArea className="flex-grow p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-4 ${
                                message.role === 'user'
                                  ? 'bg-pet text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <div className="whitespace-pre-wrap">{message.content}</div>
                              <div
                                className={`text-xs mt-1 ${
                                  message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-gray-100 text-gray-800 rounded-lg p-4 max-w-[80%]">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.4s" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    
                    <div className="mt-auto p-4 border-t">
                      <div className="flex gap-2">
                        <Textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your question here..."
                          className="min-h-[60px] resize-none"
                        />
                        <Button
                          onClick={handleSendMessage}
                          className="bg-pet hover:bg-pet/90"
                          disabled={!inputMessage.trim() || isTyping}
                        >
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Send</span>
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Press Enter to send. For emergency pet health issues, please contact your veterinarian.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="information" className="h-[450px] p-4 m-0">
                    <ScrollArea className="h-full pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">About This Service</h3>
                          <p className="text-gray-700 text-sm">
                            The AI Pet Care Assistant provides general information about pet care, health, 
                            and behavior. It uses advanced natural language processing to understand your 
                            questions and provide helpful responses based on veterinary knowledge.
                          </p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">How To Use</h3>
                          <ol className="space-y-2 text-sm text-gray-700 list-decimal pl-4">
                            <li>Type your pet-related question in the chat box</li>
                            <li>Be specific about your pet's species, breed, age, and symptoms</li>
                            <li>Ask one question at a time for the most accurate responses</li>
                            <li>For follow-up questions, provide context from previous messages</li>
                          </ol>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Limitations</h3>
                          <ul className="space-y-2 text-sm text-gray-700 list-disc pl-4">
                            <li>This AI cannot diagnose specific medical conditions</li>
                            <li>Responses are based on general knowledge, not your pet's specific health history</li>
                            <li>The AI has no access to your pet's medical records</li>
                            <li>Information provided is educational and not a substitute for professional veterinary care</li>
                          </ul>
                          <div className="mt-4 p-3 bg-yellow-50 border rounded border-yellow-200 text-yellow-800 text-sm">
                            <strong>Important:</strong> For emergencies or serious health concerns, always contact your 
                            veterinarian or an emergency animal hospital immediately.
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Topic Coverage</h3>
                          <p className="text-sm text-gray-700 mb-2">
                            The AI can provide information on these topics:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-pet rounded-full mr-2"></div>
                              <span className="text-sm">Preventive care</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-pet rounded-full mr-2"></div>
                              <span className="text-sm">Nutrition & diet</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-pet rounded-full mr-2"></div>
                              <span className="text-sm">Common health issues</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-pet rounded-full mr-2"></div>
                              <span className="text-sm">Behavioral questions</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-pet rounded-full mr-2"></div>
                              <span className="text-sm">Grooming & care</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-pet rounded-full mr-2"></div>
                              <span className="text-sm">Exercise needs</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-pet rounded-full mr-2"></div>
                              <span className="text-sm">Parasite prevention</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-pet rounded-full mr-2"></div>
                              <span className="text-sm">Vaccination schedules</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>
                Need professional help? Find a <a href="/find-hospitals" className="text-pet hover:underline">Veterinary Hospital</a>
              </span>
              <span>
                <Button variant="link" size="sm" className="text-pet p-0">
                  Clear conversation
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatAssistant;
