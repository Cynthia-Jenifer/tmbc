module.exports = function (app, validator) {
    const multer = require('multer')
    const path = require('path');
    const fs = require('fs');
  
    require("dotenv").config();
    
    var storage = multer.diskStorage({
      destination: function(req, file, callback) {
          callback(null, './uploads', file.mimetype);
      },
      filename: function(req, file, callback) {
          // var timestamp = (new Date).getTime().toString()
          var type = file.mimetype.split("/")
          var name = file.originalname 
          if (type[0] == 'image') {
              callback(null, name);
          } else {
              callback(true, null);
          }
      }
  });
  var upload = multer({ storage: storage }).array('file', 15);
  
  app.post('/upload', function(request, response) {
      upload(request, response, function(err, data) {
          var message = {}
          var data = {}
          if (err) {
              message.error = 'true'
              message.message = 'Error uploading file.'
              return response.send(message)
          } else {
              message.error = 'false'
              message.message = 'File is uploaded successfully!'
              data.imageURL =request.files.map(file => process.env.IMAGE_UPLOAD_URL + '/' + file.filename)
              message.data = data
              return response.send(message)
          }
      });
  });
  app.get('/uploads/:filename', function(req, res) {
      const filePath = path.resolve('uploads', req.params.filename);
      console.log(filePath,"filePath")
      if (fs.existsSync(filePath)) {
          return res.sendFile(filePath, (err) => {
            if (err) {
              console.error(err);
              res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: true, message: 'Internal server error' });
            }
          });
        } else {
          res.status(httpStatus.NOT_FOUND).json({ error: true, message: 'File not found' });
        }
    
  });

  };
  