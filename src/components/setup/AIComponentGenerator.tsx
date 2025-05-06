
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand, BookOpen } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AIComponentGeneratorProps {
  onCodeGenerated: (code: string) => void;
}

const AIComponentGenerator: React.FC<AIComponentGeneratorProps> = ({ onCodeGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const { toast } = useToast();
  
  const examples = [
    "A product card with image, title, price, and add to cart button",
    "A responsive statistics dashboard with 4 metric cards",
    "A user profile card with avatar, name, and contact information",
    "A notification panel with read/unread indicators"
  ];
  
  const handlePromptSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a component description",
        variant: "destructive"
      });
      return;
    }
    
    if (!apiKey && showApiKeyInput) {
      toast({
        title: "API Key required",
        description: "Please enter your API key to use the AI generator",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Format the prompt for better results
      const engineeredPrompt = `Create a React component with Tailwind CSS that implements: ${prompt}. 
      Return ONLY the component JSX without imports or function declaration.
      Use modern Tailwind CSS for styling and make it responsive.`;
      
      // Example implementation with Perplexity API
      // In a real implementation, this should be done server-side to protect API keys
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a React component generator. Create modern, responsive React components using Tailwind CSS. Return only the component JSX without imports or function declaration.'
            },
            {
              role: 'user',
              content: engineeredPrompt
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      let generatedCode = data.choices[0].message.content;
      
      // Clean up the response to extract just the code
      generatedCode = generatedCode.replace(/```jsx|```tsx|```js|```tsx|```/g, '').trim();
      
      // If the response still contains a function declaration, extract just the return statement
      if (generatedCode.includes('return (')) {
        generatedCode = generatedCode.substring(
          generatedCode.indexOf('return (') + 'return '.length,
          generatedCode.lastIndexOf(';')
        );
      }
      
      onCodeGenerated(generatedCode);
      
    } catch (error) {
      console.error('Error generating component:', error);
      toast({
        title: "Component generation failed",
        description: error instanceof Error ? error.message : "Failed to generate component",
        variant: "destructive"
      });
      
      // For testing/demo purposes, fallback to a sample component
      if (process.env.NODE_ENV === 'development') {
        const fallbackComponent = `return (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-medium text-gray-900">Generated Component</h3>
    <p className="text-gray-600 mt-2">This is a sample component that would be generated from your prompt: "${prompt}"</p>
    <div className="mt-4 flex justify-end">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Action
      </button>
    </div>
  </div>
);`;
        onCodeGenerated(fallbackComponent);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUseExample = (example: string) => {
    setPrompt(example);
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        {!showApiKeyInput ? (
          <>
            <div className="mb-4">
              <Label htmlFor="prompt" className="mb-2 block">Describe the component you want to create</Label>
              <Textarea 
                id="prompt"
                className="min-h-[100px]" 
                placeholder="e.g. A responsive pricing card with a title, price, features list, and CTA button"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Examples:</p>
              <div className="flex flex-wrap gap-2">
                {examples.map((example, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleUseExample(example)}
                    className="text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Button 
                onClick={() => setShowApiKeyInput(true)}
                variant="outline"
              >
                Configure API
              </Button>
              
              <Button 
                onClick={handlePromptSubmit} 
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand className="mr-2 h-4 w-4" />
                    Generate Component
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <Alert>
              <BookOpen className="h-4 w-4" />
              <AlertTitle>API Configuration</AlertTitle>
              <AlertDescription>
                To use the AI component generator, you need to provide a Perplexity API key. 
                Your key is stored locally and never sent to our servers.
              </AlertDescription>
            </Alert>
            
            <div>
              <Label htmlFor="apiKey">Perplexity API Key</Label>
              <Input 
                id="apiKey"
                type="password" 
                placeholder="pplx-xxxxxxxxxxxxxxxxxxxxxxxx" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mb-4"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowApiKeyInput(false)}
              >
                Back
              </Button>
              <Button 
                onClick={() => {
                  if (apiKey.trim()) {
                    toast({
                      title: "API Key saved",
                      description: "Your API key has been saved for this session"
                    });
                  }
                  setShowApiKeyInput(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIComponentGenerator;
