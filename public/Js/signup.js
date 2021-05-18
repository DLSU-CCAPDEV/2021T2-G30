$(document).ready(function () {
    
    $('#UserNameRegister').keyup(function () {

        // get the value entered the user in the `<input>` element
        var uName = $('#UserNameRegister').val();
        
        $.get('/checksignup', {uName: uName}, function (result) {

            if(result.uName == uName) {
                $('#bioDiv').css('margin-top', '10px');
                $('#errorsignup').text('Username already registered');
                $('#submit').prop('disabled', true);
            }
            
            else {
                $('#bioDiv').css('margin-top', '30px');
                $('#errorsignup').text('');
                $('#submit').prop('disabled', false);
            }
        });
    });
});
