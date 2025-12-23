# X-Coder Store 🏬

A premium e-commerce platform for digital services created by Mr Ntando Ofc. This store features a modern design with admin panel, shopping cart, background music, and full customization capabilities.

## 🚀 Features

- **Modern UI/UX Design** - Responsive, gradient-based design with smooth animations
- **Admin Panel** - Complete admin dashboard with login (username: Ntando, password: Ntando)
- **Service Management** - Add, edit, and remove services through admin panel
- **Shopping Cart** - Full cart functionality with checkout process
- **Background Music** - Upload and play background music
- **Custom Logo** - Upload custom store logo
- **Responsive Design** - Works perfectly on all devices
- **Subdomain Ready** - Configured for global deployment
- **Render.com Optimized** - Ready for one-click deployment

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with animations and gradients
- **Storage**: LocalStorage for client-side data persistence
- **Deployment**: Render.com optimized

## 📦 Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd x-coder-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Deployment

#### Render.com Deployment (Recommended)

1. **Push your code to GitHub**
2. **Create a new Render.com account**
3. **Connect your GitHub repository**
4. **Use the following settings:**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18
   - **Plan**: Free or Starter

5. **Configure environment variables** in Render dashboard
6. **Deploy** - Your store will be live at `https://your-app-name.onrender.com`

#### Custom Domain Setup

1. **Purchase a domain** (e.g., xcoder.store)
2. **Add domain** in Render.com dashboard
3. **Configure DNS records**:
   - A record: `your-domain.com` → Render IP
   - CNAME record: `www` → `your-app-name.onrender.com`

## 🔧 Configuration

### Admin Panel Access

- **URL**: Click "Admin Panel" button in the store
- **Username**: `Ntando`
- **Password**: `Ntando`

### Admin Panel Features

1. **Services Tab**
   - Add new services with name, description, price, category
   - Upload service images
   - Remove existing services

2. **Media Tab**
   - Upload store logo
   - Upload background music
   - Manage all media files

3. **Settings Tab**
   - Configure store name
   - Set contact information
   - Customize store settings

### Service Management

Default services include:
- Web Development - $999.99
- Mobile App Development - $1499.99
- UI/UX Design - $799.99
- SEO Optimization - $499.99

## 🎨 Customization

### Colors and Styling

Edit `css/style.css` to customize:
- Primary colors (variables at the top)
- Fonts and typography
- Animations and transitions
- Layout and spacing

### Store Information

Edit `js/script.js` to modify:
- Default services
- Store settings
- Admin credentials
- Cart functionality

## 📁 Project Structure

```
x-coder-store/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Complete styling
├── js/
│   └── script.js          # All JavaScript functionality
├── images/                # Store images and logos
├── uploads/               # User uploaded files (auto-created)
├── server.js              # Express server for deployment
├── package.json           # Node.js dependencies
├── render.yaml            # Render.com configuration
├── .env.example           # Environment variables template
└── README.md              # This file
```

## 🌐 Subdomain Configuration

The store is ready for subdomain deployment. You can set up:

- `store.yourdomain.com` - Main store
- `admin.yourdomain.com` - Admin panel (future enhancement)
- `api.yourdomain.com` - API endpoints (future enhancement)

## 🔒 Security Features

- Content Security Policy (CSP) headers
- Rate limiting protection
- CORS configuration
- Input validation
- Secure admin authentication

## 📱 Mobile Responsiveness

The store is fully responsive and works on:
- Desktop computers
- Tablets (iPad, Android tablets)
- Mobile phones (iPhone, Android)
- All screen sizes

## 🎵 Background Music

- Upload custom background music through admin panel
- Music controls in bottom-right corner
- Auto-loop functionality
- Support for MP3, WAV, OGG formats

## 🛒 Shopping Cart Features

- Add/remove items
- Quantity adjustment
- Real-time price calculation
- Cart persistence (localStorage)
- Checkout process

## 🚀 Performance Optimizations

- Image optimization
- CSS/JS minification ready
- Compression enabled
- Caching headers
- CDN ready

## 📞 Support

For support or questions:
- **Email**: info@xcoder.store
- **Author**: Mr Ntando Ofc
- **Documentation**: Check this README file

## 📄 License

This project is licensed under the MIT License - see the package.json file for details.

## 🔄 Updates

The store includes:
- Automatic service updates
- Dynamic content loading
- Real-time cart updates
- Admin panel changes apply immediately

---

**Created by Mr Ntando Ofc** | **X-Coder Store** | **© 2024**