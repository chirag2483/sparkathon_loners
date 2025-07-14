# AI Assistant Setup Guide for Wally-verse

This guide will help you set up an external AI assistant for the Wally-verse chatbot to provide more robust and intelligent responses.

## 🚀 Quick Setup

### 1. Choose Your AI Service

The chatbot supports multiple AI services. Choose one based on your needs:

- **OpenRouter** (Recommended) - Access to multiple AI models, competitive pricing
- **OpenAI GPT** - Most popular, great performance
- **Anthropic Claude** - Excellent reasoning, safety-focused
- **Cohere** - Good performance, competitive pricing
- **Hugging Face** - Open source models, free tier available

### 2. Get Your API Key

#### OpenRouter (Recommended)
1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up or log in
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the key (starts with `sk-or-v1-`)
6. **Already configured with your key!**

#### OpenAI
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the key (starts with `sk-`)

#### Anthropic Claude
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to "API Keys"
4. Create a new API key
5. Copy the key

#### Cohere
1. Go to [Cohere Platform](https://cohere.ai/)
2. Sign up or log in
3. Navigate to "API Keys"
4. Create a new API key
5. Copy the key

### 3. Configure the AI Service

Edit the file `client/js/ai-config.js`:

```javascript
// Your OpenRouter API key is already configured!
const API_KEYS = {
    openrouter: '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',
    openai: 'sk-your-actual-openai-key-here',
    claude: 'your-claude-key-here',
    cohere: 'your-cohere-key-here',
    huggingface: 'your-huggingface-key-here'
};

// OpenRouter is currently selected (recommended)
const CURRENT_AI_SERVICE = 'openrouter'; // or 'openai', 'claude', 'cohere', 'huggingface'
```

### 4. Test the Integration

1. Open `client/chatbot.html` in your browser
2. Try asking questions like:
   - "What products do you recommend for a business meeting?"
   - "How does virtual try-on work?"
   - "Can you help me with order tracking?"
   - "What's the best way to find my size?"

## 🔧 Advanced Configuration

### Customizing AI Responses

You can customize the AI's behavior by editing the system prompt in `ai-config.js`:

```javascript
const AI_CONFIG = {
    openai: {
        systemPrompt: `Your custom system prompt here...`
    }
};
```

### Switching Between AI Services

To switch between different AI services, simply change the `CURRENT_AI_SERVICE` variable:

```javascript
const CURRENT_AI_SERVICE = 'claude'; // Switch to Claude
```

### OpenRouter Model Selection

With OpenRouter, you can easily switch between different AI models. Edit the model in `ai-config.js`:

```javascript
const AI_CONFIG = {
    openrouter: {
        model: 'openai/gpt-4-turbo', // Switch to GPT-4 Turbo
        // Available models:
        // 'openai/gpt-3.5-turbo' - Fast, cost-effective
        // 'openai/gpt-4' - More capable, higher cost
        // 'openai/gpt-4-turbo' - Latest GPT-4, best performance
        // 'anthropic/claude-3-sonnet' - Excellent reasoning
        // 'google/gemini-pro' - Google's latest model
        // 'meta-llama/llama-2-70b-chat' - Open source option
    }
};
```

### Adjusting Response Parameters

You can adjust response quality and creativity:

```javascript
const AI_CONFIG = {
    openai: {
        maxTokens: 500,        // Longer responses
        temperature: 0.9,      // More creative (0.0 = focused, 1.0 = creative)
    }
};
```

## 🛡️ Security Best Practices

### 1. Environment Variables (Recommended)

For production, store API keys in environment variables:

```javascript
// In your server-side code
const apiKey = process.env.OPENAI_API_KEY;
```

### 2. API Key Rotation

- Regularly rotate your API keys
- Use different keys for development and production
- Monitor API usage to prevent abuse

### 3. Rate Limiting

Consider implementing rate limiting to prevent excessive API calls:

```javascript
// Example rate limiting
const rateLimit = {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
};
```

## 📊 AI Service Comparison

| Service | Pros | Cons | Best For |
|---------|------|------|----------|
| **OpenRouter** | Multiple models, competitive pricing, easy switching | Requires API key setup | Production, flexibility |
| **OpenAI GPT** | Excellent performance, extensive documentation | Higher cost, rate limits | Production applications |
| **Claude** | Great reasoning, safety-focused | Limited availability | Business applications |
| **Cohere** | Good performance, competitive pricing | Smaller community | Cost-conscious projects |
| **Hugging Face** | Free tier, open source | Variable quality | Prototyping, learning |

## 🐛 Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Check that you've added your API key in `ai-config.js`
   - Ensure the key is valid and active

2. **"API request failed" error**
   - Check your internet connection
   - Verify your API key has sufficient credits
   - Check rate limits for your chosen service

3. **Slow responses**
   - Consider using a faster model (e.g., GPT-3.5-turbo instead of GPT-4)
   - Reduce `maxTokens` for quicker responses
   - Check your network connection

### Debug Mode

Enable debug logging by adding this to your browser console:

```javascript
localStorage.setItem('debug_ai', 'true');
```

## 💡 Tips for Better AI Responses

1. **Be Specific**: Ask specific questions for better responses
2. **Provide Context**: Mention your preferences, budget, occasion
3. **Use Keywords**: Include relevant terms like "virtual try-on", "3D shop", "orders"
4. **Follow Up**: Ask follow-up questions for more detailed advice

## 🔄 Fallback System

The chatbot includes a robust fallback system:
- If the external AI fails, it uses local responses
- Local responses are enhanced with detailed Wally-verse information
- Users get helpful responses even when AI is unavailable

## 📞 Support

If you need help with the AI integration:
1. Check the troubleshooting section above
2. Review the AI service documentation
3. Test with different AI services
4. Contact the development team

---

**Note**: Keep your API keys secure and never commit them to version control. Use environment variables or secure key management systems in production. 