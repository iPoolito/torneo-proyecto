const router = require('express').Router()

const userController = require('../controllers/userController.js')
const { post } = require('./index.js')

//Nos lleva al controller de auth)

//LOGIN
//http://localhost:3000/user/profile
router.get('/profile', userController.profile)

//http://localhost:3000/user/team/:idteam
router.get('/team/:id', userController.team)
//http://localhost:3000/user/team/:idteam/:iduser/join

router.post('/team/:idteam/:iduser/join', userController.teamJoin)

module.exports = router
