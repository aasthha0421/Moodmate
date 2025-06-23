import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User, Sparkles, ArrowLeft } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Client-side validation
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match! 💔');
          return;
        }
        if (formData.name.trim().length < 2) {
          setError('Please enter your name! 🌸');
          return;
        }
      }

      if (formData.email.trim().length === 0 || formData.password.trim().length === 0) {
        setError('Please fill in all fields! ✨');
        return;
      }

      // Prepare API endpoint and payload
      const endpoint = isSignup ?  'http://localhost:5000/api/auth/register'  // ✅ matches your backend route
  : 'http://localhost:5000/api/auth/login';
      const payload = isSignup 
        ? {
            email: formData.email.trim(),
            password: formData.password,
            name: formData.name.trim()
          }
        : {
            email: formData.email.trim(),
            password: formData.password
          };

      // Make API call
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if response has content before parsing JSON
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const responseText = await response.text();
        if (responseText) {
          try {
            data = JSON.parse(responseText);
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            setError('Server response error! Please try again 🔄');
            return;
          }
        } else {
          data = {};
        }
      } else {
        // Handle non-JSON responses
        const responseText = await response.text();
        console.error('Non-JSON response:', responseText);
        setError(`Server error: ${response.status} ${response.statusText} 🚨`);
        return;
      }

      if (response.ok) {
        // Store JWT token in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user || {}));
        }
        
        // Navigate to app home
        navigate('/app/home');
      } else {
        // Handle API errors
        setError(data?.message || `${response.status}: ${isSignup ? 'Signup failed! Please try again 😔' : 'Invalid email or password! 😔'}`);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Something went wrong! Please check your connection 🌐');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

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

      <div className="flex items-center justify-center min-h-screen pt-8 px-4 sm:px-6 relative z-10">
        <div className="max-w-md w-full">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex justify-center items-center mb-4">
              <div className="text-4xl animate-wiggle mr-2">🌸</div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {isSignup ? 'Join MoodMate' : 'Welcome Back'}
              </h1>
              <div className="text-4xl animate-wiggle ml-2">🌸</div>
            </div>
            <p className="text-lg text-blue-600 font-medium">
              {isSignup ? 'Start your emotional wellness journey! 💙' : 'Continue your mood tracking journey! ✨'}
            </p>
            <div className="flex justify-center mt-2 space-x-2">
              <span className="text-2xl animate-bounce-gentle">🦋</span>
              <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>💫</span>
              <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>🌟</span>
            </div>
          </div>

          {/* Auth Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-blue-200 text-2xl animate-sparkle">✨</div>
            <div className="absolute bottom-4 left-4 text-pink-200 text-xl animate-sparkle" style={{ animationDelay: '1s' }}>💕</div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Name Field (Signup only) */}
              {isSignup && (
                <div className="animate-slide-up">
                  <label className="block text-sm font-medium text-blue-700 mb-2 flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Your Name</span>
                    <span className="text-pink-400">🌺</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your beautiful name... 💙"
                    className="w-full px-4 py-3 border-2 border-blue-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50/30 text-blue-700 placeholder-blue-400"
                    required={isSignup}
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2 flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                  <span className="text-cyan-400">✨</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com 💌"
                  className="w-full px-4 py-3 border-2 border-blue-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50/30 text-blue-700 placeholder-blue-400"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2 flex items-center space-x-1">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                  <span className="text-blue-400">🔐</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your secure password... 🛡️"
                  className="w-full px-4 py-3 border-2 border-blue-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50/30 text-blue-700 placeholder-blue-400"
                  required
                />
              </div>

              {/* Confirm Password Field (Signup only) */}
              {isSignup && (
                <div className="animate-slide-up">
                  <label className="block text-sm font-medium text-blue-700 mb-2 flex items-center space-x-1">
                    <Lock className="w-4 h-4" />
                    <span>Confirm Password</span>
                    <span className="text-pink-400">💖</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password... 🔒"
                    className="w-full px-4 py-3 border-2 border-blue-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50/30 text-blue-700 placeholder-blue-400"
                    required={isSignup}
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-pink-50/80 border border-pink-200 rounded-2xl p-4 animate-slide-up">
                  <p className="text-pink-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute top-2 right-4 text-blue-200 text-lg animate-sparkle">✨</div>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Heart className="w-5 h-5 animate-pulse-soft" />
                    <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Toggle Auth Mode */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError('');
                    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 flex items-center justify-center mx-auto space-x-1"
                >
                  <span>
                    {isSignup ? 'Already have an account? Sign in!' : "Don't have an account? Join us!"}
                  </span>
                  <span className="text-lg animate-wiggle">
                    {isSignup ? '💙' : '🌟'}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Fun Quote */}
          <div className="mt-8 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-r from-blue-100/80 via-pink-50/80 to-cyan-100/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/50 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-blue-300 text-lg animate-sparkle">🌈</div>
              <p className="text-blue-600 font-medium italic">
                "Every emotion is a step towards understanding yourself better. 💙✨"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;