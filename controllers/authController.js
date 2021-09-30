const bcryptjs = require('bcryptjs')
const saltRounds = 10
const User = require('./../models/User')

exports.signup = async (req, res) => {
  res.render('auth/user-create')
}

exports.signupForm = async (req, res) => {
  const { username, email, password, role } = req.body

  if (email === '' || password === '' || username === '' || role === '') {
    return res.render('auth/user-create', {
      errorMessage: 'Empty fields, please fill all'
    })
  }

  const salt = await bcryptjs.genSalt(saltRounds)
  const hashedPassword = await bcryptjs.hash(password, salt)

  const newUser = await User.create({
    username,
    email,
    passwordHash: hashedPassword,
    role
  })
  res.redirect('/login')
}

exports.logIn = async (req, res) => {
  res.render('auth/login')
}

exports.logInForm = async (req, res) => {
  const { email, password } = req.body

  if (email === '' || password === '') {
    return res.render('auth/login', {
      errorMessage: 'Empty fields, please fill all'
    })
  }

  try {
    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      return res.render('auth/login', {
        errorMessage: 'Wrong email or password. Try again'
      })
    }

    const isItMatched = await bcryptjs.compareSync(password, foundUser.passwordHash)

    if (isItMatched === false) {
      return res.render('auth/login', {
        errorMessage: 'Wrong email or password. Try again'
      })
    }

    if (foundUser.role === 'admin') {
      req.app.locals.isAdmin = true
    }
    if (foundUser.role === 'captain') {
      req.app.locals.isCaptain = true
    }
    if (foundUser.role === 'player') {
      req.app.locals.isPlayer = true
    }

    req.session.currentUser = foundUser
    return res.redirect('/user/profile')
  } catch (error) {
    console.log(error)
  }
}
