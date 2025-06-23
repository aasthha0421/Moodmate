import React from 'react';
import { Heart, Target, TrendingUp, Users, Shield, Lightbulb, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Emotional Awareness',
      description: 'Track and understand your daily emotional patterns with our intuitive mood logging system. 💙',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Visual Insights',
      description: 'Discover trends and patterns in your emotional journey through beautiful charts and analytics. ✨',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Personal Growth',
      description: 'Use data-driven insights to identify triggers and develop healthier emotional habits. 🌸',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your emotional data stays private and secure. Everything is stored locally on your device. 🔒',
      color: 'from-blue-600 to-blue-700'
    },
  ];

  const tips = [
    {
      icon: '🌅',
      title: 'Morning Check-ins',
      tip: 'Start your day by logging how you feel. This sets the tone for emotional awareness throughout the day. 💙'
    },
    {
      icon: '📝',
      title: 'Add Context',
      tip: 'Include notes about what might have influenced your mood. This helps identify patterns over time. ✨'
    },
    {
      icon: '📊',
      title: 'Review Weekly',
      tip: 'Check your insights regularly to understand your emotional patterns and celebrate your growth. 🌟'
    },
    {
      icon: '🎯',
      title: 'Be Honest',
      tip: 'Authenticity is key. Log your true feelings without judgment to get the most accurate insights. 💕'
    },
  ];

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4 animate-bounce-gentle">💫</div>
          <div className="flex justify-center items-center mb-4">
            <div className="text-3xl animate-wiggle mr-2">🌸</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              About MoodMate
            </h1>
            <div className="text-3xl animate-wiggle ml-2">🌸</div>
          </div>
          <p className="text-xl text-blue-600 max-w-2xl mx-auto font-medium">
            Your personal companion for emotional wellness and self-discovery through mindful mood tracking. 💙
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <span className="text-2xl animate-bounce-gentle">🦋</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>✨</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>💫</span>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-blue-100/80 via-cyan-50/80 to-pink-50/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 mb-12 border border-blue-200/50 animate-slide-up shadow-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-blue-200 text-2xl animate-sparkle">✨</div>
          <div className="absolute bottom-4 left-4 text-pink-200 text-xl animate-sparkle" style={{ animationDelay: '1s' }}>💕</div>
          
          <div className="text-center relative z-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4 flex items-center justify-center space-x-2">
              <span>Our Mission</span>
              <span className="text-2xl animate-wiggle">🎯</span>
            </h2>
            <p className="text-lg text-blue-700 leading-relaxed">
              We believe that understanding your emotions is the first step towards better mental health and personal growth. 
              MoodMate provides you with the tools to track, analyze, and learn from your emotional patterns in a 
              beautiful, private, and intuitive way. 🌈
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-center mb-8 animate-slide-up flex items-center justify-center space-x-2">
            <span>How MoodMate Helps You</span>
            <span className="text-2xl animate-wiggle">🌟</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 animate-slide-up relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 text-blue-200 text-lg animate-sparkle" style={{ animationDelay: `${index * 0.3}s` }}>
                  {index % 3 === 0 ? '✨' : index % 3 === 1 ? '💫' : '🌟'}
                </div>
                
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 relative z-10`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-blue-600 leading-relaxed relative z-10">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips for Success */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 mb-12 animate-slide-up relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-blue-200 text-2xl animate-sparkle">🌟</div>
          <div className="absolute bottom-4 left-4 text-pink-200 text-xl animate-sparkle" style={{ animationDelay: '1.5s' }}>💕</div>
          
          <div className="text-center mb-8 relative z-10">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-pulse-soft" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center justify-center space-x-2">
              <span>Tips for Success</span>
              <span className="text-2xl animate-wiggle">💡</span>
            </h2>
            <p className="text-blue-600 mt-2 font-medium">Make the most of your mood tracking journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
            {tips.map((tip, index) => (
              <div
                key={tip.title}
                className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 rounded-2xl border border-blue-100/50"
              >
                <div className="text-3xl animate-pulse-soft">{tip.icon}</div>
                <div>
                  <h3 className="font-semibold text-blue-700 mb-1">{tip.title}</h3>
                  <p className="text-blue-600 text-sm">{tip.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white rounded-3xl p-6 sm:p-8 mb-12 animate-slide-up shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-blue-300 text-2xl animate-sparkle">🔒</div>
          <div className="absolute bottom-4 left-4 text-cyan-300 text-xl animate-sparkle" style={{ animationDelay: '1s' }}>✨</div>
          
          <div className="text-center relative z-10">
            <Shield className="w-16 h-16 mx-auto mb-6 text-cyan-400 animate-pulse-soft" />
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-2">
              <span>Your Privacy Matters</span>
              <span className="text-2xl animate-wiggle">🛡️</span>
            </h2>
            <p className="text-blue-100 leading-relaxed max-w-2xl mx-auto">
              MoodMate stores all your data locally in your browser. We don't collect, store, or share your personal 
              information or mood data with anyone. Your emotional journey is completely private and belongs only to you. 💙
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pb-12 animate-slide-up">
          <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-white/30 text-2xl animate-sparkle">✨</div>
            <div className="absolute bottom-4 left-4 text-white/30 text-xl animate-sparkle" style={{ animationDelay: '1s' }}>💫</div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-2">
                <span>Ready to Start Your Journey?</span>
                <span className="text-2xl animate-wiggle">🚀</span>
              </h2>
              <p className="text-white/90 mb-6 text-lg">
                Begin tracking your moods today and discover insights about your emotional patterns. 🌈
              </p>
              <button
                onClick={() => window.location.href = '/app/log-mood'}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 shadow-lg"
              >
                <Heart className="w-5 h-5 animate-pulse-soft" />
                <span>Log Your First Mood</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;