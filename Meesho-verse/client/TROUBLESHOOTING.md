# AI Chatbot Troubleshooting Guide

If the AI responses are not showing, follow these steps to diagnose and fix the issue.

## 🔍 **Step 1: Check Browser Console**

1. Open the chatbot page (`client/chatbot.html`)
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Try sending a message and look for error messages

## 🚀 **Step 2: Test AI Connection**

1. Click the **"Test AI Connection"** button in the chatbot
2. Check the console for detailed logs
3. Look for these messages:
   - ✅ AI connection successful
   - ❌ AI connection failed
   - 🔄 Fallback system working

## 🌐 **Step 3: Run from Server (Recommended)**

The most common issue is CORS (Cross-Origin Resource Sharing). To fix this:

### Option A: Use the Local Server
1. Open terminal/command prompt
2. Navigate to the `server` folder
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open `http://localhost:5000/chatbot.html` in your browser

### Option B: Use Live Server (VS Code)
1. Install Live Server extension in VS Code
2. Right-click on `client/chatbot.html`
3. Select "Open with Live Server"

## 🔧 **Step 4: Common Issues & Solutions**

### Issue: "API key not configured"
**Solution**: Check `client/js/ai-config.js` - the OpenRouter API key should be configured.

### Issue: "CORS error" or "Network error"
**Solution**: Use the local server (Step 3) instead of opening the file directly.

### Issue: "API request failed: 401"
**Solution**: The API key might be invalid. Check your OpenRouter dashboard.

### Issue: "API request failed: 429"
**Solution**: Rate limit exceeded. Wait a few minutes and try again.

### Issue: No response at all
**Solution**: Check if the fallback system is working. You should see local responses.

## 🐛 **Step 5: Debug Mode**

Enable detailed logging by adding this to the browser console:
```javascript
localStorage.setItem('debug_ai', 'true');
```

## 📋 **Step 6: Manual Testing**

Test the AI connection manually:

1. Open browser console
2. Run this test:
```javascript
// Test the AI configuration
console.log('Service:', getCurrentService());
console.log('API Key:', getCurrentAPIKey() ? 'Configured' : 'Missing');
console.log('Config:', getCurrentConfig());
```

## 🔄 **Step 7: Fallback System**

If the external AI fails, the chatbot should use local responses. Test this by:

1. Temporarily breaking the API key in `ai-config.js`
2. Send a message
3. You should get a local response

## 📞 **Step 8: Still Not Working?**

If none of the above works:

1. **Check Network**: Ensure you have internet connection
2. **Check API Key**: Verify your OpenRouter API key is valid
3. **Try Different Browser**: Test in Chrome, Firefox, or Edge
4. **Clear Cache**: Clear browser cache and try again
5. **Check Console**: Look for any JavaScript errors

## 🎯 **Expected Behavior**

When working correctly, you should see:

1. **User messages** appear immediately
2. **Typing indicator** (animated dots) appears
3. **AI response** appears after 1-3 seconds
4. **Console logs** showing API calls and responses

## 🔧 **Quick Fixes**

### Fix 1: Force Fallback Mode
Edit `client/js/ai-config.js`:
```javascript
// Temporarily break the API key to test fallback
const API_KEYS = {
    openrouter: 'invalid-key-for-testing',
    // ... other keys
};
```

### Fix 2: Use Different Model
Edit `client/js/ai-config.js`:
```javascript
const AI_CONFIG = {
    openrouter: {
        model: 'openai/gpt-3.5-turbo', // Try a different model
        // ...
    }
};
```

### Fix 3: Increase Timeout
Edit `client/js/chatbot.js` in the `sendMessage` method:
```javascript
// Add a longer timeout for slow connections
setTimeout(() => {
    // ... existing code
}, 5000); // 5 seconds instead of default
```

## 📊 **Status Check**

Run this in the browser console to check everything:
```javascript
// Check all components
console.log('Chatbot loaded:', typeof Chatbot !== 'undefined');
console.log('AI Config loaded:', typeof getCurrentConfig !== 'undefined');
console.log('Current service:', getCurrentService());
console.log('API key configured:', getCurrentAPIKey() ? 'Yes' : 'No');
console.log('Running from server:', window.location.protocol === 'http:' || window.location.protocol === 'https:');
```

---

**Need more help?** Check the console logs and share any error messages you see. 