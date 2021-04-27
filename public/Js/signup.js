$(document).ready(function () {
    
    $('#UserNameRegister').keyup(function () {

        // get the value entered the user in the `<input>` element
        var uName = $('#UserNameRegister').val();
        
        /*
            send an HTTP GET request using JQuery AJAX
            the first parameter is the path in our server
            which is defined in `../../routes/routes.js`
            the server will execute the function getCheckID()
            defined in `../../controllers/signupController.js`
            the second parameter passes the variable `idNum`
            as the value of the field `idNum`
            to the server
            the last parameter executes a callback function
            when the server sent a response
        */
        $.get('/checksignup', {uName: uName}, function (result) {

            /*
                if the current value of `idNum` exists in the database
                change the background-color of the `<input>` element to red
                display an error message
                and disable the submit button
            */
            if(result.uName == uName) {
                $('#bioDiv').css('margin-top', '10px');
                $('#errorsignup').text('Username already registered');
                $('#submit').prop('disabled', true);
            }

            /*
                else
                change the background-color of the `<input>` element back
                remove the error message
                and enable the submit button
            */
            else {
                $('#bioDiv').css('margin-top', '30px');
                $('#error').text('');
                $('#submit').prop('disabled', false);
            }
        });
    });
});
