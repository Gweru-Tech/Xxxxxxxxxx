const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:", "https://images.unsplash.com", "https://picsum.photos"],
            mediaSrc: ["'self'", "data:"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            connectSrc: ["'self'"]
        }
    }
}));

app.use(compression());
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files serving
app.use(express.static(path.join(__dirname)));

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'X-Coder Store API is running',
        author: 'Mr Ntando Ofc',
        timestamp: new Date().toISOString()
    });
});

// Services API
app.get('/api/services', (req, res) => {
    res.json({ 
        services: [
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
        ]
    });
});

// Store configuration API
app.get('/api/config', (req, res) => {
    res.json({
        store: {
            name: 'X-Coder Store',
            author: 'Mr Ntando Ofc',
            description: 'Premium Digital Services & Solutions',
            contact: {
                email: 'info@xcoder.store',
                phone: '+1 (555) 123-4567'
            },
            currency: 'USD',
            timezone: 'UTC'
        },
        features: {
            shoppingCart: true,
            adminPanel: true,
            backgroundMusic: true,
            customLogo: true,
            responsiveDesign: true
        }
    });
});

// Subdomain handling for different store sections
app.use('/admin', (req, res, next) => {
    // Admin panel route - can be protected with additional middleware
    next();
});

app.use('/api', (req, res, next) => {
    // API routes
    next();
});

// Handle all other routes - serve the main app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 X-Coder Store server is running on port ${PORT}`);
    console.log(`📱 Store URL: http://localhost:${PORT}`);
    console.log(`👤 Author: Mr Ntando Ofc`);
    console.log(`🔧 Admin credentials: username=Ntando, password=Ntando`);
    console.log(`🌍 Ready for Render.com deployment`);
});

module.exports = app;