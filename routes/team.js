const router = require('express').Router()
const teamController = require('./../controllers/teamController')
const homeController = require('./../controllers/homeController.js')
const routeGuards = require('./../middlewares/route-guard')
router.get('/', homeController.Home)

//http://localhost:3000/team/create
router.get('/create', routeGuards.isLoggedIn, teamController.create)
router.post('/create', teamController.createForm)

//http://localhost:3000/team/list
router.get('/list', teamController.list)

//http://localhost:3000/team/list/:id
router.get('/list/:id', routeGuards.isLoggedIn, teamController.listJoin)

//http://localhost:3000/team/list/:id/info
router.get('/list/:id/info', teamController.info)

//http://localhost:3000/team/:name/:id
router.post('/:name/:id', teamController.join)

module.exports = router
