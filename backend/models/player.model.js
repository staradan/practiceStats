const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, unique: true, trim: true },
    lastName: { type: String, required: true, unique: true, trim: true },
    position: { type: String, required: true },
    teamID: { type: Number, required: true },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;