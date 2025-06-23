import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-200/40 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-cyan-200/25 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-blue-300/35 rounded-full blur-md animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Sparkle elements */}
        <div className="absolute top-20 right-1/3 text-blue-300/60 text-2xl animate-sparkle">✨</div>
        <div className="absolute bottom-1/3 left-20 text-pink-300/60 text-xl animate-sparkle" style={{ animationDelay: '1.5s' }}>💫</div>
        <div className="absolute top-1/3 left-1/2 text-cyan-300/60 text-lg animate-sparkle" style={{ animationDelay: '0.8s' }}>⭐</div>
      </div>
      
      <Navigation />
      <main className="pb-20 relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;