const router = require('express').Router()
const tournamentController = require('./../controllers/tournamentController')
const routeGuards = require('./../middlewares/route-guard')

//http://localhost:3000/torunaments
router.get('/', tournamentController.home)

//http://localhost:3000/torunaments/create
router.get('/create', tournamentController.create)
router.post('/create', tournamentController.createForm)

//http://localhost:3000/torunaments/:id
router.get('/:id', tournamentController.details)

//http://localhost:3000/torunaments/:id/join
router.get('/:id/join', routeGuards.isLoggedIn, tournamentController.join)
router.post('/:id/join', tournamentController.joinForm)

//http://localhost:3000/torunaments/:id/edit
router.get('/:id/edit', routeGuards.isLoggedIn, tournamentController.editTournament)
router.post('/:id/edit', routeGuards.isLoggedIn, tournamentController.editTournamentForm)
router.get('/:id/delete', routeGuards.isLoggedIn, tournamentController.deleteTournament)

//http://localhost:3000/torunaments/:teamname/:idteam/remove
router.post('/:idtour/:idteam/remove', tournamentController.deleteTeam)

module.exports = router
