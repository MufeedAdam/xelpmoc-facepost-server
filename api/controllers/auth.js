const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const shortId = require('shortid');
var connection = require('./../../config/db_config');
const bcrypt = require('bcrypt');
require('dotenv').config()
exports.register = (req, res) => {
    
    bcrypt.hash(req.body.password,10, function(err, hash) {
        var today = new Date();
    var users={
        "name":req.body.name,
        "email":req.body.email,
        "password":hash,
        "dob":today,
        "gender":req.body.gender
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
        if (error) {
          res.json({
              status:false,
              message:'The user already exists'
          })
          console.log(error)
        }else{
            res.json({
              status:true,
              data:results,
              message:'user registered sucessfully'
          })
        }
      });
    });
    

};


exports.login = (req, res) => {
    var email=req.body.email;
    var password=req.body.password;
    
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'No such email id found'
            })
      }else{

        if(results.length >0){

            bcrypt.compare(password, results[0].password, function(err, result) {
                if(result){
                    const token = jwt.sign({
                        data: results[0].email
                      }, process.env.JWT_SECRET, { expiresIn: '7d' });
                      
                    res.json({
                        status:true,
                        message:'successfully authenticated',
                        token,
                        name:results[0].name,
                        email:results[0].email
                    })
                }else{
                    res.json({
                        status:false,
                        message:"Email and password does not match"
                       });
                }
                
            });
           
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
};


exports.requireSignin = expressJwt({ secret: process.env.JWT_SECRET,algorithms: ['HS256']});