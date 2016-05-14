const Authentication = require('./controllers/authentication')
const Venue = require('./controllers/venue')
const passportService = require('./services/passport')
const passport = require('passport')
const cors = require('cors')

const requireAuth = passport.authenticate('jwt', {session:false})
const requireSignin = passport.authenticate('local', {session:false})
module.exports = function(app){
    app.options('*', cors())
    app.get('/', requireAuth, function(req, res){
        res.send({ message: 'Super secret code is abc123' })
    })
    //app.get('/venue/:venue', Venue.venue)
    app.get('/venue/:venue', cors(), Venue.venue)
    app.post('/signin', cors(), requireSignin, Authentication.signin)
    app.post('/signup', cors(), Authentication.signup)
    app.post('/venue/:venue/adduser', cors(), requireAuth, Venue.adduser)
    app.post('/venue/:venue/removeuser', cors(), requireAuth, Venue.removeuser)
    app.get('/venues/all', requireAuth, cors(), Venue.allvenues)
    app.get('/venues/ids/*', requireAuth, cors(), Venue.venuesbyids)
}