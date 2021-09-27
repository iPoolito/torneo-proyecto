const router = require('express').Router()

const authController = require('./../controllers/authController')
const routeGuards = require('./../middlewares/route-guard')
//Nos lleva al controller de auth)

//LOGIN
//http://localhost:3000/login
router.get('/', routeGuards.isLoggedOut, authController.logIn)
router.post('/', authController.logInForm)

module.exports = router
