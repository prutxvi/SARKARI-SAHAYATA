import React from 'react';
import { UserSegment } from '../App';
import { SchemeCard } from './SchemeCard';
import { DashboardWidget } from './DashboardWidget';
import { Calendar, MapPin, Clock, TrendingUp } from 'lucide-react';

interface DashboardProps {
  activeSegment: UserSegment;
}

export const Dashboard: React.FC<DashboardProps> = ({ activeSegment }) => {
  const featuredSchemes = {
    students: [
      {
        id: '1',
        title: 'EWS Scholarship',
        description: 'Financial assistance for economically weaker sections',
        benefit: '₹20,000/year',
        category: 'EWS',
        ministry: 'Ministry of Education',
        complexity: 3,
        deadline: '2024-03-15',
        tags: ['EWS', 'Annual']
      },
      {
        id: '2',
        title: 'TS-Epass Reimbursement',
        description: 'Telangana state educational reimbursement scheme',
        benefit: '₹35,000/year',
        category: 'State',
        ministry: 'Telangana Government',
        complexity: 4,
        deadline: '2024-02-28',
        tags: ['Telangana', 'Reimbursement']
      },
      {
        id: '3',
        title: 'Skill India Internships',
        description: 'Technical skill development and internship programs',
        benefit: '₹8,000/month',
        category: 'Tech',
        ministry: 'Ministry of Skill Development',
        complexity: 2,
        deadline: '2024-04-10',
        tags: ['Tech', 'Internship']
      }
    ],
    farmers: [
      {
        id: '4',
        title: 'PM Fasal Bima Yojana',
        description: 'Crop insurance scheme for farmers',
        benefit: '₹2,00,000 coverage',
        category: 'Insurance',
        ministry: 'Ministry of Agriculture',
        complexity: 3,
        deadline: '2024-03-31',
        tags: ['Insurance', 'Crops']
      },
      {
        id: '5',
        title: 'Kisan Credit Card',
        description: 'Easy credit facility for farming activities',
        benefit: '₹3,00,000 limit',
        category: 'Credit',
        ministry: 'Ministry of Agriculture',
        complexity: 2,
        deadline: 'Ongoing',
        tags: ['Credit', 'Farming']
      }
    ],
    women: [
      {
        id: '6',
        title: 'Mahila Udyam Nidhi',
        description: 'Women entrepreneurship development scheme',
        benefit: '₹10,00,000 loan',
        category: 'Business',
        ministry: 'Ministry of MSME',
        complexity: 4,
        deadline: '2024-05-15',
        tags: ['Business', 'Loan']
      },
      {
        id: '7',
        title: 'Beti Bachao Beti Padhao',
        description: 'Girl child education and empowerment',
        benefit: '₹25,000/year',
        category: 'Education',
        ministry: 'Ministry of Women & Child Development',
        complexity: 2,
        deadline: '2024-04-30',
        tags: ['Education', 'Empowerment']
      }
    ]
  };

  const currentSchemes = featuredSchemes[activeSegment];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome to your personalized dashboard
        </h2>
        <p className="text-orange-100">
          Discover government schemes tailored for {activeSegment}
        </p>
      </div>

      {/* Featured Schemes */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Featured Schemes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardWidget
          title="Schemes Near You"
          icon={MapPin}
          value="12 schemes"
          subtitle="Available in your area"
          color="blue"
        />
        <DashboardWidget
          title="Deadline Alerts"
          icon={Calendar}
          value="3 expiring"
          subtitle="Applications closing soon"
          color="red"
        />
        <DashboardWidget
          title="Application Progress"
          icon={Clock}
          value="2 pending"
          subtitle="Under review"
          color="yellow"
        />
        <DashboardWidget
          title="Success Rate"
          icon={TrendingUp}
          value="85%"
          subtitle="Applications approved"
          color="green"
        />
      </div>
    </div>
  );
};