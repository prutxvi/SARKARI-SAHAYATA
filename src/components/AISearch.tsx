import React, { useState } from 'react';
import { Search, Mic, Sparkles, MessageCircle } from 'lucide-react';
import { UserSegment } from '../App';

interface AISearchProps {
  activeSegment: UserSegment;
}

export const AISearch: React.FC<AISearchProps> = ({ activeSegment }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const placeholderTexts = {
    students: 'Ask in your language: "Scholarships for engineering students?" or "Educational loans for EWS category"',
    farmers: 'Ask in your language: "Farm loans for small farmers?" or "Crop insurance schemes"',
    women: 'Ask in your language: "Self-help group loans?" or "Women entrepreneurship schemes"'
  };

  const quickSuggestions = {
    students: ['EWS Scholarships', 'Technical Education', 'Merit-based Grants', 'Skill Development'],
    farmers: ['Crop Insurance', 'Agricultural Loans', 'Subsidy Schemes', 'Irrigation Support'],
    women: ['SHG Loans', 'Entrepreneurship', 'Skill Training', 'Healthcare Schemes']
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Voice search implementation would go here
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    // AI search implementation would go here
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">AI-Powered Scheme Search</h2>
        </div>

        <div className="relative">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholderTexts[activeSegment]}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <button
              onClick={handleVoiceSearch}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                isListening
                  ? 'bg-red-500 border-red-500 text-white animate-pulse'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Mic className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {quickSuggestions[activeSegment].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSearch(suggestion)}
                className="inline-flex items-center px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors duration-200"
              >
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Assistant */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900">AI Assistant</h3>
              <p className="text-sm text-blue-700">
                Ask me anything about government schemes, eligibility, or application processes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};