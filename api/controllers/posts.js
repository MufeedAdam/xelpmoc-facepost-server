var connection = require('./../../config/db_config');
var moment = require('moment') 
exports.create = (req, res) => {
  var date=moment().format('YYYY-MM-DD HH:mm:ss')
    var today = new Date();
    console.log(date,today)
    var post={
        "post":req.body.post,
        "email":req.body.email,
        "created_at":date
    }
    connection.query('INSERT INTO post SET ?',post, function (error, results, fields) {
        if (error) {
          res.json({
              status:false,
              message:'The Post Cannot be uploaded'
          })
          console.log(error)
        }else{
          
            res.json({
              status:true,
              data:results,
              message:'Post Uploaded sucessfully'
          })
        }
      });

    
}

exports.list = (req, res) => {

  connection.query('SELECT name,u.email,post,created_at FROM post p,users u where p.email=u.email ORDER BY created_at DESC', function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message:'The Post Cannot be displayed'
      })
      console.log(error)
    }else{
      console.log(results)
        res.json({
          status:true,
          data:results,
          message:'Post fetch sucessfull'
      })
    }
  });

}