$(document).ready(function () {
    var isValidemail = false;
    var isValidusername = false;

    function isFilled() {

        /*
            gets the value of a specific field in the signup form
            then removes leading and trailing blank spaces
        */

        var fName = validator.trim($('#FirstName').val());
        var lName = validator.trim($('#LastName').val());
        var email = validator.trim($('#email').val());
        var uName = validator.trim($('#uName').val());
        var pw = validator.trim($('#pw').val());

        /*
            checks if the trimmed values in fields are not empty
        */
        var fNameEmpty = validator.isEmpty(fName);
        var lNameEmpty = validator.isEmpty(lName);
        var emailEmpty = validator.isEmpty(email);
        var uNameEmpty = validator.isEmpty(uName);
        var pwEmpty = validator.isEmpty(pw);

        return !fNameEmpty && !lNameEmpty && !emailEmpty && !uNameEmpty && !pwEmpty;
    }

    function hasWhiteSpace(str) {
        return str.indexOf(' ') >= 0;
    }

    function isValidEmail (field, callback) {
        var email = validator.trim($("#email").val());
        var isValidEmail = validator.isEmail(email);

        if(isValidEmail) {
            if(field.is($('#email'))) {
                $.get('/getCheckEmail', {email: email}, function(result) {
                    if(result.email == email) {
                        if(field.is($('#email'))) {
                            $('#uNameDiv').css('margin-top', '10px');
                            $('#emailError').text('Email is already taken.');
                        }
                        return callback(false);
                    } else {
                        if(field.is($('#email'))) {
                            $('#emailError').text('');
                            $('#uNameDiv').css('margin-top', '30px');
                        }
                        return callback(true);
                    }
                });
            }    
        } else {
            if(field.is($('#email'))) { 
                $('#emailError').text('Invalid email entered.');
                $('#uNameDiv').css('margin-top', '10px');
                return callback(false);
            }
        }

    }

    function isValidUsername(field, callback) {
        var username = validator.trim($('#uName').val());
        var lowerCasedUname = username.toLowerCase();
        var isValidLength = validator.isLength(lowerCasedUname, {min: 6});
        var isNotValid = hasWhiteSpace(lowerCasedUname);

        
        // If username has whitespace in between the letters
        if (isNotValid) {
            if(field.is($('#uName'))) {
                $('#bioDiv').css('margin-top', '10px');
                $('#uNameError').text('Please enter a valid username.');
            }
            
            return callback(false);
        }  else {
            if(isValidLength) {
                if(field.is($('#uName'))) {
                    $('#uNameError').text('');
                    $.get('/checksignup', {uName: lowerCasedUname}, function (result) {
                        if(result.uName == lowerCasedUname) {
                            if(field.is($('#uName'))) {
                                $('#bioDiv').css('margin-top', '10px');
                                $('#uNameError').text('Username is already taken.');
                            }
                            return callback(false); //value of uName is used by another user in the db return false
                        } else {
                            if(field.is($('#uName'))) {
                                $('#bioDiv').css('margin-top', '30px');
                                $('#uNameError').text('');
                            }
                            return callback(true); //value of uName is valid and not used by another user in the db return true
                        }
                    });
                }
            } else {
                if(field.is($('#uName'))) {
                    $('#bioDiv').css('margin-top', '10px');
                    $('#uNameError').text('Username should contain at least 6 characters.');
                }
                return callback(false);
            }

        }

    }

    function isValidPassword(field) {

        // sets initial value of return variable to false
        var validPassword = false;
        var password = validator.trim($('#pw').val());
        var isValidLength = validator.isLength(password, {min: 8});


        // if the value of `pw` contains at least 8 characters
        if(isValidLength) {
            if(field.is($('#pw')))
                $('#pwError').text(''); 
            validPassword = true;
        }

        // else if the value of `pw` contains less than 8 characters
        else {
            if(field.is($('#pw')))
                $('#pwError').text('Passwords should contain at least 8 characters.');
        }

        return validPassword;
    }

    function validateField(field, fieldName, error) {

        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        if(empty) {
            field.prop('value', '');
            error.text(fieldName + ' should not be empty.');
            $('#submit').attr('disabled', true);

        } else {
            error.text(''); // remove the error message 
            var validPassword = isValidPassword(field);
            var filled = isFilled();
    
            // If email field is triggered check if values are true to enable submit button
            isValidEmail(field, function(validEmail) {
                isValidemail = validEmail;
                if(filled && validPassword && isValidusername && isValidemail) {
                    $('#submit').attr('disabled', false);
                }
                else {
                    $('#submit').attr('disabled', true);
                }
            });
            
            // If username field is triggered check if values are true to enable submit button
            isValidUsername(field, function (validUsername) {
                isValidusername = validUsername;
                if(filled && validPassword && isValidusername && isValidemail) {
                    $('#submit').attr('disabled', false);
                }
                else {
                    $('#submit').attr('disabled', true);
                }
            }); 
            
            // If other fields are triggered check if values are true to enable submit button 
            if(filled && validPassword && isValidusername && isValidemail) {
                $('#submit').attr('disabled', false);
            }
            else {
                $('#submit').attr('disabled', true);
            }
            
        }

        
    }
    
    $('#FirstName').keyup(function () {
        validateField($('#FirstName'), 'First Name', $('#fNameError'));
    });

    $('#LastName').keyup(function () {
        validateField($('#LastName'), 'Last Name', $('#lNameError'));
    });
    
    $('#email').keyup(function() {
        validateField($('#email'), "Email", $('#emailError'));
    });

    $('#uName').keyup(function () {
        validateField($('#uName'), 'Username', $('#uNameError'));
    });

    $('#pw').keyup(function () {
        validateField($('#pw'), 'Password', $('#pwError'));
    });
});
