
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickActionProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionProps> = ({ title, icon, onClick }) => {
  return (
    <Button
      variant="outline"
      className="flex items-center justify-start p-3 w-full bg-white hover:bg-frappe-50 hover:text-frappe-600 border border-gray-200"
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span>{title}</span>
    </Button>
  );
};

const QuickActions: React.FC<{ actions: Array<Omit<QuickActionProps, 'onClick'>> }> = ({ actions }) => {
  return (
    <Card className="p-4 border-none frappe-shadow">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => (
          <QuickActionButton
            key={index}
            title={action.title}
            icon={action.icon}
            onClick={() => console.log(`Clicked on ${action.title}`)}
          />
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
