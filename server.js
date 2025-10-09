// server.js
const isAuthenticated = require('./securityMiddleware');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const jwt = require('jsonwebtoken');

// This secret key is used to sign our tokens. Keep it safe!
const JWT_SECRET = 'your-super-secret-key-that-no-one-should-know';

app.use(cors());
app.use(express.json());


// In-memory database - a simple array of users
const users = [
    { id: 1, username: 'admin', email: 'admin@pmc.com', role: 'admin', passwordHash: 'aVerySecureHash123' },
    { id: 2, username: 'emma', email: 'emma@example.com', role: 'user', passwordHash: 'anotherSecureHash456' },
    { id: 3, username: 'david', email: 'david@example.com', role: 'user', passwordHash: 'aThirdSecureHash789' }
];


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    if (username === 'emma' && password === 'password123') {
      // Login is successful. Create the payload for the token.
      const payload = {
        id: 2, // User's ID
        username: 'emma',
        role: 'user'
      };
  
      // Sign the token with our secret key
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  
      // Send the token back to the user
      return res.json({ message: 'Login successful!', token: token });
    }
  
    return res.status(401).json({ message: 'Invalid credentials' });
  });

// --- VULNERABLE ENDPOINTS ---

// VULNERABILITY 1: Broken Object Level Authorization (BOLA/IDOR)
// VULNERABILITY 2: Excessive Data Exposure
// Any user can request any other user's data, and the API returns sensitive info like email and passwordHash.
app.get('/api/users/:id', isAuthenticated, (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.get('/', (req, res) => {
    res.send('PMC Vulnerable API is running! Make requests to /api/users/:id');
});

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log('If you are in a CDE, use the forwarded public URL provided by your environment.');
});