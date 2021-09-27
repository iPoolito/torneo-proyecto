const bcryptjs = require('bcryptjs')
const saltRounds = 10

const User = require('./../models/User')

//Carga el hbs con el form para crear una cuenta
exports.signup = async (req, res) => {
  res.render('auth/user-create')
}

//Recibe los datos del formulario
exports.signupForm = async (req, res) => {
  //Destructuracion de objetos de los datos obtenidos del req.body
  const { username, email, password, role } = req.body
  //Se crea la base de la contrasena encriptada
  const salt = await bcryptjs.genSalt(saltRounds)
  //Con la base hecha, mezcla la contrasena con los caracteres randoms
  const hashedPassword = await bcryptjs.hash(password, salt)
  //Creacion del usuario en base de datos con la contrasena encriptada
  const newUser = await User.create({
    username,
    email,
    passwordHash: hashedPassword,
    role
  })

  console.log(newUser)

  //Regresa a la pagina de inicio
  res.redirect('/')
}

//LOGIN
exports.logIn = async (req, res) => {
  //Cargamos el form para iniciar Sesion
  res.render('auth/login')
}

exports.logInForm = async (req, res) => {
  //Destructuracion de objetos, obtenemos los datos del formulario
  const { email, password } = req.body
  //Validacion de que no haya ningun campo vacio
  if (email === '' || password === '') {
    return res.render('/login', {
      errorMessage: 'Empty fields, please fill all'
    })
  }
  //SI no tiene campos vacios Buscamos al usuario
  //Manejo de errores por Try - Catch
  try {
    const foundUser = await User.findOne({ email })

    //VALIDACIONES
    //Si el usuario no existe
    if (!foundUser) {
      return res.render('/login', {
        errorMessage: 'Wrong email or password. Try again'
      })
    }
    //SI existe, comparar password del forumlario con la de base de datos
    const isItMatched = await bcryptjs.compareSync(password, foundUser.passwordHash)
    //SI la password no coincide
    if (isItMatched === false) {
      return res.render('/login', {
        errorMessage: 'Wrong email or password. Try again'
      })
    }
    //Comparacion
    if (foundUser.role == 'admin') {
      req.session.admin = foundUser
    }
    //SI coincide Crear una Sesion y retornar al pagina de exito
    req.session.currentUser = foundUser
    return res.redirect('/user/profile')
  } catch (error) {
    console.log(error)
  }
}
