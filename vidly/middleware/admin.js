
//401 Unauthorized - when the user tries to access a protected resource, but they don't supply a valid json web token
//403 Forbidden - IF they send a valid json web token and they are still not allowed to access the target resource that when we use 403
function auth(req, res, next) {
  if(!req.user.isAdmin) return res.status(403).send('Access denied!');

  next();
}

module.exports = auth;
