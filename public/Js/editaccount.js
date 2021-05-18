$(document).ready(function () {
    /*
    TODO:   The code below attaches a `keyup` event to `#refno` text field.
            The code checks if the current reference number entered by the user
            in the text field does not exist in the database.

            If the current reference number exists in the database:
            - `#refno` text field background color turns to red
            - `#error` displays an error message `Reference number already in
            the database`
            - `#submit` is disabled

            else if the current reference number does not exist in the
            database:
            - `#refno` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#pw').keyup(function () {
        var pw = $('#pw').val();

        $.get('/getCheckRefNo', {refNo: refNo}, function(result){
            if(result.refno == refNo){
                $('#refno').css('background-color','red');
                $('#error').text('Reference number already in the database');
                $('#submit').prop('disabled',true);
            }
            else{
                $('#refno').css('background-color','#E3E3E3');
                $('#error').text('');
                $('#submit').prop('disabled',false);
            }
        })
    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if all text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            If at least one field is empty, the `#error` paragraph displays
            the error message `Fill up all fields.`

            If there are no errors, the new transaction should be displayed
            immediately, and without refreshing the page, after the values
            are saved in the database.

            The name, reference number, and amount fields are reset to empty
            values.
    */
    $('#saveChanges').click(function () {
        if($('#fName').val() === "" && $('#lName').val() === "" && $('#pw').val() === "" && $('#email').val() === ""){
            $('#error').text('Fill up all fields. ')
        }
        else{

            if($('#pw').val)
            var fname = $('#fName').val()
            var lName = $('#lName').val()
            var pw = $('#pw').val();
            var email = $('#email').val();

            $.get('/add',{fname: fname, lName: lName, pw: pw , email: email}, function(result){

                $('#cards').append(result);
                $('#name').val("");
                $('#refno').val("");
                $('#amount').val("");

                
            })
        }
    });


})
