import { createDocument, listDocuments } from '../services/firestoreService.js';

export const listReminders = async (req, res, next) => {
  try {
    res.json(await listDocuments('reminders'));
  } catch (error) {
    next(error);
  }
};

export const createReminder = async (req, res, next) => {
  const { title, date } = req.body;
  if (!title || !date) {
    return res.status(400).json({ message: 'Title and date are required.' });
  }

  try {
    const reminder = await createDocument('reminders', {
      title,
      date,
      reminder: req.body.reminder || 'Please review your vehicle maintenance.',
    });
    return res.status(201).json(reminder);
  } catch (error) {
    return next(error);
  }
};
