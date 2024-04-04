const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const secretKey = process.env.JWT_SECRET_KEY;

// Middleware to authenticate the owner of the token or admin
function authenticateOwnerToken(req, res, next) {
  const token = req.cookies["access_token"];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return next(createError(403));
    if (
      user.id !== req.params.id &&
      user.id !== req.headers.post_person_id &&
      user.role !== "admin"
    )
      return next(createError(403));
    next();
  });
}

// Middleware to authenticate the user
function authenticateUserToken(req, res, next) {
  const token = req.cookies["access_token"];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, secretKey, (err) => {
    if (err) return next(createError(403));
    next();
  });
}

// Middleware to authenticate the admin
function authenticateAdminToken(req, res, next) {
  const token = req.cookies["access_token"];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return next(createError(403));
    if (user.role !== "admin") return next(createError(403));
    next();
  });
}

module.exports = {
  authenticateOwnerToken,
  authenticateUserToken,
  authenticateAdminToken,
};
