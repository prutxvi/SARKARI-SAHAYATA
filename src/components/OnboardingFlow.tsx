import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, MapPin, GraduationCap, Wheat, Users, IndianRupee } from 'lucide-react';
import { UserProfile } from '../App';

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  const steps = [
    { title: 'Personal Details', icon: User },
    { title: 'Location & Category', icon: MapPin },
    { title: 'Background Info', icon: GraduationCap },
    { title: 'Financial Details', icon: IndianRupee }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData as UserProfile);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<UserProfile>) => {
    setFormData({ ...formData, ...data });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name && formData.age;
      case 1:
        return formData.state && formData.district && formData.category;
      case 2:
        return formData.caste && formData.education;
      case 3:
        return formData.parentIncome;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Sarkari Sahayata
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            AI-Powered Government Scheme Recommendations
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      index <= currentStep 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent text-gray-400 border-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      index < currentStep ? 'bg-white' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-400">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </p>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-gray-900 rounded-2xl p-8 mb-8"
        >
          {currentStep === 0 && <PersonalDetailsStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 1 && <LocationCategoryStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <BackgroundStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <FinancialStep formData={formData} updateFormData={updateFormData} />}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <motion.button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 0 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
            whileHover={currentStep > 0 ? { scale: 1.02 } : {}}
            whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all ${
              isStepValid()
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={isStepValid() ? { scale: 1.02 } : {}}
            whileTap={isStepValid() ? { scale: 0.98 } : {}}
          >
            {currentStep === steps.length - 1 ? 'Get Recommendations' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const PersonalDetailsStep: React.FC<{
  formData: Partial<UserProfile>;
  updateFormData: (data: Partial<UserProfile>) => void;
}> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
    
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
      <input
        type="text"
        value={formData.name || ''}
        onChange={(e) => updateFormData({ name: e.target.value })}
        className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white focus:border-white focus:outline-none transition-colors"
        placeholder="Enter your full name"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
      <input
        type="number"
        value={formData.age || ''}
        onChange={(e) => updateFormData({ age: parseInt(e.target.value) })}
        className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white focus:border-white focus:outline-none transition-colors"
        placeholder="Enter your age"
        min="1"
        max="100"
      />
    </div>
  </div>
);

const LocationCategoryStep: React.FC<{
  formData: Partial<UserProfile>;
  updateFormData: (data: Partial<UserProfile>) => void;
}> = ({ formData, updateFormData }) => {
  const categories = [
    { id: 'student', label: 'Student', icon: GraduationCap, emoji: '👨‍🎓' },
    { id: 'farmer', label: 'Farmer', icon: Wheat, emoji: '👨‍🌾' },
    { id: 'women', label: 'Women', icon: Users, emoji: '👩' }
  ];

  const states = [
    'Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Kerala',
    'Maharashtra', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Bihar'
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Location & Category</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">Select your category</label>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => updateFormData({ category: category.id as any })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.category === category.id
                    ? 'border-white bg-white text-black'
                    : 'border-gray-600 hover:border-gray-400'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl mb-1">{category.emoji}</div>
                <div className="font-medium">{category.label}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
          <select
            value={formData.state || ''}
            onChange={(e) => updateFormData({ state: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white focus:border-white focus:outline-none transition-colors"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">District</label>
          <input
            type="text"
            value={formData.district || ''}
            onChange={(e) => updateFormData({ district: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white focus:border-white focus:outline-none transition-colors"
            placeholder="Enter district"
          />
        </div>
      </div>
    </div>
  );
};

const BackgroundStep: React.FC<{
  formData: Partial<UserProfile>;
  updateFormData: (data: Partial<UserProfile>) => void;
}> = ({ formData, updateFormData }) => {
  const castes = ['General', 'OBC', 'SC', 'ST', 'EWS'];
  const educationLevels = [
    'Below 10th', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'Professional Degree'
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Background Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Caste Category</label>
        <select
          value={formData.caste || ''}
          onChange={(e) => updateFormData({ caste: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white focus:border-white focus:outline-none transition-colors"
        >
          <option value="">Select Category</option>
          {castes.map((caste) => (
            <option key={caste} value={caste}>{caste}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Education Level</label>
        <select
          value={formData.education || ''}
          onChange={(e) => updateFormData({ education: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white focus:border-white focus:outline-none transition-colors"
        >
          <option value="">Select Education</option>
          {educationLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {formData.category === 'farmer' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Land Ownership (acres)</label>
          <input
            type="number"
            value={formData.landOwnership || ''}
            onChange={(e) => updateFormData({ landOwnership: parseFloat(e.target.value) })}
            className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white focus:border-white focus:outline-none transition-colors"
            placeholder="Enter land in acres"
            min="0"
            step="0.1"
          />
        </div>
      )}

      {formData.category === 'women' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Business Type (if applicable)</label>
          <input
            type="text"
            value={formData.businessType || ''}
            onChange={(e) => updateFormData({ businessType: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-gray-600 rounded-xl text-white focus:border-white focus:outline-none transition-colors"
            placeholder="e.g., Tailoring, Food Business, etc."
          />
        </div>
      )}
    </div>
  );
};

const FinancialStep: React.FC<{
  formData: Partial<UserProfile>;
  updateFormData: (data: Partial<UserProfile>) => void;
}> = ({ formData, updateFormData }) => {
  const incomeRanges = [
    { label: 'Below ₹1 Lakh', value: 100000 },
    { label: '₹1-2 Lakhs', value: 200000 },
    { label: '₹2-5 Lakhs', value: 500000 },
    { label: '₹5-8 Lakhs', value: 800000 },
    { label: '₹8-10 Lakhs', value: 1000000 },
    { label: 'Above ₹10 Lakhs', value: 1500000 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Financial Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          {formData.category === 'student' ? 'Parent/Guardian Annual Income' : 'Annual Income'}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {incomeRanges.map((range) => (
            <motion.button
              key={range.value}
              onClick={() => updateFormData({ parentIncome: range.value })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                formData.parentIncome === range.value
                  ? 'border-white bg-white text-black'
                  : 'border-gray-600 hover:border-gray-400'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium">{range.label}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};