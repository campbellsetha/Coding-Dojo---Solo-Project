const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, 'baby programmer')
}

const registerUser = asyncHandler(async(req, res) => {
    console.log(req.body)
    User.create(req.body)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(err => res.status(400).json(err))
})

const login = asyncHandler(async(req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            user: user,
            token: generateToken(user._id)})
    } else {
        res.status(400)
        throw new Error('Invalid Email or Password')
    }
})

const getAllByUnit =  (req, res) => {
    console.log("test:",req.params)
    User.find({currentUnit: req.params.unit, rate: req.params.rate})
        .then((users) => {
            console.log("test:", users);
            res.status(200).json(users);
        }).catch(err => res.status(400).json(err));
}

const getAllByRate = (req, res) => {
    User.find({rate: req.body})
        .then((users) => {
            console.log(users);
            res.json(users)
        }).catch(err => res.json(err));
}

const getUserById = (req, res) => {
    User.findOne({_id: req.params.id})
        .then((user) => {
            console.log(user);
            res.json(user);
        }).catch(err => res.json(err));
}

const updateUser = (req, res) => {
    User.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
    .then((updatedUser) => {
        console.log(updatedUser);
        res.json(updatedUser);
    }).catch(err => res.json(err));
}

const removeUser = (req, res) => {
    User.findOneAndDelete({_id: req.params.id})
        .then((deleteUser) => {
            res.json(deleteUser)
        }).catch(err => res.json(err));
}

/*getByPRD: (req, res) => {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);

    User.find({rate: req.body, rotationDate: {
        '$lt' : date
        }
    }).then((users) => {
        console.log(users);
        res.json(users);
    }).catch(err => res.json(err));
}*/

module.exports = {
    registerUser,
    login,
    getAllByRate,
    getAllByUnit,
    getUserById,
    updateUser,
    removeUser
}