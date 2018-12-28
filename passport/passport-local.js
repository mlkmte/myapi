const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},(req, email, password, done) => {
    User.findOne({'email': email}, (err, user) => {
        if(err){
            return done(err)
        }

        if(user){
            return done(null, false, 'Un utilisateur avec cette adresse email éxiste déjà.');
        }

        if(req.body.password.length < 5){
            return done(null, false, 'Le mot de passe doit contenir au moin 5 caractères.');           
        }

        const newUser = new User();
        newUser.fullname = req.body.fullname,
        newUser.email = req.body.email,
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err) => {
            return done(null, newUser);
        })
    })
}));



passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},(req, email, password, done) => {
    User.findOne({'email': email}, (err, user) => {
        if(err){
            return done(err)
        }

        if(!user){
            return done(null, false, 'L\'utilisateur n\'a pas été trouvé.');
        }

        if(!user.checkPassword(req.body.password)){
            return done(null, false, 'Le mot de passe est incorrecte.');           
        }


        return done(null, user);
    })
}));