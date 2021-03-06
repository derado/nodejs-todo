var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/api/todos/:uname', function (req, res) {

        Todos.find({username: req.params.uname}, function (err, todos) {
            if (err) throw err;

            res.send(todos);
        });
    });

    app.get('/api/todo/:id', function (req, res) {

        Todos.findById({_id: req.params._id}, function (err, todo) {
            if (err) throw err;

            res.send(todo);
        })
    });

    app.post('/api/todo', function (req, res) {
        console.log("post - req.body.id", req.body.id);
        if (req.body._id) {
            Todos.findByIdAndUpdate(req.body._id, {
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function (err, todo) {
                if (err) {throw err};

                res.send('success');
            });
        } else {
            var newTodo = Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });

            newTodo.save(function (err) {
                if (err) {throw err};

                res.send('success');
            });
        }
    });

    app.delete('/api/todo', function (req, res) {
        console.log("delete - req.body.id", req.body._id);
        Todos.findByIdAndRemove(req.body._id, function (err) {

            if (err) {throw err};

            res.send('success');
        })
    });
}