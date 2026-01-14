const apiKey = "AIzaSyChGdIX6RJNsGhnm83PB1YrtLWF-JSkAXI";

async function listModels() {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("Models:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Failed:", e);
    }
}

listModels();
