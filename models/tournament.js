const mongoose = require('mongoose')

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'tournament name is required'],
      unique: true // unico
    },
    game: {
      type: String,
      required: [true, 'tournament game is required']
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
  },
  { timestamps: true, versionKey: false }
)

const Tournament = mongoose.model('Tournament', tournamentSchema)

module.exports = Tournament
