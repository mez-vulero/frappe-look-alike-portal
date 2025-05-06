
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-frappe-300">404</h1>
          <h2 className="text-3xl font-semibold mt-4 text-gray-800">Page not found</h2>
          <p className="text-gray-500 mt-2 mb-8">The page you are looking for doesn't exist or has been moved.</p>
          <Button asChild className="bg-frappe-600 hover:bg-frappe-700">
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
