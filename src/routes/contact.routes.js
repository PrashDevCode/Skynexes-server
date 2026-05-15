const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts } = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', submitContact);
router.get('/', protect, getAllContacts);

module.exports = router;