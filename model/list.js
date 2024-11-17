let mongoose = require('mongoose');

// Define the schema and include the collection option properly
let taskCreate = mongoose.Schema({
    description: String,
    due_by: String,
    price: String,
}, {
    collection: "task" // This should be part of the schema options
});

module.exports = mongoose.model('task', taskCreate);
