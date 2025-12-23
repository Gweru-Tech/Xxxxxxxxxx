// X-Coder Store JavaScript

// State Management
const state = {
    services: [],
    cart: [],
    isAdmin: false,
    currentSong: null,
    storeSettings: {
        name: 'X-Coder Store',
        author: 'Mr Ntando Ofc',
        logo: 'images/logo.png'
    }
};

// DOM Elements
const elements = {
    servicesGrid: document.getElementById('servicesGrid'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    cartCount: document.querySelector('.cart-count'),
    adminLoginModal: document.getElementById('adminLoginModal'),
    adminPanel: document.getElementById('adminPanel'),
    adminLoginForm: document.getElementById('adminLoginForm'),
    serviceForm: document.getElementById('serviceForm'),
    servicesList: document.getElementById('servicesList'),
    bgMusic: document.getElementById('bgMusic'),
    musicBtn: document.getElementById('musicBtn'),
    storeLogo: document.getElementById('storeLogo')
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadServices();
    loadCart();
    loadStoreSettings();
});

function initializeApp() {
    // Load saved data from localStorage
    const savedServices = localStorage.getItem('xcoder_services');
    const savedSettings = localStorage.getItem('xcoder_settings');
    
    if (savedServices) {
        state.services = JSON.parse(savedServices);
    }
    
    if (savedSettings) {
        state.storeSettings = { ...state.storeSettings, ...JSON.parse(savedSettings) };
    }

    // Initialize default services if none exist
    if (state.services.length === 0) {
        initializeDefaultServices();
    }

    // Load saved music if exists
    const savedMusic = localStorage.getItem('xcoder_bgMusic');
    if (savedMusic) {
        elements.bgMusic.src = savedMusic;
        state.currentSong = savedMusic;
    }
}

function initializeDefaultServices() {
    const defaultServices = [
        {
            id: 1,
            name: 'Web Development',
            description: 'Custom websites built with modern technologies',
            price: 999.99,
            category: 'Development',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400'
        },
        {
            id: 2,
            name: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications',
            price: 1499.99,
            category: 'Development',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400'
        },
        {
            id: 3,
            name: 'UI/UX Design',
            description: 'Beautiful and functional user interface designs',
            price: 799.99,
            category: 'Design',
            image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400'
        },
        {
            id: 4,
            name: 'SEO Optimization',
            description: 'Improve your search engine rankings',
            price: 499.99,
            category: 'Marketing',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
        }
    ];

    state.services = defaultServices;
    saveServices();
}

function setupEventListeners() {
    // Navigation
    setupNavigation();
    
    // Cart functionality
    setupCart();
    
    // Admin functionality
    setupAdmin();
    
    // Music controls
    setupMusic();
    
    // Forms
    setupForms();
}

function setupNavigation() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

function setupCart() {
    // Cart toggle
    const cartLink = document.querySelector('.cart-link');
    const cartSection = document.getElementById('cart');
    
    cartLink.addEventListener('click', function(e) {
        e.preventDefault();
        cartSection.classList.toggle('hidden');
    });

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', handleCheckout);
}

function setupAdmin() {
    // Admin login modal
    const adminLoginBtn = document.querySelector('a[href="#admin-login"]');
    const closeBtn = document.querySelector('.close');
    const logoutBtn = document.getElementById('logoutBtn');
    
    adminLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        elements.adminLoginModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        elements.adminLoginModal.style.display = 'none';
    });
    
    logoutBtn.addEventListener('click', handleLogout);
    
    // Admin login form
    elements.adminLoginForm.addEventListener('submit', handleAdminLogin);
    
    // Admin tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function setupMusic() {
    let isPlaying = false;
    
    elements.musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            elements.bgMusic.pause();
            this.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            elements.bgMusic.play().catch(e => {
                console.log('Music play failed:', e);
            });
            this.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
}

function setupForms() {
    // Service form
    elements.serviceForm.addEventListener('submit', handleAddService);
    
    // File uploads
    const logoUpload = document.getElementById('logoUpload');
    const musicUpload = document.getElementById('musicUpload');
    const uploadLogoBtn = document.getElementById('uploadLogoBtn');
    const uploadMusicBtn = document.getElementById('uploadMusicBtn');
    
    if (uploadLogoBtn) {
        uploadLogoBtn.addEventListener('click', handleLogoUpload);
    }
    
    if (uploadMusicBtn) {
        uploadMusicBtn.addEventListener('click', handleMusicUpload);
    }
}

// Service Management
function loadServices() {
    renderServices();
    renderAdminServices();
}

function renderServices() {
    if (!elements.servicesGrid) return;
    
    elements.servicesGrid.innerHTML = '';
    
    state.services.forEach(service => {
        const serviceCard = createServiceCard(service);
        elements.servicesGrid.appendChild(serviceCard);
    });
}

function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
        <img src="${service.image}" alt="${service.name}" class="service-image">
        <h3 class="service-name">${service.name}</h3>
        <p class="service-description">${service.description}</p>
        <div class="service-category">${service.category}</div>
        <div class="service-price">$${service.price.toFixed(2)}</div>
        <button class="btn btn-primary add-to-cart" data-service-id="${service.id}">
            Add to Cart
        </button>
    `;
    
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => addToCart(service));
    
    return card;
}

function handleAddService(e) {
    e.preventDefault();
    
    const name = document.getElementById('serviceName').value;
    const description = document.getElementById('serviceDescription').value;
    const price = parseFloat(document.getElementById('servicePrice').value);
    const category = document.getElementById('serviceCategory').value;
    const imageFile = document.getElementById('serviceImage').files[0];
    
    const newService = {
        id: Date.now(),
        name,
        description,
        price,
        category,
        image: imageFile ? URL.createObjectURL(imageFile) : `https://picsum.photos/seed/${name}/400/300.jpg`
    };
    
    state.services.push(newService);
    saveServices();
    renderServices();
    renderAdminServices();
    
    elements.serviceForm.reset();
    showMessage('Service added successfully!', 'success');
}

function renderAdminServices() {
    if (!elements.servicesList) return;
    
    elements.servicesList.innerHTML = '<h4>Existing Services</h4>';
    
    state.services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
            <div class="service-item-info">
                <strong>${service.name}</strong> - $${service.price.toFixed(2)}
            </div>
            <div class="service-item-actions">
                <button class="btn btn-small btn-danger remove-service" data-service-id="${service.id}">
                    Remove
                </button>
            </div>
        `;
        
        const removeBtn = serviceItem.querySelector('.remove-service');
        removeBtn.addEventListener('click', () => removeService(service.id));
        
        elements.servicesList.appendChild(serviceItem);
    });
}

function removeService(serviceId) {
    state.services = state.services.filter(service => service.id !== serviceId);
    saveServices();
    renderServices();
    renderAdminServices();
    showMessage('Service removed successfully!', 'info');
}

function saveServices() {
    localStorage.setItem('xcoder_services', JSON.stringify(state.services));
}

// Cart Management
function loadCart() {
    const savedCart = localStorage.getItem('xcoder_cart');
    if (savedCart) {
        state.cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

function addToCart(service) {
    const existingItem = state.cart.find(item => item.id === service.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            ...service,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showMessage(`${service.name} added to cart!`, 'success');
}

function removeFromCart(serviceId) {
    state.cart = state.cart.filter(item => item.id !== serviceId);
    saveCart();
    updateCartUI();
}

function updateQuantity(serviceId, change) {
    const item = state.cart.find(item => item.id === serviceId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(serviceId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('xcoder_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
    if (!elements.cartItems) return;
    
    elements.cartItems.innerHTML = '';
    let total = 0;
    
    if (state.cart.length === 0) {
        elements.cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
    } else {
        state.cart.forEach(item => {
            const cartItem = createCartItem(item);
            elements.cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });
    }
    
    if (elements.cartTotal) {
        elements.cartTotal.textContent = total.toFixed(2);
    }
    
    if (elements.cartCount) {
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        elements.cartCount.textContent = totalItems;
    }
}

function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
        <button class="btn btn-small btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    return cartItem;
}

function handleCheckout() {
    if (state.cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }
    
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `Order total: $${total.toFixed(2)}\n\nThank you for your purchase from X-Coder Store!\nAuthor: Mr Ntando Ofc`;
    
    if (confirm(message)) {
        state.cart = [];
        saveCart();
        updateCartUI();
        showMessage('Order placed successfully! Thank you for your purchase.', 'success');
        document.getElementById('cart').classList.add('hidden');
    }
}

// Admin Functions
function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === 'Ntando' && password === 'Ntando') {
        state.isAdmin = true;
        elements.adminLoginModal.style.display = 'none';
        elements.adminPanel.classList.add('active');
        showMessage('Admin login successful!', 'success');
    } else {
        showMessage('Invalid credentials!', 'error');
    }
}

function handleLogout() {
    state.isAdmin = false;
    elements.adminPanel.classList.remove('active');
    showMessage('Logged out successfully!', 'info');
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const activeTab = document.getElementById(tabName + 'Tab');
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

function handleLogoUpload() {
    const fileInput = document.getElementById('logoUpload');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const logoData = e.target.result;
            localStorage.setItem('xcoder_logo', logoData);
            
            if (elements.storeLogo) {
                elements.storeLogo.src = logoData;
            }
            
            state.storeSettings.logo = logoData;
            saveStoreSettings();
            showMessage('Logo uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

function handleMusicUpload() {
    const fileInput = document.getElementById('musicUpload');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const musicData = e.target.result;
            localStorage.setItem('xcoder_bgMusic', musicData);
            
            if (elements.bgMusic) {
                elements.bgMusic.src = musicData;
            }
            
            state.currentSong = musicData;
            showMessage('Background music uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

function loadStoreSettings() {
    const savedLogo = localStorage.getItem('xcoder_logo');
    if (savedLogo && elements.storeLogo) {
        elements.storeLogo.src = savedLogo;
        state.storeSettings.logo = savedLogo;
    }
}

function saveStoreSettings() {
    localStorage.setItem('xcoder_settings', JSON.stringify(state.storeSettings));
}

// Utility Functions
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Position message at top
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.zIndex = '9999';
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Window click handler to close modal
window.addEventListener('click', function(event) {
    if (event.target === elements.adminLoginModal) {
        elements.adminLoginModal.style.display = 'none';
    }
});

// Export functions for global access
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;