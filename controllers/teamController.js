const Team = require('./../models/team')
const User = require('./../models/User')

exports.create = async (req, res) => {
  // console.log(req.session.currentUser)
  return res.render('team/create')
}

exports.createForm = async (req, res) => {
  const { name, description } = req.body
  const id = req.session.currentUser._id
  const newTeam = await Team.create({ name, description })
  console.log(newTeam)
  //Agregar el equipo al usuario que creo
  const userJoinTeam = await User.findByIdAndUpdate(id, { $push: { team: newTeam._id } })

  return res.redirect('/user/profile')
}
