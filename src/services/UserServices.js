const db = require('../config/firebase');
const collection = db.collection('users');

function filterUserData(data) {
  return {
    name: data.name || null,
    age: data.age || null,
  };
}

async function getAllUsers() {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getUserById(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function createUser(data) {
  const filtered = filterUserData(data);
  const docRef = await collection.add(filtered);
  return { id: docRef.id, ...filtered };
}

async function updateUser(id, data) {
  const filtered = filterUserData(data);
  await collection.doc(id).update(filtered);
  return { id, ...filtered };
}

async function deleteUser(id) {
  await collection.doc(id).delete();
  return true;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
