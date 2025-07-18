import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface DashboardWidgetProps {
  title: string;
  icon: LucideIcon;
  value: string;
  subtitle: string;
  color: 'blue' | 'red' | 'yellow' | 'green';
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  icon: Icon,
  value,
  subtitle,
  color
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    green: 'bg-green-50 text-green-600 border-green-200'
  };

  return (
    <div className={`rounded-xl p-6 border-2 ${colorClasses[color]} hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8" />
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};