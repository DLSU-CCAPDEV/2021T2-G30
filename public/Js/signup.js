$(document).ready(function () {
    
    function isFilled() {

        /*
            gets the value of a specific field in the signup form
            then removes leading and trailing blank spaces
        */

        var fName = validator.trim($('#FirstName').val());
        var lName = validator.trim($('#LastName').val());
        var email = validator.trim($('#EmailRegister').val());
        var uName = validator.trim($('#UserNameRegister').val());
        var bio = validator.trim($('#bio').val());
        var pw = validator.trim($('#PasswordRegister').val());

        /*
            checks if the trimmed values in fields are not empty
        */
        var fNameEmpty = validator.isEmpty(fName);
        var lNameEmpty = validator.isEmpty(lName);
        var emailEmpty = validator.isEmpty(email);
        var uNameEmpty = validator.isEmpty(uName);
        var bioEmpty = validator.isEmpty(bio);
        var pwEmpty = validator.isEmpty(pw);

        return !fNameEmpty && !lNameEmpty && !emailEmpty && !uNameEmpty && !bioEmpty && !pwEmpty;
    }

    function isValidUsername() {

    }

    function isValidPassword(field) {

        // sets initial value of return variable to false
        var validPassword = false;
        var password = validator.trim($('#PasswordRegister').val());
        // var isMinLen = validator.isLength(password, {min: 8});
        // var isMaxLen = validator.isLength(password, {max: 100});
        var isValidLength = validator.isLength(password, {min: 8});


        // if the value of `pw` contains at least 8 characters
        if(isValidLength) {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field.is($('#PasswordRegister')))
                $('#pwError').text(''); // remove the error message in `idNumError`

            validPassword = true;
        }

        // else if the value of `pw` contains less than 8 characters
        else {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field.is($('#PasswordRegister')))
                $('#pwError').text(`Passwords should contain at least 8 characters.`);
        }

        // return value of return variable
        return validPassword;
    }

    $('#UserNameRegister').keyup(function () {

        // get the value entered the user in the `<input>` element
        var uName = $('#UserNameRegister').val();
        
        $.get('/checksignup', {uName: uName}, function (result) {

            if(result.uName == uName) {
                $('#bioDiv').css('margin-top', '10px');
                $('#errorsignup').text('Username already registered');
                $('#submit').prop('disabled', true);
            } else {
                $('#bioDiv').css('margin-top', '30px');
                $('#errorsignup').text('');
                $('#submit').prop('disabled', false); 
            }
        });
    });

    $('#PasswordRegister').keyup(function () {
        // calls the validateField() function to validate `pw`
        validateField($('#PasswordRegister'), 'Password', $('#pwError'));
    });
});
