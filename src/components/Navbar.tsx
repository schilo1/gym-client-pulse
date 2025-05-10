
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Users, CreditCard, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Implement actual logout logic here
    console.log("Logging out...");
    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-blue">E-Gym</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-blue hover:bg-gray-100"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
              <Link 
                to="/clients" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-blue hover:bg-gray-100"
              >
                <Users className="mr-2 h-4 w-4" />
                Clients
              </Link>
              <Link 
                to="/payments" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-blue hover:bg-gray-100"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payments
              </Link>
              <Button 
                variant="ghost" 
                onClick={handleLogout} 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-blue hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
            <Link 
              to="/dashboard" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-blue hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              to="/clients" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-blue hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="mr-2 h-4 w-4" />
              Clients
            </Link>
            <Link 
              to="/payments" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-blue hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Payments
            </Link>
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
