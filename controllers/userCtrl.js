const passport = require('passport');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
    console.log(req.body);
    
    if(req.body.fullname === undefined || req.body.email === undefined || req.body.password === undefined){
        return res.status(200).json({error: 'Tous les champs doivent être complétés'});   
    } 

    if(req.body.fullname === '' || req.body.email === '' || req.body.password === ''){
        return res.status(200).json({error: 'Tous les champs doivent être complétés'});   
    }     
    
    passport.authenticate('local-signup', (err, user, info) => {
        if(err){
            return res.status(200).json({error: err});
        }
        if(info){
            return res.status(200).json({error: info});
        }

        return res.status(201).json({message: 'L\'utilisateur a été créé', user: user});
    })(req, res, next); 
}



exports.loginUser = (req, res, next) => {
    console.log(req.body);
    
    if(req.body.email === undefined || req.body.password === undefined){
        return res.status(200).json({error: 'Tous les champs doivent être complétés'});   
    } 

    if(req.body.email === '' || req.body.password === ''){
        return res.status(200).json({error: 'Tous les champs doivent être complétés'});   
    }     
    
    passport.authenticate('local-login', (err, user, info) => {
        if(err){
            return res.status(200).json({error: err});
        }
        if(info){
            return res.status(200).json({error: info});
        }

        return res.status(201).json({message: 'Connexion réussi', user: user});
    })(req, res, next); 
}


exports.homePage = async (req, res) => {
    const result = await User.findOne({'email': req.params.email},{'password': 0})
                                                .populate("companies.company");
    return res.status(200).json({user: result});
}