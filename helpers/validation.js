const { check } = require('express-validator');

const validation = { 
    signupValidation: function () {

        var validation = [
            check('fName', 'First Name should not be empty.').trim().notEmpty(),
            check('lName', 'Last Name should not be empty.').trim().notEmpty(),
            check('email','Email should not be empty.').trim().notEmpty(),
            check('email', 'Invalid email address').trim().isEmail(),
            check('uName', 'Username should not be empty').trim().notEmpty(),
            check('pw', "Password should contain at least 8 characters.").trim().isLength({min: 8})

            // check('username').custom(value => !/\s/.test(value))
            //                 .withMessage('No spaces are allowed in the username');
        ];
            
        return validation;
    }
}


module.exports = validation;