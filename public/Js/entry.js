$(document).ready(function () {

    var today = new Date()
    var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);
    
    $('#dateEntry').val(formattedDate);

    $('#mainSection').on('click', '.deleteBtn', function (event) {
        var deleteDiv = $(this).parents().eq(4);

        $.post('deleteentry', {id: event.target.id}, function(result) {
        
            if(result) {
                $(deleteDiv).remove();
            }
        });
        
    });

    $(document).on('click', '.editBtn', function(event) {

        //alert('success');

        var id = event.target.id;

        var entry = {
            id: id,
            entryTitle: $('#entryTitle-' + id).val(),
            entryBody: $('#entryBody-' + id).val(),
            significance: $('#significance-' + id).val(),
            entryDate: $('#entryDate-' + id).val(),
            privacy: $('#privacy-' + id).val()
        }
        
        if(entry.entryTitle === '') {
            $('#emptyBodyEdit-' + id).text('').css('margin-bottom', '1rem');;
            $('#emptyTitleEdit-' + id).text('Please enter a title!');
            $('#emptyTitleEdit-' + id).css('margin-bottom', '-2em').css('margin-top', '.2em');
        }
        else if(entry.entryBody === '') {
            $('#emptyTitleEdit-' + id).text('');
            $('#emptyBodyEdit-' + id).text('Please enter a body!');
            $('#emptyBodyEdit-' + id).css('margin-bottom', '-1em').css('margin-top', '.2em')
        }
        else if(entry.entryDate > formattedDate) {
            $('#futureDate').text('Entered date is invalid!');
            $('#futureDate').css('margin-bottom', '-2em');
        }
        else {
            $.post('editentry', entry, function(result) {
                if(result) {
                    // location.reload();
                    $("#mainSection").load(" #mainSection > *");
                    // FIX EDIT
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
        var entryTitle = $('#entryTitleCreate').val();
        var entryBody = $('#entryBodyCreate').val();
        var significance = $('#inputSignificance').val();
        var privacy = $('#inputPrivacy').val();
    
        var entry = {
            entryDate: entryDate,
            entryTitle: entryTitle,
            entryBody: entryBody,
            significance: significance,
            privacy: privacy,
        }
        
        
        if(entryTitle === '') {
            $('#emptyBodyCreate').text('').css('margin-bottom', '1rem');
            $('#emptyTitleCreate').text('Please enter a title!');
            $('#emptyTitleCreate').css('margin-bottom', '-2em').css('margin-top', '.2em');
        }
        else if(entryBody === '') {
            $('#emptyTitleCreate').text('');
            $('#emptyBodyCreate').text('Please enter a body!');
            $('#emptyBodyCreate').css('margin-bottom', '-1em').css('margin-top', '.2em');
        }
        else if (entryDate > formattedDate){
            $('#emptyBodyCreate').text('').css('margin-bottom', '1rem');
            $('#emptyTitleCreate').text('');
            $('#futureDateOnCreate').text('Entered date is invalid!');
            $('#futureDateOnCreate').css('margin-bottom', '-2em');
        }
        else {
            $.post('/createentry', entry, function(result) {
                $('#entryTitleCreate').val('');
                $('#entryBodyCreate').val('');
                $('#createEntryModal').modal('toggle');
                $('#mainSection').prepend(result);
            })
        }
    });

    $('#createEntryModal').on("hidden.bs.modal", function () {

        $('#emptyBodyCreate').text('').css('margin-bottom', '1rem');;
        $('#emptyTitleCreate').text('');
        $('#futureDateOnCreate').text('');
           
    });
});
