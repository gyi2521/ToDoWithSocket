
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    task: {
        type: String,
        trim: true,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    }
})

var toDoArray = mongoose.model('toDoArray', toDoSchema);
 
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = toDoArray;