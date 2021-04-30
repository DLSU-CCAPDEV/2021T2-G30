$(document).ready(function () {

    var today = new Date()
    var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);
    
    $('#dateEntry').val(formattedDate);
    
    $('.deleteBtn').click(function (event) {
        $.post('deleteentry', {id: event.target.id}, function(result) {
            if(result) {
                location.reload();
            }
        });
    });

    $('.editBtn').click(function (event) {
        var id = event.target.id;

        var entry = {
            id: id,
            entryTitle: $('#entryTitle-' + id).val(),
            entryBody: $('#entryBody-' + id).val(),
            significance: $('#significance-' + id).val(),
            entryDate: $('#entryDate-' + id).val(),
            privacy: $('#privacy-' + id).val()
        }
        
        if(entry.entryDate <= formattedDate) {
            $.post('editentry', entry, function(result) {
                if(result) {
                    location.reload();
                }
            });
        }
        else {
            $('#futureDate').text('Entered date is invalid!');
            $('#futureDate').css('margin-bottom', '-2em');
        }
    });

    $('#createBtn').click(function () {

        var entryDate = $('#dateEntry').val();
        var title = $('#entryTitleCreate').val();
        var body = $('#entryBodyCreate').val();

        if(title === '') {
            $('#emptyBodyCreate').text('').css('margin-bottom', '1rem');;
            $('#emptyTitleCreate').text('Please enter a title!');
            $('#emptyTitleCreate').css('margin-bottom', '-2em').css('margin-top', '.2em');
        }
        else if(body === '') {
            $('#emptyTitleCreate').text('');
            $('#emptyBodyCreate').text('Please enter a body!');
            $('#emptyBodyCreate').css('margin-bottom', '-1em').css('margin-top', '.2em');
        }
        else if (entryDate > formattedDate){
            $('#futureDateOnCreate').text('Entered date is invalid!');
            $('#futureDateOnCreate').css('margin-bottom', '-2em');
        }
        else 
            $('#createEntryForm').submit();
    });

    $('#createEntryModal').on("hidden.bs.modal", function () {

        //alert('closed modal');

        $('#emptyBodyCreate').text('').css('margin-bottom', '1rem');;
        $('#emptyTitleCreate').text('');
        $('#futureDateOnCreate').text('');
           
    });
});
