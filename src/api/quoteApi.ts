// src/api/quoteApi.ts
export interface Quote {
  content: string;
  author: string;
  id?: string;
}

// Fallback quotes for when API fails
const fallbackQuotes: Quote[] = [
  { content: "Every emotion is temporary, but your growth is permanent.", author: "Unknown" },
  { content: "Your feelings are valid, and your journey matters.", author: "Unknown" },
  { content: "Small steps in self-awareness lead to big changes.", author: "Unknown" },
  { content: "Today is a new opportunity to understand yourself better.", author: "Unknown" },
  { content: "Be kind to yourself - you're doing better than you think.", author: "Unknown" },
  { content: "You're a work of art in progress, beautiful and unique.", author: "Unknown" },
  { content: "Your emotions are like waves - they come and go.", author: "Unknown" },
  { content: "Even the stars take millions of years to shine. You are allowed to take your time too.", author: "Unknown" },
  { content: "Progress, not perfection, is the goal.", author: "Unknown" },
  { content: "You have survived 100% of your difficult days so far.", author: "Unknown" },
  { content: "Be patient with yourself. Nothing in nature blooms all year.", author: "Unknown" },
  { content: "Your mental health is just as important as your physical health.", author: "Unknown" },
  { content: "It's okay to not be okay. It's not okay to stay that way.", author: "Unknown" },
  { content: "You are stronger than you know, braver than you feel, and more loved than you think.", author: "Unknown" },
  { content: "Healing isn't linear. Some days will be harder than others.", author: "Unknown" },
];

// Simple function to get a random quote from multiple APIs
export const getRandomQuote = async (): Promise<Quote> => {
  // Try different APIs in order
  const apiAttempts = [
    // API 1: Quotable
    async (): Promise<Quote> => {
      const response = await fetch('https://api.quotable.io/random?minLength=30&maxLength=200');
      if (!response.ok) throw new Error('Quotable API failed');
      const data = await response.json();
      return { content: data.content, author: data.author, id: data._id };
    },
    
    // API 2: QuoteGarden
    async (): Promise<Quote> => {
      const response = await fetch('https://quote-garden.herokuapp.com/api/v3/quotes/random');
      if (!response.ok) throw new Error('Quote Garden API failed');
      const data = await response.json();
      return { 
        content: data.data.quoteText.replace(/"/g, ''), 
        author: data.data.quoteAuthor, 
        id: data.data._id 
      };
    },
    
    // API 3: Zen Quotes
    async (): Promise<Quote> => {
      const response = await fetch('https://zenquotes.io/api/random');
      if (!response.ok) throw new Error('ZenQuotes API failed');
      const data = await response.json();
      return { content: data[0].q, author: data[0].a, id: Date.now().toString() };
    }
  ];

  // Try each API with a timeout
  for (const apiCall of apiAttempts) {
    try {
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('API timeout')), 5000)
      );
      
      const quote = await Promise.race([apiCall(), timeoutPromise]);
      
      // Validate the quote
      if (quote.content && quote.author && quote.content.length > 10) {
        return quote;
      }
    } catch (error) {
      console.log('API attempt failed:', error);
      // Continue to next API
    }
  }

  // If all APIs fail, return a random fallback quote
  console.log('All APIs failed, using fallback quote');
  return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
};