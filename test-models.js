const apiKey = "AIzaSyChGdIX6RJNsGhnm83PB1YrtLWF-JSkAXI";

async function testAll() {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        const geminis = data.models.filter(m => m.name.includes('gemini') && m.supportedGenerationMethods.includes('generateContent'));

        console.log("Found " + geminis.length + " Gemini models.");

        for (const model of geminis) {
            console.log("\nTesting " + model.name + "...");
            const testUrl = `https://generativelanguage.googleapis.com/v1beta/${model.name}:generateContent?key=${apiKey}`;
            const testRes = await fetch(testUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "Hi" }] }]
                })
            });
            const testData = await testRes.json();
            console.log("Status:", testRes.status);
            if (testRes.ok) {
                console.log("SUCCESS with " + model.name);
                break;
            } else {
                console.log("Error:", testData.error.message);
            }
        }
    } catch (e) {
        console.error("Failed:", e);
    }
}

testAll();
