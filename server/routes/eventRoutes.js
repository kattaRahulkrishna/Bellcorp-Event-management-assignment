const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEventById,
    createEvent,
    registerForEvent,
    cancelRegistration,
    getMyEvents,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getEvents)
    .post(protect, createEvent); // Protected creation, though requirements say 'Admin/Organizer', we'll use same protect middleware for now

router.get('/myevents', protect, getMyEvents);

router.route('/:id')
    .get(getEventById);

router.route('/:id/register')
    .post(protect, registerForEvent)
    .delete(protect, cancelRegistration);

module.exports = router;
