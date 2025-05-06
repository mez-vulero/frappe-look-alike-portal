
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface UserTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: string;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({ 
  title, 
  description, 
  icon,
  type
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/list?type=${type}`);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-200 border-none frappe-shadow"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-full bg-frappe-50 text-frappe-500">
              {icon}
            </div>
            <div>
              <h2 className="font-medium text-lg">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <ArrowRight className="text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTypeCard;
