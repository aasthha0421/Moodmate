import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce-gentle">💙</div>
          <div className="text-xl text-blue-600 font-medium">Loading your mood journey...</div>
          <div className="flex justify-center mt-4 space-x-2">
            <span className="text-lg animate-bounce-gentle">✨</span>
            <span className="text-lg animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>💫</span>
            <span className="text-lg animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>🌟</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />; // ✅ This renders nested routes properly
};

export default ProtectedRoute;
