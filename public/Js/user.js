$(document).ready(function () {

    $('#editProfile').click(function() {
        window.location.replace('/editaccount');
    });

    // add
    $(document).on('click', '#addFriend', function() {
        var receiver = $('#uName').text().substring(1);
        $.get('/friendRequest', {receiver: receiver}, function(result) {})
    });

    // cancel
    $(document).on('click', '#pendingFriend', function() {
        var receiver = $('#uName').text().substring(1);
        $.get('/pendingRequest', {receiver: receiver}, function(result) {
             if(result)
                statusChange();
        })    
    });

    // accept
    $(document).on('click', '#acceptFriend', function() {
        var receiver = $('#uName').text().substring(1);
        $.get('/acceptRequest', {receiver: receiver, accept: true}, function(result) {
             if(result)
                statusChange();
            
            
        })    
    });

    // reject
    $(document).on('click', '#rejectFriend', function() {
        var receiver = $('#uName').text().substring(1);
        $.get('/acceptRequest', {receiver: receiver, accept: false}, function(result) {
             if(result)
                statusChange();
        })    
    });

    // unfriend
    $(document).on('click', '#removeFriend', function() {
        var receiver = $('#uName').text().substring(1);
        $.get('/removeFriend', {receiver: receiver}, function(result) {
             if(result)
                statusChange();
        })    
    });

    // confirmation modal
    $(document).on('click', '#requestSent', function() {
        statusChange();
    });

    function statusChange() {
        $("#statusBtn").load(" #statusBtn > *");
        $("#statusChange").load(" #statusChange > *");
    };
});
