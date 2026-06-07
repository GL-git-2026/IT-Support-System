const Ticket = require('../models/Ticket');

const createTicket = async (req, res) => {
    try {
        if (req.user.role === 'admin' || req.user.role === 'it_support') {
            return res.status(403).json({ 
                message: 'Admins and IT Support staff are not authorized to create client tickets.' 
            });
        }

        const { title, description, category, priority } = req.body;
        const ticket = await Ticket.create({
            user: req.user._id,
            title,
            description,
            category,
            priority
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getTickets = async (req, res) => {
    try {
        let tickets;
        if (req.user.role === 'admin' || req.user.role === 'it_support') {
            tickets = await Ticket.find().populate('user', 'name email');
        } else {
            tickets = await Ticket.find({ user: req.user._id });
        }
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('user', 'name email');

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (ticket.user._id.toString() !== req.user._id.toString() && req.user.role === 'client') {
            return res.status(401).json({ message: 'Not authorized to view this ticket' });
        }

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (ticket.user.toString() !== req.user._id.toString() && req.user.role === 'client') {
            return res.status(401).json({ message: 'Not authorized to delete this ticket' });
        }

        await Ticket.findByIdAndDelete(req.params.id);
        res.json({ message: 'Ticket removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
};