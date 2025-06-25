export async function createMoodEntry(entry: {
  date: string;
  mood: string;
  moodEmoji: string;
  intensity: number;
  notes?: string;
}) {
  const token = localStorage.getItem('token'); // Or wherever you store the token after login
const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${API_URL}/api/mood/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // <-- Add this line
    },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create mood entry');
  }

  return await response.json();
}
export async function getAllMoods() {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/mood`);
  if (!response.ok) {
    throw new Error('Failed to fetch moods');
  }
  return await response.json();
}
export async function deleteMoodEntry(id: string) {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/mood/delete/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete mood entry');
  }

  return await response.json();
}