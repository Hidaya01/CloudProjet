const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const moment = require('moment');

// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('category').populate('assignedTo');
        res.json(projects);
    } catch (error) {
        console.error('Error in GET /projects:', error);
        res.status(500).json({ error: 'Server Error: Unable to fetch projects' });
    }
});

// POST create a new project
router.post('/', async (req, res) => {
    try {
        const { name, category, assignedTo, startDate, endDate, status } = req.body;

        if (!name || !category || !status) {
            return res.status(400).json({ error: 'Missing required fields: name, category, and status are required' });
        }

        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error('Error in POST /projects:', error);
        res.status(500).json({ error: 'Server Error: Unable to create project' });
    }
});

// GET a single project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('category')
            .populate('assignedTo');

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error('Error in GET /projects/:id:', error);

        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid project ID' });
        }

        res.status(500).json({ error: 'Server Error: Unable to get project' });
    }
});

// PUT update a project
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error('Error in PUT /projects/:id:', error);
         if (error.kind === 'ObjectId' && error.path === '_id') {
            return res.status(400).json({ error: 'Invalid project ID' });
        }
        res.status(500).json({ error: 'Server Error: Unable to update project' });
    }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error in DELETE /projects/:id:', error);
         if (error.kind === 'ObjectId' && error.path === '_id') {
            return res.status(400).json({ error: 'Invalid project ID' });
        }
        res.status(500).json({ error: 'Server Error: Unable to delete project' });
    }
});

// GET filter projects
router.get('/filter', async (req, res) => {
    try {
        const query = {};

        if (req.query.name) query.name = { $regex: req.query.name, $options: 'i' };

        if (req.query.startDate) {
            const startDate = moment(req.query.startDate, moment.ISO_8601);
            if (!startDate.isValid()) {
                return res.status(400).json({ error: 'Invalid startDate format' });
            }
            query.startDate = { $gte: startDate.toDate() };
        }

        if (req.query.endDate) {
            const endDate = moment(req.query.endDate, moment.ISO_8601);
            if (!endDate.isValid()) {
                return res.status(400).json({ error: 'Invalid endDate format' });
            }
            query.endDate = { $lte: endDate.toDate() };
        }

        if (req.query.status) query.status = req.query.status;

        const projects = await Project.find(query).populate('category').populate('assignedTo');

        if (projects.length === 0) {
            return res.status(404).json({ error: 'No projects found matching criteria' });
        }

        res.json(projects);
    } catch (error) {
        console.error('Error in GET /projects/filter:', error);
        res.status(500).json({ error: 'Server Error: Unable to filter projects' });
    }
});

module.exports = router;