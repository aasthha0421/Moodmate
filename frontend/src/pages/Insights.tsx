import React, { useMemo } from 'react';
import { useMood } from '../context/MoodContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Heart, Target, Sparkles } from 'lucide-react';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

const Insights: React.FC = () => {
  const { entries, getEntriesForRange } = useMood();
  const last30Days = getEntriesForRange(30);

  const moodData = useMemo(() => {
    const moodCounts = last30Days.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood: mood.charAt(0).toUpperCase() + mood.slice(1),
      count,
      percentage: Math.round((count / last30Days.length) * 100)
    }));
  }, [last30Days]);

  const weeklyTrend = useMemo(() => {
    const last7Weeks = [];
    for (let i = 6; i >= 0; i--) {
      const weekStart = startOfWeek(subDays(new Date(), i * 7));
      const weekEnd = endOfWeek(weekStart);
      const weekEntries = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= weekStart && entryDate <= weekEnd;
      });
      
      const avgIntensity = weekEntries.length > 0 
        ? Math.round((weekEntries.reduce((sum, entry) => sum + entry.intensity, 0) / weekEntries.length) * 10) / 10
        : 0;

      last7Weeks.push({
        week: format(weekStart, 'MMM d'),
        intensity: avgIntensity,
        entries: weekEntries.length
      });
    }
    return last7Weeks;
  }, [entries]);

  const dailyPattern = useMemo(() => {
    const dayOfWeekCounts = entries.reduce((acc, entry) => {
      const dayOfWeek = format(new Date(entry.date), 'EEEE');
      if (!acc[dayOfWeek]) {
        acc[dayOfWeek] = { total: 0, count: 0 };
      }
      acc[dayOfWeek].total += entry.intensity;
      acc[dayOfWeek].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return daysOfWeek.map(day => ({
      day: day.slice(0, 3),
      avgIntensity: dayOfWeekCounts[day] 
        ? Math.round((dayOfWeekCounts[day].total / dayOfWeekCounts[day].count) * 10) / 10
        : 0
    }));
  }, [entries]);

  const pieColors = ['#3b82f6', '#06b6d4', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  const insights = useMemo(() => {
    const insights = [];
    
    if (moodData.length > 0) {
      const dominantMood = moodData.reduce((a, b) => a.count > b.count ? a : b);
      insights.push({
        title: 'Dominant Emotion',
        description: `You've been feeling ${dominantMood.mood.toLowerCase()} most often (${dominantMood.percentage}% of the time) 💙`,
        icon: '🎯',
        color: 'from-blue-500 to-blue-600'
      });
    }

    if (last30Days.length >= 7) {
      const recentWeek = last30Days.slice(0, 7);
      const previousWeek = last30Days.slice(7, 14);
      
      if (previousWeek.length > 0) {
        const recentAvg = recentWeek.reduce((sum, entry) => sum + entry.intensity, 0) / recentWeek.length;
        const previousAvg = previousWeek.reduce((sum, entry) => sum + entry.intensity, 0) / previousWeek.length;
        const trend = recentAvg > previousAvg ? 'improving' : recentAvg < previousAvg ? 'declining' : 'stable';
        
        insights.push({
          title: 'Weekly Trend',
          description: `Your mood intensity is ${trend} compared to last week ✨`,
          icon: trend === 'improving' ? '📈' : trend === 'declining' ? '📉' : '➡️',
          color: 'from-cyan-500 to-cyan-600'
        });
      }
    }

    if (dailyPattern.length > 0) {
      const bestDay = dailyPattern.reduce((a, b) => a.avgIntensity > b.avgIntensity ? a : b);
      if (bestDay.avgIntensity > 0) {
        const dayName = bestDay.day === 'Mon' ? 'Monday' : bestDay.day === 'Tue' ? 'Tuesday' : bestDay.day === 'Wed' ? 'Wednesday' : bestDay.day === 'Thu' ? 'Thursday' : bestDay.day === 'Fri' ? 'Friday' : bestDay.day === 'Sat' ? 'Saturday' : 'Sunday';
        insights.push({
          title: 'Best Day of Week',
          description: `You tend to feel best on ${dayName}s 🌟`,
          icon: '🌟',
          color: 'from-pink-500 to-pink-600'
        });
      }
    }

    return insights;
  }, [moodData, last30Days, dailyPattern]);

  if (entries.length === 0) {
    return (
      <div className="min-h-screen pt-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="text-6xl mb-4 animate-bounce-gentle">📊</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            No Insights Yet
          </h1>
          <p className="text-lg text-blue-600 mb-8">
            Start logging your moods to see beautiful insights and patterns! 💙
          </p>
          <button
            onClick={() => window.location.href = '/app/log-mood'}
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            <span>Log Your First Mood</span>
            <Heart className="w-4 h-4 animate-pulse-soft" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="text-3xl animate-wiggle mr-2">🌸</div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Your Mood Insights
            </h1>
            <div className="text-3xl animate-wiggle ml-2">🌸</div>
          </div>
          <p className="text-lg text-blue-600 font-medium">
            Discover patterns and trends in your emotional journey
          </p>
          <div className="flex justify-center mt-2 space-x-2">
            <span className="text-xl animate-bounce-gentle">📊</span>
            <span className="text-xl animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>✨</span>
            <span className="text-xl animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>💫</span>
          </div>
        </div>

        {/* Key Insights Cards */}
        {insights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {insights.map((insight, index) => (
              <div
                key={insight.title}
                className={`bg-gradient-to-br ${insight.color} text-white p-6 rounded-2xl shadow-lg animate-slide-up relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-2 right-2 text-white/30 text-xl animate-sparkle">✨</div>
                <div className="text-3xl mb-3">{insight.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{insight.title}</h3>
                <p className="text-white/90 text-sm">{insight.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Mood Distribution */}
          {moodData.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden">
              <div className="absolute top-4 right-4 text-blue-200 text-xl animate-sparkle">💫</div>
              <div className="flex items-center space-x-2 mb-6 relative z-10">
                <Heart className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Mood Distribution
                </h2>
              </div>
              <div className="h-64 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ mood, percentage }) => `${mood} (${percentage}%)`}
                    >
                      {moodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Weekly Trend */}
          {weeklyTrend.some(w => w.intensity > 0) && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden">
              <div className="absolute top-4 right-4 text-cyan-200 text-xl animate-sparkle">🌟</div>
              <div className="flex items-center space-x-2 mb-6 relative z-10">
                <TrendingUp className="w-6 h-6 text-cyan-500" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Weekly Trend
                </h2>
              </div>
              <div className="h-64 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                    <XAxis dataKey="week" stroke="#0ea5e9" />
                    <YAxis domain={[0, 10]} stroke="#0ea5e9" />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="intensity" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Daily Pattern */}
          {dailyPattern.some(d => d.avgIntensity > 0) && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden">
              <div className="absolute top-4 right-4 text-pink-200 text-xl animate-sparkle">✨</div>
              <div className="flex items-center space-x-2 mb-6 relative z-10">
                <Calendar className="w-6 h-6 text-pink-500" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Day of Week Pattern
                </h2>
              </div>
              <div className="h-64 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyPattern}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                    <XAxis dataKey="day" stroke="#0ea5e9" />
                    <YAxis domain={[0, 10]} stroke="#0ea5e9" />
                    <Tooltip />
                    <Bar dataKey="avgIntensity" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Mood Frequency */}
          {moodData.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden">
              <div className="absolute top-4 right-4 text-blue-200 text-xl animate-sparkle">💕</div>
              <div className="flex items-center space-x-2 mb-6 relative z-10">
                <Target className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Mood Frequency
                </h2>
              </div>
              <div className="h-64 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moodData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                    <XAxis type="number" stroke="#0ea5e9" />
                    <YAxis type="category" dataKey="mood" width={80} stroke="#0ea5e9" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 mb-8 animate-slide-up relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-blue-200 text-2xl animate-sparkle">🌟</div>
          <div className="absolute bottom-4 left-4 text-pink-200 text-xl animate-sparkle" style={{ animationDelay: '1s' }}>💕</div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center space-x-2">
              <span>Your Journey Summary</span>
              <span className="text-xl animate-wiggle">🦋</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center bg-blue-50/80 rounded-2xl p-4 border border-blue-200/50">
                <div className="text-3xl font-bold text-blue-600">{entries.length}</div>
                <div className="text-blue-500 font-medium">Total Entries</div>
              </div>
              <div className="text-center bg-cyan-50/80 rounded-2xl p-4 border border-cyan-200/50">
                <div className="text-3xl font-bold text-cyan-600">
                  {entries.length > 0 ? Math.round(entries.reduce((sum, entry) => sum + entry.intensity, 0) / entries.length * 10) / 10 : 0}
                </div>
                <div className="text-cyan-500 font-medium">Average Intensity</div>
              </div>
              <div className="text-center bg-pink-50/80 rounded-2xl p-4 border border-pink-200/50">
                <div className="text-3xl font-bold text-pink-600">
                  {[...new Set(entries.map(entry => entry.mood))].length}
                </div>
                <div className="text-pink-500 font-medium">Different Moods</div>
              </div>
              <div className="text-center bg-blue-50/80 rounded-2xl p-4 border border-blue-200/50">
                <div className="text-3xl font-bold text-blue-600">
                  {last30Days.length}
                </div>
                <div className="text-blue-500 font-medium">Last 30 Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;