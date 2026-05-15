const prisma = require('../config/db');

const createPost = async ({ title, slug, content, excerpt, image, authorId }) => {
  const existing = await prisma.blog.findUnique({ where: { slug } });
  if (existing) throw { statusCode: 400, message: 'Slug already exists' };
  return await prisma.blog.create({
    data: { title, slug, content, excerpt, image, authorId },
  });
};

const getPosts = async () => {
  return await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } },
  });
};

const getPostBySlug = async (slug) => {
  const post = await prisma.blog.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });
  if (!post) throw { statusCode: 404, message: 'Post not found' };
  return post;
};

const updatePost = async (id, data) => {
  return await prisma.blog.update({ where: { id }, data });
};

const deletePost = async (id) => {
  return await prisma.blog.delete({ where: { id } });
};

module.exports = { createPost, getPosts, getPostBySlug, updatePost, deletePost };