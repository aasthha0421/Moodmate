export async function createMoodEntry(entry: {
  date: string;
  mood: string;
  moodEmoji: string;
  intensity: number;
  notes?: string;
}) {
  const token = localStorage.getItem('token'); // Or wherever you store the token after login

  const response = await fetch('http://localhost:5000/api/mood/add', {
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
  const response = await fetch('http://localhost:5000/api/mood');
  if (!response.ok) {
    throw new Error('Failed to fetch moods');
  }
  return await response.json();
}
export async function deleteMoodEntry(id: string) {
  const response = await fetch(`http://localhost:5000/api/mood/delete/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete mood entry');
  }

  return await response.json();
}