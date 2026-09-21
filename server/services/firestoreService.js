import { db, isFirestoreConfigured } from '../config/firebase.js';

const databaseUnavailable = () => {
  const error = new Error(
    'Firestore is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
  );
  error.statusCode = 503;
  return error;
};

const requireDb = () => {
  if (!isFirestoreConfigured || !db) {
    throw databaseUnavailable();
  }
  return db;
};

const normalize = (id, data) => ({ id, ...data });

export const listDocuments = async (collectionName) => {
  const snapshot = await requireDb().collection(collectionName).get();
  return snapshot.docs.map((document) => normalize(document.id, document.data()));
};

export const getDocument = async (collectionName, id) => {
  const document = await requireDb().collection(collectionName).doc(id).get();
  return document.exists ? normalize(document.id, document.data()) : null;
};

export const createDocument = async (collectionName, data) => {
  const reference = requireDb().collection(collectionName).doc();
  await reference.set({
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return getDocument(collectionName, reference.id);
};

export const updateDocument = async (collectionName, id, data) => {
  const reference = requireDb().collection(collectionName).doc(id);
  const existing = await reference.get();
  if (!existing.exists) return null;

  await reference.update({
    ...data,
    updatedAt: new Date().toISOString(),
  });
  return getDocument(collectionName, id);
};

export const deleteDocument = async (collectionName, id) => {
  const reference = requireDb().collection(collectionName).doc(id);
  const existing = await reference.get();
  if (!existing.exists) return false;

  await reference.delete();
  return true;
};
