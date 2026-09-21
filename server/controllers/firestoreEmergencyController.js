import { createDocument, listDocuments } from '../services/firestoreService.js';

export const listEmergencyRequests = async (req, res, next) => {
  try {
    res.json(await listDocuments('emergencyRequests'));
  } catch (error) {
    next(error);
  }
};

export const createEmergencyRequest = async (req, res, next) => {
  const { userId, location } = req.body;
  if (!userId || !location) {
    return res.status(400).json({ message: 'User ID and location are required.' });
  }

  try {
    const request = await createDocument('emergencyRequests', {
      userId,
      location,
      issue: req.body.issue || 'Emergency assistance requested',
      status: 'Pending',
      requestedAt: new Date().toISOString(),
    });
    return res.status(201).json({ message: 'Emergency request received.', request });
  } catch (error) {
    return next(error);
  }
};
