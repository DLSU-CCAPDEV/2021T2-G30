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
                $('#pwError').css('color','red');
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
                            $('#emailError').css('color','red');
                        }
                        return callback(false);
                    }
                });
            }    
        } else {
            if(field === $('#EmailEdit').val()) { 
                $('#emailError').text('Invalid email entered.');
                $('#emailError').css('color','red');
            }
            return callback(false);
        }
        

    }

    function isValidFName(field) {

        // sets initial value of return variable to false
        var validFName = false;

        /*
            gets the value of `pw` in the signup form
            removes leading and trailing blank spaces
            then checks if it contains at least 8 characters.
        */
        var fName = validator.trim($('#FirstNameEdit').val());
        var isValidLength = validator.isLength(fName, {min: 1});

        // if the value of fName contains at least 1 character
        if(isValidLength) {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field !== $('#FirstNameEdit').val()){
                // remove the error message in `idNumError`
                $('#fNameError').text('First Name Entry is not the same?');
            }
            else{
                $('#fNameError').text('');
                validFName = true;
            }
                

            /*
                since  the value of `pw` contains at least 8 characters
                set the value of the return variable to true.
            */
        }

        // else if the value of fName contains no characters
        else {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field === $('#FirstNameEdit').val()){
                // display appropriate error message in `pwError`
                $('#fNameError').text(`Please fill out this field`);
                $('#fNameError').css('color','red');
            }
            else{
                $('#fNameError').text('');
                validFName = true;
            }
        }

        // return value of return variable
        return validFName;
    }

    function isValidLName(field) {

        // sets initial value of return variable to false
        var validLName = false;

        /*
            gets the value of `pw` in the signup form
            removes leading and trailing blank spaces
            then checks if it contains at least 8 characters.
        */
        var lName = validator.trim($('#LastNameEdit').val());
        var isValidLength = validator.isLength(lName, {min: 1});

        // if the value of fName contains at least 1 character
        if(isValidLength) {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field !== $('#LastNameEdit').val()){
                // remove the error message in `idNumError`
                $('#lNameError').text('First Name Entry is not the same?');
            }
            else{
                $('#lNameError').text('');
                validLName = true;
            }
                

            /*
                since  the value of `pw` contains at least 8 characters
                set the value of the return variable to true.
            */
        }

        // else if the value of fName contains no characters
        else {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field === $('#LastNameEdit').val()){
                // display appropriate error message in `pwError`
                $('#lNameError').text(`Please fill out this field`);
                $('#lNameError').css('color','red');
            }
            else{
                $('#lNameError').text('');
                validLName = true;
            }
        }
        
        return validLName;
    }

    function isValidBio(field) {

        // sets initial value of return variable to false
        var validBio = false;

        /*
            gets the value of `pw` in the signup form
            removes leading and trailing blank spaces
            then checks if it contains at least 8 characters.
        */
        var bioName = validator.trim($('#BioEdit').val());
        var isValidLength = validator.isLength(bioName, {max: 150});

        // if the value of fName contains at least 1 character
        if(isValidLength) {

                if(field === $('#BioEdit').val()){
                $('#bioError').text('');
                validBio = true;
                } 
        }

        // else if the value of fName contains no characters
        else {
            
            if(field === $('#BioEdit').val()){
                $('#bioError').text('Max Values Inputted');
                $('#lNameError').css('color','red');
            } 
        }
        return validBio;
    }

    $('#saveChangesbtn').click(function () {
        var fName = $('#FirstNameEdit').val();
        var lName = $('#LastNameEdit').val();
        var pw = $('#PasswordEdit').val();
        var email = $('#EmailEdit').val();
        var bio = $('#BioEdit').val();
        var validPassword = isValidPassword(pw);
        var validFname = isValidFName(fName);
        var validLname = isValidLName(lName);
        var validBio = isValidBio(bio);

        isValidEmail(email, function(validEmail) {
            isValidemail = validEmail;
            console.log("THINGY = " + isValidemail);

            if(!validFname && !validLname && !validBio){
                $('#error').text('Fill up all fields. ');
                $('#error').css('color','red');
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

    $(document).on('click', '.offMem', function(event) {
        //alert('hello');
        $.get('disablememories', function(flag) {
            if(flag)
                $("#memoryModal").load(" #memoryModal > *");
        })
    });

    $(document).on('click', '.onMem', function(event) {
        //alert('hello');
        $.get('enablememories', function(flag) {
            if(flag)
                $("#memoryModal").load(" #memoryModal > *");
        })
    });

})
