const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                error: "Message is required."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite-preview",
            contents: `
You are answering a user's travel question for the AI Voyage Chauffeur website.

The user asked:
"${userMessage}"

Here is the destination data available in the website:

1. Great Wall of China
Country: China
Coordinates: 40.4319, 116.5704

2. Petra
Country: Jordan
Coordinates: 30.3285, 35.4444

3. Colosseum
Country: Italy
Coordinates: 41.8902, 12.4922

4. Chichen Itza
Country: Mexico
Coordinates: 20.6843, -88.5678

5. Machu Picchu
Country: Peru
Coordinates: -13.1631, -72.5450

6. Taj Mahal
Country: India
Coordinates: 27.1751, 78.0421

7. Christ the Redeemer
Country: Brazil
Coordinates: -22.9519, -43.2105

Use this destination data when relevant.

If the user asks which wonder is closest to a location, determine the closest destination using geographic distance when possible. Do not simply guess based on country.

If the user's location is not one of the destinations, clearly state that the answer is an approximate geographic comparison unless an exact route or distance has been calculated.

Give concise, useful travel answers.
`,
            config: {
                systemInstruction: `
You are the AI Travel Assistant for AI Voyage Chauffeur.

Help users explore the New Seven Wonders of the World.

The seven wonders are:
1. Great Wall of China
2. Petra
3. Colosseum
4. Chichen Itza
5. Machu Picchu
6. Taj Mahal
7. Christ the Redeemer

You can help with:
- Destination information
- History
- Travel planning
- Best times to visit
- Trip duration
- Sightseeing
- Travel tips
- Comparing destinations
- Basic itineraries

Give clear, useful and concise answers.

Do not claim that you have booked flights,
hotels, tickets, or other services.

If a question is unrelated to travel,
explain that you are the travel assistant
for AI Voyage Chauffeur.
`
            }
        });

        res.json({
            reply: response.text
        });

    } catch (error) {

        console.error("Gemini API Error:", error);

        res.status(500).json({
            error: "Unable to get a response from Gemini."
        });

    }

});

const server = app.listen(PORT, () => {
    console.log(`AI Voyage Chauffeur server running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
    console.error("Server error:", error);
});

process.on("exit", (code) => {
    console.log("Node process exiting with code:", code);
});