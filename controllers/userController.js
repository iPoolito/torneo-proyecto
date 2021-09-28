const User = require('./../models/User')
const Team = require('./../models/team')

exports.profile = async (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/')
  }
  const { _id } = req.session.currentUser
  const foundUser = await User.findById(_id).populate('team')
  const title = 'Profile'
  res.render('user/profile', { foundUser, title })
}

exports.logOut = (req, res) => {
  // ELIMINAR LA COOKIE DEL NAVEGADOR
  req.session.destroy(err => {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
}

exports.team = async (req, res) => {
  const { id } = req.params
  const playerFilter = await Team.findById(id).populate('filter').populate('players')
  console.log(playerFilter)
  res.render('user/managmentPlayers', playerFilter)
}

exports.teamJoin = async (req, res) => {
  const { idteam, iduser } = req.params
  const addPlayer = await Team.findByIdAndUpdate(idteam, { $push: { players: iduser } })
  const removePlayer = await Team.findByIdAndUpdate(idteam, { $pull: { filter: iduser } })

  const addToPlayerTeam = await User.findByIdAndUpdate(iduser, { $push: { team: idteam } })

  res.redirect(`/user/team/${idteam}`)
}

exports.teamDelete = async (req, res) => {
  const { idteam, iduser } = req.params
  const removePlayer = await Team.findByIdAndUpdate(idteam, { $pull: { filter: iduser } })
  res.redirect(`/user/team/${idteam}`)
}

exports.teamRemove = async (req, res) => {
  const { idteam, iduser } = req.params
  const removePlayer = await Team.findByIdAndUpdate(idteam, { $pull: { players: iduser } })
  const removeToPlayer = await User.findByIdAndUpdate(iduser, { $pull: { team: idteam } })
  res.redirect(`/user/team/${idteam}`)
}
