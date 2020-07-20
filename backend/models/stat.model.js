//maybe make this schema an object of some sort...
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statSchema = new Schema({
    statName: { type: String, required: true, },
    isPositive: { type: Boolean, required: true, },
    date: { type: Date, required: true, },
});

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;