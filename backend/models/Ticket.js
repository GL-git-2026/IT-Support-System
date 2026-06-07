const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Links the ticket to a specific User (the client)
    },
    title: {
        type: String,
        required: [true, 'Please add a ticket title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description of the issue']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Hardware', 'Software', 'Network', 'Account/Access', 'Other']
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        default: 'Open'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links to an IT Support staff or Admin
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Ticket', TicketSchema);