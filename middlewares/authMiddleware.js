const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];  // 'Bearer token' format

  if (!token) {
    return res.status(401).json({ msg: 'No token, access denied' });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    req.user = decoded;

    next();  // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
