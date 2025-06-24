import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, LogIn, UserPlus } from 'lucide-react';

const Landing: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const handleStartClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowContent(true);
      setTimeout(() => {
        navigate('/auth');
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/15 rounded-full blur-2xl animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-6">
        {!showContent ? (
          <>
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-slide-up">
                MoodMate
              </h1>
              <p className="text-xl md:text-2xl text-white/90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Your Emotional Journal & Insight Hub
              </p>
            </div>

            {/* Animated Emoji Button */}
            <div className="relative mb-12">
              <button
                onClick={handleStartClick}
                disabled={isAnimating}
                className="group relative bg-white/20 backdrop-blur-lg rounded-full p-8 hover:bg-white/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                {/* Left Half */}
                <div 
                  className={`absolute inset-0 bg-white/20 backdrop-blur-lg rounded-full overflow-hidden ${
                    isAnimating ? 'animate-slice-left' : ''
                  }`}
                  style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl">😊</span>
                  </div>
                </div>

                {/* Right Half */}
                <div 
                  className={`absolute inset-0 bg-white/20 backdrop-blur-lg rounded-full overflow-hidden ${
                    isAnimating ? 'animate-slice-right' : ''
                  }`}
                  style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl">😊</span>
                  </div>
                </div>

                {/* Full Emoji (visible initially) */}
                <div className={`flex items-center justify-center ${isAnimating ? 'opacity-0' : ''}`}>
                  <span className="text-8xl animate-bounce-gentle">😊</span>
                </div>

                {/* Sparkle Effects */}
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <p className="text-white/80 mt-6 text-lg animate-slide-up" style={{ animationDelay: '0.4s' }}>
                Click to start your emotional journey
              </p>
            </div>

            {/* Quick Auth Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <button
                onClick={() => navigate('/auth')}
                className="bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="bg-white/10 backdrop-blur-lg text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 border border-white/20"
              >
                <UserPlus className="w-5 h-5" />
                <span>Join Free</span>
              </button>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
                <Heart className="w-8 h-8 mx-auto mb-3 text-secondary-300" />
                <h3 className="font-semibold mb-2">Track Emotions</h3>
                <p className="text-sm text-white/80">Log your daily mood and feelings</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-accent-300" />
                <h3 className="font-semibold mb-2">Get Insights</h3>
                <p className="text-sm text-white/80">Discover patterns and trends</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
                <Heart className="w-8 h-8 mx-auto mb-3 text-primary-300" />
                <h3 className="font-semibold mb-2">Self-Care Tips</h3>
                <p className="text-sm text-white/80">Personalized wellness suggestions</p>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-reveal-content">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 text-white">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent-300" />
              <h2 className="text-4xl font-bold mb-4">Welcome to MoodMate!</h2>
              <p className="text-xl text-white/90">Get ready to discover your emotional patterns...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;