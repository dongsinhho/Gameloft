const joi = require('joi')

const validationCreate = joi.object({   
    username: joi.string()
        .min(6)
        .max(1024)
        .required(),
    email: joi.string()
        .email({minDomainSegments:2, tlds: { allow: ['com', 'net']}})
        .required(),
    
    birthday: joi.date()
        .timestamp('javascript')
        .max('now')
        .required()
})

const validationUpdate = joi.object({  
    _id: joi.string()
        .required(), 
    username: joi.string()
        .min(6)
        .max(1024),
    email: joi.string()
        .email({minDomainSegments:2, tlds: { allow: ['com', 'net']}}),
    birthday: joi.date()
        .timestamp('javascript')
        .max('now')
})

module.exports = {validationCreate,validationUpdate}