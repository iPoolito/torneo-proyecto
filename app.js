//Importaciones
require('dotenv').config()
const express = require('express')
const app = express()
const hbs = require('hbs')

//Middlewares
require('./db/index')
require('./config')(app)

const generateSession = require('./config/session-config')
generateSession(app) // Descomentar esto me da un error en el heroku ERROR HEROKU
//RUTEO

app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser
  res.locals.admin = req.session.admin
  //console.log(res.locals.admin)
  next()
})

const index = require('./routes/index')
const auth = require('./routes/auth')
const authlog = require('./routes/authlog')
const userp = require('./routes/user')
const tournaments = require('./routes/tournaments')
const team = require('./routes/team')

//http://localhost:3000/
app.use('/', index)
//http://localhost:3000/signup
app.use('/signup', auth)
//http://localhost:3000/login
app.use('/login', authlog)
//http://localhost:3000/user
app.use('/user', userp)
//http://localhost:3000/torunaments
app.use('/tournaments', tournaments)
//http://localhost:3000/team
app.use('/team', team)

//Manejo de errores
require('./error-handling')(app)
//Servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor activado: ${process.env.PORT}`)
  return
})
