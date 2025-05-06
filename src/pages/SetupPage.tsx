
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ComponentBuilder from '../components/setup/ComponentBuilder';

const SetupPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Setup Module</h1>
          <p className="text-gray-500">Create and manage UI components for your portal</p>
        </div>
        
        <ComponentBuilder />
      </div>
    </MainLayout>
  );
};

export default SetupPage;
