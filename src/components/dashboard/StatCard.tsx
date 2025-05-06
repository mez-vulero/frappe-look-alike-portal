
import React from 'react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change }) => {
  return (
    <Card className="p-4 border-none frappe-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-xs ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
                {change.positive ? '+' : ''}{change.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="w-10 h-10 rounded-md bg-frappe-50 flex items-center justify-center text-frappe-500">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
