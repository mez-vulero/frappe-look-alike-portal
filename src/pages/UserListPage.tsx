
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ArrowRight } from 'lucide-react';

// This would typically come from an API
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', type: 'student', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', type: 'student', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', type: 'parent', status: 'active' },
  { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', type: 'parent', status: 'active' },
  { id: 5, name: 'Mark Davis', email: 'mark.davis@example.com', type: 'teacher', status: 'active' },
  { id: 6, name: 'Sarah Wilson', email: 'sarah.wilson@example.com', type: 'teacher', status: 'inactive' },
  { id: 7, name: 'Oxford University', email: 'contact@oxford.edu', type: 'institution', status: 'active' },
  { id: 8, name: 'Cambridge College', email: 'admin@cambridge.edu', type: 'institution', status: 'active' },
  { id: 9, name: 'Tom Harris', email: 'tom.harris@gd.com', type: 'gd_employee', status: 'active' },
  { id: 10, name: 'Emma White', email: 'emma.white@gd.com', type: 'gd_employee', status: 'inactive' },
];

const UserListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState<string>(searchParams.get('type') || 'student');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  // Filter users based on selected type
  useEffect(() => {
    if (selectedType) {
      const filtered = mockUsers.filter(user => user.type === selectedType);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(mockUsers);
    }
  }, [selectedType]);

  // Update URL when filter changes
  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setSearchParams({ type: value });
  };
  
  // Format user type for display
  const formatUserType = (type: string): string => {
    switch (type) {
      case 'student': return 'Students';
      case 'parent': return 'Parents';
      case 'teacher': return 'Teachers';
      case 'institution': return 'Institutions';
      case 'gd_employee': return 'GD Employee';
      default: return type;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">User List: {formatUserType(selectedType)}</h1>
          <Button>Add New User</Button>
        </div>
        
        <Card className="mb-6 border-none frappe-shadow">
          <CardHeader className="pb-3">
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter users by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-64">
                <Select value={selectedType} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="parent">Parents</SelectItem>
                    <SelectItem value="teacher">Teachers</SelectItem>
                    <SelectItem value="institution">Institutions</SelectItem>
                    <SelectItem value="gd_employee">GD Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none frappe-shadow">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{formatUserType(user.type)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UserListPage;
