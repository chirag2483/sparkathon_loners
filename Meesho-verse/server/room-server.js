const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Store active rooms and users
const activeRooms = new Map();
const connectedUsers = new Map();

// Serve the client files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/room-creator', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/room-creator.html'));
});

app.get('/room', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/room.html'));
});

// API Routes
app.post('/api/rooms', (req, res) => {
    const { name, description, creator } = req.body;
    const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const room = {
        id: Date.now().toString(),
        code: roomCode,
        name: name,
        description: description,
        creator: creator,
        createdAt: new Date().toISOString(),
        participants: [creator],
        sharedProducts: []
    };
    
    activeRooms.set(roomCode, room);
    
    res.json({
        success: true,
        room: room
    });
});

app.get('/api/rooms/:code', (req, res) => {
    const roomCode = req.params.code;
    const room = activeRooms.get(roomCode);
    
    if (room) {
        res.json({
            success: true,
            room: room
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Room not found'
        });
    }
});

app.post('/api/rooms/:code/join', (req, res) => {
    const roomCode = req.params.code;
    const { username } = req.body;
    const room = activeRooms.get(roomCode);
    
    if (room) {
        if (!room.participants.includes(username)) {
            room.participants.push(username);
        }
        res.json({
            success: true,
            room: room
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Room not found'
        });
    }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Join room
    socket.on('join-room', (data) => {
        const { roomCode, username } = data;
        const room = activeRooms.get(roomCode);
        
        if (room) {
            socket.join(roomCode);
            connectedUsers.set(socket.id, { username, roomCode });
            
            // Add user to room participants if not already there
            if (!room.participants.includes(username)) {
                room.participants.push(username);
            }
            
            // Notify all users in the room about the new participant
            io.to(roomCode).emit('participant-joined', {
                username: username,
                participants: room.participants
            });
            
            // Send current room state to the new user
            socket.emit('room-state', {
                room: room,
                participants: room.participants
            });
            
            console.log(`${username} joined room ${roomCode}`);
        } else {
            socket.emit('room-not-found', { message: 'Room not found' });
        }
    });
    
    // Handle video/audio streams
    socket.on('video-stream', (data) => {
        const { roomCode, stream } = data;
        socket.to(roomCode).emit('video-stream', {
            userId: socket.id,
            stream: stream
        });
    });
    
    socket.on('audio-stream', (data) => {
        const { roomCode, stream } = data;
        socket.to(roomCode).emit('audio-stream', {
            userId: socket.id,
            stream: stream
        });
    });
    
    // Handle product sharing
    socket.on('share-product', (data) => {
        const { roomCode, product } = data;
        const room = activeRooms.get(roomCode);
        
        if (room) {
            const sharedProduct = {
                ...product,
                sharedBy: connectedUsers.get(socket.id)?.username || 'Unknown',
                sharedAt: new Date().toISOString()
            };
            
            room.sharedProducts.push(sharedProduct);
            
            // Notify all users in the room about the shared product
            io.to(roomCode).emit('product-shared', sharedProduct);
        }
    });
    
    // Handle product removal (only room creator)
    socket.on('remove-product', (data) => {
        const { roomCode, productIndex } = data;
        const room = activeRooms.get(roomCode);
        const user = connectedUsers.get(socket.id);
        
        if (room && user && room.creator === user.username) {
            if (room.sharedProducts[productIndex]) {
                const removedProduct = room.sharedProducts.splice(productIndex, 1)[0];
                io.to(roomCode).emit('product-removed', {
                    productIndex: productIndex,
                    removedProduct: removedProduct
                });
            }
        } else {
            socket.emit('permission-denied', { message: 'Only room creator can remove products' });
        }
    });
    
    // Handle chat messages
    socket.on('chat-message', (data) => {
        const { roomCode, message } = data;
        const user = connectedUsers.get(socket.id);
        
        if (user) {
            io.to(roomCode).emit('chat-message', {
                username: user.username,
                message: message,
                timestamp: new Date().toISOString()
            });
        }
    });
    
    // Handle user leaving
    socket.on('leave-room', () => {
        const user = connectedUsers.get(socket.id);
        if (user) {
            const room = activeRooms.get(user.roomCode);
            if (room) {
                // Remove user from participants
                const index = room.participants.indexOf(user.username);
                if (index > -1) {
                    room.participants.splice(index, 1);
                }
                
                // Notify other users
                socket.to(user.roomCode).emit('participant-left', {
                    username: user.username,
                    participants: room.participants
                });
            }
            
            connectedUsers.delete(socket.id);
        }
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
        const user = connectedUsers.get(socket.id);
        if (user) {
            const room = activeRooms.get(user.roomCode);
            if (room) {
                // Remove user from participants
                const index = room.participants.indexOf(user.username);
                if (index > -1) {
                    room.participants.splice(index, 1);
                }
                
                // Notify other users
                socket.to(user.roomCode).emit('participant-left', {
                    username: user.username,
                    participants: room.participants
                });
            }
            
            connectedUsers.delete(socket.id);
            console.log('User disconnected:', user.username);
        }
    });
});

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log(`Access the application at: http://localhost:${PORT}`);
// }); 

const PORT =  3000;
const HOST = '0.0.0.0'; // Listen on all network interfaces
server.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the application at: http://localhost:${PORT}`);
    console.log(`Network access: http://[YOUR_IP_ADDRESS]:${PORT}`);
     });