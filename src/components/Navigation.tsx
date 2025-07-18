import React from 'react';
import { GraduationCap, Wheat, Users, Home, Search, TrendingUp, Menu } from 'lucide-react';
import { UserSegment } from '../App';

interface NavigationProps {
  activeSegment: UserSegment;
  onSegmentChange: (segment: UserSegment) => void;
  currentView: 'dashboard' | 'discovery' | 'impact';
  onViewChange: (view: 'dashboard' | 'discovery' | 'impact') => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSegment,
  onSegmentChange,
  currentView,
  onViewChange
}) => {
  const segments = [
    { id: 'students' as UserSegment, label: 'Students', icon: GraduationCap, emoji: '👨‍🎓' },
    { id: 'farmers' as UserSegment, label: 'Farmers', icon: Wheat, emoji: '👨‍🌾' },
    { id: 'women' as UserSegment, label: 'Women', icon: Users, emoji: '👩' }
  ];

  const views = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'discovery' as const, label: 'Schemes', icon: Search },
    { id: 'impact' as const, label: 'Impact', icon: TrendingUp }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sarkari Sahayata</h1>
              <p className="text-sm text-gray-600">Government Assistance Platform</p>
            </div>
          </div>
          
          <button className="lg:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* User Segment Toggle */}
        <div className="flex items-center justify-between border-t border-gray-200 py-3">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {segments.map((segment) => {
              const Icon = segment.icon;
              return (
                <button
                  key={segment.id}
                  onClick={() => onSegmentChange(segment.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    activeSegment === segment.id
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{segment.label}</span>
                  <span className="text-lg">{segment.emoji}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Access Menu */}
          <div className="hidden lg:flex space-x-6">
            {views.map((view) => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => onViewChange(view.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
                    currentView === view.id
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{view.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};