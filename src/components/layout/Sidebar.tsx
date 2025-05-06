
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Users, 
  Mail, 
  File, 
  Calendar, 
  LayoutDashboard,
  ChevronRight,
  ChevronLeft,
  Component
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Users', icon: <Users size={20} />, path: '/users' },
    { name: 'Messages', icon: <Mail size={20} />, path: '/messages' },
    { name: 'Documents', icon: <File size={20} />, path: '/documents' },
    { name: 'Calendar', icon: <Calendar size={20} />, path: '/calendar' },
    { name: 'Setup', icon: <Component size={20} />, path: '/setup' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];
  
  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-screen ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <span className="text-xl font-bold text-frappe-600">Frappe</span>
          </div>
        )}
        <button 
          className={`p-1 rounded-md hover:bg-gray-100 ${collapsed ? 'mx-auto' : 'ml-auto'}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-700 hover:bg-frappe-50 hover:text-frappe-600 rounded-md transition-colors ${
                  location.pathname === item.path ? 'bg-frappe-50 text-frappe-600 border-r-4 border-frappe-500' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-gray-200 flex items-center">
        <div className="w-8 h-8 rounded-full bg-frappe-100 flex items-center justify-center text-frappe-600 font-semibold">
          U
        </div>
        {!collapsed && (
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">User Name</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
