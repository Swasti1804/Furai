import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PetLayout = ({ title, icon, tabs, aiPrompt }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `I can help with ${title}. ${aiPrompt}`, 
        sender: 'bot' 
      }]);
    }, 800);
    
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 rounded-full bg-white shadow">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === tab.id 
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-white rounded-xl p-6 shadow"
            >
              {tabs.find(tab => tab.id === activeTab)?.content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column - AI Chat */}
        <div className="relative">
          {/* Chat implementation from previous example */}
        </div>
      </div>
    </div>
  );
};

export default PetLayout;