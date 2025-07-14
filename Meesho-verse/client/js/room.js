class Room {
    constructor() {
        this.currentUser = localStorage.getItem('user') || 'Anonymous';
        this.roomData = this.getRoomDataFromURL();
        this.participants = [];
        this.myVideoStream = null;
        this.myAudioStream = null;
        this.isVideoOn = false;
        this.isAudioOn = false;
        this.sharedProducts = [];
        this.productDatabase = this.initializeProductDatabase();
        this.socket = null;
        
        this.initializeElements();
        this.bindEvents();
        this.setupLoginLogout();
        this.loadRoomData();
        this.initializeSocket();
    }

    initializeElements() {
        // Video elements
        this.myVideo = document.getElementById('my-video');
        this.myVideoPlaceholder = document.getElementById('my-video-placeholder');
        this.myVideoToggle = document.getElementById('my-video-toggle');
        this.myVideoIcon = document.getElementById('my-video-icon');
        this.myMicToggle = document.getElementById('my-mic-toggle');
        this.myMicIcon = document.getElementById('my-mic-icon');
        
        // Room elements
        this.roomName = document.getElementById('room-name');
        this.roomCode = document.getElementById('room-code');
        this.exitRoomBtn = document.getElementById('exit-room-btn');
        this.videoGrid = document.getElementById('video-grid');
        this.participantsList = document.getElementById('participants-list');
        this.participantCount = document.getElementById('participant-count');
        
        // Search elements
        this.productSearch = document.getElementById('product-search');
        this.searchBtn = document.getElementById('search-btn');
        this.searchResults = document.getElementById('search-results');
        this.noSearchMessage = document.getElementById('no-search-message');
        
        // Shared products elements
        this.sharedProductsList = document.getElementById('shared-products-list');
        this.noSharedMessage = document.getElementById('no-shared-message');
        
        // Modal elements
        this.productModal = document.getElementById('product-modal');
        this.exitRoomModal = document.getElementById('exit-room-modal');
        this.modalProductName = document.getElementById('modal-product-name');
        this.modalProductImage = document.getElementById('modal-product-image');
        this.modalProductDescription = document.getElementById('modal-product-description');
        this.modalProductPrice = document.getElementById('modal-product-price');
        this.addToCartBtn = document.getElementById('add-to-cart-btn');
        this.shareProductBtn = document.getElementById('share-product-btn');
        this.cancelProduct = document.getElementById('cancel-product');
        this.closeProductModal = document.getElementById('close-product-modal');
        this.confirmExit = document.getElementById('confirm-exit');
        this.cancelExit = document.getElementById('cancel-exit');
        this.closeExitModal = document.getElementById('close-exit-modal');
    }

    bindEvents() {
        // Video controls
        this.myVideoToggle.addEventListener('click', () => this.toggleVideo());
        this.myMicToggle.addEventListener('click', () => this.toggleAudio());
        
        // Room controls
        this.exitRoomBtn.addEventListener('click', () => this.showExitRoomModal());
        
        // Search functionality
        this.searchBtn.addEventListener('click', () => this.searchProducts());
        this.productSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchProducts();
        });
        
        // Modal events
        this.addToCartBtn.addEventListener('click', () => this.addToCart());
        this.shareProductBtn.addEventListener('click', () => this.shareProduct());
        this.cancelProduct.addEventListener('click', () => this.hideProductModal());
        this.closeProductModal.addEventListener('click', () => this.hideProductModal());
        this.confirmExit.addEventListener('click', () => this.exitRoom());
        this.cancelExit.addEventListener('click', () => this.hideExitRoomModal());
        this.closeExitModal.addEventListener('click', () => this.hideExitRoomModal());
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.productModal) this.hideProductModal();
            if (e.target === this.exitRoomModal) this.hideExitRoomModal();
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

    getRoomDataFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const roomCode = urlParams.get('code');
        const roomName = urlParams.get('name');
        
        if (!roomCode) {
            // Redirect to room creator if no room code
            window.location.href = './room-creator.html';
            return null;
        }
        
        return {
            code: roomCode,
            name: roomName || 'Room',
            id: Date.now().toString()
        };
    }

    loadRoomData() {
        if (!this.roomData) return;
        
        this.roomName.textContent = this.roomData.name;
        this.roomCode.textContent = this.roomData.code;
        
        // Load shared products from localStorage
        const storedSharedProducts = localStorage.getItem(`shared_products_${this.roomData.code}`);
        if (storedSharedProducts) {
            this.sharedProducts = JSON.parse(storedSharedProducts);
            this.updateSharedProducts();
        }
    }

    initializeSocket() {
        // Initialize Socket.IO connection
        this.socket = io();
        
        // Join the room
        this.socket.emit('join-room', {
            roomCode: this.roomData.code,
            username: this.currentUser
        });
        
        // Listen for room state updates
        this.socket.on('room-state', (data) => {
            this.participants = data.participants;
            this.updateParticipantsList();
            this.updateParticipantVideos();
        });
        
        // Listen for new participants joining
        this.socket.on('participant-joined', (data) => {
            this.participants = data.participants;
            this.updateParticipantsList();
            this.addParticipantVideo(data.username);
        });
        
        // Listen for participants leaving
        this.socket.on('participant-left', (data) => {
            this.participants = data.participants;
            this.updateParticipantsList();
            this.removeParticipantVideo(data.username);
        });
        
        // Listen for shared products
        this.socket.on('product-shared', (product) => {
            this.sharedProducts.push(product);
            this.updateSharedProducts();
            this.showNotification(`${product.name} shared by ${product.sharedBy}`, 'success');
        });
        
        // Listen for product removal
        this.socket.on('product-removed', (data) => {
            this.sharedProducts.splice(data.productIndex, 1);
            this.updateSharedProducts();
            this.showNotification(`${data.removedProduct.name} removed from shared products`, 'success');
        });
        
        // Listen for permission denied
        this.socket.on('permission-denied', (data) => {
            this.showNotification(data.message, 'error');
        });
        
        // Listen for room not found
        this.socket.on('room-not-found', (data) => {
            this.showNotification(data.message, 'error');
            setTimeout(() => {
                window.location.href = './room-creator.html';
            }, 2000);
        });
    }

    initializeParticipants() {
        // Add current user to participants
        this.participants = [this.currentUser];
        this.updateParticipantsList();
        
        // Add the three other participants: Manoj, Ansh, Chirag
        setTimeout(() => {
            this.addParticipant('Manoj');
        }, 1000);
        
        setTimeout(() => {
            this.addParticipant('Ansh');
        }, 2000);
        
        setTimeout(() => {
            this.addParticipant('Chirag');
        }, 3000);
    }

    addParticipant(name) {
        if (!this.participants.includes(name)) {
            this.participants.push(name);
            this.updateParticipantsList();
            this.addParticipantVideo(name);
        }
    }

    updateParticipantsList() {
        this.participantCount.textContent = this.participants.length;
        this.participantsList.innerHTML = '';
        
        this.participants.forEach(participant => {
            const participantItem = document.createElement('div');
            participantItem.className = 'participant-item';
            participantItem.textContent = participant;
            this.participantsList.appendChild(participantItem);
        });
    }

    addParticipantVideo(name) {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.id = `video-${name}`;
        
        videoContainer.innerHTML = `
            <div class="video-placeholder">
                <img src="assets/Icons/video.png" alt="Camera Off" class="placeholder-icon">
                <p>${name}'s camera is off</p>
            </div>
            <div class="video-overlay">
                <span class="participant-name">${name}</span>
                <div class="video-controls">
                    <button class="control-btn" disabled>
                        <img src="assets/Icons/video.png" alt="Camera">
                    </button>
                    <button class="control-btn" disabled>
                        <img src="assets/Icons/microphone.png" alt="Microphone">
                    </button>
                </div>
            </div>
        `;
        
        this.videoGrid.appendChild(videoContainer);
    }

    updateParticipantVideos() {
        // Clear existing participant videos (except my video)
        const existingVideos = this.videoGrid.querySelectorAll('.video-container:not(.my-video)');
        existingVideos.forEach(video => video.remove());
        
        // Add videos for all participants except current user
        this.participants.forEach(participant => {
            if (participant !== this.currentUser) {
                this.addParticipantVideo(participant);
            }
        });
    }

    removeParticipantVideo(name) {
        const videoElement = document.getElementById(`video-${name}`);
        if (videoElement) {
            videoElement.remove();
        }
    }

    async toggleVideo() {
        try {
            if (!this.isVideoOn) {
                // Turn on video
                this.myVideoStream = await navigator.mediaDevices.getUserMedia({ 
                    video: true, 
                    audio: false 
                });
                this.myVideo.srcObject = this.myVideoStream;
                this.myVideo.style.display = 'block';
                this.myVideoPlaceholder.style.display = 'none';
                this.myVideoToggle.classList.add('active');
                this.isVideoOn = true;
            } else {
                // Turn off video
                if (this.myVideoStream) {
                    this.myVideoStream.getTracks().forEach(track => track.stop());
                    this.myVideoStream = null;
                }
                this.myVideo.style.display = 'none';
                this.myVideoPlaceholder.style.display = 'flex';
                this.myVideoToggle.classList.remove('active');
                this.isVideoOn = false;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            this.showNotification('Error accessing camera. Please check permissions.', 'error');
        }
    }

    async toggleAudio() {
        try {
            if (!this.isAudioOn) {
                // Turn on audio
                this.myAudioStream = await navigator.mediaDevices.getUserMedia({ 
                    video: false, 
                    audio: true 
                });
                this.myMicToggle.classList.add('active');
                this.isAudioOn = true;
            } else {
                // Turn off audio
                if (this.myAudioStream) {
                    this.myAudioStream.getTracks().forEach(track => track.stop());
                    this.myAudioStream = null;
                }
                this.myMicToggle.classList.remove('active');
                this.isAudioOn = false;
            }
        } catch (error) {
            console.error('Error accessing microphone:', error);
            this.showNotification('Error accessing microphone. Please check permissions.', 'error');
        }
    }

    initializeProductDatabase() {
        return {
            pants: [
                {
                    id: 'pants1',
                    name: 'Classic Jeans',
                    brand: 'HIGHLANDER',
                    price: '₹899',
                    description: 'Slim fit classic jeans with comfortable stretch fabric.',
                    image: 'pants/Screenshot 2025-07-14 041652.png',
                    category: 'pants'
                },
                {
                    id: 'pants2',
                    name: 'Casual Pants',
                    brand: 'Roadster',
                    price: '₹1,199',
                    description: 'Tapered fit casual pants perfect for everyday wear.',
                    image: 'pants/Screenshot 2025-07-14 041742.png',
                    category: 'pants'
                },
                {
                    id: 'pants3',
                    name: 'Formal Trousers',
                    brand: 'U.S. Polo Assn.',
                    price: '₹1,499',
                    description: 'Regular fit formal trousers for professional settings.',
                    image: 'pants/Screenshot 2025-07-14 041754.png',
                    category: 'pants'
                },
                {
                    id: 'pants4',
                    name: 'Trendy Pants',
                    brand: 'Dennis Lingo',
                    price: '₹799',
                    description: 'Slim tapered fit trendy pants with modern styling.',
                    image: 'pants/Screenshot 2025-07-14 041807.png',
                    category: 'pants'
                }
            ],
            shirts: [
                {
                    id: 'shirt1',
                    name: 'Casual Shirt',
                    brand: 'Campus Sutra',
                    price: '₹599',
                    description: 'Slim fit casual shirt with breathable cotton fabric.',
                    image: 'shirts/Screenshot 2025-07-14 041904.png',
                    category: 'shirts'
                },
                {
                    id: 'shirt2',
                    name: 'Formal Shirt',
                    brand: 'Roadster',
                    price: '₹749',
                    description: 'Regular fit formal shirt for office and business meetings.',
                    image: 'shirts/Screenshot 2025-07-14 041916.png',
                    category: 'shirts'
                },
                {
                    id: 'shirt3',
                    name: 'Stylish Shirt',
                    brand: 'HIGHLANDER',
                    price: '₹699',
                    description: 'Slim fit stylish shirt with contemporary design.',
                    image: 'shirts/Screenshot 2025-07-14 041931.png',
                    category: 'shirts'
                },
                {
                    id: 'shirt4',
                    name: 'Trendy Shirt',
                    brand: 'The Indian Garage Co',
                    price: '₹650',
                    description: 'Regular fit trendy shirt with unique patterns.',
                    image: 'shirts/Screenshot 2025-07-14 041941.png',
                    category: 'shirts'
                }
            ],
            shoes: [
                {
                    id: 'shoes1',
                    name: 'Casual Sneakers',
                    brand: 'Nike',
                    price: '₹2,499',
                    description: 'Comfortable casual sneakers for everyday use.',
                    image: 'assets/Images/pic1.png',
                    category: 'shoes'
                }
            ]
        };
    }

    searchProducts() {
        const searchTerm = this.productSearch.value.trim().toLowerCase();
        
        if (!searchTerm) {
            this.showNotification('Please enter a search term.', 'error');
            return;
        }
        
        const results = [];
        
        // Search through all categories
        Object.values(this.productDatabase).forEach(category => {
            category.forEach(product => {
                if (product.name.toLowerCase().includes(searchTerm) ||
                    product.brand.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm)) {
                    results.push(product);
                }
            });
        });
        
        this.displaySearchResults(results);
        
        // Share search results with all participants (in a real app, this would be sent to server)
        this.showNotification(`Found ${results.length} products. Results shared with room participants.`, 'success');
    }

    displaySearchResults(results) {
        this.searchResults.innerHTML = '';
        
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="no-search-message">
                    <img src="assets/Icons/menu.svg" alt="No Results" class="search-icon">
                    <p>No products found</p>
                    <p>Try different search terms</p>
                </div>
            `;
            return;
        }
        
        const productGrid = document.createElement('div');
        productGrid.className = 'product-grid';
        
        results.forEach(product => {
            const productCard = this.createProductCard(product);
            productGrid.appendChild(productCard);
        });
        
        this.searchResults.appendChild(productGrid);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <div class="brand">${product.brand}</div>
            <div class="price">${product.price}</div>
            <div class="product-actions">
                <button class="product-action-btn add-to-cart-btn" onclick="room.addToCartFromCard('${product.id}')">
                    Add to Cart
                </button>
                <button class="product-action-btn share-btn" onclick="room.shareProductFromCard('${product.id}')">
                    Share
                </button>
            </div>
        `;
        
        return card;
    }

    addToCartFromCard(productId) {
        const product = this.findProductById(productId);
        if (product) {
            this.currentProduct = product;
            this.showProductModal();
        }
    }

    shareProductFromCard(productId) {
        const product = this.findProductById(productId);
        if (product) {
            this.shareProductToRoom(product);
        }
    }

    findProductById(productId) {
        for (const category of Object.values(this.productDatabase)) {
            const product = category.find(p => p.id === productId);
            if (product) return product;
        }
        return null;
    }

    showProductModal() {
        if (!this.currentProduct) return;
        
        this.modalProductName.textContent = this.currentProduct.name;
        this.modalProductImage.src = this.currentProduct.image;
        this.modalProductDescription.textContent = this.currentProduct.description;
        this.modalProductPrice.textContent = this.currentProduct.price;
        
        this.productModal.style.display = 'block';
    }

    hideProductModal() {
        this.productModal.style.display = 'none';
        this.currentProduct = null;
    }

    addToCart() {
        if (!this.currentProduct) return;
        
        // Get existing cart or create new one
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === this.currentProduct.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...this.currentProduct,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        this.showNotification(`${this.currentProduct.name} added to cart!`, 'success');
        this.hideProductModal();
    }

    shareProduct() {
        if (!this.currentProduct) return;
        
        this.shareProductToRoom(this.currentProduct);
        this.hideProductModal();
    }

    shareProductToRoom(product) {
        if (this.socket) {
            this.socket.emit('share-product', {
                roomCode: this.roomData.code,
                product: product
            });
        } else {
            // Fallback to localStorage if socket not available
            const sharedProduct = {
                ...product,
                sharedBy: this.currentUser,
                sharedAt: new Date().toISOString()
            };
            
            this.sharedProducts.push(sharedProduct);
            this.updateSharedProducts();
            localStorage.setItem(`shared_products_${this.roomData.code}`, JSON.stringify(this.sharedProducts));
            this.showNotification(`${product.name} shared with room participants!`, 'success');
        }
    }

    updateSharedProducts() {
        this.sharedProductsList.innerHTML = '';
        
        if (this.sharedProducts.length === 0) {
            this.noSharedMessage.style.display = 'block';
            return;
        }
        
        this.noSharedMessage.style.display = 'none';
        
        // Show most recent shared products first
        const recentProducts = this.sharedProducts.slice(-5).reverse();
        
        recentProducts.forEach(product => {
            const sharedItem = document.createElement('div');
            sharedItem.className = 'shared-product-item';
            
            sharedItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="shared-product-info">
                    <div class="shared-product-name">${product.name}</div>
                    <div class="shared-product-price">${product.price}</div>
                    <div class="shared-by">Shared by ${product.sharedBy}</div>
                </div>
            `;
            
            this.sharedProductsList.appendChild(sharedItem);
        });
    }

    removeSharedProduct(index) {
        if (!this.isRoomCreator) {
            this.showNotification('Only the room creator can remove shared products.', 'error');
            return;
        }
        
        if (index >= 0 && index < this.sharedProducts.length) {
            if (this.socket) {
                this.socket.emit('remove-product', {
                    roomCode: this.roomData.code,
                    productIndex: index
                });
            } else {
                // Fallback to local removal if socket not available
                const removedProduct = this.sharedProducts[index];
                this.sharedProducts.splice(index, 1);
                localStorage.setItem(`shared_products_${this.roomData.code}`, JSON.stringify(this.sharedProducts));
                this.updateSharedProducts();
                this.showNotification(`${removedProduct.name} removed from shared products.`, 'success');
            }
        }
    }

    showExitRoomModal() {
        this.exitRoomModal.style.display = 'block';
    }

    hideExitRoomModal() {
        this.exitRoomModal.style.display = 'none';
    }

    exitRoom() {
        // Stop all media streams
        if (this.myVideoStream) {
            this.myVideoStream.getTracks().forEach(track => track.stop());
        }
        if (this.myAudioStream) {
            this.myAudioStream.getTracks().forEach(track => track.stop());
        }
        
        // Disconnect from socket
        if (this.socket) {
            this.socket.emit('leave-room');
            this.socket.disconnect();
        }
        
        // Redirect to room creator
        window.location.href = './room-creator.html';
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

// Initialize the room when the page loads
let room;
document.addEventListener('DOMContentLoaded', () => {
    room = new Room();
});

// Handle page visibility change to stop media streams when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden && room) {
        if (room.myVideoStream) {
            room.myVideoStream.getTracks().forEach(track => track.stop());
            room.myVideoStream = null;
            room.myVideo.style.display = 'none';
            room.myVideoPlaceholder.style.display = 'flex';
            room.myVideoToggle.classList.remove('active');
            room.isVideoOn = false;
        }
        
        if (room.myAudioStream) {
            room.myAudioStream.getTracks().forEach(track => track.stop());
            room.myAudioStream = null;
            room.myMicToggle.classList.remove('active');
            room.isAudioOn = false;
        }
    }
}); 