import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMood } from '../context/MoodContext';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { PlusCircle, Calendar, TrendingUp, Smile, Sparkles, Heart, RefreshCw } from 'lucide-react';
import { getRandomQuote } from '../api/quoteApi';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { getTodaysEntry, entries } = useMood();
  const { user } = useAuth();
  const todaysEntry = getTodaysEntry();
  const recentEntries = entries.slice(0, 3);

  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadQuote = async (isRefreshing = false) => {
    try {
      if (isRefreshing) setRefreshing(true);
      if (!isRefreshing) setLoading(true);
      
      const data = await getRandomQuote();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (err) {
      console.error('Failed to load quote:', err);
      // Fallback quotes if API fails
      const fallbackQuotes = [
        { content: "Emotions are temporary, but behaviors are permanent.", author: "Brianna Wiest" },
        { content: "Your feelings are valid, and your journey matters.", author: "Unknown" },
        { content: "Small steps in self-awareness lead to big changes.", author: "Unknown" },
        { content: "Today is a new opportunity to understand yourself better.", author: "Unknown" },
        { content: "Be kind to yourself - you're doing better than you think.", author: "Courtney Peppernell " },
      ];
      const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomFallback.content);
      setAuthor(randomFallback.author);
    } finally {
      setLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    loadQuote();
  }, []);

  const refreshQuote = () => {
    loadQuote(true);
  };

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 ">
      <div className="max-w-4xl mx-auto">
        {/* Header with cute elements */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center items-center mb-4">
            <div className="text-4xl animate-wiggle mr-2">🌸</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Hello, {user?.name.split(' ')[0]}! 💙
            </h1>
            <div className="text-4xl animate-wiggle ml-2">🌸</div>
          </div>
          <p className="text-lg text-blue-600 font-medium">
            How are you feeling today?
          </p>
          <p className="text-blue-500">
            {format(new Date(), 'EEEE, MMMM do, yyyy')}
          </p>
          <div className="flex justify-center mt-2 space-x-2">
            <span className="text-2xl animate-bounce-gentle">🦋</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>✨</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>💫</span>
          </div>
        </div>

        {/* Today's Mood Status */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 mb-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-blue-200 text-2xl animate-sparkle">✨</div>
          <div className="absolute bottom-4 left-4 text-pink-200 text-xl animate-sparkle" style={{ animationDelay: '1s' }}>💕</div>
          
          {todaysEntry ? (
            <div className="text-center relative z-10">
              <div className="text-6xl mb-4 animate-pulse-soft">{todaysEntry.moodEmoji}</div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                You're feeling {todaysEntry.mood}
              </h3>
              {todaysEntry.notes && (
                <div className="bg-blue-50/80 rounded-2xl p-4 mb-4 border border-blue-100">
                  <p className="text-blue-700 italic">"{todaysEntry.notes}"</p>
                </div>
              )}
              <button
                onClick={() => navigate('/app/log-mood')}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 flex items-center justify-center mx-auto space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>Update today's mood</span>
              </button>
            </div>
          ) : (
            <div className="text-center relative z-10">
              <div className="text-6xl mb-4 animate-bounce-gentle">🤔</div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Ready to check in with yourself?
              </h3>
              <div className="text-lg text-blue-500 mb-6">Let's capture this moment together! 💙</div>
              <button
                onClick={() => navigate('/app/log-mood')}
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto group"
              >
                <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Log Your Mood</span>
                <Heart className="w-4 h-4 animate-pulse-soft" />
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <button
            onClick={() => navigate('/app/log-mood')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 text-blue-300 text-lg animate-sparkle">✨</div>
            <PlusCircle className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform group-hover:rotate-90 duration-300" />
            <h3 className="font-semibold text-lg">Log Mood</h3>
            <p className="text-blue-100 text-sm">Track how you're feeling</p>
          </button>

          <button
            onClick={() => navigate('/app/history')}
            className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 text-cyan-300 text-lg animate-sparkle" style={{ animationDelay: '0.5s' }}>💫</div>
            <Calendar className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-semibold text-lg">View History</h3>
            <p className="text-cyan-100 text-sm">See your mood journey</p>
          </button>

          <button
            onClick={() => navigate('/app/insights')}
            className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden sm:col-span-2 lg:col-span-1"
          >
            <div className="absolute top-2 right-2 text-pink-300 text-lg animate-sparkle" style={{ animationDelay: '1s' }}>🌟</div>
            <TrendingUp className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-semibold text-lg">Insights</h3>
            <p className="text-pink-100 text-sm">Discover patterns</p>
          </button>
        </div>

        {/* Daily Quote */}
        <div className="bg-gradient-to-r from-blue-100/80 via-pink-50/80 to-cyan-100/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 mb-8 border border-blue-200/50 animate-slide-up shadow-lg relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-3xl animate-float">🌈</div>
          <div className="absolute bottom-4 right-4 text-2xl animate-float" style={{ animationDelay: '1s' }}>🦄</div>
          
          <div className="text-center relative z-10">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-white/80 rounded-full p-4 shadow-md">
                <Smile className="w-12 h-12 text-blue-500 animate-pulse-soft" />
              </div>
              {!loading && (
                <button
                  onClick={refreshQuote}
                  disabled={refreshing}
                  className="ml-4 bg-white/80 rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  title="Get new quote"
                >
                  <RefreshCw className={`w-5 h-5 text-blue-500 transition-transform duration-300 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              )}
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <p className="text-blue-500">Loading inspiring quote...</p>
              </div>
            ) : (
              <>
                <blockquote className="text-lg sm:text-xl font-medium bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent mb-2">
                  "{quote}"
                </blockquote>
                <p className="text-blue-600 font-medium">— {author}</p>
              </>
            )}
            
            <div className="flex justify-center mt-4 space-x-2">
              <span className="text-xl animate-bounce-gentle">🌸</span>
              <span className="text-xl animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>💙</span>
              <span className="text-xl animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>🌸</span>
            </div>
          </div>
        </div>

        {/* Recent Entries Preview */}
        {recentEntries.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden" style={{ animationDelay: '0.4s' }}>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-blue-200 text-xl animate-sparkle">💫</div>
            <div className="absolute bottom-4 left-4 text-pink-200 text-lg animate-sparkle" style={{ animationDelay: '1.5s' }}>✨</div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center space-x-2">
                <span>Recent Moods</span>
                <span className="text-xl animate-wiggle">🌺</span>
              </h2>
              <button
                onClick={() => navigate('/app/history')}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 flex items-center space-x-1"
              >
                <span>View All</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4 relative z-10">
              {recentEntries.map((entry, index) => (
                <div key={entry.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 rounded-2xl border border-blue-100/50 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl animate-pulse-soft">{entry.moodEmoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-blue-700 capitalize">{entry.mood}</span>
                      <span className="text-sm text-blue-500 bg-blue-100/50 px-2 py-1 rounded-full">
                        {format(new Date(entry.date), 'MMM d')}
                      </span>
                    </div>
                    {entry.notes && (
                      <p className="text-blue-600 text-sm mt-1 truncate">{entry.notes}</p>
                    )}
                  </div>
                  <div className="text-lg animate-sparkle" style={{ animationDelay: `${index * 0.2}s` }}>
                    {index === 0 ? '✨' : index === 1 ? '💫' : '🌟'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;