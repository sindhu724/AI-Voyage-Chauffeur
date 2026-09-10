// ==========================================
// WORLD WONDERS DATA
// ==========================================

const wonders = {

    greatWall: {
        name: "Great Wall of China",
        country: "China",
        location: "Northern China",
        latitude: 40.4319,
        longitude: 116.5704,

        description:
            "The Great Wall of China is a vast network of fortifications constructed and rebuilt across different periods of Chinese history.",

        history:
            "Different sections were built by various Chinese states and dynasties. Major surviving sections were constructed or strengthened during the Ming dynasty.",

        famousFor:
            "Its enormous scale, historical importance, mountain landscapes, and defensive architecture.",

        bestTime:
            "Spring and autumn generally offer comfortable temperatures and good conditions for walking.",

        duration:
            "3–5 hours",

        tips:
            "Wear comfortable shoes because many sections involve steep steps and uneven surfaces."
    },


    petra: {
        name: "Petra",
        country: "Jordan",
        location: "Ma'an Governorate, Jordan",
        latitude: 30.3285,
        longitude: 35.4444,

        description:
            "Petra is an ancient archaeological city famous for its monumental structures carved directly into rose-colored sandstone cliffs.",

        history:
            "Petra became an important trading center of the Nabataean Kingdom and later came under Roman influence.",

        famousFor:
            "Its rock-cut architecture, especially the famous Treasury, and its ancient trading history.",

        bestTime:
            "March to May and September to November generally provide more pleasant temperatures.",

        duration:
            "4–6 hours",

        tips:
            "Wear good walking shoes and carry water because exploring Petra involves substantial walking."
    },


    colosseum: {
        name: "Colosseum",
        country: "Italy",
        location: "Rome, Italy",
        latitude: 41.8902,
        longitude: 12.4922,

        description:
            "The Colosseum is an ancient Roman amphitheatre and one of the most recognizable monuments of the Roman Empire.",

        history:
            "Construction began under Emperor Vespasian around AD 70–72 and was completed under Emperor Titus around AD 80.",

        famousFor:
            "Its monumental Roman engineering, amphitheatre design, and role in ancient Roman public entertainment.",

        bestTime:
            "Spring and autumn are generally comfortable seasons for exploring Rome.",

        duration:
            "2–3 hours",

        tips:
            "Book tickets in advance and wear comfortable footwear for walking through the archaeological site."
    },


    chichenItza: {
        name: "Chichen Itza",
        country: "Mexico",
        location: "Yucatan Peninsula, Mexico",
        latitude: 20.6843,
        longitude: -88.5678,

        description:
            "Chichen Itza is an ancient Maya archaeological site known for its monumental architecture and cultural significance.",

        history:
            "The city developed over several centuries and became an important center of Maya civilization in the Yucatan region.",

        famousFor:
            "El Castillo pyramid, Maya architecture, astronomical associations, and historical importance.",

        bestTime:
            "November to April generally offers drier and more comfortable conditions.",

        duration:
            "3–4 hours",

        tips:
            "Carry water, use sun protection, and arrive early to avoid the hottest part of the day."
    },


    machuPicchu: {
        name: "Machu Picchu",
        country: "Peru",
        location: "Cusco Region, Peru",
        latitude: -13.1631,
        longitude: -72.5450,

        description:
            "Machu Picchu is an ancient Inca citadel located high in the Andes Mountains of Peru.",

        history:
            "The site is generally believed to have been built during the 15th century under the Inca ruler Pachacuti.",

        famousFor:
            "Its remarkable stone construction, mountain setting, terraces, and connection to Inca civilization.",

        bestTime:
            "The dry season, roughly May to October, is generally preferred for clearer conditions.",

        duration:
            "4–6 hours",

        tips:
            "Plan transportation and entry tickets in advance and be prepared for high altitude."
    },


    tajMahal: {
        name: "Taj Mahal",
        country: "India",
        location: "Agra, Uttar Pradesh, India",
        latitude: 27.1751,
        longitude: 78.0421,

        description:
            "The Taj Mahal is a magnificent white-marble mausoleum built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal.",

        history:
            "Construction began in 1632 and the main mausoleum was completed around 1638–1648. The complex was developed over several years with the work of thousands of artisans.",

        famousFor:
            "Its white marble architecture, intricate carvings, symmetrical gardens, and historical significance.",

        bestTime:
            "October to March is generally considered the most comfortable period to visit.",

        duration:
            "Around 2–3 hours",

        tips:
            "Visit early in the morning to avoid larger crowds and strong afternoon heat."
    },


    christRedeemer: {
        name: "Christ the Redeemer",
        country: "Brazil",
        location: "Rio de Janeiro, Brazil",
        latitude: -22.9519,
        longitude: -43.2105,

        description:
            "Christ the Redeemer is a monumental Art Deco statue overlooking Rio de Janeiro from the summit of Mount Corcovado.",

        history:
            "The statue was constructed between 1926 and 1931 and became one of Rio de Janeiro's most recognizable landmarks.",

        famousFor:
            "Its enormous scale, Art Deco design, panoramic views of Rio de Janeiro, and cultural significance.",

        bestTime:
            "Early morning or late afternoon can provide better light and help avoid peak crowds.",

        duration:
            "2–3 hours",

        tips:
            "Check weather conditions before visiting because clouds can significantly reduce visibility from the summit."
    }

};


// ==========================================
// MAP VARIABLE
// ==========================================

let destinationMap = null;


// ==========================================
// SHOW DESTINATION DETAILS
// ==========================================

function showDetails(wonderKey) {

    const wonder = wonders[wonderKey];

    if (!wonder) {
        return;
    }


    // Update destination name

    document.getElementById("wonderName").textContent =
        wonder.name;


    // Update destination information

    document.getElementById("wonderDescription").innerHTML = `

        <p>
            <strong>Country:</strong>
            ${wonder.country}
        </p>

        <p>
            <strong>Location:</strong>
            ${wonder.location}
        </p>

        <p>
            <strong>About:</strong>
            ${wonder.description}
        </p>

        <p>
            <strong>History:</strong>
            ${wonder.history}
        </p>

        <p>
            <strong>Famous for:</strong>
            ${wonder.famousFor}
        </p>

        <p>
            <strong>Best time to visit:</strong>
            ${wonder.bestTime}
        </p>

        <p>
            <strong>Recommended duration:</strong>
            ${wonder.duration}
        </p>

        <p>
            <strong>Travel tip:</strong>
            ${wonder.tips}
        </p>

        <p>
            <strong>Coordinates:</strong>
            ${wonder.latitude},
            ${wonder.longitude}
        </p>

    `;


    // Hide explorer section

    document.querySelector(".explorer-section").style.display =
        "none";


    // Show details section

    document.getElementById("details").classList.remove("hidden");


    // ======================================
    // CREATE MAP
    // ======================================

    if (destinationMap) {
        destinationMap.remove();
    }


    destinationMap = L.map("map").setView(
        [
            wonder.latitude,
            wonder.longitude
        ],
        13
    );


    // Add OpenStreetMap tiles

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(destinationMap);


    // Add marker

    L.marker([
        wonder.latitude,
        wonder.longitude
    ])
        .addTo(destinationMap)
        .bindPopup(wonder.name)
        .openPopup();


    // Fix map display after showing hidden section

    setTimeout(function () {

        destinationMap.invalidateSize();

    }, 100);


    // Scroll to top

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// HIDE DETAILS
// ==========================================

function hideDetails() {

    document.querySelector(".explorer-section").style.display =
        "block";

    document.getElementById("details").classList.add("hidden");


    // Remove map

    if (destinationMap) {

        destinationMap.remove();

        destinationMap = null;
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// SEARCH
// ==========================================

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function () {

            const searchText =
                this.value.toLowerCase().trim();


            const cards =
                document.querySelectorAll(".wonder");


            cards.forEach(function (card) {

                const name =
                    card
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();


                const country =
                    card
                        .querySelector(".wonder-location")
                        .textContent
                        .toLowerCase();


                if (
                    name.includes(searchText) ||
                    country.includes(searchText)
                ) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";
                }

            });

        }
    );


// ==========================================
// FAVORITES
// ==========================================

let favorites =
    JSON.parse(
        localStorage.getItem("favoriteWonders")
    ) || [];


// ==========================================
// TOGGLE FAVORITE
// ==========================================

function toggleFavorite(event, wonderKey) {

    // Prevent card click

    event.stopPropagation();


    const button =
        event.currentTarget;


    if (favorites.includes(wonderKey)) {

        // Remove from favorites

        favorites =
            favorites.filter(
                key => key !== wonderKey
            );


        button.textContent =
            "☆ Favorite";


        button.classList.remove("active");

    } else {

        // Add to favorites

        favorites.push(wonderKey);


        button.textContent =
            "★ Favorited";


        button.classList.add("active");
    }


    // Save favorites

    localStorage.setItem(
        "favoriteWonders",
        JSON.stringify(favorites)
    );
}


// ==========================================
// RESTORE FAVORITES
// ==========================================

function restoreFavorites() {

    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );


    buttons.forEach(function (button) {

        const article =
            button.closest(".wonder");


        const wonderKey =
            article.dataset.key;


        if (favorites.includes(wonderKey)) {

            button.textContent =
                "★ Favorited";


            button.classList.add("active");
        }

    });
}


// ==========================================
// INITIALIZE
// ==========================================

restoreFavorites();
/* =========================
   TRAVEL ASSISTANT
   ========================= */

/* =========================
   TRAVEL ASSISTANT
   ========================= */

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");


function addChatMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (sender === "user") {

        messageDiv.classList.add("user-message");

        messageDiv.textContent = message;

    } else {

        messageDiv.classList.add("assistant-message");

        const title = document.createElement("strong");

        title.textContent = "Voyage Assistant";

        const paragraph = document.createElement("p");

        paragraph.textContent = message;

        messageDiv.appendChild(title);
        messageDiv.appendChild(paragraph);
    }

    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


/*
   Temporary local response system.
   This will later be replaced by the real AI API.
*/

function getLocalTravelResponse(message) {

    const question = message.toLowerCase();

    for (const key in wonders) {

        const wonder = wonders[key];

        if (
            question.includes(wonder.name.toLowerCase()) ||
            question.includes(wonder.country.toLowerCase())
        ) {

            return `${wonder.name} is located in ${wonder.location}, ${wonder.country}. ${wonder.description} Best time to visit: ${wonder.bestTime}. A typical visit can take ${wonder.duration}.`;
        }
    }


    if (
        question.includes("first") ||
        question.includes("which wonder") ||
        question.includes("recommend")
    ) {

        return "If you are visiting your first World Wonder, the Taj Mahal is a good starting point because it combines architecture, history, and cultural significance.";
    }


    if (question.includes("best time")) {

        return "The best time depends on the destination. Different wonders have different weather and tourist seasons.";
    }


    if (
        question.includes("hello") ||
        question.includes("hi") ||
        question.includes("hey")
    ) {

        return "Hello! I can help you explore the Seven Wonders, compare destinations, and plan a trip.";
    }


    if (
        question.includes("seven wonders") ||
        question.includes("7 wonders") ||
        question.includes("world wonders")
    ) {

        return "The New Seven Wonders are the Great Wall of China, Petra, the Colosseum, Chichen Itza, Machu Picchu, the Taj Mahal, and Christ the Redeemer.";
    }


    return "I can help you explore the Seven Wonders, compare destinations, and learn about travel timing and trip duration.";
}


/*
   Send message to backend.
*/

async function sendMessageToAssistant(message) {

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        if (!response.ok) {

            throw new Error("Backend unavailable");
        }


        const data = await response.json();

        return data.reply;

    } catch (error) {

        console.log("Backend unavailable. Using local assistant.");

        return getLocalTravelResponse(message);
    }
}


/*
   Suggested question buttons.
*/

function askSuggestedQuestion(question) {

    chatInput.value = question;

    chatForm.dispatchEvent(
        new Event("submit")
    );
}


/*
   Chat form submission.
*/

chatForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const message = chatInput.value.trim();


    if (!message) {
        return;
    }


    addChatMessage(message, "user");


    chatInput.value = "";


    const thinkingMessage = document.createElement("div");

    thinkingMessage.classList.add(
        "message",
        "assistant-message"
    );

    thinkingMessage.innerHTML = `
        <strong>Voyage Assistant</strong>
        <p>Thinking...</p>
    `;

    chatMessages.appendChild(thinkingMessage);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    const reply =
        await sendMessageToAssistant(message);


    thinkingMessage.remove();


    addChatMessage(reply, "assistant");

});