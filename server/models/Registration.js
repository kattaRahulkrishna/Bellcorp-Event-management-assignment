const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
