require('dotenv/config');

const JWT = require('jsonwebtoken');
const UserService = require('../services/userService');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const { type, message } = await UserService.getByEmail(email);
    if (type) return res.status(type).json({ message });

    const token = JWT.sign({ data: { userId: message.id } }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { type, message } = await UserService.insertUser(req.body);
    if (type) return res.status(type).json({ message });
    const token = JWT.sign({ data: { userId: message.id } }, secret, jwtConfig);

    return res.status(201).json({ token });    
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { type, message } = await UserService.getAllUsers();
    if (type) return res.status(type).json({ message });
    JWT.sign({ data: { userId: message.id } }, secret, jwtConfig);

    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await UserService.getById(id);
    if (type) return res.status(type).json({ message });

    JWT.sign({ data: { userId: message.dataValues.id } }, secret, jwtConfig);
    res.status(200).json(message.dataValues);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteMe = async (req, res) => {
  try {
    const { id } = req.user.message.dataValues;
    await UserService.deleteMe(id);
    res.status(204).end();    
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  getById,
  deleteMe,
};