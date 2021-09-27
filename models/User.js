// 1. IMPORTACIONES
const mongoose = require('mongoose')

// 2. SCHEMA

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'], //requerido
    unique: true, // unico
    trim: true //Sin espacios
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    }
  ], // one to many - BASE DE DATOS
  role: {
    type: String,
    require: [true, 'Roll is required']
  }
})

// 3. MODELO
const User = mongoose.model('User', userSchema)

// 4. EXPORTACIÓN
module.exports = User
