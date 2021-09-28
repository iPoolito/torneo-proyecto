const Tournament = require('./../models/tournament')
const User = require('./../models/User')
const Team = require('./../models/team')

exports.home = async (req, res) => {
  const dbTournaments = await Tournament.find()
  return res.render('tournaments/tournamentslist', {
    tournamentList: dbTournaments
  })
}

exports.create = async (req, res) => {
  res.render('tournaments/create')
}

exports.createForm = async (req, res) => {
  const { name, game, description, numberOfTeams } = req.body
  const newTournament = await Tournament.create({
    name,
    game,
    description,
    numberOfTeams
  })
  console.log(newTournament)
  res.redirect('/tournaments')
}

exports.details = async (req, res) => {
  const { id } = req.params
  console.log(id)

  const tournamentDetails = await Tournament.findById(id).populate('teams')
  console.log(tournamentDetails)
  return res.render('tournaments/details', tournamentDetails)
}

exports.join = async (req, res) => {
  const { id } = req.params
  const { _id } = req.session.currentUser
  const foundUser = await User.findById(_id).populate('team')
  console.log(foundUser)
  return res.render('tournaments/joinTeam', { foundUser, id })
}

exports.joinForm = async (req, res) => {
  //console.log(req.params) //id: ID DEL TORNEO
  //console.log(req.body) // teams : ID DEL EQUIPO
  const { id } = req.params
  const { teams } = req.body
  const addTeam = await Tournament.findByIdAndUpdate(id, { $push: { teams: teams } })
  const addTournament = await Team.findByIdAndUpdate(teams, { $push: { tournaments: id } })
  //console.log(addTeam)
  return res.redirect(`/tournaments/${id}`)
}

exports.editTournament = async (req, res) => {
  const { id } = req.params

  const tournamentFound = await Tournament.findById(id)
  return res.render('tournaments/edit', tournamentFound)
}

exports.editTournamentForm = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body
  const tourFound = await Tournament.findByIdAndUpdate(id, { name, description })
  console.log(tourFound)
  return res.redirect('/tournaments')
}
exports.deleteTournament = async (req, res) => {
  const { id } = req.params

  const tournamentDelet = await Tournament.findByIdAndRemove(id)
  return res.redirect('/tournaments')
}

exports.deleteTeam = async (req, res) => {
  const { idtour, idteam } = req.params
  const quitTour = await Team.findByIdAndUpdate(idteam, { $pull: { tournaments: idtour } })
  const teamDeleted = await Tournament.findByIdAndUpdate(idtour, { $pull: { teams: idteam } })
  return res.redirect(`/tournaments/${idtour}`)
}
