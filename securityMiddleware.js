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
  
  module.exports = { logRequestDetails };