//Importaciones
const mongoose = require('mongoose')
//Schema
const tournamentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'tournament name is required'], //requerido
    unique: true // unico
  },
  game: {
    type: String,
    required: [true, 'tournament game is required'] //requerido
  },
  description: {
    type: String,
    require: [true, 'tournament description is required']
  },
  numberOfTeams: {
    type: Number,
    require: [true, 'tournament description is required']
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    }
  ]
})

//Modelo
const Tournament = mongoose.model('Tournament', tournamentSchema)
//Exportacion
module.exports = Tournament
