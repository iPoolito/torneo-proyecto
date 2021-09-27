const router = require('express').Router()

const teamController = require('./../controllers/teamController')
//http://localhost:3000/team/create
router.get('/create', teamController.create)
router.post('/create', teamController.createForm)

module.exports = router
