const express = require("express");
const controller = require("./controller")
const auth = require('./auth')

const router = express.Router();

router.post('/get-token', controller.getToken)
router.post('/create', controller.create)
router.get('/search', auth, controller.search) //T2.2.1
router.post('/update', auth, controller.update) //T2.2.2

module.exports = router