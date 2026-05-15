const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require('../services/project.service');

const getAllProjects = async (req, res, next) => {
  try {
    const data = await getProjects();
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const getProject = async (req, res, next) => {
  try {
    const data = await getProjectById(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const createProject = async (req, res, next) => {
  try {
    const data = await createProject(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

const updateProject = async (req, res, next) => {
  try {
    const data = await updateProject(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const deleteProject = async (req, res, next) => {
  try {
    await deleteProject(req.params.id);
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (err) { next(err); }
};

module.exports = { getAllProjects, getProject, createProject, updateProject, deleteProject };