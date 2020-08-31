const db = require('../models/index');
module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('send-task', function (data) {
            console.log('ginaCode:' + data);
            db.toDoList.create({ task: data })
                .then(function (result) {
                    console.log(result);
                    io.emit('new-task', result);
                });
        })

        socket.on('complete-task', function (data) {
            console.log('task completed : ' + data);
            db.toDoList.findByIdAndUpdate({ _id: data }, { $set: { done: true } })
                .then(function (result) {
                    console.log(result);
                    io.emit('update-task', result);
                })
                .catch(function (err) {
                    console.log(err.message);
                });
        })

        socket.on('delete-task', function (data) {
            console.log('task to delete: ' + data);
            db.toDoList.findByIdAndDelete({ _id: data })
                .then(function (result) {
                    console.log(result);
                    io.emit('delete-task', result);
                })
                .catch(function (err) {
                    console.log(err.message);
                });
        })

        console.log('ginaCode: getting all todos')
        db.toDoList.find({}, function (err, docs) {
            if (err) throw err;
            socket.emit('load old msg', docs);
        })
    });
}