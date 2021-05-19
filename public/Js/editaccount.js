$(document).ready(function () {
    var isValidemail = false;


    function isValidPassword(field) {

        // sets initial value of return variable to false
        var validPassword = false;

        /*
            gets the value of `pw` in the signup form
            removes leading and trailing blank spaces
            then checks if it contains at least 8 characters.
        */
        var password = validator.trim($('#PasswordEdit').val());
        var isValidLength = validator.isLength(password, {min: 8});

        // if the value of `pw` contains at least 8 characters
        if(isValidLength) {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field !== $('#ReenterPasswordEdit').val()){
                // remove the error message in `idNumError`
                $('#pwError').text('Password entries do not match');
            }
            else{
                $('#pwError').text('');
                validPassword = true;
            }
                

            /*
                since  the value of `pw` contains at least 8 characters
                set the value of the return variable to true.
            */
        }

        // else if the value of `pw` contains less than 8 characters
        else {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field !== $('#ReenterPasswordEdit').val()){
                // display appropriate error message in `pwError`
                $('#pwError').text(`Password entries do not match`);
            }
            else if(field === $('#ReenterPasswordEdit').val() && field === "" && $('#ReenterPasswordEdit').val() === ""){
                $('#pwError').text('');
                validPassword = true;
            }
            else{
                $('#pwError').text(`Passwords should contain at least 8
                    characters.`);
            }
        }

        // return value of return variable
        return validPassword;
    }

    function isValidEmail (field, callback) {
        var email = validator.trim($("#EmailEdit").val());
        var isValidEmail = validator.isEmail(email);

        console.log(email);
        console.log(isValidEmail);

        if(isValidEmail) {
            if(field === $('#EmailEdit').val()) {

                $.get('/getEditEmail', {email: email}, function(result) {
                    if(result == true) {
                        if(field === $('#EmailEdit').val()) {
                            console.log("Goes inside here");
                            $('#emailError').text('');
                        }
                        return callback(true);
                    } else {
                        if(field === $('#EmailEdit').val()) {
                            $('#emailError').text('Email is already taken.');
                        }
                        return callback(false);
                    }
                });
            }    
        } else {
            if(field === $('#EmailEdit').val()) { 
                $('#emailError').text('Invalid email entered.');
            }
            return callback(false);
        }
        

    }



    $('#saveChangesbtn').click(function () {
        var fName = $('#FirstNameEdit').val();
        var lName = $('#LastNameEdit').val();
        var pw = $('#PasswordEdit').val();
        var email = $('#EmailEdit').val();
        var bio = $('#BioEdit').val();
        var validPassword = isValidPassword(pw);

        isValidEmail(email, function(validEmail) {
            isValidemail = validEmail;
            console.log("THINGY = " + isValidemail);

            if(fName === "" && lName === "" && pw === "" && email === ""){
                $('#error').text('Fill up all fields. ')
            }
            else{
                console.log("I have entered");
                console.log("valid password = " + validPassword);
                console.log("valid email = " + isValidemail);
                if(validPassword && isValidemail){
                    /*console.log("I have entered this thing wherein validPassword is true and validEmail is true");
                    var xhttp = new XMLHttpRequest();
    
                    xhttp.open('POST','/editaccount');
    
                    var formData = new FormData();
                    formData.append('fName', fName);
                    formData.append('lName', lName);
                    formData.append('pw', pw);
                    formData.append('email', email);
                    formData.append('bio', bio);
                    formData.append('dPicture', document.getElementById('dPicture').files[0]);
    
                    xhttp.send(formData);
                    xhttp.onreadystatechange = function(){
                        if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
                            xhttp.open('GET','/settings');
                        }
                    }
                    */
                    $('#editAccountForm').submit();
                }
                else if($('#ReenterPasswordEdit').val() === "" && pw === ""  && validEmail){
                    /*
                    console.log("I have entered this thing wherein pw is blank and validEmail is true");
                    var xhttp = new XMLHttpRequest();
    
                    xhttp.open('POST','/editaccount');
    
                    var formData = new FormData();
                    formData.append('fName', fname);
                    formData.append('lName', lName);
                    formData.append('email', email);
                    formData.append('bio', bio);
                    formData.append('dPicture', document.getElementById(dPicture).files[0]);
    
                    xhttp.send(formData);
                    */
                    $('#editAccountForm').submit();
                }
    
            }

        });


    });


})
