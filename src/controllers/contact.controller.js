const { createContact, getContacts } = require('../services/contact.service');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, company, projectType, budget, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }
    const data = await createContact({ name, email, company, projectType, budget, message });
    res.status(201).json({ success: true, message: 'Request submitted successfully', data });
  } catch (err) {
    next(err);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const data = await getContacts();
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact, getAllContacts };