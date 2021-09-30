const router = require('express').Router()
const homeController = require('./../controllers/homeController')
const userController = require('../controllers/userController.js')
const routeGuards = require('./../middlewares/route-guard')
router.get('/', homeController.Home)

//http://localhost:3000/logOut
router.post('/logout', routeGuards.isLoggedIn, userController.logOut)

module.exports = router
