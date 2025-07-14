import http from "http";
import Express from "express";
import { Server } from "socket.io";
import fetch from "node-fetch";

const PORT = 5000;

const app = Express();
const server = http.createServer(app);
const io = new Server(server);

app.use(Express.static("../client/"));
app.use(Express.json());

// AI Proxy endpoint to handle CORS
app.post('/api/ai-chat', async (req, res) => {
    try {
        const { service, requestBody } = req.body;
        
        let apiUrl, headers;
        
        if (service === 'openrouter') {
            apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
            headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`,
                'HTTP-Referer': req.headers.origin || 'http://localhost:5000',
                'X-Title': 'Wally-verse AI Assistant'
            };
        } else if (service === 'google') {
            apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBfXkAGzo1ePlFiLKb6CqWtznMECPbS6YA`;
            headers = {
                'Content-Type': 'application/json'
            };
        } else {
            return res.status(400).json({ error: 'Unsupported service' });
        }
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('AI API Error:', errorText);
            return res.status(response.status).json({ error: errorText });
        }
        
        const data = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('AI Proxy Error:', error);
        res.status(500).json({ error: error.message });
    }
});

io.on("connection", (socket) => {
  console.log("User connected");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
