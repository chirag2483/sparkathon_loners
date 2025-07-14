class RoomCreator {
    constructor() {
        this.rooms = JSON.parse(localStorage.getItem('rooms') || '[]');
        this.currentUser = localStorage.getItem('user') || 'Anonymous';
        this.webcamStream = null;
        this.microphoneStream = null;
        this.isWebcamOn = false;
        this.isMicrophoneOn = false;
        
        this.initializeElements();
        this.bindEvents();
        this.loadRooms();
        this.setupLoginLogout();
    }

    initializeElements() {
        // Webcam elements
        this.webcamVideo = document.getElementById('webcam-video');
        this.webcamPlaceholder = document.getElementById('webcam-placeholder');
        this.webcamToggle = document.getElementById('webcam-toggle');
        this.webcamIcon = document.getElementById('webcam-icon');
        this.webcamText = document.getElementById('webcam-text');
        
        // Microphone elements
        this.micToggle = document.getElementById('mic-toggle');
        this.micIcon = document.getElementById('mic-icon');
        this.micText = document.getElementById('mic-text');
        
        // Room management elements
        this.createRoomBtn = document.getElementById('create-room-btn');
        this.joinRoomBtn = document.getElementById('join-room-btn');
        this.roomList = document.getElementById('room-list');
        this.noRoomsMessage = document.getElementById('no-rooms-message');
        this.roomSearch = document.getElementById('room-search');
        
        // Modal elements
        this.createRoomModal = document.getElementById('create-room-modal');
        this.joinRoomModal = document.getElementById('join-room-modal');
        this.roomNameInput = document.getElementById('room-name-input');
        this.roomDescriptionInput = document.getElementById('room-description-input');
        this.roomCodeInput = document.getElementById('room-code-input');
        
        // Modal buttons
        this.createRoomConfirm = document.getElementById('create-room-confirm');
        this.joinRoomConfirm = document.getElementById('join-room-confirm');
        this.closeCreateModal = document.getElementById('close-create-modal');
        this.closeJoinModal = document.getElementById('close-join-modal');
        this.cancelCreate = document.getElementById('cancel-create');
        this.cancelJoin = document.getElementById('cancel-join');
    }

    bindEvents() {
        // Webcam controls
        this.webcamToggle.addEventListener('click', () => this.toggleWebcam());
        this.micToggle.addEventListener('click', () => this.toggleMicrophone());
        
        // Room management
        this.createRoomBtn.addEventListener('click', () => this.showCreateRoomModal());
        this.joinRoomBtn.addEventListener('click', () => this.showJoinRoomModal());
        this.roomSearch.addEventListener('input', (e) => this.filterRooms(e.target.value));
        
        // Modal events
        this.createRoomConfirm.addEventListener('click', () => this.createRoom());
        this.joinRoomConfirm.addEventListener('click', () => this.joinRoom());
        this.closeCreateModal.addEventListener('click', () => this.hideCreateRoomModal());
        this.closeJoinModal.addEventListener('click', () => this.hideJoinRoomModal());
        this.cancelCreate.addEventListener('click', () => this.hideCreateRoomModal());
        this.cancelJoin.addEventListener('click', () => this.hideJoinRoomModal());
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.createRoomModal) this.hideCreateRoomModal();
            if (e.target === this.joinRoomModal) this.hideJoinRoomModal();
        });
        
        // Enter key to confirm
        this.roomNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.createRoom();
        });
        this.roomCodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.joinRoom();
        });
    }

    setupLoginLogout() {
        const login = document.getElementById("login");
        const logout = document.getElementById("logout");
        
        // Check if user is logged in
        const user = localStorage.getItem("user");
        
        if (user) {
            // User is logged in
            login.innerHTML = user;
            logout.style.display = "inline-block";
            
            // Add logout functionality
            logout.addEventListener("click", () => {
                localStorage.removeItem("user");
                window.location.reload();
            });
        } else {
            // User is not logged in
            login.innerHTML = "Login";
            logout.style.display = "none";
            
            // Add login functionality
            login.addEventListener("click", () => {
                window.location.href = "./login.html";
            });
        }
    }

    async toggleWebcam() {
        try {
            if (!this.isWebcamOn) {
                // Turn on webcam
                this.webcamStream = await navigator.mediaDevices.getUserMedia({ 
                    video: true, 
                    audio: false 
                });
                this.webcamVideo.srcObject = this.webcamStream;
                this.webcamVideo.style.display = 'block';
                this.webcamPlaceholder.style.display = 'none';
                this.webcamToggle.classList.add('active');
                this.webcamText.textContent = 'Turn Off';
                this.isWebcamOn = true;
            } else {
                // Turn off webcam
                if (this.webcamStream) {
                    this.webcamStream.getTracks().forEach(track => track.stop());
                    this.webcamStream = null;
                }
                this.webcamVideo.style.display = 'none';
                this.webcamPlaceholder.style.display = 'flex';
                this.webcamToggle.classList.remove('active');
                this.webcamText.textContent = 'Turn On';
                this.isWebcamOn = false;
            }
        } catch (error) {
            console.error('Error accessing webcam:', error);
            this.showNotification('Error accessing webcam. Please check permissions.', 'error');
        }
    }

    async toggleMicrophone() {
        try {
            if (!this.isMicrophoneOn) {
                // Turn on microphone
                this.microphoneStream = await navigator.mediaDevices.getUserMedia({ 
                    video: false, 
                    audio: true 
                });
                this.micToggle.classList.add('active');
                this.micText.textContent = 'Turn Off';
                this.isMicrophoneOn = true;
            } else {
                // Turn off microphone
                if (this.microphoneStream) {
                    this.microphoneStream.getTracks().forEach(track => track.stop());
                    this.microphoneStream = null;
                }
                this.micToggle.classList.remove('active');
                this.micText.textContent = 'Turn On';
                this.isMicrophoneOn = false;
            }
        } catch (error) {
            console.error('Error accessing microphone:', error);
            this.showNotification('Error accessing microphone. Please check permissions.', 'error');
        }
    }

    generateRoomCode() {
        // Generate a unique 6-digit code
        let code;
        do {
            code = Math.floor(100000 + Math.random() * 900000).toString();
        } while (this.rooms.some(room => room.code === code));
        return code;
    }

    showCreateRoomModal() {
        this.createRoomModal.style.display = 'block';
        this.roomNameInput.focus();
    }

    hideCreateRoomModal() {
        this.createRoomModal.style.display = 'none';
        this.roomNameInput.value = '';
        this.roomDescriptionInput.value = '';
    }

    showJoinRoomModal() {
        this.joinRoomModal.style.display = 'block';
        this.roomCodeInput.focus();
    }

    hideJoinRoomModal() {
        this.joinRoomModal.style.display = 'none';
        this.roomCodeInput.value = '';
    }

    async createRoom() {
        const name = this.roomNameInput.value.trim();
        const description = this.roomDescriptionInput.value.trim();
        
        if (!name) {
            this.showNotification('Please enter a room name.', 'error');
            return;
        }
        
        try {
            const response = await fetch('/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    creator: this.currentUser
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                const newRoom = result.room;
                this.rooms.push(newRoom);
                this.saveRooms();
                this.loadRooms();
                this.hideCreateRoomModal();
                this.showNotification(`Room "${name}" created successfully! Code: ${newRoom.code}`, 'success');
            } else {
                this.showNotification('Failed to create room. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error creating room:', error);
            this.showNotification('Error creating room. Please check your connection.', 'error');
        }
    }

    async joinRoom() {
        const code = this.roomCodeInput.value.trim();
        
        if (!code || code.length !== 6) {
            this.showNotification('Please enter a valid 6-digit room code.', 'error');
            return;
        }
        
        try {
            const response = await fetch(`/api/rooms/${code}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.currentUser
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                const room = result.room;
                
                // Add to local rooms if not exists
                const existingRoom = this.rooms.find(r => r.code === code);
                if (!existingRoom) {
                    this.rooms.push(room);
                    this.saveRooms();
                }
                
                this.hideJoinRoomModal();
                this.showNotification(`Joined room "${room.name}" successfully!`, 'success');
                
                // Navigate to the room page
                setTimeout(() => {
                    window.location.href = `./room.html?code=${room.code}&name=${encodeURIComponent(room.name)}`;
                }, 500);
            } else {
                this.showNotification('Room not found. Please check the code.', 'error');
            }
        } catch (error) {
            console.error('Error joining room:', error);
            this.showNotification('Error joining room. Please check your connection.', 'error');
        }
    }

    deleteRoom(roomId) {
        const room = this.rooms.find(r => r.id === roomId);
        if (room && confirm(`Are you sure you want to delete room "${room.name}"?`)) {
            this.rooms = this.rooms.filter(r => r.id !== roomId);
            this.saveRooms();
            this.loadRooms();
            this.showNotification(`Room "${room.name}" deleted successfully!`, 'success');
        }
    }

    filterRooms(searchTerm) {
        const roomItems = this.roomList.querySelectorAll('.room-item');
        const noRoomsMessage = this.noRoomsMessage;
        
        let visibleCount = 0;
        
        roomItems.forEach(item => {
            const roomName = item.querySelector('.room-name').textContent.toLowerCase();
            const roomDescription = item.querySelector('.room-description').textContent.toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            
            if (roomName.includes(searchLower) || roomDescription.includes(searchLower)) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide no rooms message
        if (this.rooms.length === 0) {
            noRoomsMessage.style.display = 'flex';
        } else if (visibleCount === 0) {
            noRoomsMessage.style.display = 'flex';
            noRoomsMessage.querySelector('p:first-of-type').textContent = 'No rooms found';
            noRoomsMessage.querySelector('p:last-of-type').textContent = 'Try adjusting your search terms';
        } else {
            noRoomsMessage.style.display = 'none';
        }
    }

    loadRooms() {
        this.roomList.innerHTML = '';
        
        if (this.rooms.length === 0) {
            this.noRoomsMessage.style.display = 'flex';
            return;
        }
        
        this.noRoomsMessage.style.display = 'none';
        
        // Sort rooms by creation date (newest first)
        const sortedRooms = [...this.rooms].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        sortedRooms.forEach(room => {
            const roomElement = this.createRoomElement(room);
            this.roomList.appendChild(roomElement);
        });
    }

    createRoomElement(room) {
        const roomDiv = document.createElement('div');
        roomDiv.className = 'room-item';
        
        const createdAt = new Date(room.createdAt).toLocaleDateString();
        
        roomDiv.innerHTML = `
            <div class="room-item-header">
                <div class="room-name">${room.name}</div>
                <div class="room-code">${room.code}</div>
            </div>
            <div class="room-description">${room.description || 'No description'}</div>
            <div class="room-info">
                <small>Created by: ${room.creator} | ${createdAt}</small>
                <small>Participants: ${room.participants.length}</small>
            </div>
            <div class="room-actions">
                <button class="room-action-btn join-room-btn" onclick="roomCreator.joinRoomById('${room.id}')">
                    Join Room
                </button>
                <button class="room-action-btn delete-room-btn" onclick="roomCreator.deleteRoom('${room.id}')">
                    Delete
                </button>
            </div>
        `;
        
        return roomDiv;
    }

    joinRoomById(roomId) {
        const room = this.rooms.find(r => r.id === roomId);
        if (room) {
            if (!room.participants.includes(this.currentUser)) {
                room.participants.push(this.currentUser);
                this.saveRooms();
            }
            
            this.showNotification(`Joined room "${room.name}" successfully!`, 'success');
            
            // Navigate to the room page
            setTimeout(() => {
                window.location.href = `./room.html?code=${room.code}&name=${encodeURIComponent(room.name)}`;
            }, 500);
        }
    }

    saveRooms() {
        localStorage.setItem('rooms', JSON.stringify(this.rooms));
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 
                        type === 'error' ? 'linear-gradient(135deg, #dc3545, #fd7e14)' : 
                        'linear-gradient(135deg, #0071ce, #004f9a)'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the room creator when the page loads
let roomCreator;
document.addEventListener('DOMContentLoaded', () => {
    roomCreator = new RoomCreator();
});

// Handle page visibility change to stop media streams when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden && roomCreator) {
        if (roomCreator.webcamStream) {
            roomCreator.webcamStream.getTracks().forEach(track => track.stop());
            roomCreator.webcamStream = null;
            roomCreator.webcamVideo.style.display = 'none';
            roomCreator.webcamPlaceholder.style.display = 'flex';
            roomCreator.webcamToggle.classList.remove('active');
            roomCreator.webcamText.textContent = 'Turn On';
            roomCreator.isWebcamOn = false;
        }
        
        if (roomCreator.microphoneStream) {
            roomCreator.microphoneStream.getTracks().forEach(track => track.stop());
            roomCreator.microphoneStream = null;
            roomCreator.micToggle.classList.remove('active');
            roomCreator.micText.textContent = 'Turn On';
            roomCreator.isMicrophoneOn = false;
        }
    }
}); 