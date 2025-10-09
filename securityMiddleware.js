// securityMiddleware.js
const logRequestDetails = (req, res, next) => {
    console.log('[SECURITY GUARD]: A request was made for User ID:', req.params.id);
  
    // THE BONUS MISSION RULE: Check if the requested ID is the admin's (ID 1)
    if (req.params.id === '1') {
      console.log('[SECURITY GUARD]: ACCESS DENIED! Attempt to access admin profile.');
      // The 'return' is crucial to stop the function here and prevent errors.
      return res.status(403).json({ message: 'Forbidden: You cannot access the admin profile.' });
    }
  
    // If the rule is not triggered, let them pass to the main endpoint logic.
    next();
  };
  

  const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-super-secret-key-that-no-one-should-know';

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is malformed.' });
  }

  try {
    // This is the line that does all the work.
    const decodedPayload = jwt.verify(token, JWT_SECRET);

    // If verification is successful, the decoded payload is returned.
    // We attach this payload to the request object itself.
    req.user = decodedPayload;
    
    // We're authenticated! Pass the request to the actual endpoint.
    next();
  } catch (error) {
    // If jwt.verify fails, it will throw an error.
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { logRequestDetails, isAuthenticated };