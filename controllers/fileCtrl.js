const User = require('../models/user');
const Company = require('../models/company');
const cloudinary = require('cloudinary');


cloudinary.config({ 
    cloud_name: process.ENV.CLOUD_NAME, 
    api_key: process.ENV.API_KEY, 
    api_secret: process.ENV.API_SECRET 
  });


exports.addImage = async (req,res) => {
  //console.log(req.body);

  cloudinary.uploader.upload(req.body.image, (result) => {
      const savedData = async () => {
        if(req.body.image){
          await User.update({
              '_id': req.body.user._id
          },{
            "imageId": result.public_id,
            "imageVersion": result.version,            
          });
        }
      }
      savedData()
            .then(result => {
              return res.status(200).json({message: 'La photo de profil a été ajoué !'});
            })
  });
}



exports.addLogo = async (req,res) => {
  //console.log(req.body);

  cloudinary.uploader.upload(req.body.image, (result) => {
      const savedData = async () => {
        if(req.body.image){
          await Company.update({
              '_id': req.body.company
          },{
            "imageId": result.public_id,
            "imageVersion": result.version,            
          });
        }
      }
      savedData()
            .then(result => {
              return res.status(200).json({message: 'Le logo a été ajouté !'});
            })
  });
}