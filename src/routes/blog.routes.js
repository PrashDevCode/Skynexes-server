const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPost, updatePost, deletePost } = require('../controllers/blog.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getAllPosts);
router.get('/:slug', getPost);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;