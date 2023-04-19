const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Established connection with database: user'))
    .catch((err) => console.log('Something went wrong when trying to connect', err));
