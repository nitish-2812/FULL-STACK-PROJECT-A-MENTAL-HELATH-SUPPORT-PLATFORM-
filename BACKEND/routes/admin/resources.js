const express = require('express');
const Resource = require('../../models/Resource');
const { authenticateToken, isAdmin } = require('../../middleware/authMiddleware');
const router = express.Router();

// This entire route is protected and for admins only
router.use(authenticateToken, isAdmin);

// GET all resources (for the admin panel)
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new resource
router.post('/', async (req, res) => {
    try {
        const newResource = new Resource(req.body);
        const resource = await newResource.save();
        res.status(201).json(resource);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create resource', error: err.message });
    }
});

// DELETE a resource
router.delete('/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        await resource.deleteOne();
        res.json({ message: 'Resource removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;