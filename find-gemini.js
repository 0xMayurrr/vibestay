const apiKey = "AIzaSyChGdIX6RJNsGhnm83PB1YrtLWF-JSkAXI";

async function findGemini() {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.models) {
            const geminis = data.models.filter(m => m.name.includes('gemini'));
            console.log("Found Gemini Models:", geminis.map(m => m.name));
        } else {
            console.log("No models found. Response:", JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error("Failed:", e);
    }
}

findGemini();
