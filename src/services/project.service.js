const prisma = require('../config/db');

const createProject = async ({ title, description, techStack, liveUrl, githubUrl, image }) => {
  return await prisma.project.create({
    data: { title, description, techStack, liveUrl, githubUrl, image },
  });
};

const getProjects = async () => {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

const getProjectById = async (id) => {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw { statusCode: 404, message: 'Project not found' };
  return project;
};

const updateProject = async (id, data) => {
  return await prisma.project.update({ where: { id }, data });
};

const deleteProject = async (id) => {
  return await prisma.project.delete({ where: { id } });
};

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };