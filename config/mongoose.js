const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Conveya:yash799@cluster0.pm0sfis.mongodb.net/TechFestive?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Not connected'));

db.once('open', (err) => {
    if (err) {
        console.log("db not connected");
        return "failed";
    }
    console.log("db is connceted");

});

module.exports = db;

