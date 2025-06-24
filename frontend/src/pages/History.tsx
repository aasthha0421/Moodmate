import React, { useState, useEffect } from 'react';
import { useMood } from '../context/MoodContext';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { Calendar, Filter, Search, Sparkles, Heart, Trash2, X, AlertTriangle } from 'lucide-react';

const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; entryId: string | null }>({
    show: false,
    entryId: null
  });
  const { entries, fetchEntriesFromDB, deleteEntry } = useMood();

  useEffect(() => {
    fetchEntriesFromDB();
  }, []);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = !searchTerm || 
      entry.mood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.notes && entry.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = !filterMood || entry.mood === filterMood;
    
    return matchesSearch && matchesFilter;
  });

  const uniqueMoods = [...new Set(entries.map(entry => entry.mood))];

  const getDateLabel = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return 'bg-cyan-500';
    if (intensity <= 6) return 'bg-blue-500';
    if (intensity <= 8) return 'bg-blue-600';
    return 'bg-pink-500';
  };

  const getIntensityBg = (intensity: number) => {
    if (intensity <= 3) return 'bg-cyan-50 border-cyan-200';
    if (intensity <= 6) return 'bg-blue-50 border-blue-200';
    if (intensity <= 8) return 'bg-blue-100 border-blue-300';
    return 'bg-pink-50 border-pink-200';
  };

  const handleDeleteClick = (entryId: string) => {
    setDeleteConfirm({ show: true, entryId });
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirm.entryId) {
      try {
        await deleteEntry(deleteConfirm.entryId);
        setDeleteConfirm({ show: false, entryId: null });
        // Optionally show a success message
        console.log('Entry deleted successfully');
      } catch (error) {
        console.error('Failed to delete entry:', error);
        // Optionally show an error message
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, entryId: null });
  };

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="text-3xl animate-wiggle mr-2">🌸</div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Your Mood Journey
            </h1>
            <div className="text-3xl animate-wiggle ml-2">🌸</div>
          </div>
          <p className="text-lg text-blue-600 font-medium">
            Track your emotional patterns over time
          </p>
          <div className="flex justify-center mt-2 space-x-2">
            <span className="text-xl animate-bounce-gentle">🦋</span>
            <span className="text-xl animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>✨</span>
            <span className="text-xl animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>💫</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-blue-200 text-xl animate-sparkle">✨</div>
          <div className="absolute bottom-4 left-4 text-pink-200 text-lg animate-sparkle" style={{ animationDelay: '1s' }}>💕</div>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
              <input
                type="text"
                placeholder="Search moods or notes... 🔍"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-blue-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50/30 text-blue-700 placeholder-blue-400"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
              <select
                value={filterMood}
                onChange={(e) => setFilterMood(e.target.value)}
                className="pl-10 pr-8 py-3 border-2 border-blue-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-blue-50/30 text-blue-700 min-w-[150px]"
              >
                <option value="">All moods 💙</option>
                {uniqueMoods.map(mood => (
                  <option key={mood} value={mood} className="capitalize">
                    {mood}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg animate-slide-up relative overflow-hidden">
            <div className="absolute top-2 right-2 text-blue-200 text-lg animate-sparkle">✨</div>
            <Calendar className="w-8 h-8 mb-3" />
            <div className="text-2xl font-bold">{entries.length}</div>
            <div className="text-blue-100">Total Entries</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg animate-slide-up relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-2 right-2 text-cyan-200 text-lg animate-sparkle">💫</div>
            <div className="text-3xl mb-3">📊</div>
            <div className="text-2xl font-bold">{uniqueMoods.length}</div>
            <div className="text-cyan-100">Different Moods</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg animate-slide-up relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-2 right-2 text-pink-200 text-lg animate-sparkle">🌟</div>
            <div className="text-3xl mb-3">🔥</div>
            <div className="text-2xl font-bold">
              {entries.length > 0 ? Math.round(entries.reduce((sum, entry) => sum + entry.intensity, 0) / entries.length * 10) / 10 : 0}
            </div>
            <div className="text-pink-100">Avg. Intensity</div>
          </div>
        </div>

        {/* Entries List */}
        {filteredEntries.length > 0 ? (
          <div className="space-y-6 pb-8">
            {filteredEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 animate-slide-up relative overflow-hidden group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Decorative elements */}
                <div className="absolute top-4 right-12 text-blue-200 text-lg animate-sparkle" style={{ animationDelay: `${index * 0.2}s` }}>
                  {index % 3 === 0 ? '✨' : index % 3 === 1 ? '💫' : '🌟'}
                </div>
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(entry.id)}
                  className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="text-4xl animate-pulse-soft">{entry.moodEmoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div>
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent capitalize">
                          {entry.mood}
                        </h3>
                        <p className="text-blue-600 font-medium">{getDateLabel(entry.date)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-blue-500 font-medium">Intensity</div>
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getIntensityBg(entry.intensity)}`}>
                          <div className={`w-3 h-3 rounded-full ${getIntensityColor(entry.intensity)}`}></div>
                          <span className="text-sm font-semibold text-blue-700">{entry.intensity}/10</span>
                          <Heart className="w-3 h-3 text-blue-500" />
                        </div>
                      </div>
                    </div>
                    {entry.notes && (
                      <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 rounded-2xl p-4 mt-3 border border-blue-100/50">
                        <p className="text-blue-700 italic">"{entry.notes}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4 animate-bounce-gentle">📝</div>
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              {entries.length === 0 ? 'No entries yet' : 'No matching entries'}
            </h3>
            <p className="text-blue-600 mb-8">
              {entries.length === 0 
                ? "Start your journey by logging your first mood! 💙" 
                : "Try adjusting your search or filter criteria. ✨"
              }
            </p>
            {entries.length === 0 && (
              <button
                onClick={() => window.location.href = '/app/log-mood'}
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <Sparkles className="w-5 h-5" />
                <span>Log Your First Mood</span>
                <Heart className="w-4 h-4 animate-pulse-soft" />
              </button>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slide-up relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 text-red-200 text-lg animate-sparkle">⚠️</div>
              <div className="absolute bottom-4 left-4 text-blue-200 text-sm animate-sparkle" style={{ animationDelay: '0.5s' }}>💔</div>
              
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Entry?</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this mood entry? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleDeleteCancel}
                    className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-6 py-3 bg-red-500 text-white rounded-2xl font-semibold hover:bg-red-600 transition-all duration-200 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;