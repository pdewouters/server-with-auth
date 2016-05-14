const Authentication = require('./controllers/authentication')
const Venue = require('./controllers/venue')
const passportService = require('./services/passport')
const passport = require('passport')
const cors = require('cors')

const requireAuth = passport.authenticate('jwt', {session:false})
const requireSignin = passport.authenticate('local', {session:false})
module.exports = function(app){
    app.use(cors())
    app.get('/', requireAuth, function(req, res){
        res.send({ message: 'Super secret code is abc123' })
    })
    //app.get('/venue/:venue', Venue.venue)
    app.get('/venue/:venue', Venue.venue)
    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup)
    app.post('/venue/:venue/adduser', requireAuth, Venue.adduser)
    app.post('/venue/:venue/removeuser', requireAuth, Venue.removeuser)
    app.get('/venues/all', requireAuth, Venue.allvenues)
    app.get('/venues/ids/*', requireAuth, Venue.venuesbyids)
}