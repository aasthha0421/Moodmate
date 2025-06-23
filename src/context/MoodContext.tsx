import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

export interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  moodEmoji: string;
  intensity: number;
  notes?: string;
  timestamp: number;
}

interface MoodContextType {
  entries: MoodEntry[];
  addEntry: (entry: Omit<MoodEntry, 'id' | 'timestamp'>) => void;
  getEntriesForRange: (days: number) => MoodEntry[];
  getTodaysEntry: () => MoodEntry | undefined;
  fetchEntriesFromDB: () => void;
  deleteEntry: (entryId: string) => Promise<void>;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  // Load from localStorage on first render
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodmate-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('moodmate-entries', JSON.stringify(entries));
  }, [entries]);

  // ✅ Save entry to BOTH localStorage & MongoDB
  const addEntry = async (entry: Omit<MoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    // Remove any existing entry for today
    const today = format(new Date(), 'yyyy-MM-dd');
    const filteredEntries = entries.filter(e => e.date !== today);

    setEntries([newEntry, ...filteredEntries]);

    try {
      // ✅ Save to MongoDB backend
      const response = await fetch('http://localhost:5000/api/mood/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: newEntry.mood,
          description: newEntry.notes || '',
          date: newEntry.date,
        }),
      });

      if (!response.ok) {
        console.error("❌ Failed to save to MongoDB");
      } else {
        console.log("✅ Mood saved to MongoDB successfully");
      }
    } catch (error) {
      console.error("❌ Error saving mood to MongoDB:", error);
    }
  };

  // ✅ Delete entry from BOTH localStorage & MongoDB
  const deleteEntry = async (entryId: string) => {
    try {
      // Remove from local state first
      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));

      // Delete from MongoDB backend
      const response = await fetch(`http://localhost:5000/api/mood/${entryId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.error("❌ Failed to delete from MongoDB");
        // Optionally revert local state if backend fails
        // You might want to refetch entries from DB or show error
      } else {
        console.log("✅ Mood deleted from MongoDB successfully");
      }
    } catch (error) {
      console.error("❌ Error deleting mood from MongoDB:", error);
      // Optionally revert local state if there's an error
    }
  };

  // ✅ Fetch moods from MongoDB → use this for History Page
  const fetchEntriesFromDB = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mood');
      if (!response.ok) throw new Error('Failed to fetch moods from DB');

      const moodsFromDB = await response.json();

      // Convert to MoodEntry format (if needed)
      const formattedMoods: MoodEntry[] = moodsFromDB.map((mood: any) => ({
        id: mood._id,
        date: mood.date,
        mood: mood.mood,
        moodEmoji: '', // Add emoji if you want
        intensity: 5, // Placeholder or calculate based on mood
        notes: mood.description,
        timestamp: new Date(mood.date).getTime(),
      }));

      setEntries(formattedMoods);
      localStorage.setItem('moodmate-entries', JSON.stringify(formattedMoods));

      console.log("✅ Entries fetched from MongoDB");
    } catch (error) {
      console.error("❌ Error fetching moods from MongoDB:", error);
    }
  };

  const getEntriesForRange = (days: number) => {
    const cutoffDate = Date.now() - (days * 24 * 60 * 60 * 1000);
    return entries.filter(entry => entry.timestamp >= cutoffDate);
  };

  const getTodaysEntry = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return entries.find(entry => entry.date === today);
  };

  return (
    <MoodContext.Provider value={{ entries, addEntry, getEntriesForRange, getTodaysEntry, fetchEntriesFromDB, deleteEntry }}>
      {children}
    </MoodContext.Provider>
  );
};