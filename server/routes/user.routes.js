const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/login', UserController.login);
    app.get('/api/users/rate', UserController.getAllByRate);
    app.get('/api/users/unit', UserController.getAllByUnit);
    app.post('/api/users/register', UserController.registerUser);
    app.get('/api/user/:id', UserController.getUserById);
    app.get('/api/user/update/:id', UserController.updateUser);
    app.delete('/api/user/delete/:id', UserController.removeUser)
    //app.get('/api/users/rotationDate, UserController.getByPRD);

};