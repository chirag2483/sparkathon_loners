# Wally-verse Real-time Room Setup Guide

This guide will help you set up real-time room functionality with multiple users connecting from different devices.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Modern web browser with camera/microphone permissions

## Installation Steps

### 1. Install Server Dependencies

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

### 2. Start the Server

Run the server in development mode:

```bash
npm run dev
```

Or in production mode:

```bash
npm start
```

The server will start on `http://localhost:3000`

### 3. Access the Application

Open your browser and go to:
- **Main Application**: `http://localhost:3000`
- **Room Creator**: `http://localhost:3000/room-creator`
- **Direct Room Access**: `http://localhost:3000/room?code=ROOMCODE&name=ROOMNAME`

## How to Use Real-time Rooms

### For Room Creator:

1. **Login**: Enter your name in the login field
2. **Create Room**: Click "Create New Room" and enter room details
3. **Share Code**: Share the 6-digit room code with others
4. **Join Room**: Click "Enter Room" to join your created room

### For Room Participants:

1. **Login**: Enter your name in the login field
2. **Join Room**: Click "Join Room" and enter the 6-digit code
3. **Enter Room**: Click "Join Room" to enter the shared room

## Features Available

### Real-time Features:
- **Live Participants**: See who's in the room in real-time
- **Video/Audio Controls**: Turn camera and microphone on/off
- **Product Sharing**: Share products with all participants
- **Product Removal**: Room creator can remove shared products
- **Instant Updates**: All changes appear immediately for all users

### Video Features:
- **Camera Controls**: Turn your camera on/off
- **Microphone Controls**: Turn your microphone on/off
- **Participant Videos**: See other participants' video feeds
- **Real-time Streaming**: Video streams are shared in real-time

### Product Features:
- **Product Search**: Search for pants, shirts, shoes
- **Add to Cart**: Add products to your shopping cart
- **Share Products**: Share products with room participants
- **Remove Products**: Room creator can remove shared products

## Network Setup for Multiple Devices

### Local Network (Same WiFi):

1. **Find Your IP Address**:
   - Windows: Run `ipconfig` in Command Prompt
   - Mac/Linux: Run `ifconfig` in Terminal
   - Look for your local IP (usually starts with 192.168.x.x or 10.0.x.x)

2. **Access from Other Devices**:
   - Other devices on the same WiFi can access: `http://YOUR_IP:3000`
   - Example: `http://192.168.1.100:3000`

### Internet Access (Different Networks):

For users on different networks to connect:

1. **Port Forwarding**: Configure your router to forward port 3000 to your computer
2. **Public IP**: Use your public IP address instead of localhost
3. **Domain**: Set up a domain name pointing to your server

## Troubleshooting

### Common Issues:

1. **Server Won't Start**:
   - Check if port 3000 is already in use
   - Try a different port by setting `PORT=3001` environment variable

2. **Can't Access from Other Devices**:
   - Check firewall settings
   - Ensure devices are on the same network
   - Verify the IP address is correct

3. **Video/Audio Not Working**:
   - Check browser permissions for camera/microphone
   - Try refreshing the page
   - Check if HTTPS is required (some browsers require secure connection for media)

4. **Socket Connection Issues**:
   - Check if the server is running
   - Verify the Socket.IO client is loading correctly
   - Check browser console for error messages

### Browser Compatibility:

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Limited support for video streaming

## Security Considerations

1. **Room Codes**: 6-digit codes provide basic security
2. **User Authentication**: Consider implementing proper user authentication
3. **HTTPS**: Use HTTPS in production for secure connections
4. **Input Validation**: Server validates all inputs
5. **Rate Limiting**: Consider implementing rate limiting for API endpoints

## Production Deployment

For production deployment:

1. **Environment Variables**:
   ```bash
   PORT=3000
   NODE_ENV=production
   ```

2. **Process Manager**: Use PM2 or similar
   ```bash
   npm install -g pm2
   pm2 start room-server.js
   ```

3. **Reverse Proxy**: Use Nginx or Apache as reverse proxy
4. **SSL Certificate**: Install SSL certificate for HTTPS
5. **Database**: Consider using a database instead of in-memory storage

## API Endpoints

### Room Management:
- `POST /api/rooms` - Create a new room
- `GET /api/rooms/:code` - Get room information
- `POST /api/rooms/:code/join` - Join a room

### Socket.IO Events:
- `join-room` - Join a room
- `leave-room` - Leave a room
- `share-product` - Share a product
- `remove-product` - Remove a product
- `chat-message` - Send chat message

## Support

For issues or questions:
1. Check the browser console for error messages
2. Check the server console for error logs
3. Verify all dependencies are installed correctly
4. Ensure proper network connectivity

## Example Usage Scenario

1. **Alice creates a room**:
   - Goes to `http://localhost:3000/room-creator`
   - Logs in as "Alice"
   - Creates room "Shopping Session"
   - Gets room code: 123456

2. **Bob joins the room**:
   - Goes to `http://localhost:3000/room-creator`
   - Logs in as "Bob"
   - Joins room with code: 123456
   - Enters the room

3. **Real-time interaction**:
   - Both see each other in the participants list
   - Both can share products
   - Both can see shared products
   - Alice (room creator) can remove products
   - Both can use video/audio controls 