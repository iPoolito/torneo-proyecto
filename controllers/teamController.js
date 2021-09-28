const Team = require('./../models/team')
const User = require('./../models/User')
const Swal = require('sweetalert2')

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

exports.join = async (req, res) => {
  //console.log(req.params)
  const { id } = req.params //ID TEAM
  const _id = req.session.currentUser._id // ID USER

  const filterTeam = await Team.findByIdAndUpdate(id, { $push: { filter: _id } })
  console.log(filterTeam)

  //AGREGAR NOTIFICACION DE QUE ESPERE A SER ACEPTADO
  res.redirect('/tournaments')

  Swal.fire({
    title: 'Error!',
    text: 'Wait to be accepted',
    icon: 'error',
    confirmButtonText: 'Cool'
  })
}
