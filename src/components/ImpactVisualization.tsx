import React from 'react';
import { TrendingUp, Users, IndianRupee, Award, ArrowRight } from 'lucide-react';

export const ImpactVisualization: React.FC = () => {
  const successStories = [
    {
      id: 1,
      name: 'Priya Sharma',
      scheme: 'EWS Scholarship',
      amount: '₹20,000',
      category: 'Student',
      story: 'Completed engineering degree with scholarship support',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 2,
      name: 'Ravi Kumar',
      scheme: 'Kisan Credit Card',
      amount: '₹2,50,000',
      category: 'Farmer',
      story: 'Expanded organic farming with credit facility',
      image: 'https://images.pexels.com/photos/2995012/pexels-photo-2995012.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 3,
      name: 'Sunita Devi',
      scheme: 'Mahila Udyam Nidhi',
      amount: '₹5,00,000',
      category: 'Women',
      story: 'Started successful tailoring business',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const impactStats = [
    { label: 'Total Beneficiaries', value: '2.4M+', icon: Users, color: 'blue' },
    { label: 'Benefits Distributed', value: '₹14.2Cr', icon: IndianRupee, color: 'green' },
    { label: 'Success Rate', value: '87%', icon: TrendingUp, color: 'orange' },
    { label: 'Active Schemes', value: '150+', icon: Award, color: 'purple' }
  ];

  const stateDistribution = [
    { state: 'Telangana', beneficiaries: '45,000', percentage: 18 },
    { state: 'Karnataka', beneficiaries: '38,000', percentage: 15 },
    { state: 'Tamil Nadu', beneficiaries: '42,000', percentage: 17 },
    { state: 'Maharashtra', beneficiaries: '35,000', percentage: 14 },
    { state: 'Others', beneficiaries: '90,000', percentage: 36 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Impact Dashboard</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how Sarkari Sahayata is transforming lives across India through government schemes
        </p>
      </div>

      {/* Impact Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-500',
            green: 'bg-green-500',
            orange: 'bg-orange-500',
            purple: 'bg-purple-500'
          };
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className={`w-12 h-12 ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Real-time Counter */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Live Impact Counter</h3>
        <div className="text-4xl font-bold mb-4">₹14,23,45,670</div>
        <p className="text-green-100">Benefits claimed this month</p>
      </div>

      {/* Success Stories */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src={story.image} 
                alt={story.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{story.name}</h4>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                    {story.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{story.story}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Scheme: {story.scheme}</p>
                    <p className="font-semibold text-green-600">{story.amount}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">State-wise Distribution</h3>
        <div className="space-y-4">
          {stateDistribution.map((state, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{state.state}</span>
                  <span className="text-sm text-gray-600">{state.beneficiaries} beneficiaries</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${state.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};