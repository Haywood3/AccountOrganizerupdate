const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/jobs_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('No SNAFU: We have a connection to the database'))
    .catch(err => console.log('We have a SNAFU connecting to the database ', err));