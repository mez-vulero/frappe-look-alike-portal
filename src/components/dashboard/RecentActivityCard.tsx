
import React from 'react';
import { Card } from '@/components/ui/card';

interface Activity {
  user: string;
  action: string;
  target: string;
  time: string;
}

const RecentActivityCard: React.FC<{ activities: Activity[] }> = ({ activities }) => {
  return (
    <Card className="p-0 border-none frappe-shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </div>
      <div className="p-0">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity, index) => (
            <li key={index} className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-frappe-100 flex items-center justify-center text-frappe-600 font-semibold mr-3">
                  {activity.user.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default RecentActivityCard;
