const mongoose = require('mongoose')
const Schema = mongoose.Schema

const venueSchema = mongoose.Schema({
    venue: { type: String, unique: true },
    going: Array
})

const VenueClass = mongoose.model( 'venue', venueSchema)

module.exports = VenueClass