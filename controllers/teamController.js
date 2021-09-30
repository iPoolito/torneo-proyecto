const Team = require('./../models/team')
const User = require('./../models/User')
const Swal = require('sweetalert2')

exports.create = async (req, res) => {
  return res.render('team/create')
}

exports.createForm = async (req, res) => {
  const { name, description } = req.body

  if (name === '' || description === '') {
    return res.render('team/create', {
      errorMessage: 'Empty fields, please fill all'
    })
  }

  const id = req.session.currentUser._id
  const newTeam = await Team.create({ name, description })

  const userJoinTeam = await User.findByIdAndUpdate(id, { $push: { team: newTeam._id } })

  return res.redirect('/user/profile')
}

exports.join = async (req, res) => {
  const { id } = req.params //ID TEAM
  const _id = req.session.currentUser._id // ID USER

  const filterTeam = await Team.findByIdAndUpdate(id, { $push: { filter: _id } })
  console.log(filterTeam)

  res.redirect('/tournaments?success=true')
}

exports.list = async (req, res) => {
  const allTeams = await Team.find().populate('players').populate('tournaments')

  return res.render('team/list', {
    teamsList: allTeams
  })
}
exports.listJoin = async (req, res) => {
  const { id } = req.params //ID TEAM
  const _id = req.session.currentUser._id // ID USER

  const filterTeam = await Team.findByIdAndUpdate(id, { $push: { filter: _id } })
  console.log(filterTeam)

  res.redirect('/tournaments?success=true')
}

exports.info = async (req, res) => {
  const { id } = req.params
  const teamFound = await Team.findById(id).populate('players').populate('tournaments')

  return res.render('team/info', teamFound)
}
