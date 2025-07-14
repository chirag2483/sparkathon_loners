// AI Configuration for Wally-verse Chatbot
// This file contains settings for different AI services

const AI_CONFIG = {
    // OpenRouter Configuration (Recommended)
    openrouter: {
        apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
        model: 'openai/gpt-3.5-turbo', // You can change this to any model available on OpenRouter
        maxTokens: 300,
        temperature: 0.7,
        // Available models on OpenRouter (you can change the model above to any of these)
        availableModels: [
            'openai/gpt-3.5-turbo',      // Fast, cost-effective
            'openai/gpt-4',              // More capable, higher cost
            'openai/gpt-4-turbo',        // Latest GPT-4, best performance
            'anthropic/claude-3-sonnet', // Excellent reasoning
            'anthropic/claude-3-haiku',  // Fast Claude model
            'google/gemini-pro',         // Google's latest model
            'meta-llama/llama-2-70b-chat', // Open source option
            'mistralai/mistral-7b-instruct' // Fast, efficient
        ],
        systemPrompt: `You are Wally, an AI assistant for Wally-verse, a 3D virtual shopping platform. You help users with:

1. **Product Recommendations**: Suggest clothing, shoes, accessories based on style, occasion, budget
2. **Virtual Try-on**: Guide users through the virtual try-on process
3. **Order Management**: Help with order tracking, returns, refunds
4. **Fit & Sizing**: Provide sizing advice and fit recommendations
5. **Style Advice**: Give fashion tips, outfit suggestions, style coordination
6. **Platform Navigation**: Help users navigate the 3D shop, cart, checkout
7. **Technical Support**: Assist with any platform issues

Key Features of Wally-verse:
- 3D virtual shopping experience
- Virtual try-on for clothes, glasses, accessories
- Real-time order tracking
- Interactive product exploration
- Personalized recommendations

Always be helpful, friendly, and specific. Keep responses concise but informative. If you don't know something specific about Wally-verse, suggest they contact customer service.`
    },

    // OpenAI Configuration
    openai: {
        apiUrl: 'https://api.openai.com/v1/chat/completions',
        model: 'gpt-3.5-turbo',
        maxTokens: 300,
        temperature: 0.7,
        systemPrompt: `You are Wally, an AI assistant for Wally-verse, a 3D virtual shopping platform. You help users with:

1. **Product Recommendations**: Suggest clothing, shoes, accessories based on style, occasion, budget
2. **Virtual Try-on**: Guide users through the virtual try-on process
3. **Order Management**: Help with order tracking, returns, refunds
4. **Fit & Sizing**: Provide sizing advice and fit recommendations
5. **Style Advice**: Give fashion tips, outfit suggestions, style coordination
6. **Platform Navigation**: Help users navigate the 3D shop, cart, checkout
7. **Technical Support**: Assist with any platform issues

Key Features of Wally-verse:
- 3D virtual shopping experience
- Virtual try-on for clothes, glasses, accessories
- Real-time order tracking
- Interactive product exploration
- Personalized recommendations

Always be helpful, friendly, and specific. Keep responses concise but informative. If you don't know something specific about Wally-verse, suggest they contact customer service.`
    },

    // Anthropic Claude Configuration (Alternative)
    claude: {
        apiUrl: 'https://api.anthropic.com/v1/messages',
        model: 'claude-3-sonnet-20240229',
        maxTokens: 300,
        systemPrompt: `You are Wally, an AI assistant for Wally-verse, a 3D virtual shopping platform. Help users with product recommendations, virtual try-on, order management, fit advice, style tips, and platform navigation. Be friendly and specific about Wally-verse features.`
    },

    // Cohere Configuration (Alternative)
    cohere: {
        apiUrl: 'https://api.cohere.ai/v1/chat',
        model: 'command',
        maxTokens: 300,
        systemPrompt: `You are Wally, an AI assistant for Wally-verse, a 3D virtual shopping platform. Help users with product recommendations, virtual try-on, order management, fit advice, style tips, and platform navigation. Be friendly and specific about Wally-verse features.`
    },

    // Hugging Face Configuration (Alternative)
    huggingface: {
        apiUrl: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
        maxTokens: 300
    },

    // Google Gemini Configuration (Alternative)
    google: {
        apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        model: 'gemini-pro',
        maxTokens: 300,
        temperature: 0.7,
        systemPrompt: `You are Wally, an AI assistant for Wally-verse, a 3D virtual shopping platform. Help users with product recommendations, virtual try-on, order management, fit advice, style tips, and platform navigation. Be friendly and specific about Wally-verse features.`
    }
};

// API Key Management
const API_KEYS = {
    // OpenRouter API Key (Updated)
    openrouter: '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',
    // Google API Key (Alternative)
    google: 'AIzaSyBfXkAGzo1ePlFiLKb6CqWtznMECPbS6YA',
    // Replace these with your actual API keys
    openai: 'your-openai-api-key-here',
    claude: 'your-claude-api-key-here',
    cohere: 'your-cohere-api-key-here',
    huggingface: 'your-huggingface-api-key-here'
};

// Current AI Service (change this to switch between services)
let CURRENT_AI_SERVICE = 'openrouter';

// Make it globally accessible
window.CURRENT_AI_SERVICE = CURRENT_AI_SERVICE;

// Helper functions
function getCurrentConfig() {
    return AI_CONFIG[CURRENT_AI_SERVICE];
}

function getCurrentAPIKey() {
    return API_KEYS[CURRENT_AI_SERVICE];
}

function getCurrentService() {
    return window.CURRENT_AI_SERVICE || CURRENT_AI_SERVICE;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AI_CONFIG, API_KEYS, getCurrentConfig, getCurrentAPIKey, getCurrentService };
} 