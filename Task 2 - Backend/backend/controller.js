const User = require("./model")
const validator = require('validator')
const jwt = require('jsonwebtoken');
const { validationCreate, validationUpdate } = require('./validate');
const Joi = require("joi");

const controller = {
    getToken: async (req, res) => {
        try {
            if (!validator.isEmail(req.body.email)) {
                return res.status(400).json({ message: "Email invalid" })
            }
            
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }
            const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.EXPIRES_IN })
            res.cookie("accessToken", accessToken, {
                maxAge: 24 * 60 * 60 * 1000, //1 ngay
                httpOnly: false,
            })
            return res.status(200).json({
                email: user.email,
                token: accessToken
            })
        }
        catch (error) {
            res.status(500).json({ message: `Something wrong. Detail... ${error}` })
        }
    },
    create: async (req, res) => {
        try {
            const { error } = await validationCreate.validate(req.body)
            if (error) {
                return res.status(400).json({ message: error.details[0].message })
            }
            const user = await User.create(req.body)
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json({ message: `Something wrong. Detail... ${error}` })
        }
    },
    search: async (req, res) => {
        try {
            let user
            if (!req.query.name) {
                user = await User.find().select('-__v')
            } else {
                const regex = new RegExp('.*' + req.query.name + '.*' + '$', "i")
                user = await User.find({ $or: [{ 'username': regex }, { 'email': regex }] }).select('-__v')
            }

            if (!user) {
                return res.status(404).json({
                    message: "Cannot find any users"
                })
            }
            return res.status(200).json(user)
        }
        catch (error) {
            res.status(500).json({ message: `Something wrong. Detail... ${error}` })
        }
    },
    update: async (req, res) => {
        try {
            if (!Array.isArray(req.body)) {
                const { error } = await validationCreate.validate(req.body)
                if (error) {
                    return res.status(400).json({ message: error.details[0].message })
                }
                const user = await User.findById(req.body._id)
                if(!user) {
                    return res.status(404).json({ message: 'User not found' })
                }
                Object.assign(user, req.body)
                user.save()
            } else {
                let errorObject = []
                for (i in req.body) {
                    const { error } = await validationUpdate.validate(req.body[i])
                    if (error) {
                        errorObject.push({
                            object: i,
                            message: error.details[0].message
                        })
                    } else {
                        let user = await User.findById(req.body[i]._id)
                        if (!user) {
                            errorObject.push({
                                object: i,
                                message: "Not found"
                            })
                        } else {
                            Object.assign(user, req.body[i])
                            user.save()
                        }
                    }
                }  
                if (errorObject.length != 0) {
                    res.status(202).json(errorObject)   
                }
                res.status(200).json({
                    message: "All users have been updated"
                })   
            }
        }
        catch (error) {
            res.status(500).json({ message: `Something wrong. Detail... ${error}` })
        }
        res.send(req.query.q)
    }
}

module.exports = controller