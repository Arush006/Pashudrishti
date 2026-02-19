# Setup Instructions for Pashudrishti

## Prerequisites Required

Before starting, ensure you have installed:
1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MySQL Server** - [Download](https://dev.mysql.com/downloads/mysql/)
3. **Git** (optional) - [Download](https://git-scm.com/)

## Step-by-Step Setup

### Part 1: Backend Setup

#### 1.1 Navigate to Server Directory
```bash
cd server
```

#### 1.2 Install Dependencies
```bash
npm install
```

#### 1.3 Create MySQL Database

Open MySQL Command Line or MySQL Workbench:
```sql
CREATE DATABASE pashudrishti;
USE pashudrishti;
```

Then import the schema:
```bash
# From command line
mysql -u root -p pashudrishti < src/config/schema.sql

# Or paste the contents of src/config/schema.sql in MySQL Workbench
```

#### 1.4 Configure Environment Variables

Create a `.env` file in the `server` directory:
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

**Note:** Replace `password` with your actual MySQL password

#### 1.5 Start the Backend Server

```bash
# Development mode with nodemon
npm run dev

# Or with node
npm start
```

✅ Backend should be running on `http://localhost:5000`

Test it:
```bash
curl http://localhost:5000/api/health
# Should return: {"status": "Server is running"}
```

### Part 2: Frontend Setup

#### 2.1 Navigate to Client Directory

```bash
cd ../client
```

#### 2.2 Install Dependencies

```bash
npm install
```

#### 2.3 Configure Environment Variables

Create a `.env.local` file in the `client` directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### 2.4 Start the Development Server

```bash
npm start
```

✅ Frontend should open automatically at `http://localhost:3000`

If not, manually open: `http://localhost:3000`

## Testing the Application

### Login with Demo Credentials

**Admin Account:**
- Email: `admin@pashudrishti.com`
- Password: `password123`

**Doctor Account:**
- Email: `doctor@pashudrishti.com`
- Password: `password123`

**User Account:**
- Email: `user@pashudrishti.com`
- Password: `password123`

### Try Each Role's Features

1. **Admin Panel**
   - View dashboard statistics
   - Manage doctors (approve/suspend)
   - Restrict users
   - Add diseases
   - Send notifications

2. **Doctor Panel**
   - View case requests
   - Accept cases
   - Add diagnoses
   - View case history

3. **User Panel**
   - Submit a new case
   - Upload animal photo
   - See AI predictions
   - View available doctors
   - Track case status

## Common Issues & Solutions

### Issue: Port 5000 Already in Use

**Solution:**
```bash
# Find what's using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### Issue: MySQL Connection Error

**Check:**
1. MySQL service is running
2. Username and password are correct in `.env`
3. Database `pashudrishti` exists
4. No typos in DATABASE_URL

### Issue: CORS Error in Console

**Solution:**
- Make sure backend is running on `http://localhost:5000`
- Check `REACT_APP_API_URL` in frontend `.env` is correct

### Issue: nodemon Command Not Found

**Solution:**
```bash
npm install -g nodemon
# Or use: npm run dev instead of nodemon
```

### Issue: Port 3000 Already in Use

**Solution:**
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or change port
PORT=3001 npm start
```

## File Structure Explanation

```
server/
├── src/
│   ├── server.js           # Main server file
│   ├── config/
│   │   ├── database.js     # MySQL configuration
│   │   ├── cloudinary.js   # Image upload config
│   │   └── schema.sql      # Database schema
│   ├── middleware/
│   │   ├── auth.js         # JWT authentication
│   │   └── role.js         # Role-based access
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── doctorController.js
│   │   └── userController.js
│   └── routes/
│       ├── auth.js
│       ├── admin.js
│       ├── doctor.js
│       └── user.js
└── package.json

client/
├── src/
│   ├── components/
│   │   ├── Auth/           # Login component
│   │   ├── Admin/          # Admin pages
│   │   ├── Doctor/         # Doctor pages
│   │   ├── User/           # User pages
│   │   └── Shared/         # Sidebar, etc.
│   ├── services/
│   │   ├── api.js          # Axios setup
│   │   └── authService.js  # API calls
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Main styles
├── public/
│   └── index.html
├── package.json
└── tailwind.config.js
```

## Building for Production

### Backend Build
```bash
cd server
npm start
# Set NODE_ENV=production in .env
```

### Frontend Build
```bash
cd client
npm run build
# Creates optimized build in build/ folder
# Deploy contents to static hosting
```

## Environment Variables Explained

**Backend (.env):**
- `PORT` - Server port (default: 5000)
- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - Key for signing tokens
- `NODE_ENV` - Environment (development/production)
- `CLOUDINARY_*` - Image upload service credentials

**Frontend (.env.local):**
- `REACT_APP_API_URL` - Backend API URL

## Next Steps After Setup

1. Create admin user in database
2. Test all features with demo accounts
3. Configure Cloudinary for image uploads
4. Add Google Maps API key
5. Deploy to cloud platform

## Support

If you encounter issues:
1. Check that all ports are free
2. Verify database is running
3. Check console errors
4. Review `.env` files for typos
5. Ensure Node.js version is compatible

---

**Setup Complete! 🎉**

Your Pashudrishti application is now running locally!
