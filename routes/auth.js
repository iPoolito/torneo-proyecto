const router = require('express').Router()
const authController = require('./../controllers/authController')
const routeGuards = require('./../middlewares/route-guard')

//http://localhost:3000/signup
router.get('/', routeGuards.isLoggedOut, authController.signup)
router.post('/', authController.signupForm)

module.exports = router
