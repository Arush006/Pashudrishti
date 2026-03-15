# Pashudrishti - AI-Powered Animal Disease Detection Platform

A complete full-stack web application for animal disease detection with AI predictions, built with React, Node.js, and MySQL.

## 🎯 Project Overview

Pashudrishti (पशुदृष्टि) is an agricultural technology platform that helps farmers (users) detect and manage animal diseases through:
- **AI-powered diagnosis** based on symptom images
- **Expert consultation** with licensed veterinarians
- **Real-time case management** and treatment tracking
- **Admin panel** for platform management

## 📁 Project Structure

```
PashuDrishti/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Admin/
│   │   │   ├── Doctor/
│   │   │   ├── User/
│   │   │   └── Shared/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
└── server/                 # Node.js Backend
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── config/
    │   └── server.js
    └── package.json
```

## 🛠 Tech Stack

### Frontend
- **React 18** - UI Library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Recharts** - Data Visualization
- **Axios** - HTTP Client

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework
- **MySQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Cloudinary** - Image Upload

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16
- MySQL Server
- npm or yarn

### Backend Setup

1. **Navigate to server directory**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Create MySQL Database**
```bash
mysql -u root -p
CREATE DATABASE pashudrishti;
```

4. **Import schema**
```bash
mysql -u root -p pashudrishti < src/config/schema.sql
```

5. **Environment Setup**
Create `.env` file:
```
PORT=5000
DATABASE_URL=mysql2://root:password@localhost:3306/pashudrishti
JWT_SECRET=your_secret_key_pashudrishti_2026
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

6. **Start Server**
```bash
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup

1. **Navigate to client directory**
```bash
cd client
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create `.env.local` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start Development Server**
```bash
npm start
# App runs on http://localhost:3000
```

## 👥 User Roles

### 1. **Admin**
- Approve/suspend doctors
- Manage users and diseases
- View platform statistics
- Send notifications
- Location monitoring

### 2. **Doctor (Veterinarian)**
- View assigned case requests
- Add diagnosis and medication
- Track case performance
- View case history
- Mark cases as resolved

### 3. **User (Farmer)**
- Submit animal cases with photos
- Get AI predictions
- Consult with doctors
- Track case status
- View nearby veterinarians
- Manage profile

## 🔐 Authentication

Uses **JWT (JSON Web Tokens)**:
- Token stored in localStorage
- Auto-included in all API requests
- Automatic redirect to login on token expiry

## 📊 Key Features

### Dashboard Metrics
- Real-time statistics
- Performance charts
- Case distribution data
- Disease trends

### Case Management
- Photo upload with image processing
- AI disease prediction
- Doctor assignment
- Treatment tracking

### Communication
- Direct messaging between users and doctors
- Case updates and notifications
- Status tracking

### Admin Controls
- Doctor approval workflow
- User management
- Disease database
- Notification broadcasting

## 🎨 UI/UX

- **Blue Gradient Theme**: Primary (#2563eb) & Dark Blue (#1e40af)
- **Glassmorphism Design**: Modern card styles
- **Smooth Animations**: Framer Motion transitions
- **Responsive Layout**: Mobile-first design
- **Dark Mode Ready**: Compatible with system preferences

## 📱 Responsive Design

- **Mobile**: Full functionality on phones
- **Tablet**: Optimized touch interactions
- **Desktop**: Full-featured interface with sidebars

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET/POST /api/admin/doctors` - Doctor management
- `GET/POST /api/admin/users` - User management
- `GET/POST /api/admin/diseases` - Disease management

### Doctor
- `GET /api/doctor/dashboard` - Doctor dashboard
- `GET /api/doctor/case-requests` - New cases
- `PUT /api/doctor/cases/:id/diagnosis` - Add diagnosis
- `PUT /api/doctor/cases/:id/resolve` - Mark resolved

### User
- `GET /api/user/dashboard` - User dashboard
- `POST /api/user/cases` - Submit new case
- `GET /api/user/cases` - Get user's cases
- `GET /api/user/doctors` - Get available doctors

## 🗄️ Database Schema

### Tables
- `users` - User accounts
- `doctors` - Doctor profiles
- `cases` - Case records
- `animals` - Animal information
- `diseases` - Disease database
- `messages` - User-doctor communication
- `notifications` - System notifications

## 🔒 Security

- Password hashing with Bcrypt
- JWT authentication
- Role-based access control
- SQL injection prevention
- CORS configuration
- Environment variables for sensitive data

## 📝 Demo Credentials

```
Admin Login:
Email: admin@pashudrishti.com
Password: password123

Doctor Login:
Email: doctor@pashudrishti.com
Password: password123

User Login:
Email: user@pashudrishti.com
Password: password123
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy build/ folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Push to git
```

## 📦 Additional Integration Points

### Image Upload
- Configure Cloudinary API keys
- Enable image optimization

### Maps
- Add Google Maps API key
- Enable geolocation API

### Email Notifications
- Setup email service (SendGrid/AWS SES)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Database Connection Error
- Verify MySQL service is running
- Check credentials in `.env`
- Confirm database exists

### CORS Issues
- Check CORS in backend server.js
- Verify API URL in frontend .env

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://framer.com/motion)
- [MySQL Documentation](https://dev.mysql.com)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Created by PashuDrishti Development Team
Version: 1.0.0
Last Updated: February 2026

## 📧 Support

For issues and questions:
- Create an issue in the repository
- Contact: support@pashudrishti.com

---

**Happy Coding! 🚀**
