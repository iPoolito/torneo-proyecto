const router = require('express').Router()

const tournamentController = require('./../controllers/tournamentController')
//http://localhost:3000/torunaments
router.get('/', tournamentController.home)
//http://localhost:3000/torunaments/create
router.get('/create', tournamentController.create)
router.post('/create', tournamentController.createForm)
//http://localhost:3000/torunaments/:id
router.get('/:id', tournamentController.details)
//http://localhost:3000/torunaments/:id/join
router.get('/:id/join', tournamentController.join)
router.post('/:id/join', tournamentController.joinForm)

module.exports = router
