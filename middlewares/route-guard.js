//Block areas urser's without log
const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/login')
  }

  next()
}

// Block areas user's already log

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/')
  }

  next()
}

module.exports = {
  isLoggedIn,
  isLoggedOut
}
