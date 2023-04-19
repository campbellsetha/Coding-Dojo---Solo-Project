const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {

//Grab token from cookies
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'baby programmer', (err, decodedToken) => {
            if (!err) {
                console.log()
                next()
            } else {
                res.redirect('/login');
            }
        }
    } else {
        res.redirect('/login');
    }

}