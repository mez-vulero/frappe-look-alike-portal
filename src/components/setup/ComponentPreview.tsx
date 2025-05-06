
import React, { useState, useEffect } from 'react';

interface ComponentPreviewProps {
  code: string;
  onError: (error: string | null) => void;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ code, onError }) => {
  const [preview, setPreview] = useState<React.ReactElement | null>(null);
  
  useEffect(() => {
    try {
      // Create a function that will return JSX based on the code
      const renderFunction = new Function('React', `
        try {
          const { useState, useEffect } = React;
          ${code}
        } catch (error) {
          throw new Error('Component render error: ' + error.message);
        }
      `);
      
      // Execute the function with React
      const result = renderFunction(React);
      setPreview(result);
      onError(null);
    } catch (error) {
      console.error("Error rendering component preview:", error);
      setPreview(null);
      onError(error instanceof Error ? error.message : String(error));
    }
  }, [code, onError]);

  return (
    <div className="p-4 border rounded-md bg-white min-h-[100px]">
      <div className="text-xs text-gray-400 mb-2">Preview:</div>
      <div className="preview-container">
        {preview || (
          <div className="flex items-center justify-center h-20 text-gray-400">
            {onError ? "Preview not available" : "Loading preview..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentPreview;
