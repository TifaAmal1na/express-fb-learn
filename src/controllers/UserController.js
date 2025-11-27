const userService = require('../services/UserServices');

async function getUsers(req, res) {
  const users = await userService.getAllUsers();
  res.json(users);
}

async function getUser(req, res) {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}

async function createUser(req, res) {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
}

async function updateUser(req, res) {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
}

async function deleteUser(req, res) {
  await userService.deleteUser(req.params.id);
  res.json({ message: 'User deleted' });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
