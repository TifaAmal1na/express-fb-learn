const db = require('../config/firebase');
const collection = db.collection('users');

function validateUserData(data) {
  const allowed = ["name", "age"];
  const keys = Object.keys(data);

  const invalid = keys.filter(k => !allowed.includes(k));
  if (invalid.length > 0) {
    return { error: `Field tidak valid: ${invalid.join(", ")}` };
  }

  if (typeof data.name !== "string")
    return { error: "name harus string" };

  if (typeof data.age !== "number")
    return { error: "age harus number" };

  return { valid: true };
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
  const check = validateUserData(data);
  if (check.error) return { error: check.error };

  const docRef = await collection.add(data);
  return { id: docRef.id, ...data };
}

async function updateUser(id, data) {
  const check = validateUserData(data);
  if (check.error) return { error: check.error };

  await collection.doc(id).update(data);
  return { id, ...data };
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
