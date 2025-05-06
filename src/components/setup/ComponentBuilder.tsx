
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast'; // Fixed import path
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Save, Code, LayoutGrid, Eye, Wand, BookOpen } from 'lucide-react';
import ComponentPreview from './ComponentPreview';
import { useComponentStore } from '../../stores/componentStore';
import AIComponentGenerator from './AIComponentGenerator';

const ComponentBuilder: React.FC = () => {
  const { toast } = useToast();
  const { addComponent } = useComponentStore();
  const [componentName, setComponentName] = useState('');
  const [componentDescription, setComponentDescription] = useState('');
  const [componentCode, setComponentCode] = useState(`return (
  <div className="p-4 bg-white rounded-md shadow">
    <h3 className="text-lg font-medium">Hello World</h3>
    <p>This is a custom component</p>
  </div>
);`);
  const [activeTab, setActiveTab] = useState('design');
  const [previewError, setPreviewError] = useState<string | null>(null);

  const handleSaveComponent = () => {
    if (!componentName.trim()) {
      toast({
        title: "Component name required",
        description: "Please provide a name for your component",
        variant: "destructive"
      });
      return;
    }

    try {
      // Validate component code
      new Function(`
        const React = require('react');
        ${componentCode}
      `);

      addComponent({
        id: Date.now().toString(),
        name: componentName,
        description: componentDescription,
        code: componentCode,
        createdAt: new Date().toISOString()
      });

      toast({
        title: "Component saved",
        description: `${componentName} has been added to your components library`,
      });

      // Reset form
      setComponentName('');
      setComponentDescription('');
      setComponentCode(`return (
  <div className="p-4 bg-white rounded-md shadow">
    <h3 className="text-lg font-medium">Hello World</h3>
    <p>This is a custom component</p>
  </div>
);`);
    } catch (error) {
      console.error("Invalid component code", error);
      toast({
        title: "Invalid component code",
        description: "Please check your component code for errors",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border-none frappe-shadow">
          <CardHeader>
            <CardTitle>Component Builder</CardTitle>
            <CardDescription>Create custom UI components for your portal</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="componentName">Component Name</Label>
                  <Input 
                    id="componentName"
                    placeholder="MyCustomComponent" 
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="componentDescription">Description</Label>
                  <Input 
                    id="componentDescription"
                    placeholder="A brief description of your component" 
                    value={componentDescription}
                    onChange={(e) => setComponentDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="design">
                      <LayoutGrid className="mr-2" size={16} />
                      Design
                    </TabsTrigger>
                    <TabsTrigger value="code">
                      <Code className="mr-2" size={16} />
                      Code
                    </TabsTrigger>
                    <TabsTrigger value="ai">
                      <Wand className="mr-2" size={16} />
                      AI Generator
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                      <Eye className="mr-2" size={16} />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="design">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-500 mb-4">
                          Visual editor coming soon. Please use the code editor or AI generator for now.
                        </p>
                        <div className="flex gap-2">
                          <Button onClick={() => setActiveTab('code')}>
                            Go to code editor
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveTab('ai')}
                          >
                            Try AI generator
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="code">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-xs text-gray-500 mb-2">
                          Write your component's render function (JSX). This code will be evaluated as a React component.
                        </p>
                        <ScrollArea className="h-60 bg-gray-50 rounded-md border">
                          <Textarea 
                            className="font-mono text-sm min-h-[240px] border-0 bg-gray-50"
                            value={componentCode}
                            onChange={(e) => setComponentCode(e.target.value)}
                          />
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="ai">
                    <AIComponentGenerator 
                      onCodeGenerated={(generatedCode) => {
                        setComponentCode(generatedCode);
                        setActiveTab('preview');
                        toast({
                          title: "Component generated",
                          description: "Your component code has been generated. Check the preview and make any needed adjustments.",
                        });
                      }}
                    />
                  </TabsContent>
                  
                  <TabsContent value="preview">
                    <Card>
                      <CardContent className="p-4">
                        <ComponentPreview 
                          code={componentCode} 
                          onError={(error) => setPreviewError(error)} 
                        />
                        {previewError && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                            {previewError}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button onClick={handleSaveComponent} className="bg-frappe-600 hover:bg-frappe-700">
              <Save size={16} className="mr-2" />
              Save Component
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div>
        <ComponentLibrary />
      </div>
    </div>
  );
};

// Component Library Panel
const ComponentLibrary: React.FC = () => {
  const { components } = useComponentStore();
  
  return (
    <Card className="border-none frappe-shadow">
      <CardHeader>
        <CardTitle>Component Library</CardTitle>
        <CardDescription>Your saved components</CardDescription>
      </CardHeader>
      
      <CardContent>
        {components.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No components yet</p>
            <p className="text-sm mt-2">Components you create will appear here</p>
          </div>
        ) : (
          <ScrollArea className="h-[320px]">
            <div className="space-y-3">
              {components.map((component) => (
                <Card key={component.id} className="p-3">
                  <div className="font-medium">{component.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{component.description}</div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Plus size={16} className="mr-2" />
          Import Components
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComponentBuilder;
