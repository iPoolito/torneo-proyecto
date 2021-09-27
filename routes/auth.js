const router = require('express').Router()

const authController = require('./../controllers/authController')
const routeGuards = require('./../middlewares/route-guard')
//Nos lleva al controller de auth
//http://localhost:3000/signup
router.get('/', routeGuards.isLoggedOut, authController.signup)
router.post('/', authController.signupForm)

module.exports = router
