import { getCollection, addItem } from '../services/mockDataService.js';

export const signup = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  const users = getCollection('users');
  const exists = users.some((user) => user.email.toLowerCase() === String(email).toLowerCase());

  if (exists) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const newUser = {
    id: `user_${Date.now()}`,
    name,
    email,
    role: 'user',
    password,
  };

  addItem('users', newUser);

  const { password: _password, ...safeUser } = newUser;
  return res.status(201).json({ user: safeUser, token: `mock-token-${newUser.id}` });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const users = getCollection('users');
  const user = users.find(
    (entry) => entry.email.toLowerCase() === String(email).toLowerCase() && entry.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const { password: _password, ...safeUser } = user;
  return res.json({ user: safeUser, token: `mock-token-${user.id}` });
};
