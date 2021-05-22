$(document).ready(function () {

    var today = new Date()
    var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0) + 'T' + today.getHours().toString().padStart(2, 0) + ':' + today.getMinutes().toString().padStart(2, 0);
    $('#dateLetter').val(formattedDate);

    $('#createLetterBtn').click(function () {

        var today = new Date()
        var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0) + 'T' + today.getHours().toString().padStart(2, 0) + ':' + today.getMinutes().toString().padStart(2, 0);
        
        var letterTitle = validator.trim($('#letterTitle').val());
        var letterBody = validator.trim($('#LetterFormControlTextarea1').val());

        var letterTitleEmpty = validator.isEmpty(letterTitle);
        var letterBodyEmpty = validator.isEmpty(letterBody);
        
        //current date and time

        //date and time from entry
        var dateLetter = $('#dateLetter').val();

        var invalidDate = dateLetter < formattedDate;

        // alert("invalidDate: " + invalidDate);
        // alert("dateLetter: " + dateLetter);
        // alert("value of formatted date: " + formattedDate);
        // alert("dateToday: " + today);
        // alert("data type of date letter: " + typeof(dateLetter));
        //if date and time from entry is less than the current date and time, then display the message
        
        // console.log($('#inputRecipient').val());
        
        if(letterTitleEmpty) {
            $('#emptyTitleCreate').text('Letter title should not be empty.');
            $('#emptyTitleCreate').css('margin-bottom', '-2em').css('margin-top', '.2em');
        } else {
            $('#emptyTitleCreate').text('');
        }
        if(letterBodyEmpty) {
            $('#emptyBodyCreate').text('Letter body should not be empty.');
            $('#emptyBodyCreate').css('margin-bottom', '-1em').css('margin-top', '.2em');
        } else {
            $('#emptyBodyCreate').text('').css('margin-bottom', '1rem');
        }

        if(invalidDate) {
            $('#errorLetterDate').text('Entered date is invalid.');
            $('#errorLetterDate').css('margin-bottom', '-2em');
        } else {
            $('#errorLetterDate').text('').css('margin-bottom', '1rem');
        }

        if (!letterTitleEmpty && !letterBodyEmpty && !invalidDate) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', '/createletter');

            // After Ajax call
            xhttp.onreadystatechange = function() {
                $('#letterTitle').val('');
                $('#LetterFormControlTextarea1').val('');
                $('#imageFormControlFile2').val(null);
                $("#letterType").load(" #letterType > *");
                $("#mainSectionLetter").load(" #mainSectionLetter > *");
              };

            // Form data to be passed to ajax call
            var formData = new FormData();
            formData.append('dateToReceive', $('#dateLetter').val());
            formData.append('letterTitle', $('#letterTitle').val());
            formData.append('letterBody', $('#LetterFormControlTextarea1').val());
            formData.append('recipient', $('#inputRecipient').val());
            formData.append('entryImage', document.getElementById('imageFormControlFile2').files[0]);
            formData.append('currDate', formattedDate);
            $('#createLetterModal').modal('toggle');

            // Ajax call
            xhttp.send(formData);
        }
    });

    $(document).on('click', '.sortOptionLetter', function() {
        $.get('lettersoutgoing', function(flag) {
            if(flag) {
                $.get('letters', function (result) {
                    if(result) {
                        $("#letterMasterSection").load(" #letterMasterSection > *");
                    }
                })
            }
        })
    });

    $('#createLetterModal').on("hidden.bs.modal", function () {

        $('#emptyBodyCreate').text('').css('margin-bottom', '1rem');;
        $('#emptyTitleCreate').text('');
        $('#futureDateOnCreate').text('');
           
    });

});
