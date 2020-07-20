const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamID: { type: Number, required: true },
    players: { type: Array },
    teamName: { type: String, required: true, trim: true },
    sport: { type: String, required: true },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;