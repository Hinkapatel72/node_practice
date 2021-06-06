
const jwt = require('jsonwebtoken');
const config = require('config');

//next we use to pass control to the next middleware function in the next request processing pipleline
function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token Provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  }
  catch(ex) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = auth;
