const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'team name is required'],
      unique: true
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

const Team = mongoose.model('Team', teamSchema)

module.exports = Team
