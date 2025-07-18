import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Calendar, 
  IndianRupee, 
  Building, 
  CheckCircle, 
  ArrowLeft,
  Download,
  Share2,
  Bookmark
} from 'lucide-react';
import { UserProfile } from '../App';

interface Scheme {
  name: string;
  benefit: string;
  description: string;
  eligibility: string;
  ministry: string;
  deadline: string;
  applicationUrl: string;
}

interface SchemeRecommendationsProps {
  userProfile: UserProfile;
  schemes: Scheme[];
  onRestart: () => void;
}

export const SchemeRecommendations: React.FC<SchemeRecommendationsProps> = ({
  userProfile,
  schemes,
  onRestart
}) => {
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<Set<string>>(new Set());

  const toggleBookmark = (schemeName: string) => {
    const newBookmarks = new Set(bookmarkedSchemes);
    if (newBookmarks.has(schemeName)) {
      newBookmarks.delete(schemeName);
    } else {
      newBookmarks.add(schemeName);
    }
    setBookmarkedSchemes(newBookmarks);
  };

  const handleApply = (scheme: Scheme) => {
    window.open(scheme.applicationUrl, '_blank');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            Perfect Matches Found! 🎯
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Based on your profile, here are the best government schemes for you
          </p>
          
          {/* Profile Summary */}
          <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-gray-400">Name</div>
                <div className="font-medium">{userProfile.name}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Category</div>
                <div className="font-medium capitalize">{userProfile.category}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Location</div>
                <div className="font-medium">{userProfile.state}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Income</div>
                <div className="font-medium">₹{(userProfile.parentIncome / 100000).toFixed(1)}L</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mb-8"
        >
          <button
            onClick={onRestart}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Start Over</span>
          </button>

          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedScheme(scheme)}
            >
              {/* Scheme Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                    {scheme.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {scheme.description}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(scheme.name);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    bookmarkedSchemes.has(scheme.name)
                      ? 'bg-white text-black'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Benefit Amount */}
              <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-green-400" />
                  <span className="text-xl font-bold text-green-400">{scheme.benefit}</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Building className="w-4 h-4" />
                  <span>{scheme.ministry}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {scheme.deadline}</span>
                </div>
              </div>

              {/* Apply Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApply(scheme);
                }}
                className="w-full bg-white text-black font-medium py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Apply Now</span>
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Scheme Detail Modal */}
        <AnimatePresence>
          {selectedScheme && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedScheme(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold">{selectedScheme.name}</h2>
                  <button
                    onClick={() => setSelectedScheme(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-300">{selectedScheme.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Benefit</h3>
                    <div className="bg-green-900/30 border border-green-700 rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="w-5 h-5 text-green-400" />
                        <span className="text-xl font-bold text-green-400">{selectedScheme.benefit}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Eligibility</h3>
                    <p className="text-gray-300">{selectedScheme.eligibility}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Ministry</h3>
                      <p className="text-gray-300">{selectedScheme.ministry}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Deadline</h3>
                      <p className="text-gray-300">{selectedScheme.deadline}</p>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => handleApply(selectedScheme)}
                    className="w-full bg-white text-black font-medium py-4 px-6 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Apply for this Scheme</span>
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-green-900/30 border border-green-700 rounded-2xl p-6 max-w-2xl mx-auto">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">You're All Set! 🎉</h3>
            <p className="text-gray-300">
              We found {schemes.length} schemes that match your profile. 
              Click on any scheme to learn more and apply directly.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};