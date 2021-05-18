$(document).ready(function () {


    function isValidPassword(field) {

        // sets initial value of return variable to false
        var validPassword = false;

        /*
            gets the value of `pw` in the signup form
            removes leading and trailing blank spaces
            then checks if it contains at least 8 characters.
        */
        var password = validator.trim($('#pw').val());
        var isValidLength = validator.isLength(password, {min: 8});

        // if the value of `pw` contains at least 8 characters
        if(isValidLength) {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field.is($('#pw')))
                // remove the error message in `idNumError`
                $('#pwError').text('');

            /*
                since  the value of `pw` contains at least 8 characters
                set the value of the return variable to true.
            */
            validPassword = true;
        }

        // else if the value of `pw` contains less than 8 characters
        else {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field.is($('#pw')))
                // display appropriate error message in `pwError`
                $('#pwError').text(`Passwords should contain at least 8
                    characters.`);
        }

        // return value of return variable
        return validPassword;
    }

    function isValidEmail (field) {
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
                        return false;
                    } else {
                        if(field.is($('#email'))) {
                            $('#emailError').text('');
                            $('#uNameDiv').css('margin-top', '30px');
                        }
                        return true;
                    }
                });
            }    
        } else {
            if(field.is($('#email'))) { 
                $('#emailError').text('Invalid email entered.');
                $('#uNameDiv').css('margin-top', '10px');
                return false;
            }
        }

    }


    $('#saveChanges').click(function () {
        var fname = $('#fName').val();
        var lName = $('#lName').val();
        var pw = $('#pw').val();
        var email = $('#email').val();
        var bio = $('#bio').val();
        var validPassword = isValidPassword(field);
        var validEmail = isValidEmail(field);



        if(fName === "" && lName === "" && pw === "" && email === ""){
            $('#error').text('Fill up all fields. ')
        }
        else{

            if(validPassword && validEmail){
                var xhttp = new XMLHttpRequest();

                xhttp.open('POST','/editaccount');

                var formData = new FormData();
                formData.append('fName', fname);
                formData.append('lName', lName);
                formData.append('pw', pw);
                formData.append('email', email);
                formData.append('bio', bio);
                formData.append('dPicture', document.getElementById(dPicture).files[0]);

                xhttp.send(formData);
            }
            else if(pw === "" && validEmail)

        }
    });


})
