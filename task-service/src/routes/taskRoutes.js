const express = require('express');
const Task = require('../models/task.model');
const Comment = require('../models/comment.model');

const router = express.Router();

// ✅ Créer une nouvelle tâche
router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ✅ Récupérer toutes les tâches
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo').populate('comments');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Récupérer une tâche par ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedTo').populate('comments');
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Mettre à jour une tâche
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ✅ Supprimer une tâche
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.json({ message: "Tâche supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Ajouter un commentaire à une tâche
router.post('/:id/comments', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

        const comment = await Comment.create({ taskId: task._id, userId: req.body.userId, text: req.body.text });
        task.comments.push(comment._id);
        await task.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ✅ Modifier le statut d'une tâche
router.patch('/:id/status', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
