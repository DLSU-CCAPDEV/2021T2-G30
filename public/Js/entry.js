$(document).ready(function () {
    
    $('.deleteBtn').click(function (event) {
        
        $.get('deleteentry', {id: event.target.id}, function(){});
    });
});
