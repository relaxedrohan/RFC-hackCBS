const express=require('express');
const path =require('path');
const router=express.Router();
const bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var doctor = require('../db/user').doctor;
var patient = require('../db/user').patient;
var prescription = require('../db/user').prescription;
const passport=require('passport');
var obj = {};

router.post('/logout',function (req,res) {

    req.logout();
    res.redirect('/');
})






router.use('/',express.static(path.join(__dirname ,'../frontendWithoutLogin')));
router.use('/user-login',express.static(path.join(__dirname ,'../frontendWithLogin')));
router.use('/help',express.static(path.join(__dirname ,'../frontendWithLogin/templates')))

router.post('/updateInfo',function(req,res){
    // User.findOne({email: req.user.email},function(err,data){
    //         if(err){
    //             throw err;
    //         }
    //         console.log(data)
    // })
    console.log(req);
    var query = {email : req.user.email};
    User.update(query,{family_name : req.body.username , family_emailid : req.body.email , phone: req.body.phone} , function (err,data) {
        console.log(data);
        res.redirect('/user-login');
    })
})


router.post('/login', passport.authenticate('user.login',{


	failureRedirect: '/signup.html',
	failureFlash: true

}),function (req,res) {
    console.log(req);
    
	res.redirect('templates/frontpage.html');
})


router.post('/login-app', function(req, res, next) {
    passport.authenticate('user.login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { 
          return res.send({message : 'Invalid username and password',
                    code : 1})
          
      }
      req.logIn(user, function(err) {
        if (err) { throw err }
        return res.send({message : 'Login Successfull',
        code : 2})
      });
    })(req, res, next);
  });

  router.post('/add-data',function(req,res){
    //console.log(req);
    var newUser=new patient();
	
    newUser.firstname  = req.body.firstname;
    newUser.lastname = req.body.lastname;
    
    newUser.email=req.body.email;
    newUser.phone=req.body.phone;
    newUser.gender=req.body.gender;
    newUser.bloodgroup=req.body.bloodgroup;
    newUser.livelihood=req.body.livelihood;
    newUser.rf_id=req.body.rf_id;
    newUser.save(function (err) {
        if(err) throw (err);

        return res.redirect('/');
    })
    })

  router.get('/rfid',function(req,res){
      //console.log(req);
      console.log(req);
       patient.findOne({rf_id : "3920E76E"},function(err,data){
           console.log(data);
            if(err){
                throw err;
            }
            if(!data){
                //failedrf(req,res);
                return res.send({message : 'failed ',
                code : 1})
            }
            
            obj = data._doc;
            res.send({message : 'Successfull',
            code : 2})
        })
  })

  router.post('/add-prescription', function(req,res){
    var newUser=new prescription(); 
    
    newUser.patientid  = obj._id;
    newUser.doctorid = req.user.id;
    newUser.date = new Date();
    newUser.information = req.body.information;
   
    newUser.save(function (err) {
        if(err) throw (err);

        return res.redirect('/templates/patient_profile.html');
    })
})
  router.get('/data',function(req,res){
      res.send(obj);
  })
  router.get('/ret', function(req,res){
      console.log(req);
        if(1){
            res.redirect('/templates/patient_profile.html')
        }
        else{
            res.redirect('/templates/patientnotfound.html')
        }

  })

router.post('/doctor-signup', function(req,res){
    console.log(req);
	doctor.findOne({'email':req.body.email},function (err,user) {
		if(err){
			throw err;
		}
		else if(user){
			
			res.redirect('/signup.html')
		}

		console.log(req);
		var newUser=new doctor();
	
		newUser.firstname  = req.body.firstname;
		newUser.lastname = req.body.lastname;
		
        newUser.email=req.body.email;
        newUser.phone=req.body.phone;
        newUser.speciality=req.body.speciality;
        newUser.password=newUser.encryptPassword(req.body.password);
		newUser.save(function (err) {
			if(err) throw (err);

			return res.redirect('/user-login');
		})
	})

})
    
    function isUser(req,res,next){
        if(!req.user){
            return res.redirect('/login.html')
        }
        return next();
    }
    function failedrf(req,res){
        setTimeout(() => {
            res.redirect('/')
          }, 5000)
    }

module.exports = router;