$(document).ready(function () {
    
    $('.deleteBtn').click(function (event) {
        $.post('deleteentry', {id: event.target.id});
    });
});
