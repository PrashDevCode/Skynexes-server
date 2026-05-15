const projectService = require('../services/project.service');

const getAllProjects = async (req, res, next) => {
  try {
    const data = await projectService.getProjects();
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const getProject = async (req, res, next) => {
  try {
    const data = await projectService.getProjectById(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const createProject = async (req, res, next) => {
  try {
    const data = await projectService.createProject(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

const updateProject = async (req, res, next) => {
  try {
    const data = await projectService.updateProject(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (err) { next(err); }
};

module.exports = { getAllProjects, getProject, createProject, updateProject, deleteProject };