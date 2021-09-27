const router = require('express').Router()

const homeController = require('./../controllers/homeController')
const userController = require('../controllers/userController.js')
router.get('/', homeController.Home)

//LOGIN
//http://localhost:3000/logOut
router.post('/logout', userController.logOut)

module.exports = router
