# 🛒 Meesho-verse AI - Immersive 3D Shopping Experience

![Meesho-verse Logo](download-removebg-preview.png)

## 🌟 Introduction

**Meesho-verse** is a cutting-edge Meta-Commerce platform that delivers an immersive, real-world shopping experience in a 3D virtual environment. Built with advanced AI integration, real-time collaboration, and virtual try-on capabilities, it revolutionizes online shopping by combining the convenience of e-commerce with the social aspects of in-store shopping.

## ✨ Key Features

### 🎮 3D Virtual Shopping Environment
- **Immersive 3D Shop**: Navigate through a realistic 3D shopping environment
- **Interactive Product Display**: View products in 3D space with detailed textures
- **Real-time Character Movement**: Control your avatar with smooth animations
- **Dynamic Lighting & Shadows**: Realistic lighting effects for enhanced immersion

### 👕 Virtual Try-On System
- **AI-Powered Try-On**: Try clothes virtually using computer vision
- **Real-time Face Tracking**: Advanced facial recognition for accurate fitting
- **Multiple Product Categories**: Try on shirts, pants, shoes, glasses, and hats
- **Instant Preview**: See how products look on you in real-time

### 🤖 AI Shopping Assistant
- **Intelligent Chatbot**: AI-powered shopping assistant with natural language processing
- **Product Recommendations**: Personalized suggestions based on preferences
- **Order Tracking**: Real-time order status and delivery updates
- **Multi-Model AI Support**: Integration with OpenAI GPT, Claude, Cohere, and more

### 👥 Real-Time Collaboration
- **Virtual Shopping Rooms**: Create and join shopping sessions with friends
- **Live Video/Audio**: Real-time communication with other shoppers
- **Product Sharing**: Share products with room participants
- **Synchronized Experience**: All participants see the same products and interactions

### 🛍️ E-Commerce Features
- **Shopping Cart**: Add and manage products in your cart
- **Order Management**: Track and manage your orders
- **Secure Checkout**: Safe payment processing
- **Product Search**: Find products quickly with search functionality

## 🚀 Technology Stack

### Frontend
- **Three.js**: 3D graphics and rendering
- **Socket.IO**: Real-time communication
- **WebRTC**: Video/audio streaming
- **Computer Vision**: Face tracking and virtual try-on
- **AI Integration**: Multiple AI service providers

### Backend
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **Socket.IO**: Real-time server
- **CORS**: Cross-origin resource sharing

### AI Services
- **OpenRouter**: Multi-model AI access
- **OpenAI GPT**: Natural language processing
- **Anthropic Claude**: Advanced reasoning
- **Cohere**: Text generation
- **Hugging Face**: Open-source models

## 📋 Prerequisites

Before setting up Meesho-verse, ensure you have:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Modern web browser** with camera/microphone permissions
- **AI API Key** (optional, for enhanced chatbot features)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Meesho-verse
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### 4. Access the Application
Open your browser and navigate to:
- **Main Application**: `http://localhost:3000`
- **Room Creator**: `http://localhost:3000/room-creator`
- **Direct Room Access**: `http://localhost:3000/room?code=ROOMCODE&name=ROOMNAME`

## 🤖 AI Assistant Setup

### Quick Setup
1. **Get API Key**: Obtain an API key from your preferred AI service
   - [OpenRouter](https://openrouter.ai/) (Recommended)
   - [OpenAI](https://platform.openai.com/)
   - [Anthropic Claude](https://console.anthropic.com/)
   - [Cohere](https://cohere.ai/)

2. **Configure AI Service**: Edit `client/js/ai-config.js`
```javascript
const API_KEYS = {
    openrouter: 'your-openrouter-key',
    openai: 'your-openai-key',
    claude: 'your-claude-key',
    cohere: 'your-cohere-key'
};

const CURRENT_AI_SERVICE = 'openrouter';
```

3. **Test Integration**: Open `client/chatbot.html` and start chatting!

For detailed AI setup instructions, see [AI_SETUP.md](client/AI_SETUP.md).

## 🎯 How to Use

### Getting Started
1. **Login**: Enter your name to access the platform
2. **Explore**: Navigate through the 3D shopping environment
3. **Try Products**: Use virtual try-on for clothes and accessories
4. **Shop Together**: Create or join shopping rooms with friends

### Virtual Try-On
1. Navigate to the "Virtual Try-On" section
2. Allow camera permissions
3. Select a product category (shirts, pants, shoes, etc.)
4. See the product fitted on you in real-time

### Real-Time Shopping Rooms
1. **Create Room**: Click "Room" → "Create New Room"
2. **Share Code**: Share the 6-digit room code with friends
3. **Join Room**: Others can join using the room code
4. **Shop Together**: Share products and communicate in real-time

### AI Assistant
1. Click "AI Assistant" in the navigation
2. Ask questions about products, orders, or general help
3. Get personalized recommendations and support

## 🌐 Network Setup

### Local Network (Same WiFi)
1. Find your IP address:
   - **Windows**: `ipconfig`
   - **Mac/Linux**: `ifconfig`
2. Access from other devices: `http://YOUR_IP:3000`

### Internet Access (Different Networks)
1. Configure port forwarding on your router (port 3000)
2. Use your public IP address
3. Consider setting up a domain name

## 🔧 Configuration

### Environment Variables
```bash
PORT=3000
NODE_ENV=production
```

### AI Service Configuration
Edit `client/js/ai-config.js` to customize:
- AI model selection
- Response parameters
- System prompts
- Rate limiting

## 🐛 Troubleshooting

### Common Issues

**Server Won't Start**
- Check if port 3000 is already in use
- Try a different port: `PORT=3001 npm start`

**Can't Access from Other Devices**
- Check firewall settings
- Ensure devices are on the same network
- Verify the IP address is correct

**Video/Audio Not Working**
- Check browser permissions for camera/microphone
- Try refreshing the page
- Ensure HTTPS is used (required for media in some browsers)

**AI Assistant Issues**
- Verify API key is correctly configured
- Check internet connection
- Ensure sufficient API credits

### Browser Compatibility
- ✅ **Chrome**: Full support
- ✅ **Firefox**: Full support
- ✅ **Safari**: Full support
- ✅ **Edge**: Full support
- ⚠️ **Mobile Browsers**: Limited video streaming support

## 🔒 Security Considerations

- **Room Codes**: 6-digit codes provide basic security
- **API Keys**: Store securely using environment variables
- **HTTPS**: Use HTTPS in production for secure connections
- **Input Validation**: Server validates all inputs
- **Rate Limiting**: Implement rate limiting for API endpoints

## 🚀 Production Deployment

### 1. Environment Setup
```bash
NODE_ENV=production
PORT=3000
```

### 2. Process Manager (PM2)
```bash
npm install -g pm2
pm2 start room-server.js
```

### 3. Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. SSL Certificate
Install SSL certificate for HTTPS support

## 📁 Project Structure

```
Meesho-verse/
├── client/                 # Frontend application
│   ├── assets/            # 3D models, textures, images
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── src/               # Source code
│   │   ├── character/     # Character models and controllers
│   │   ├── env/           # Environment and rendering
│   │   ├── shop/          # Shopping functionality
│   │   ├── tryon/         # Virtual try-on system
│   │   └── video/         # Video/audio streaming
│   └── *.html             # HTML pages
├── server/                # Backend server
│   ├── room-server.js     # Real-time room server
│   ├── server.js          # Main server
│   └── package.json       # Server dependencies
├── SETUP_GUIDE.md         # Detailed setup instructions
├── AI_SETUP.md           # AI integration guide
└── README.md             # This file
```

## 🔌 API Endpoints

### Room Management
- `POST /api/rooms` - Create a new room
- `GET /api/rooms/:code` - Get room information
- `POST /api/rooms/:code/join` - Join a room

### Socket.IO Events
- `join-room` - Join a room
- `leave-room` - Leave a room
- `share-product` - Share a product
- `remove-product` - Remove a product
- `chat-message` - Send chat message

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues or questions:
1. Check the browser console for error messages
2. Review the server console for error logs
3. Verify all dependencies are installed correctly
4. Ensure proper network connectivity
5. Check the troubleshooting section above

## 📞 Contact

- **Project**: Meesho-verse AI
- **Team**: Wally-verse Team
- **Documentation**: See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup instructions

---

**Experience the future of shopping with Meesho-verse AI! 🛒✨**