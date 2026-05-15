const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const registerUser = async ({ name, email, password }) => {
  // Check if user exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw { statusCode: 400, message: 'Email already registered' };

  // Hash password
  const hashed = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  // Generate token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};

const loginUser = async ({ email, password }) => {
  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { statusCode: 401, message: 'Invalid credentials' };

  // Check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { statusCode: 401, message: 'Invalid credentials' };

  // Generate token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!user) throw { statusCode: 404, message: 'User not found' };
  return user;
};

module.exports = { registerUser, loginUser, getUser };