const mongoose = require('mongoose');

// Define the schema with the collection option properly
const task = new mongoose.Schema({
    description: String,
    due_by: String,
    price: String,
    name_task: { type: String, required: true }, 
}, {
    collection: "Task" // Specify the collection name in MongoDB
});

// Export the model with the proper name (Task instead of task)
module.exports = mongoose.model('Task', task);
