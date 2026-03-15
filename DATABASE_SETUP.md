# Database Setup Instructions

## Prerequisites
- MySQL Server must be installed and running
- Node.js dependencies installed (`npm install` already completed)

## Setup Steps

### 1. Start MySQL Server
Make sure your MySQL server is running on localhost with the following credentials:
- **Host:** localhost
- **User:** root
- **Password:** password
- **Port:** 3306

If your MySQL is running on different credentials, update the `.env` file in the server folder accordingly.

### 2. Run Database Setup Script

Navigate to the server directory and run the setup command:

```bash
cd server
npm run setup
```

This script will:
- ✓ Create the `pashudrishti` database (if it doesn't exist)
- ✓ Create all necessary tables
- ✓ Insert demo user accounts with hashed passwords

### 3. Verify Setup

Once the setup completes successfully, you should see output like:

```
✓ Connected to MySQL
✓ Database created or already exists
✓ Database tables created or already exist
📝 Inserting demo users...
  ✓ Created user: admin@pashudrishti.com (Role: admin)
  ✓ Created user: doctor@pashudrishti.com (Role: doctor)
  ✓ Created user: user@pashudrishti.com (Role: user)
  ✓ Created doctor profile
✅ Database setup completed successfully!

🔐 Demo Credentials:
  Admin: admin@pashudrishti.com / password123
  Doctor: doctor@pashudrishti.com / password123
  User: user@pashudrishti.com / password123
```

## Starting the Application

### Start Backend Server:
```bash
cd server
npm start
# or for development with auto-reload:
npm run dev
```
The server will run on http://localhost:5000

### Start Frontend (in a new terminal):
```bash
cd client
npm start
```
The frontend will run on http://localhost:3000

## Testing Login

After both servers are running:

1. Open http://localhost:3000 in your browser
2. Use one of the demo credentials to login:
   - **Admin:** admin@pashudrishti.com / password123
   - **Doctor:** doctor@pashudrishti.com / password123
   - **User/Farmer:** user@pashudrishti.com / password123

## Troubleshooting

### "Connection refused" error
- Make sure MySQL Server is running
- Check the `.env` file has correct database credentials

### "Database already exists" warnings
- This is normal if you run setup multiple times
- Existing data will be preserved (setup won't overwrite existing users)

### "bcrypt" module not found
- Run `npm install` in the server directory to install missing dependencies

### "Access denied for user 'root'@'localhost'"
- Your MySQL credentials don't match
- Update the database.js file or .env file with correct credentials
- Or change MySQL root password to 'password'

## Database Structure

The setup creates these tables:
- **users** - Store all user accounts (admin, doctor, user)
- **doctors** - Doctor-specific information
- **animals** - Animal records
- **diseases** - Disease information
- **cases** - Treatment cases
- **messages** - Chat messages between users and doctors
- **notifications** - System notifications
- **visit_requests** - Vet visit requests

All tables are properly indexed for performance.
