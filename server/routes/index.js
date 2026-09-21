import express from 'express';
import { getHealth } from '../controllers/healthController.js';
import { getUsers, getUserById } from '../controllers/userController.js';
import { getAdminDashboard } from '../controllers/adminController.js';
import { signup, login } from '../controllers/authController.js';
import { diagnoseVehicleIssue } from '../controllers/diagnosisController.js';
import {
  listVehicles,
  getVehicle,
  createVehicle as createFirestoreVehicle,
  updateVehicle as updateFirestoreVehicle,
  deleteVehicle as deleteFirestoreVehicle,
} from '../controllers/firestoreVehicleController.js';
import { listMechanics, getMechanic } from '../controllers/firestoreMechanicController.js';
import {
  listServiceHistory,
  createServiceHistory as createFirestoreServiceHistory,
  deleteServiceHistory as deleteFirestoreServiceHistory,
} from '../controllers/firestoreServiceHistoryController.js';
import { listReminders, createReminder } from '../controllers/firestoreReminderController.js';
import {
  listEmergencyRequests,
  createEmergencyRequest,
} from '../controllers/firestoreEmergencyController.js';

const router = express.Router();

router.get('/health', getHealth);

router.post('/auth/signup', signup);
router.post('/auth/login', login);

router.get('/users', getUsers);
router.get('/users/:id', getUserById);

router.get('/vehicles', listVehicles);
router.post('/vehicles', createFirestoreVehicle);
router.get('/vehicles/:id', getVehicle);
router.put('/vehicles/:id', updateFirestoreVehicle);
router.delete('/vehicles/:id', deleteFirestoreVehicle);

router.get('/mechanics', listMechanics);
router.get('/mechanics/:id', getMechanic);
router.get('/service-history', listServiceHistory);
router.post('/service-history', createFirestoreServiceHistory);
router.delete('/service-history/:id', deleteFirestoreServiceHistory);

router.get('/emergency', listEmergencyRequests);
router.post('/emergency', createEmergencyRequest);
router.get('/emergency-requests', listEmergencyRequests);
router.post('/emergency-sos', createEmergencyRequest);
router.get('/reminders', listReminders);
router.post('/reminders', createReminder);

router.post('/diagnosis', diagnoseVehicleIssue);
router.get('/admin/dashboard', getAdminDashboard);

export default router;
