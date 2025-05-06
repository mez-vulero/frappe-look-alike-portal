
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserTypeCard from '@/components/users/UserTypeCard';
import { Users, User, School, Building, Briefcase } from 'lucide-react';

const UsersPage: React.FC = () => {
  const userTypes = [
    { 
      title: 'Students', 
      description: 'Manage all student accounts', 
      icon: <School className="size-6" />,
      type: 'student'
    },
    { 
      title: 'Parents', 
      description: 'Manage parent accounts', 
      icon: <User className="size-6" />, 
      type: 'parent'
    },
    { 
      title: 'Teachers', 
      description: 'Manage teacher accounts', 
      icon: <Users className="size-6" />,
      type: 'teacher'
    },
    { 
      title: 'Institutions', 
      description: 'Manage institutional accounts', 
      icon: <Building className="size-6" />,
      type: 'institution'
    },
    { 
      title: 'GD Employee', 
      description: 'Manage GD employee accounts', 
      icon: <Briefcase className="size-6" />,
      type: 'gd_employee'
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTypes.map((userType, index) => (
            <UserTypeCard
              key={index}
              title={userType.title}
              description={userType.description}
              icon={userType.icon}
              type={userType.type}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default UsersPage;
