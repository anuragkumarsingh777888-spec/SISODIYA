import { getCollection } from '../services/mockDataService.js';

export const getUsers = (req, res) => {
  res.json(getCollection('users'));
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const users = getCollection('users');
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.json(user);
};
