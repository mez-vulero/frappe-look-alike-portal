import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const tabList = [
  'Portal', 'Users', 'User types', 'Courses', 'Categories', 'Skills', 'Gamification', 'E-commerce', 'Integrations', 'Security', 'Import-Export'
];

const AccountSettingsPage: React.FC = () => {
  const [siteName, setSiteName] = useState('globedocket');
  const [siteDescription, setSiteDescription] = useState('TalentLMS - Cloud based, Lean Learning Platform with an Emphasis on Usability and Easy Course Creation');
  const [domainName] = useState('globedocket.talentlms.com');
  const [activeTab, setActiveTab] = useState('Portal');

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Account & Settings</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 border-b border-gray-200 bg-transparent px-0 flex flex-wrap gap-2">
            {tabList.map(tab => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-700 hover:text-frappe-600 data-[state=active]:border-frappe-600 data-[state=active]:text-frappe-600"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="Portal">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-800">IDENTITY</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site name</label>
                    <Input
                      value={siteName}
                      onChange={e => setSiteName(e.target.value)}
                      className="bg-gray-50 border border-gray-200 text-gray-800"
                      placeholder="Enter site name"
                    />
                    <p className="text-xs text-gray-500 mt-1">This will appear in search engine results as the title of your site.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site description</label>
                    <Textarea
                      value={siteDescription}
                      onChange={e => setSiteDescription(e.target.value)}
                      className="bg-gray-50 border border-gray-200 text-gray-800 min-h-[60px]"
                      placeholder="Enter site description"
                    />
                    <p className="text-xs text-gray-500 mt-1">Briefly describe what your website is about. This will appear in search engine results as the description of your site.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domain name</label>
                    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                      <span className="text-gray-800 text-base">{domainName}</span>
                      <Button variant="ghost" size="sm" className="text-frappe-600 px-2">&gt;</Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">If necessary, you can change your TalentLMS domain name anytime you want.</p>
                  </div>
                  <div className="flex gap-2 justify-start pt-4 border-t border-gray-100 mt-8">
                    <Button type="submit" className="px-6">Save</Button>
                    <Button type="button" variant="secondary" className="px-6">Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="User types">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Search"
                      className="w-64 bg-gray-50 border border-gray-200 text-gray-800"
                    />
                    <Button variant="ghost" size="icon" className="text-gray-500"><span className="material-icons">search</span></Button>
                  </div>
                  <Button className="bg-frappe-600 hover:bg-frappe-700 text-white">Add user type</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full bg-white text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-700">
                        <th className="px-6 py-3 text-left font-medium">Name <span className="align-middle">▲</span></th>
                        <th className="px-6 py-3 text-center font-medium">Administrator</th>
                        <th className="px-6 py-3 text-center font-medium">Instructor</th>
                        <th className="px-6 py-3 text-center font-medium">Learner</th>
                        <th className="px-2 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-3">SuperAdmin</td>
                        <td className="px-6 py-3 text-center">✓</td>
                        <td className="px-6 py-3 text-center">✓</td>
                        <td className="px-6 py-3 text-center">✓</td>
                        <td className="px-2 py-3"></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3">Admin-Type</td>
                        <td className="px-6 py-3 text-center">✓</td>
                        <td className="px-6 py-3 text-center">✓</td>
                        <td className="px-6 py-3 text-center">-</td>
                        <td className="px-2 py-3 text-center"><Button variant="ghost" size="icon" className="text-gray-500"><span className="material-icons">more_horiz</span></Button></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3">Trainer-Type</td>
                        <td className="px-6 py-3 text-center">-</td>
                        <td className="px-6 py-3 text-center">✓</td>
                        <td className="px-6 py-3 text-center">-</td>
                        <td className="px-2 py-3 text-center"><Button variant="ghost" size="icon" className="text-gray-500"><span className="material-icons">more_horiz</span></Button></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3">Learner-Type</td>
                        <td className="px-6 py-3 text-center">-</td>
                        <td className="px-6 py-3 text-center">-</td>
                        <td className="px-6 py-3 text-center">✓</td>
                        <td className="px-2 py-3 text-center"><Button variant="ghost" size="icon" className="text-gray-500"><span className="material-icons">edit</span></Button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="pt-4 flex justify-start">
                  <Button variant="ghost" size="icon" className="text-gray-500"><span className="material-icons">download</span></Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Add more <TabsContent value="..."> for other tabs as needed */}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AccountSettingsPage; 