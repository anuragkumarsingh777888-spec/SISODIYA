import { getDocument, listDocuments } from '../services/firestoreService.js';

export const listMechanics = async (req, res, next) => {
  try {
    const mechanics = await listDocuments('mechanics');
    const { location, service, openOnly } = req.query;
    const filtered = mechanics.filter((mechanic) => {
      const locationMatches = !location || mechanic.location?.toLowerCase().includes(String(location).toLowerCase());
      const serviceMatches = !service || (mechanic.services || []).some((item) =>
        item.toLowerCase().includes(String(service).toLowerCase())
      );
      const openMatches = openOnly !== 'true' || mechanic.isOpen === true;
      return locationMatches && serviceMatches && openMatches;
    });
    return res.json(filtered);
  } catch (error) {
    return next(error);
  }
};

export const getMechanic = async (req, res, next) => {
  try {
    const mechanic = await getDocument('mechanics', req.params.id);
    if (!mechanic) return res.status(404).json({ message: 'Mechanic not found.' });
    return res.json(mechanic);
  } catch (error) {
    return next(error);
  }
};
