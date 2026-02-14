const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

// @desc    Get all events with search and filter
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const { search, category, location } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        const events = await Event.find(query);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private (Admin/Organizer) - making it public for simplicity or authenticated users
const createEvent = async (req, res) => {
    try {
        const { name, description, date, location, category, capacity, organizer } = req.body;

        const event = new Event({
            name,
            description,
            date,
            location,
            category,
            capacity,
            organizer,
            availableSeats: capacity,
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }

        // Check availability
        if (event.availableSeats <= 0) {
            res.status(400).json({ message: 'Event is fully booked' });
            return;
        }

        // Check if already registered
        const existingRegistration = await Registration.findOne({
            user: req.user._id,
            event: req.params.id,
        });

        if (existingRegistration) {
            res.status(400).json({ message: 'You have already registered for this event' });
            return;
        }

        // Create registration
        const registration = new Registration({
            user: req.user._id,
            event: req.params.id,
        });

        await registration.save();

        // Update available seats
        event.availableSeats -= 1;
        await event.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel registration
// @route   DELETE /api/events/:id/register
// @access  Private
const cancelRegistration = async (req, res) => {
    try {
        const registration = await Registration.findOne({
            user: req.user._id,
            event: req.params.id,
        });

        if (!registration) {
            res.status(404).json({ message: 'Registration not found' });
            return;
        }

        await registration.deleteOne();

        // Increment available seats
        const event = await Event.findById(req.params.id);
        if (event) {
            event.availableSeats += 1;
            await event.save();
        }

        res.json({ message: 'Registration cancelled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my registered events
// @route   GET /api/events/myevents
// @access  Private
const getMyEvents = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user._id }).populate('event');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    registerForEvent,
    cancelRegistration,
    getMyEvents,
};
