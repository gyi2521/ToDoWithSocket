const express = require('express');
const app = express();
const mongoose = require('mongoose');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://gyi:NamJee01@ds121282.mlab.com:21282/heroku_js7qh2wp', {useNewUrlParser: true});
//mongoose.connect('mongodb://localhost/toDoWithSocket', {useNewUrlParser: true});

// require('./sockets/message-sockets')(io);
// require('./routes/html-routes')(app);
// require('./routes/api-route')(app);

server.listen(PORT, () => {
    console.log('Server is listening');
})



