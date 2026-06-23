
async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (!message) {
        return;
    }

    chatBox.innerHTML += `<p><b>You:</b> ${message}</p>`;
    input.value = "";

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Data:", data);

        if (!response.ok) {
            chatBox.innerHTML +=
                `<p><b>AI Error:</b> ${JSON.stringify(data)}</p>`;
            return;
        }

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (reply) {
            chatBox.innerHTML += `<p><b>AI:</b> ${reply}</p>`;
        } else {
            chatBox.innerHTML +=
                `<p><b>AI:</b> API returned no response.</p>`;
        }

    } catch (error) {
        console.error(error);
        chatBox.innerHTML +=
            `<p><b>AI Error:</b> ${error.message}</p>`;
    }
}