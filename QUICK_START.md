# 🚀 Quick Start - Complete Setup Guide

## System Requirements
- ✓ Node.js (v16 or higher)
- ✓ MySQL Server (running on localhost)
- ✓ npm (comes with Node.js)

## Step-by-Step Setup

### Phase 1: Database Setup (Required First!)

**1. Make sure MySQL is running:**
   - Windows: Start MySQL from Services or MySQL command line
   - Port should be 3306
   - Default credentials: root / password

**2. Open terminal in the project root (D:\PashuDrishti) and run:**

```bash
cd server
npm run setup
```

You should see output like:
```
✓ Connected to MySQL
✓ Database created or already exists
✓ Database tables created or already exist
✓ Created user: admin@pashudrishti.com (Role: admin)
✓ Created user: doctor@pashudrishti.com (Role: doctor)
✓ Created user: user@pashudrishti.com (Role: user)
✓ Created doctor profile
✅ Database setup completed successfully!
```

> ⚠️ **Important:** Wait for "Database setup completed successfully!" message before proceeding!

---

### Phase 2: Start Backend Server

**In the same terminal (in server folder), run:**

```bash
npm start
```

You should see:
```
Server running on port 5000
```

✓ Backend is now running!

---

### Phase 3: Start Frontend Server

**Open a NEW terminal window and navigate to client:**

```bash
cd client
npm start
```

The browser should automatically open at http://localhost:3000, or you can open it manually.

---

## Phase 4: Test Login

Once both servers are running and the browser shows the login page:

**Use any of these credentials to login:**

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@pashudrishti.com | password123 |
| Doctor | doctor@pashudrishti.com | password123 |
| Farmer/User | user@pashudrishti.com | password123 |

---

## ✅ What Should Happen After Login

- **Admin** → Redirects to Admin Dashboard
- **Doctor** → Redirects to Doctor Dashboard  
- **Farmer/User** → Redirects to User Dashboard

---

## 🔧 Troubleshooting

### Issue: "Database setup failed" or MySQL connection error
**Solution:** 
- Check MySQL is running: `mysql -u root -p`
- If password is not "password", edit `server\src\config\database.js`
- Change: `password: 'password'` to your actual MySQL password

### Issue: Login still fails after setup
**Solution:**
- Check backend is running on port 5000
- Check frontend console for API errors (F12 → Console)
- Make sure database setup completed successfully with "✅" message

### Issue: Sidebar showing on login page (overlap)
**Solution:**
- The new code fixes this automatically
- Clear browser cache: Ctrl+Shift+Delete → Clear all → Refresh page

### Issue: "Cannot find module mysql2"
**Solution:**
```bash
cd server
npm install
```

### Issue: Port 5000 or 3000 already in use
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

---

## 📱 Features Available

### Admin Dashboard
- View all users
- Manage doctors
- System statistics
- User management

### Doctor Dashboard
- View assigned cases
- Add diagnosis
- Prescribe treatments
- Chat with farmers

### Farmer/User Dashboard
- Create disease cases
- Track animal health
- Upload images
- Chat with doctors

---

## 📚 Project Structure

```
PashuDrishti/
├── server/              # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/     # Database & Cloudinary config
│   │   ├── controllers/ # API logic
│   │   ├── routes/     # API endpoints
│   │   ├── middleware/ # Auth & other middleware
│   │   └── server.js   # Express app
│   ├── .env            # Database credentials
│   └── package.json
│
├── client/              # Frontend (React)
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   ├── App.jsx     # Main app component
│   │   └── main.jsx    # Entry point
│   ├── .env.local      # API URL config
│   └── package.json
│
└── DATABASE_SETUP.md   # Detailed setup instructions

```

---

## 🔑 Default Configuration

**Backend (.env):**
- PORT: 5000
- DATABASE: pashudrishti
- DB_USER: root
- DB_PASSWORD: password

**Frontend (.env.local):**
- REACT_APP_API_URL: http://localhost:5000

---

## ⚡ Command Quick Reference

```bash
# Database
npm run setup              # Setup database (do this first!)

# Backend
npm start                  # Run server
npm run dev               # Run with auto-reload

# Frontend  
npm start                 # Run React app (auto-opens browser)
npm run build             # Build for production

# Combined (from root folder with 2 terminals)
# Terminal 1:
cd server && npm start

# Terminal 2:
cd client && npm start
```

---

## ✨ Next Steps

1. ✓ Run `npm run setup` in server folder
2. ✓ Start backend with `npm start` in server folder
3. ✓ Start frontend with `npm start` in client folder
4. ✓ Login with demo credentials
5. ✓ Explore the dashboard

---

**Need Help?** Check `DATABASE_SETUP.md` for more detailed troubleshooting.
