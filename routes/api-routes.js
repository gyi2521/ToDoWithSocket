const toDoList = require('../models/toDoList.js');

module.exports = function (app) {

    app.get('/api/toDo', function (req, res) {
        toDoList.find({})
            .then(function (list) {
                res.json(list);
            })
            .catch(function(err){
                res.json(err);
            })
    });

    app.post('/api/toDo', function (req, res) {
        toDoList.create({ "task": req.body.taskItem })
            .then(function (result) {
                console.log(result);
                res.json({ success: true });
            })
            .catch(function (err) {
                console.log(err.message);
                res.json({ success: false });
            });
    });

    app.delete('/api/toDo/:index', function (req, res) {
        toDoList.findByIdAndDelete({ _id: req.params.index })
            .then(function (result) {
                res.json({ success: true });
            })
            .catch(function (err) {
                console.log(err.message);
                res.json({ success: err.message });
            });

    });

    app.put('/api/toDo', function (req, res) {
        toDoList.findOneAndUpdate({ _id: req.body._id },
            { $set: { done: req.body.done } })
            .then(function (result) {
                res.json({ success: true });
            })
            .catch(function (err) {
                console.log(err.message);
                res.json({ success: false });
            });

    });
}