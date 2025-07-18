import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, FileText, CheckCircle } from 'lucide-react';
import { UserProfile } from '../App';

interface LoadingScreenProps {
  userProfile: UserProfile;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ userProfile }) => {
  const loadingSteps = [
    { icon: Brain, text: 'Analyzing your profile with AI', delay: 0 },
    { icon: Search, text: 'Searching government databases', delay: 1 },
    { icon: FileText, text: 'Matching eligibility criteria', delay: 2 },
    { icon: CheckCircle, text: 'Preparing recommendations', delay: 2.5 }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            Hello, {userProfile.name}! 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Our AI is finding the perfect government schemes for you
          </p>
        </motion.div>

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 rounded-2xl p-6 mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Category</div>
              <div className="font-medium capitalize">{userProfile.category}</div>
            </div>
            <div>
              <div className="text-gray-400">Location</div>
              <div className="font-medium">{userProfile.state}</div>
            </div>
            <div>
              <div className="text-gray-400">Income</div>
              <div className="font-medium">₹{(userProfile.parentIncome / 100000).toFixed(1)}L</div>
            </div>
            <div>
              <div className="text-gray-400">Category</div>
              <div className="font-medium">{userProfile.caste}</div>
            </div>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <div className="mb-12">
          <motion.div
            className="w-24 h-24 mx-auto mb-8 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full border-4 border-gray-700 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-white border-t-transparent rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-medium mb-2"
          >
            Processing your information...
          </motion.div>
        </div>

        {/* Loading Steps */}
        <div className="space-y-4">
          {loadingSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay }}
                className="flex items-center justify-center space-x-3 text-gray-300"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    delay: step.delay + 0.5,
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span>{step.text}</span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: step.delay + 1 }}
                  className="text-green-400"
                >
                  ✓
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-12 p-4 bg-gray-900 rounded-xl"
        >
          <p className="text-gray-400 text-sm">
            💡 Did you know? There are over 1,500 government schemes available across India!
          </p>
        </motion.div>
      </div>
    </div>
  );
};