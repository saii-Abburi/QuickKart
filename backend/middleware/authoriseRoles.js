const authoriseRoles = (...roles) => {
  return (req, res, next) => {
    console.log(roles , req.user.role);
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  };
};

module.exports = authoriseRoles;