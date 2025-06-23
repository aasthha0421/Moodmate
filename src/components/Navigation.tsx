import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, History, BarChart3, Info, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/app/home', icon: Home, label: 'Home' },
    { to: '/app/log-mood', icon: PlusCircle, label: 'Log Mood' },
    { to: '/app/history', icon: History, label: 'History' },
    { to: '/app/insights', icon: BarChart3, label: 'Insights' },
    { to: '/app/about', icon: Info, label: 'About' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-blue-200/50 z-50 shadow-lg">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 sm:p-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'text-blue-600 bg-blue-100/80 scale-110 shadow-md'
                  : 'text-blue-400 hover:text-blue-600 hover:bg-blue-50/80'
              }`
            }
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-2xl transition-all duration-300 text-pink-400 hover:text-pink-600 hover:bg-pink-50/80"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
      
      {/* Brand indicator with user name */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-1 text-xs text-blue-400">
          <Heart className="w-3 h-3 animate-pulse-soft" />
          <span className="font-medium">
            {user ? `Hi, ${user.name.split(' ')[0]}! 💙` : 'MoodMate'}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;