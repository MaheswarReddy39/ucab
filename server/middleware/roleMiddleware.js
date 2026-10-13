// Must run after authMiddleware, which sets req.user from the JWT
const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Access Denied. Insufficient Permissions",
    });
  }

  next();
};

module.exports = authorizeRoles;
