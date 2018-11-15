
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    task: {
        type: String,
        default: 'ginaTask'
        // trim: true,
        // required: true
    },
    done: {
        type: Boolean,
        //required: true,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var toDoList = mongoose.model('toDoList', toDoSchema);
 
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = toDoList;