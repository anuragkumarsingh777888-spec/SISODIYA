export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  next();
};

export const requireAdmin = (req, res, next) => {
  const role = req.user?.role;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }

  next();
};
