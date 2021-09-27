//Importaciones
const mongoose = require('mongoose')
//Schema
const teamSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'team name is required'], //requerido
    unique: true // unico
  },
  description: String,
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

//Modelo
const Team = mongoose.model('Team', teamSchema)
//Exportacion
module.exports = Team
