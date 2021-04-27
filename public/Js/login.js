$(document).ready(function () {
    
    $('#loginBtn').click(function () {

        // get the value entered the user in the `<input>` element
        var uName = $('#LoginUsername').val();
        var pw = $('#LoginPassword').val();
        
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
        $.get('/checklogin', {uName: uName, pw: pw}, function (isValid) {

            /*
                if the current value of `idNum` exists in the database
                change the background-color of the `<input>` element to red
                display an error message
                and disable the submit button
            */

            if(!isValid) {
                alert('Invalid login credentials')

            }

            /*
                else
                change the background-color of the `<input>` element back
                remove the error message
                and enable the submit button
            */
            else {
                alert('Valid login credentials')
                $('#loginForm').submit();
            }
        });
    });
});
