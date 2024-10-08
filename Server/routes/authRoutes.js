module.exports = function (app, validator) {

    var authController = require("../controller/authController");
    require("dotenv").config();
    var authControllerObject = new authController();
  
    app.post(  "/register", [
        validator.check('email').exists().isLength({ min: 1 }).withMessage('INVALID: $[1], email'),
        validator.check('password').exists().isLength({ min: 1 }).withMessage('INVALID: $[1], password'),
        validator.check('role').exists().isLength({ min: 1 }).withMessage('INVALID: $[1], role')

    ], function (request, response) {

        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, function (message) {
                response.send(message)
            })
        } else {
          authControllerObject.addAdminAuth(request.body, function (message) {
                return response.send(message)
            })
        }
    })
  
  app.post('/login', [
    validator.check('email').exists().isEmail().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], email'),
    validator.check('password').isLength({ min: 1 }).withMessage('INVALID: $[1], password')
  ], function (request, response) {
    var error = validator.validation(request)
    if (error.array().length) {
        this.requestHandler(error.array(), true, function (message) {
            response.send(message)
        })
    } else {
      authControllerObject.getAdminAuth(request.body, function (message) {
            return response.send(message)
        })
    }
  })
  };
  