const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    organizer: {
        type: String,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

// Calculate available seats before saving? No, better to manage it explicitly.
// But we initialized availableSeats. It should be equal to capacity initially.

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
