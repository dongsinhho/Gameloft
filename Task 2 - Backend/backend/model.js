const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: 6,
        maxlength: 30,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    birthday: {
        type: Date,
        required: true
    },
})

const User = mongoose.model('Users', userSchema)

module.exports = User