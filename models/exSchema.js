const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({
    messages:[{
        type: Schema.Types.ObjectId,
        ref: "message"
    }],

    userNames:[{
        user1: String,
        user2: String
    }]
})

var chat = mongoose.model("chat", chatSchema);
module.exports = chat;