const router = require('express').Router()

const userController = require('../controllers/userController.js')

//Nos lleva al controller de auth)

//LOGIN
//http://localhost:3000/user/profile
router.get('/profile', userController.profile)

module.exports = router
