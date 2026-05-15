const blogService = require('../services/blog.service');

const getAllPosts = async (req, res, next) => {
  try {
    const data = await blogService.getPosts();
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const getPost = async (req, res, next) => {
  try {
    const data = await blogService.getPostBySlug(req.params.slug);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const createPost = async (req, res, next) => {
  try {
    const data = await blogService.createPost({ ...req.body, authorId: req.user.id });
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

const updatePost = async (req, res, next) => {
  try {
    const data = await blogService.updatePost(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const deletePost = async (req, res, next) => {
  try {
    await blogService.deletePost(req.params.id);
    res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (err) { next(err); }
};

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost };