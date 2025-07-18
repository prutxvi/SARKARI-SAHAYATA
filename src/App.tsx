import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingFlow } from './components/OnboardingFlow';
import { SchemeRecommendations } from './components/SchemeRecommendations';
import { LoadingScreen } from './components/LoadingScreen';

export interface UserProfile {
  name: string;
  age: number;
  state: string;
  district: string;
  category: 'student' | 'farmer' | 'women';
  subcategory: string;
  parentIncome: number;
  caste: string;
  education: string;
  landOwnership?: number;
  businessType?: string;
  maritalStatus?: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState<'onboarding' | 'loading' | 'recommendations'>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendedSchemes, setRecommendedSchemes] = useState<any[]>([]);

  const handleProfileComplete = async (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentStep('loading');
    
    // Simulate AI processing and fetch recommendations
    try {
      const schemes = await fetchSchemeRecommendations(profile);
      setRecommendedSchemes(schemes);
      setTimeout(() => setCurrentStep('recommendations'), 3000);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Fallback to mock data
      setRecommendedSchemes(getMockSchemes(profile));
      setTimeout(() => setCurrentStep('recommendations'), 3000);
    }
  };

  const fetchSchemeRecommendations = async (profile: UserProfile): Promise<any[]> => {
    const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
    
    if (!apiKey || apiKey === 'your_nvidia_api_key_here') {
      throw new Error('API key not configured');
    }

    const prompt = `Based on this user profile, recommend relevant Indian government schemes:
    Name: ${profile.name}
    Category: ${profile.category}
    Age: ${profile.age}
    State: ${profile.state}
    Parent Income: ₹${profile.parentIncome}/year
    Caste: ${profile.caste}
    Education: ${profile.education}
    ${profile.landOwnership ? `Land: ${profile.landOwnership} acres` : ''}
    ${profile.businessType ? `Business: ${profile.businessType}` : ''}
    
    Please provide 5-7 specific government schemes with:
    1. Scheme name
    2. Benefit amount
    3. Eligibility criteria
    4. Application process
    5. Deadline (if any)
    
    Format as JSON array with objects containing: name, benefit, description, eligibility, ministry, deadline, applicationUrl`;

    try {
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-nemotron',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.6,
          top_p: 0.7,
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        return JSON.parse(content);
      } catch (parseError) {
        console.warn('Failed to parse AI response, using mock data:', parseError);
        return getMockSchemes(profile);
      }
    } catch (fetchError) {
      console.error('Network or API error:', fetchError);
      throw fetchError;
    }
  };

  const getMockSchemes = (profile: UserProfile) => {
    const schemes = {
      student: [
        {
          name: 'EWS Scholarship',
          benefit: '₹20,000/year',
          description: 'Financial assistance for economically weaker sections',
          eligibility: 'Family income < ₹8 lakhs',
          ministry: 'Ministry of Education',
          deadline: '2024-03-15',
          applicationUrl: 'https://scholarships.gov.in'
        },
        {
          name: 'Merit-cum-Means Scholarship',
          benefit: '₹12,000/year',
          description: 'For meritorious students from minority communities',
          eligibility: 'Minimum 50% marks, family income < ₹2.5 lakhs',
          ministry: 'Ministry of Minority Affairs',
          deadline: '2024-02-28',
          applicationUrl: 'https://scholarships.gov.in'
        }
      ],
      farmer: [
        {
          name: 'PM-KISAN',
          benefit: '₹6,000/year',
          description: 'Direct income support to farmers',
          eligibility: 'Small and marginal farmers',
          ministry: 'Ministry of Agriculture',
          deadline: 'Ongoing',
          applicationUrl: 'https://pmkisan.gov.in'
        },
        {
          name: 'Crop Insurance Scheme',
          benefit: 'Up to ₹2,00,000',
          description: 'Insurance coverage for crop losses',
          eligibility: 'All farmers with cultivable land',
          ministry: 'Ministry of Agriculture',
          deadline: '2024-04-30',
          applicationUrl: 'https://pmfby.gov.in'
        }
      ],
      women: [
        {
          name: 'Mahila Udyam Nidhi',
          benefit: '₹10,00,000 loan',
          description: 'Women entrepreneurship development scheme',
          eligibility: 'Women above 18 years',
          ministry: 'Ministry of MSME',
          deadline: '2024-05-15',
          applicationUrl: 'https://udyamimitra.in'
        },
        {
          name: 'Sukanya Samriddhi Yojana',
          benefit: 'Tax benefits + High interest',
          description: 'Savings scheme for girl child',
          eligibility: 'Girl child below 10 years',
          ministry: 'Ministry of Finance',
          deadline: 'Ongoing',
          applicationUrl: 'https://www.nsiindia.gov.in'
        }
      ]
    };
    
    return schemes[profile.category] || [];
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStep === 'onboarding' && (
          <OnboardingFlow key="onboarding" onComplete={handleProfileComplete} />
        )}
        {currentStep === 'loading' && (
          <LoadingScreen key="loading" userProfile={userProfile!} />
        )}
        {currentStep === 'recommendations' && (
          <SchemeRecommendations 
            key="recommendations" 
            userProfile={userProfile!} 
            schemes={recommendedSchemes}
            onRestart={() => setCurrentStep('onboarding')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;