const Venue = require('../models/venue')

exports.venue = function(req,res,next){
    const venueParam = req.params.venue
    
    Venue.findOne( {venue: venueParam}, function(err, existingVenue){
        if(err) {return next(err)}
        
        existingVenue ? res.json(existingVenue) : res.json({})
    })
}

exports.allvenues = function(req, res, next) {
    Venue.find({}, function(err, docs){
        if(err) {return next(err)}
        res.json(docs)
    })
}

exports.adduser = function(req,res,next) {
    const venueParam = req.params.venue
    // find venue
    Venue.findOneAndUpdate(
        {venue: venueParam},
        {$addToSet: {going: req.user.email}},
        {safe: true, upsert: true, new: true},
        function(err, existingVenue){
            if(err) return err
            
            res.json(existingVenue)

     })
    
}

exports.removeuser = function(req,res,next) {
    const venueParam = req.params.venue
    
            // find venue
    Venue.findOne({venue: venueParam}, function(err, existingVenue){
        if(err) {return next(err)}
        
        // if venue exists delete user
        if(existingVenue) {
            // if user is going already, remove
            const filtered = existingVenue.going.filter((entry) => {
                return entry !== req.user.email
            })
            existingVenue.going = filtered
            existingVenue.save(function(err){
                if(err){return next(err)}
                res.json({attendees: existingVenue.going})
            })
        }

    })
}

exports.venuesbyids = function(req, res, next) {
    const venueIds = req.params[0].split(',')

    Venue.find({venue: {$in: venueIds}}, function(err, docs){
        if(err){return next(err)}
        
        res.json(docs)
    })
}
