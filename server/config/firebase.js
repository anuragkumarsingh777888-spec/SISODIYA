import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let firestore = null;
let firebaseInitError = null;

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  const hasConfiguredCredentials =
    projectId &&
    clientEmail &&
    privateKey &&
    !projectId.startsWith('your-') &&
    !clientEmail.startsWith('your-') &&
    !privateKey.includes('YOUR_KEY_HERE');

  if (hasConfiguredCredentials) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      firestore = admin.firestore();
    } catch (error) {
      firebaseInitError = error;
      console.error('Firebase initialization failed:', error.message);
    }
  }
}

export const isFirestoreConfigured = Boolean(firestore);
export const db = firestore;
export const getFirebaseInitError = () => firebaseInitError;
export default admin;
