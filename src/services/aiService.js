import { searchProperties, getEvents } from './mockData';

/**
 * Step 1: RETRIEVAL - Use static hotel data from database
 */
const retrieveKnowledge = async (query) => {
    try {
        const lowerQuery = query.toLowerCase();

        // Static hotel data from your database
        const properties = [
            {
                id: '6968041c226fac2e6145c67c',
                name: 'VibeStay Goa - Beachside',
                city: 'Goa',
                price: 1499,
                rating: 4.9,
                vibe: 'social',
                vibeTag: 'Social',
                image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
                description: 'Beachside hostel with vibrant social atmosphere',
                keywords: ['Beach Access', 'Social Vibe']
            },
            {
                id: '6968041c226fac2e6145c67d',
                name: 'Manali Snow Retreat',
                city: 'Manali',
                price: 1899,
                rating: 4.8,
                vibe: 'chill',
                vibeTag: 'Chill',
                image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
                description: 'Cozy mountain retreat with stunning Himalayan views',
                keywords: ['Mountain View', 'Snow']
            },
            {
                id: '6968041c226fac2e6145c67f',
                name: 'Fort Kochi Homestay',
                city: 'Kochi',
                price: 850,
                rating: 4.8,
                vibe: 'cultural',
                vibeTag: 'Cultural',
                image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
                description: 'Authentic Kerala experience with backwater views',
                keywords: ['Backwater View', 'Cultural']
            },
            {
                id: '6968041c226fac2e6145c680',
                name: 'Munnar Tea Estate Stay',
                city: 'Munnar',
                price: 1100,
                rating: 4.6,
                vibe: 'nature',
                vibeTag: 'Quiet',
                image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
                description: 'Peaceful stay amidst lush tea plantations',
                keywords: ['Tea Gardens', 'Nature']
            },
            {
                id: '6968041c226fac2e6145c681',
                name: 'Agra Taj View Hostel',
                city: 'Agra',
                price: 699,
                rating: 4.5,
                vibe: 'cultural',
                vibeTag: 'Cultural',
                image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
                description: 'Budget-friendly stay with direct Taj Mahal views',
                keywords: ['Taj View', 'Budget']
            },
            {
                id: '6968041c226fac2e6145c67e',
                name: 'Heritage Villa Jaipur',
                city: 'Jaipur',
                price: 2299,
                rating: 4.7,
                vibe: 'heritage',
                vibeTag: 'Social',
                image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800',
                description: 'Experience royal Rajasthani culture',
                keywords: ['Heritage', 'Royal']
            }
        ];

        const events = [
            { id: 'e1', title: 'Kerala Cooking Class', city: 'Kochi', price: 250 },
            { id: 'e2', title: 'Sunset Yoga', city: 'Goa', price: 0 },
            { id: 'e3', title: 'Tea Plantation Trek', city: 'Munnar', price: 350 },
            { id: 'e4', title: 'Taj Sunrise Tour', city: 'Agra', price: 1200 },
            { id: 'e5', title: 'Heritage Walk', city: 'Jaipur', price: 500 }
        ];

        // Match properties and events
        const relevantStays = properties.filter(p =>
            lowerQuery.includes(p.city?.toLowerCase()) ||
            lowerQuery.includes(p.name?.toLowerCase()) ||
            lowerQuery.includes(p.vibe?.toLowerCase() || '') ||
            lowerQuery.includes('hotel') || lowerQuery.includes('stay')
        ).slice(0, 3);

        const relevantEvents = events.filter(e =>
            lowerQuery.includes(e.city?.toLowerCase()) ||
            lowerQuery.includes(e.title?.toLowerCase()) ||
            lowerQuery.includes('event') || lowerQuery.includes('activity')
        ).slice(0, 2);

        return { relevantStays, relevantEvents };
    } catch (error) {
        return { relevantStays: [], relevantEvents: [] };
    }
};

/**
 * Handle Voice/Text Query using RAG + Friendly Gemini
 */
export const handleVoiceQuery = async (query, context) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Knowledge Retrieval
    const knowledge = await retrieveKnowledge(query);

    // Call Gemini if API key exists
    if (apiKey) {
        try {
            return await callGeminiAI(query, { ...context, knowledge }, apiKey);
        } catch (error) {
            console.error("Gemini Failure:", error);
        }
    }

    // Fallback response using RAG data
    return createFallbackResponse(query, knowledge);
};

/**
 * Create fallback response using retrieved data
 */
function createFallbackResponse(query, knowledge) {
    const lowerQuery = query.toLowerCase();
    
    // Hotel/Stay queries
    if (lowerQuery.includes('hotel') || lowerQuery.includes('stay') || lowerQuery.includes('accommodation')) {
        if (knowledge.relevantStays.length > 0) {
            const stay = knowledge.relevantStays[0];
            return {
                speechText: `I found some great stays for you! ${stay.name} in ${stay.city} is perfect - it's ${stay.description} and costs ₹${stay.price} per night. Check out the options below!`,
                cards: [{ type: 'STAY_LIST', title: 'Perfect Stays for You', data: knowledge.relevantStays }]
            };
        }
    }
    
    // Event/Activity queries
    if (lowerQuery.includes('event') || lowerQuery.includes('activity') || lowerQuery.includes('do')) {
        if (knowledge.relevantEvents.length > 0) {
            const event = knowledge.relevantEvents[0];
            return {
                speechText: `I've got some amazing activities for you! ${event.title} in ${event.city} sounds perfect. ${event.price === 0 ? "It's free!" : `It costs ₹${event.price}.`}`,
                cards: [{ type: 'EVENT_LIST', title: 'Fun Activities', data: knowledge.relevantEvents }]
            };
        }
    }
    
    // City-specific queries
    const cities = ['goa', 'kochi', 'munnar', 'agra', 'jaipur', 'manali'];
    const mentionedCity = cities.find(city => lowerQuery.includes(city));
    
    if (mentionedCity && knowledge.relevantStays.length > 0) {
        const cityStays = knowledge.relevantStays.filter(s => s.city.toLowerCase() === mentionedCity);
        if (cityStays.length > 0) {
            return {
                speechText: `${mentionedCity.charAt(0).toUpperCase() + mentionedCity.slice(1)} is amazing! I've got ${cityStays.length} perfect ${cityStays.length === 1 ? 'stay' : 'stays'} for you. Check them out!`,
                cards: [{ type: 'STAY_LIST', title: `Best Stays in ${mentionedCity.charAt(0).toUpperCase() + mentionedCity.slice(1)}`, data: cityStays }]
            };
        }
    }
    
    // General travel queries
    if (lowerQuery.includes('travel') || lowerQuery.includes('trip') || lowerQuery.includes('plan')) {
        return {
            speechText: "I'm your travel buddy! I can help you find amazing stays in Goa, Kochi, Munnar, Agra, Jaipur, and Manali. Just ask me about hotels, activities, or any specific city you want to explore!",
            cards: knowledge.relevantStays.length > 0 ? [{ type: 'STAY_LIST', title: 'Popular Destinations', data: knowledge.relevantStays }] : []
        };
    }
    
    // Default response
    return {
        speechText: "Hey there! I'm your VibeStay travel buddy! Ask me about hotels in Goa, activities in Munnar, or planning your perfect trip. I've got all the best recommendations for you!",
        cards: knowledge.relevantStays.length > 0 ? [{ type: 'STAY_LIST', title: 'Featured Stays', data: knowledge.relevantStays.slice(0, 3) }] : []
    };
}

/**
 * Robust Gemini Integration
 */
async function callGeminiAI(query, context, apiKey) {
    const { knowledge, language, history = [] } = context;
    const model = import.meta.env.VITE_AI_MODEL || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const knowledgeStr = knowledge && (knowledge.relevantStays.length || knowledge.relevantEvents.length)
        ? `REAL-TIME DATA: ${JSON.stringify(knowledge)}`
        : "No specific records found in VibeStay's database for this query yet.";

    const systemPrompt = `
    Role: You are "Travel Buddy", the world's most friendly and helpful local travel guide.
    Vibe: Energetic, warm, and like a best friend.
    Language: Reply in ${language || 'English'}.
    Knowledge: ${knowledgeStr}
    
    Instructions:
    1. Reply to the user's latest query as a friendly conversationalist.
    2. If there are hotels/events in the DATA above, mention them by name.
    3. If not, use your general travel knowledge to name REAL places/routes.
    4. Respond ONLY in valid JSON format. No markdown blocks.

    JSON Response Structure:
    {
      "speechText": "Your direct and friendly answer.",
      "action": "SHOW_STAYS" (optional)
    }
    `;

    // Simple history construction to avoid sequence errors
    // We only send the last few messages for context
    const recentHistory = history.slice(-4).map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
    }));

    // Ensure alternating sequence starting with user
    const contents = [];
    recentHistory.forEach((item, idx) => {
        if (idx === 0 && item.role !== 'user') return;
        if (contents.length > 0 && contents[contents.length - 1].role === item.role) return;
        contents.push(item);
    });

    // Final user message
    const userMsg = {
        role: "user",
        parts: [{ text: `${systemPrompt}\n\nUSER: ${query}` }]
    };

    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
        contents.pop(); // Remove trailing user to allow new user msg
    }
    contents.push(userMsg);

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    let text = data.candidates[0].content.parts[0].text;

    // Attempt to extract JSON if Gemini includes extra text
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    let jsonText = jsonMatch ? jsonMatch[0] : text;

    // Clean up markdown markers
    jsonText = jsonText.replace(/```json/g, "").replace(/```/g, "").trim();

    let parsed;
    try {
        parsed = JSON.parse(jsonText);
    } catch (e) {
        console.error("JSON Parse Error. Raw Text:", text);
        // Fallback: If AI just gave text, wrap it as speechText
        parsed = { speechText: text.replace(/\{.*\}/, '').trim(), action: "NONE" };
    }

    // Attach UI cards based on RAG knowledge
    const cards = [];
    if (knowledge.relevantStays.length > 0) {
        cards.push({ type: 'STAY_LIST', title: 'Top VibeStay Picks', data: knowledge.relevantStays });
    }
    if (knowledge.relevantEvents.length > 0 && (query.toLowerCase().includes('event') || query.toLowerCase().includes('do'))) {
        cards.push({ type: 'EVENT_LIST', title: 'Events Near You', data: knowledge.relevantEvents });
    }

    return {
        speechText: parsed.speechText || "I've got some great info for you!",
        cards
    };
}
