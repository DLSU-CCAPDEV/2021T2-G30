$(document).ready(function () {
    
    $('#loginForm').submit(function (event) {
        event.preventDefault(); //avoid to execute submitting of the form

        // get the value entered the user in the `<input>` element
        var uName = $('#LoginUsername').val().trim().toLowerCase();
        var pw = $('#LoginPassword').val();
        
        $.post('/checklogin', {uName: uName, pw: pw}, function (isValid) {

            if(!isValid) {
                $('#error').text('Invalid Login Credentials');
                $('#error').css('margin-top', '-8px').css('margin-bottom', '8px');
            } else {
                $('#loginForm').unbind().submit();
            }
        });
    });
});
