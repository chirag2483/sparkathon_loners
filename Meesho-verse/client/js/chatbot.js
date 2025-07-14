class Chatbot {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.isTyping = false;
        
        this.initializeEventListeners();
        this.loadChatHistory();
    }
    
    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });
        
        // Send message on Enter key
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Enable/disable send button based on input
        this.messageInput.addEventListener('input', () => {
            this.sendButton.disabled = !this.messageInput.value.trim();
        });
        
        // Test AI connection button
        const testButton = document.getElementById('testButton');
        if (testButton) {
            testButton.addEventListener('click', () => {
                this.testAIConnection();
            });
        }
        
        // AI Service selector
        const serviceSelect = document.getElementById('aiServiceSelect');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', () => {
                this.switchAIService(serviceSelect.value);
            });
        }
        
        // Initial state
        this.sendButton.disabled = true;
    }
    
    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.sendButton.disabled = true;
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get AI response
            const aiResponse = await this.generateAIResponse(message);
            this.hideTypingIndicator();
            this.addMessage(aiResponse, 'bot');
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.hideTypingIndicator();
            this.addMessage("I'm having trouble connecting right now. Please try again in a moment, or contact our support team if the issue persists.", 'bot');
        }
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${this.escapeHtml(text)}</div>
                </div>
                <div class="message-time">${currentTime}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="bot-avatar">🤖</div>
                    <div class="message-text">${this.formatBotMessage(text)}</div>
                </div>
                <div class="message-time">${currentTime}</div>
            `;
        }
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        this.saveChatHistory();
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="bot-avatar">🤖</div>
                <div class="message-text">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    async generateAIResponse(userMessage) {
        try {
            // First, try to get response from external AI API
            console.log('Attempting to get AI response for:', userMessage);
            const response = await this.callExternalAI(userMessage);
            console.log('AI Response received:', response);
            return response;
        } catch (error) {
            console.log('External AI failed, using fallback responses:', error);
            // Fallback to local responses if external AI fails
            const fallbackResponse = this.getFallbackResponse(userMessage);
            console.log('Fallback response:', fallbackResponse);
            return fallbackResponse;
        }
    }
    
    async callExternalAI(userMessage) {
        const config = getCurrentConfig();
        const apiKey = getCurrentAPIKey();
        const service = getCurrentService();
        
        console.log('AI Service:', service);
        console.log('API Key:', apiKey ? 'Configured' : 'Not configured');
        console.log('Config:', config);
        
        if ((apiKey === 'your-openai-api-key-here' || !apiKey) && service !== 'openrouter') {
            throw new Error('API key not configured');
        }
        
        let requestBody;
        let headers;
        
        switch (service) {
            case 'openrouter':
                requestBody = {
                    model: config.model,
                    messages: [
                        { role: "system", content: config.systemPrompt },
                        { role: "user", content: userMessage }
                    ],
                    max_tokens: config.maxTokens,
                    temperature: config.temperature
                };
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Wally-verse AI Assistant'
                };
                
                // Add CORS headers for OpenRouter
                if (window.location.protocol === 'file:') {
                    console.log('Running from file:// - CORS might be an issue');
                }
                break;
                
            case 'openai':
                requestBody = {
                    model: config.model,
                    messages: [
                        { role: "system", content: config.systemPrompt },
                        { role: "user", content: userMessage }
                    ],
                    max_tokens: config.maxTokens,
                    temperature: config.temperature
                };
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                };
                break;
                
            case 'claude':
                requestBody = {
                    model: config.model,
                    max_tokens: config.maxTokens,
                    system: config.systemPrompt,
                    messages: [
                        { role: "user", content: userMessage }
                    ]
                };
                headers = {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                };
                break;
                
            case 'cohere':
                requestBody = {
                    model: config.model,
                    max_tokens: config.maxTokens,
                    preamble: config.systemPrompt,
                    message: userMessage
                };
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                };
                break;
                
            case 'google':
                requestBody = {
                    contents: [
                        {
                            parts: [
                                { text: config.systemPrompt + "\n\nUser: " + userMessage }
                            ]
                        }
                    ],
                    generationConfig: {
                        maxOutputTokens: config.maxTokens,
                        temperature: config.temperature
                    }
                };
                headers = {
                    'Content-Type': 'application/json'
                };
                // Add API key to URL for Google
                const googleUrl = `${config.apiUrl}?key=${apiKey}`;
                break;
                
            default:
                throw new Error(`Unsupported AI service: ${service}`);
        }

        // Use proxy if running from server, direct API if running from file
        const isRunningFromServer = window.location.protocol === 'http:' || window.location.protocol === 'https:';
        const apiEndpoint = isRunningFromServer ? '/api/ai-chat' : (service === 'google' ? googleUrl : config.apiUrl);
        
        console.log('Making API request to:', apiEndpoint);
        console.log('Request body:', requestBody);
        console.log('Headers:', headers);
        console.log('Running from server:', isRunningFromServer);
        
        let response;
        if (isRunningFromServer) {
            // Use proxy
            response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service: service,
                    requestBody: requestBody
                })
            });
        } else {
            // Direct API call (may have CORS issues)
            try {
                response = await fetch(config.apiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });
            } catch (corsError) {
                console.log('CORS error detected, using fallback:', corsError);
                throw new Error('CORS error - please use the local server or Live Server extension');
            }
        }

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`API request failed: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('API Response data:', data);
        
        // Handle different response formats
        switch (service) {
            case 'openrouter':
            case 'openai':
                return data.choices[0].message.content;
            case 'claude':
                return data.content[0].text;
            case 'cohere':
                return data.text;
            case 'google':
                return data.candidates[0].content.parts[0].text;
            default:
                return data.choices[0].message.content;
        }
    }
    
    getFallbackResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Enhanced fallback responses with more specific information
        if (message.includes('product') || message.includes('item') || message.includes('find')) {
            return "I can help you find the perfect products! In Wally-verse, you can:\n• Explore our 3D shop for immersive shopping\n• Use virtual try-on to see how items look on you\n• Get personalized recommendations based on your style\n\nWhat type of product are you looking for? I can suggest specific categories or help you navigate the 3D experience.";
        }
        
        if (message.includes('clothing') || message.includes('shirt') || message.includes('pants') || message.includes('dress')) {
            return "Great choice! Our clothing collection includes:\n• Casual wear for everyday comfort\n• Formal attire for special occasions\n• Seasonal collections with latest trends\n• Virtual try-on for perfect fit\n\nWould you like me to guide you to specific categories or help you use the virtual try-on feature?";
        }
        
        if (message.includes('shoes') || message.includes('footwear')) {
            return "Our footwear collection is amazing! We offer:\n• Athletic shoes for performance and style\n• Casual sneakers for everyday comfort\n• Formal shoes for professional settings\n• 3D viewing to see every angle\n• Virtual try-on to check fit and style\n\nCheck out our 3D shop for the latest styles!";
        }
        
        if (message.includes('try') || message.includes('try-on') || message.includes('virtual')) {
            return "Virtual try-on is our signature feature! Here's how it works:\n• Upload your photo or use your camera\n• Select any clothing item, glasses, or accessories\n• See how they look on you in real-time\n• Adjust positioning and sizing\n• Save your favorite looks\n\nHead to the 'Virtual tryon' section to get started!";
        }
        
        if (message.includes('fit') || message.includes('size') || message.includes('measurement')) {
            return "Getting the perfect fit is important! In Wally-verse:\n• Use our virtual try-on to see how items fit\n• Check detailed size charts for each product\n• Get personalized size recommendations\n• Compare different sizes virtually\n• Read customer reviews about fit\n\nWould you like help with sizing for a specific item?";
        }
        
        if (message.includes('order') || message.includes('track') || message.includes('delivery')) {
            return "Order tracking is easy in Wally-verse:\n• Check your orders in the 'Orders' section\n• Real-time delivery updates\n• Estimated delivery times\n• Order history and reorder options\n• Contact support for order issues\n\nIf you need help with a specific order, please provide your order number.";
        }
        
        if (message.includes('return') || message.includes('refund')) {
            return "Returns and refunds are straightforward:\n• Initiate returns from your Orders section\n• 30-day return window for most items\n• Free return shipping on eligible items\n• Refund processing within 5-7 business days\n• Contact customer service for assistance\n\nCheck your order details in the Orders section to start a return.";
        }
        
        if (message.includes('cart') || message.includes('checkout') || message.includes('buy')) {
            return "Shopping cart and checkout process:\n• Add items to cart from 3D shop or try-on\n• Review items before checkout\n• Secure payment processing\n• Order confirmation and tracking\n• Save items for later purchase\n\nMake sure you're logged in to complete your purchase!";
        }
        
        if (message.includes('style') || message.includes('fashion') || message.includes('outfit')) {
            return "Style advice and fashion tips:\n• Get outfit suggestions based on occasion\n• Mix and match items virtually\n• Seasonal style recommendations\n• Color coordination tips\n• Accessory pairing suggestions\n\nI can help you create the perfect look for any occasion!";
        }
        
        if (message.includes('help') || message.includes('support')) {
            return "I'm here to help with everything Wally-verse!\n\n**Shopping**: Product recommendations, virtual try-on, 3D exploration\n**Orders**: Tracking, returns, refunds, order history\n**Style**: Fashion advice, outfit suggestions, fit recommendations\n**Technical**: Platform navigation, account issues, payment help\n\nWhat would you like assistance with?";
        }
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! Welcome to Wally-verse! 🛍️\n\nI'm Wally, your AI shopping assistant. I can help you with:\n• Finding the perfect products\n• Virtual try-on guidance\n• Style and fashion advice\n• Order management\n• Platform navigation\n\nHow can I make your shopping experience amazing today?";
        }
        
        if (message.includes('thank')) {
            return "You're welcome! I'm happy to help make your Wally-verse experience the best it can be. Is there anything else you'd like to know about our products, virtual try-on, or any other features?";
        }
        
        if (message.includes('bye') || message.includes('goodbye')) {
            return "Goodbye! Thanks for chatting with me. Have an amazing shopping experience in Wally-verse! 👋\n\nDon't forget to check out our virtual try-on feature and 3D shop for the best shopping experience!";
        }
        
        // Enhanced default responses
        const defaultResponses = [
            "That's a great question! I'm here to help you with your Wally-verse shopping experience. I can assist with product recommendations, virtual try-on, order tracking, style advice, and more. What would you like to explore?",
            "I'd be happy to help you with that! Whether you're looking for products, need help with orders, want to try our virtual try-on feature, or need style advice, I'm here to guide you through the Wally-verse experience.",
            "Great question! I can help you navigate Wally-verse, find products, track orders, assist with virtual try-on, provide style recommendations, and answer any questions about our platform. What would you like to know?",
            "I'm here to make your Wally-verse experience amazing! Whether you need help finding products, tracking orders, using our virtual try-on, getting style advice, or navigating the platform, I've got you covered.",
            "That's something I can definitely help with! Wally-verse offers 3D shopping, virtual try-on, personalized recommendations, order tracking, and style advice. What aspect would you like to explore or learn more about?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    formatBotMessage(text) {
        // Convert line breaks to HTML
        return text.replace(/\n/g, '<br>');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
    
    saveChatHistory() {
        const messages = this.chatMessages.innerHTML;
        localStorage.setItem('chatbot_history', messages);
    }
    
    loadChatHistory() {
        const savedHistory = localStorage.getItem('chatbot_history');
        if (savedHistory) {
            this.chatMessages.innerHTML = savedHistory;
            this.scrollToBottom();
        }
    }
    
    clearChatHistory() {
        this.chatMessages.innerHTML = '';
        localStorage.removeItem('chatbot_history');
        // Add welcome message back
        this.addMessage("Hello! I'm your AI assistant. I can help you with:\n• Finding products in Wally-verse\n• Virtual try-on assistance\n• Order tracking and support\n• General shopping questions\n\nHow can I help you today?", 'bot');
    }
    
    async testAIConnection() {
        console.log('Testing AI connection...');
        this.addMessage("Testing AI connection...", 'bot');
        
        try {
            const testResponse = await this.callExternalAI("Hello, this is a test message.");
            console.log('AI Test successful:', testResponse);
            this.addMessage(`✅ AI connection successful! Response: ${testResponse}`, 'bot');
        } catch (error) {
            console.error('AI Test failed:', error);
            this.addMessage(`❌ AI connection failed: ${error.message}`, 'bot');
            
            // Test fallback
            const fallbackResponse = this.getFallbackResponse("Hello");
            this.addMessage(`🔄 Fallback system working: ${fallbackResponse}`, 'bot');
        }
    }
    
    switchAIService(service) {
        // Update the global service variable
        window.CURRENT_AI_SERVICE = service;
        console.log('Switched to AI service:', service);
        this.addMessage(`🔄 Switched to ${service} AI service`, 'bot');
    }
}

// Add typing animation CSS
const style = document.createElement('style');
style.textContent = `
    .typing-dots {
        display: flex;
        gap: 4px;
        align-items: center;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) {
        animation-delay: -0.32s;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: -0.16s;
    }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
}); 