const router = require('express').Router()
const routeGuards = require('./../middlewares/route-guard')
const userController = require('../controllers/userController.js')
//const { post } = require('./index.js')

//Nos lleva al controller de auth)

//LOGIN
//http://localhost:3000/user/profile
router.get('/profile', userController.profile)

//http://localhost:3000/user/team/:idteam
router.get('/team/:id', userController.team)
//http://localhost:3000/user/team/:idteam/:iduser/join
router.post('/team/:idteam/:iduser/join', userController.teamJoin)
router.post('/team/:idteam/:iduser/delete', userController.teamDelete)
router.get('/team/:idteam/:iduser/remove', userController.teamRemove)
//http://localhost:3000/user/team/:idteam/edit
router.get('/team/:idteam/edit', userController.editTeam)
router.post('/team/:idteam/edit', userController.editTeamForm)
router.get('/team/:idteam/delete', userController.deleteTeam)

module.exports = router
