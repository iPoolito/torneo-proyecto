//Importaciones
const mongoose = require('mongoose')
//Schema
const teamSchema = new mongoose.Schema(
  {
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
    ],
    filter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    tournaments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
      }
    ]
  },
  { timestamps: true, versionKey: false }
)

//Modelo
const Team = mongoose.model('Team', teamSchema)
//Exportacion
module.exports = Team
