$(document).ready(function () {

    var today = new Date()
    var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);
    $('#dateEntry').val(formattedDate);
    const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];

   
    

    function editisValidTitle (field, id) {
        var validTitle = false; 
        // var entryTitle = validator.trim($('#entryTitle-' + id).val());
        var entryTitle =  validator.trim($('#entryTitle-' + id).val());
        var isValidLength = validator.isLength(entryTitle, {max: 50}); 

        if(isValidLength) {
            if(field.is($('#entryTitle-' + id)))
                $('#emptyTitleEdit-' + id).text('');
            validTitle = true;
        } else {
            if(field.is($('#entryTitle-' + id))){
                $('#emptyTitleEdit-' + id).text('Entry title should be at most 50 characters.');
                $('#emptyTitleEdit-' + id).css('margin-bottom', '-2em').css('margin-top', '.2em');
            }
        }
        return validTitle;
    }

    function editisValidBody(field, id) {
        var validBody = false;
        var entryBody = validator.trim($('#entryBody-' + id).val());
        var isEmpty = validator.isEmpty(entryBody);

        if(isEmpty) {
            if(field.is($('#entryBody-' + id))) {
                $('#emptyBodyEdit-' + id).text('Entry Body should not be empty.');
                $('#emptyBodyEdit-' + id).css('margin-bottom', '-1em').css('margin-top', '.2em');
            }
        } else {
            if(field.is($('#entryBody-' + id)))
                $('#emptyBodyEdit-' + id).text('');
            validBody = true;
        }

        return validBody;
    }

    function editisValidDate(field, id) {
        var validDate = false;
        var entryDate =  $('#entryDate-' + id).val();
        var invalidDate = entryDate > formattedDate; //if future
        // alert(entryDate + " > " + formattedDate);
        if(invalidDate) {
            if(field.is($('#entryDate-' + id))) {
                $('#futureDate-' + id).text('Entered date is invalid.');
                $('#futureDate-' + id).css('margin-bottom', '-2em');
            }
        } else {
            if(field.is($('#entryDate-' + id)))
                $('#futureDate-' + id).text('');
            validDate = true;
        }

        return validDate;
    }
    
    $('#mainSection').on('click', '.deleteBtn', function(event) {
        //alert(event.target.id);
        $.post('deleteentry', {id: event.target.id}, function(result) {
            if(result) {
                $("#sortBtn").load(" #sortBtn > *");
                $("#mainSection").load(" #mainSection > *");
            }
        });
    });

    $('#indivEntry').on('click', '.deleteIndivBtn', function (event) {
        //alert(event.target.id);
        $.post('../deleteentry', {id: event.target.id}, function(result) {
            if(result) {
                window.location.href = '../mainpage';
            }
        });
    });

    $('#indivEntry').on('click', '.editIndivBtn', function(event) {
        //alert('success');
        var id = event.target.id;
        var entryDate =  $('#entryDate-' + id).val();
        var entryTitle = validator.trim($('#entryTitle-' + id).val());
        var entryBody =  validator.trim($('#entryBody-' + id).val());
        var significance =  $('#significance-' + id).val();
        var privacy =  $('#privacy-' + id).val();
        var entryTitleEmpty = validator.isEmpty(entryTitle);

        var entryTitleValid = editisValidTitle($('#entryTitle-' + id), id);
        var entryBodyValid = editisValidBody($('#entryBody-' + id), id);
        var entryDateValid = editisValidDate($('#entryDate-' + id), id);

        if(entryTitleValid && entryBodyValid && entryDateValid) {
            if(entryTitleEmpty){
                var dateEntry = new Date(entryDate);
                var dateTitle =   (monthNames[dateEntry.getMonth()]) + ' ' + dateEntry.getDate().toString().padStart(2, 0) + ", " + dateEntry.getFullYear().toString();
                $('#entryTitleCreate').val(dateTitle);
                entryTitle = dateTitle;
            }
            var entry = {
                id: id,
                entryTitle: entryTitle,
                entryBody: entryBody,
                significance: significance,
                entryDate: entryDate,
                privacy: privacy
            }
            $.post('../editentry', entry, function(flag) {
                if(flag) {
                    $('#modal-edit-' + id).modal('toggle');
                    $("#indivEntryMain").load(" #indivEntryMain > *");
                }
            });
        }
    });

    $(document).on('click', '.editBtn', function(event) {
        //alert('success');
        var id = event.target.id;
        var entryDate =  $('#entryDate-' + id).val();
        var entryTitle = validator.trim($('#entryTitle-' + id).val());
        var entryBody =  validator.trim($('#entryBody-' + id).val());
        var significance =  $('#significance-' + id).val();
        var privacy =  $('#privacy-' + id).val();
        var entryTitleEmpty = validator.isEmpty(entryTitle);

        var entryTitleValid = editisValidTitle($('#entryTitle-' + id), id);
        var entryBodyValid = editisValidBody($('#entryBody-' + id), id);
        var entryDateValid = editisValidDate($('#entryDate-' + id), id);

        if(entryTitleValid && entryBodyValid && entryDateValid) {
            if(entryTitleEmpty){
                var dateEntry = new Date(entryDate);
                var dateTitle =   (monthNames[dateEntry.getMonth()]) + ' ' + dateEntry.getDate().toString().padStart(2, 0) + ", " + dateEntry.getFullYear().toString();
                $('#entryTitleCreate').val(dateTitle);
                entryTitle = dateTitle;
            }
            var entry = {
                id: id,
                entryTitle: entryTitle,
                entryBody: entryBody,
                significance: significance,
                entryDate: entryDate,
                privacy: privacy
            }
            $.post('editentry', entry, function(flag) {
                if(flag) {
                    $('#modal-edit-' + id).modal('toggle');
                    $("#mainSection").load(" #mainSection > *");
                }
            });
        }
    });

    $('.editEntry').on("hidden.bs.modal", function () {

        $('.emptyBodyEdit').text('').css('margin-bottom', '1rem');;
        $('.emptyTitleEdit').text('');
        $('#futureDateOnCreate').text('');
           
    });

    $('#createBtn').click(function () {

        var entryDate = $('#dateEntry').val()
        var entryTitle = validator.trim($('#entryTitleCreate').val());
        var entryBody = validator.trim($('#entryBodyCreate').val());
        var privacyEmpty = validator.isEmpty($('#inputPrivacy').val());
        var entryBodyEmpty = validator.isEmpty(entryBody);
        var entryTitleEmpty = validator.isEmpty(entryTitle);        
        
        if(entryBodyEmpty) {
            $('#emptyBodyCreate').text('Entry Body should not be empty.');
            $('#emptyBodyCreate').css('margin-bottom', '-1em');
        } else {
            $('#emptyBodyCreate').text('');
        }
        
        // alert(entryDate + " > " + formattedDate);
        if (entryDate > formattedDate){
            // $('#emptyBodyCreate').text('').css('margin-bottom', '1rem');
            $('#futureDateOnCreate').text('Entered date is invalid.');
            $('#futureDateOnCreate').css('margin-bottom', '-2em');
        } else {
            $('#futureDateOnCreate').text('').css('margin-bottom', '1rem');
        }
        if (!entryBodyEmpty  && !(privacyEmpty) && !(entryDate > formattedDate)){
            if(entryTitleEmpty) {
                var dateEntry = new Date(entryDate);
                var dateTitle =   (monthNames[dateEntry.getMonth()]) + ' ' + dateEntry.getDate().toString().padStart(2, 0) + ", " + dateEntry.getFullYear().toString();
                $('#entryTitleCreate').val(dateTitle);
            }
            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', '/createentry');

            // After Ajax call
            xhttp.onreadystatechange = function() {
                $('#entryTitleCreate').val('');
                $('#entryBodyCreate').val('');
                $('#inputSignificance').val('None');
                $('#inputPrivacy').val('private');
                $('#imageFormControlFile1').val(null);
                $("#sortBtn").load(" #sortBtn > *");
                $("#mainSection").load(" #mainSection > *");
              };

            // Form data to be passed to ajax call
            var formData = new FormData();
            formData.append('entryDate', $('#dateEntry').val());
            formData.append('entryTitle', $('#entryTitleCreate').val());
            formData.append('entryBody', $('#entryBodyCreate').val());
            formData.append('privacy', $('#inputPrivacy').val());
            formData.append('significance', $('#inputSignificance').val());
            formData.append('entryImage', document.getElementById('imageFormControlFile1').files[0]);
            
            $('#createEntryModal').modal('toggle');

            // Ajax call
            xhttp.send(formData);
        }
    });
    
    $(document).on('click', '.sortOption', function() {
        $.get('changeSort', function(flag) {
            if(flag) {
                $.get('mainpage', function (result) {
                    if(result) {
                        $("#sortBtn").load(" #sortBtn > *");
                        $("#mainSection").load(" #mainSection > *");
                    }
                })
            }
        })
    });

    $('#createEntryModal').on("hidden.bs.modal", function () {

        $('#emptyBodyCreate').text('').css('margin-bottom', '1rem');;
        $('#emptyTitleCreate').text('');
        $('#futureDateOnCreate').text('');
           
    });
});