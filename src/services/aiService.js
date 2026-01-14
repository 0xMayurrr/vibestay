import { searchProperties, getEvents } from './mockData';

/**
 * Handle Voice/Text Query using Gemini AI
 */
export const handleVoiceQuery = async (query, context) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const lowerQuery = query.toLowerCase();
    const role = context?.role || 'traveler';

    // If API Key is provided, use Gemini
    if (apiKey && apiKey !== 'your_api_key_here') {
        try {
            return await callGeminiAI(query, context, apiKey);
        } catch (error) {
            console.error("Gemini AI API Error, falling back to mock:", error);
        }
    }

    // --- FALLBACK / MOCK LOGIC (If API fails or key is missing) ---
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (role === 'host' && lowerQuery.includes('request')) {
        return {
            speechText: "You have a pending request from Arjun for this weekend.",
            cards: [{ type: 'REQUEST_LIST', title: 'Pending Requests', data: [{ id: 101, name: 'Arjun M.', vibes: 'Social', dates: 'Jan 18-20', action: 'Approve' }] }]
        };
    }

    const results = await searchProperties({ city: context?.city || 'Goa', budgetMax: 2000 });
    return {
        speechText: `I found some great places in ${context?.city || 'Goa'}. The top pick is ${results[0]?.name}.`,
        cards: [{ type: 'STAY_LIST', title: 'Top Recommendations', data: results.slice(0, 2) }]
    };
};

/**
 * Real Gemini Integration
 */
async function callGeminiAI(query, context, apiKey) {
    // Using 'gemini-1.5-flash' as default, but allowing overrides
    const model = import.meta.env.VITE_AI_MODEL || 'gemini-1.5-flash';
    // Switching to v1 as it is more stable for general availability models
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

    const systemPrompt = `
    You are "Travel Buddy", the exclusive AI assistant for VibeStay. 
    VibeStay is a social travel platform for travelers, hosts, and event organizers.
    
    Current Role: ${context.role}.
    Current City: ${context.city}.

    Your tone: Friendly, adventurous, and efficient.
    CRITICAL: Never mention that you are an AI model, Gemini, or Google. You are "Travel Buddy".

    Respond ONLY in strictly valid JSON format.
    JSON Structure:
    {
        "speechText": "Your friendly voice-optimized response",
        "action": "ACTION_TYPE",
        "actionData": { ... }
    }

    Actions you can perform:
    1. "SHOW_STAYS": Finding hostels/stays. Data: {"city": "City", "mood": "Social/Chill"}
    2. "SHOW_MAP": Routes/Directions. Data: {"destination": "Place"}
    3. "SHOW_REQUESTS": For hosts to manage bookings.
    4. "SHOW_EVENTS": Finding nearby parties/tours.
    5. "STATS": For organizers checking revenue.
    6. "NONE": General conversation.
    `;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: `${systemPrompt}\n\nUser Query: ${query}` }]
            }],
            generationConfig: {
                response_mime_type: "application/json",
            }
        })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Gemini API Full Error:", errorBody);
        throw new Error(`Gemini API error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.candidates || result.candidates.length === 0) {
        throw new Error("Gemini returned no candidates. This could be due to safety filters.");
    }

    let textResponse = result.candidates[0].content.parts[0].text;

    // Sometimes Gemini wraps JSON in markdown blocks - we need to clean it
    textResponse = textResponse.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

    let aiResponse;
    try {
        aiResponse = JSON.parse(textResponse);
    } catch (e) {
        console.error("Failed to parse AI response:", textResponse);
        // Fallback to a simple response if JSON parsing fails
        aiResponse = {
            speechText: textResponse.substring(0, 200),
            action: "NONE"
        };
    }

    // Map Gemini JSON to VibeStay UI Cards
    let finalCards = [];

    if (aiResponse.action === 'SHOW_STAYS') {
        const stays = await searchProperties({
            city: aiResponse.actionData.city || context.city,
            mood: aiResponse.actionData.mood
        });
        finalCards.push({ type: 'STAY_LIST', title: 'Top Stays for You', data: stays.slice(0, 3) });
    }
    else if (aiResponse.action === 'SHOW_MAP') {
        finalCards.push({
            type: 'ROUTE',
            title: 'Directions',
            subtitle: aiResponse.actionData.eta || '15 mins',
            description: `Route to ${aiResponse.actionData.destination || 'your stay'}`,
            actionLabel: 'Open Google Maps'
        });
    }
    else if (aiResponse.action === 'SHOW_REQUESTS') {
        finalCards.push({
            type: 'REQUEST_LIST',
            title: 'Pending Approvals',
            data: [
                { id: 201, name: 'Siddharth R.', vibes: 'Social, Musician', dates: 'Jan 20-22', action: 'Approve' },
                { id: 202, name: 'Elena W.', vibes: 'Quiet, Digital Nomad', dates: 'Jan 21-25', action: 'Approve' }
            ]
        });
    }
    else if (aiResponse.action === 'SHOW_EVENTS' || query.toLowerCase().includes('event')) {
        const events = await getEvents();
        finalCards.push({ type: 'EVENT_LIST', title: 'Nearby VibeCheck', data: events.slice(0, 2) });
    }
    else if (aiResponse.action === 'STATS') {
        finalCards.push({
            type: 'STATS_CARD',
            title: 'Event Performance',
            stats: [
                { label: 'Tickets Sold', value: '42/50' },
                { label: 'Revenue', value: '₹12,600' }
            ]
        });
    }

    return {
        speechText: aiResponse.speechText,
        cards: finalCards
    };
}
