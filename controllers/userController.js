const User = require('./../models/User')

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
