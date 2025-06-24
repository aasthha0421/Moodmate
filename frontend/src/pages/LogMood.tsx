import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMood } from '../context/MoodContext';
import { format } from 'date-fns';
import { Save, ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { createMoodEntry } from '../api/moodApi';
import { toast } from 'react-hot-toast';

interface MoodOption {
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
}

const moods: MoodOption[] = [
  { name: 'happy', emoji: '😊', color: 'from-blue-400 to-cyan-400', bgColor: 'bg-blue-50' },
  { name: 'excited', emoji: '🤩', color: 'from-pink-400 to-pink-500', bgColor: 'bg-pink-50' },
  { name: 'calm', emoji: '😌', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
  { name: 'grateful', emoji: '🙏', color: 'from-cyan-400 to-cyan-500', bgColor: 'bg-cyan-50' },
  { name: 'loved', emoji: '🥰', color: 'from-pink-400 to-pink-500', bgColor: 'bg-pink-50' },
  { name: 'neutral', emoji: '😐', color: 'from-blue-300 to-blue-400', bgColor: 'bg-blue-50' },
  { name: 'tired', emoji: '😴', color: 'from-blue-400 to-blue-500', bgColor: 'bg-blue-50' },
  { name: 'stressed', emoji: '😰', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
  { name: 'anxious', emoji: '😟', color: 'from-blue-600 to-cyan-600', bgColor: 'bg-blue-50' },
  { name: 'sad', emoji: '😢', color: 'from-blue-500 to-blue-700', bgColor: 'bg-blue-50' },
  { name: 'angry', emoji: '😠', color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50' },
  { name: 'lonely', emoji: '😔', color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-50' },
];

const LogMood: React.FC = () => {
  const navigate = useNavigate();
  const { getTodaysEntry } = useMood();
  const todaysEntry = getTodaysEntry();

  const [selectedMood, setSelectedMood] = useState(todaysEntry?.mood || '');
  const [intensity, setIntensity] = useState(todaysEntry?.intensity || 5);
  const [notes, setNotes] = useState(todaysEntry?.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) {
      toast.error('Please select a mood.');
      return;
    }

    setIsSubmitting(true);

    const selectedMoodData = moods.find((m) => m.name === selectedMood);

    try {
      await createMoodEntry({
        date: format(new Date(), 'yyyy-MM-dd'),
        mood: selectedMood,
        moodEmoji: selectedMoodData?.emoji || '😊',
        intensity,
        notes: notes.trim() || undefined,
      });

      toast.success(todaysEntry ? 'Mood updated!' : 'Mood saved successfully!');
      navigate('/app/home');
    } catch (error) {
      console.error('Error adding mood:', error);
      toast.error('Error saving mood. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="text-3xl animate-wiggle mr-2">🌸</div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                How are you feeling?
              </h1>
              <div className="text-3xl animate-wiggle ml-2">🌸</div>
            </div>
            <p className="text-lg text-blue-600 font-medium">
              {format(new Date(), 'EEEE, MMMM do, yyyy')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Mood Selection */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 flex items-center space-x-2">
              <span>Select your mood</span>
              <span className="text-xl animate-wiggle">🦋</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  type="button"
                  onClick={() => setSelectedMood(mood.name)}
                  aria-pressed={selectedMood === mood.name}
                  aria-label={`Select ${mood.name} mood`}
                  className={`p-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    selectedMood === mood.name
                      ? `bg-gradient-to-br ${mood.color} text-white shadow-xl scale-105 border-2 border-white`
                      : `${mood.bgColor} hover:bg-blue-100 text-blue-700 border border-blue-200/50`
                  }`}
                >
                  {selectedMood === mood.name && (
                    <div className="absolute top-1 right-1 text-white text-xs animate-sparkle">✨</div>
                  )}
                  <div className="text-3xl mb-2 animate-pulse-soft">{mood.emoji}</div>
                  <div className="text-sm font-medium capitalize">{mood.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity Slider */}
          {selectedMood && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 flex items-center space-x-2">
                <span>How intense is this feeling?</span>
                <span className="text-xl animate-wiggle">💙</span>
              </h2>
              <div className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-blue-600">
                  <span className="bg-blue-50 px-3 py-1 rounded-full">Mild (1)</span>
                  <span className="font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded-full flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>Level {intensity}</span>
                  </span>
                  <span className="bg-blue-50 px-3 py-1 rounded-full">Intense (10)</span>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 animate-slide-up relative overflow-hidden">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 flex items-center space-x-2">
              <span>What's on your mind?</span>
              <span className="text-xl animate-wiggle">🌺</span>
              <span className="text-sm font-normal text-blue-400">(Optional)</span>
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share your thoughts or anything you'd like to remember..."
              className="w-full h-32 p-4 border-2 border-blue-200/50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50/30 text-blue-700 placeholder-blue-400"
            />
          </div>

          {/* Submit Button */}
          <div className="pb-8">
            <button
              type="submit"
              disabled={!selectedMood || isSubmitting}
              className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden ${
                selectedMood && !isSubmitting
                  ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white hover:shadow-xl hover:scale-105'
                  : 'bg-blue-200 text-blue-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{todaysEntry ? 'Update' : 'Save'} Mood Entry</span>
                  <Sparkles className="w-4 h-4 animate-pulse-soft" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #06b6d4);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #06b6d4);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
};

export default LogMood;
