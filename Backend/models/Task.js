const mongoose = require('mongoose');
const { compileFunction } = require('vm');

const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String},
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    dueDate: { type: Date ,required: true },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Or false, depending on if a task must always be assigned
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attachments: [{ type: String }], // URLs to files
    todoChecklist: [todoSchema], // Array of todo items
    progress: { type: Number, default: 0 }, // Percentage of task completion
},
{ timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);