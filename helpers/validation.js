const { check } = require('express-validator');

const validation = { 
    signupValidation: function () {

        var validation = [
            check('fName', 'First Name should not be empty.').trim().notEmpty(),
            check('lName', 'Last Name should not be empty.').trim().notEmpty(),
            check('email','Email should not be empty.').trim().notEmpty(),
            check('email', 'Invalid email address').trim().isEmail(),
            check('uName', 'Username should not be empty').trim().notEmpty(),
            check('uName', "Username should contain at least 5 characters.").trim().isLength({min: 5}),
            check('pw', "Password should contain at least 8 characters.").trim().isLength({min: 8})

            // check('username').custom(value => !/\s/.test(value))
            //                 .withMessage('No spaces are allowed in the username');
        ];
            
        return validation;
    },
    loginValidation: function () {
        var validation = [
            check('uName', "Username should contain at least 5 characters.").trim().isLength({min: 5}),
            check('uName', 'Username should not be empty').trim().notEmpty()
        ];
        return validation;
    },
    
    createEntryValidation: function() {
        var validation = [
            check('entryTitle', "Entry title should be at most 50 characters.").trim().isLength({max: 50}),
        ];
        return validation;
    },

    // editEntryValidation: function () {
    //     var validation = [
    //         check('editEntryTitle', "Entry title should be at most 50 characters.").trim().isLength({max: 50}),
    //     ];
    //     return validation;
    // },

    editAccountValidation: function (){
        var validation = [
            check('fName', 'First Name should not be empty').trim().notEmpty(),
            check('lName', 'Last Name should not be empty').trim().notEmpty(),
            check('email','Email should not be empty.').trim().notEmpty(),
            check('email', 'Invalid email address').trim().isEmail(),
            check('bio', "Password should contain at least 8 characters.").trim().isLength({max: 150})
        ];
        return validation;
    },

    createLetterValidation: function () {
        var validation = [
            check('letterTitle', 'Letter title should not be empty.').trim().notEmpty(),
            check('letterBody', 'Letter body should not be empty.').trim().notEmpty()
        ];
        return validation;
    }
}


module.exports = validation;