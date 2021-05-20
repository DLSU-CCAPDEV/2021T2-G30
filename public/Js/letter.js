$(document).ready(function () {

    var today = new Date()
    var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0) + 'T' + today.getHours().toString().padStart(2, 0) + ':' + today.getMinutes().toString().padStart(2, 0);
    $('#dateLetter').val(formattedDate);

    $('#createLetterBtn').click(function () {

        var letterTitle = $('#letterTitle').val();
        var letterBody = $('#LetterFormControlTextarea1').val();

        console.log($('#inputRecipient').val());
        
        if(letterTitle === '') {
            $('#emptyBodyCreate').text('').css('margin-bottom', '1rem');
            $('#emptyTitleCreate').text('Please enter a title!');
            $('#emptyTitleCreate').css('margin-bottom', '-2em').css('margin-top', '.2em');
        }
        else if(letterBody === '') {
            $('#emptyTitleCreate').text('');
            $('#emptyBodyCreate').text('Please enter a body!');
            $('#emptyBodyCreate').css('margin-bottom', '-1em').css('margin-top', '.2em');
        }
        else {

            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', '/createletter');

            // After Ajax call
            xhttp.onreadystatechange = function() {
                $('#letterTitle').val('');
                $('#LetterFormControlTextarea1').val('');
                $("#letterType").load(" #letterType > *");
                $("#mainSectionLetter").load(" #mainSectionLetter > *");
              };

            // Form data to be passed to ajax call
            var formData = new FormData();
            formData.append('dateToReceive', $('#dateLetter').val())
            formData.append('letterTitle', $('#letterTitle').val())
            formData.append('letterBody', $('#LetterFormControlTextarea1').val())
            formData.append('recipient', $('#inputRecipient').val())
            formData.append('entryImage', document.getElementById('imageFormControlFile2').files[0])
            
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
