$(document).ready(function () {

    $('#editProfile').click(function() {
        window.location.replace('/editaccount');
    });

    // add
    $('#addFriend').click(function() {
        var receiver = $('#uName').text().substring(1);
        $.get('/friendRequest', {receiver: receiver}, function(result) {})
    });

    // cancel
    $('#pendingFriend').click(function() {
        var receiver = $('#uName').text().substring(1);
        $.get('/pendingRequest', {receiver: receiver}, function(result) {
            
             if(result)
                 location.reload();
            
            // if(result)
            //     $.get('/userprofile/' + receiver)
            
        })    
    });

    // accept
    $('#acceptFriend').click(function() {
        var receiver = $('#uName').text().substring(1);
        $.get('/acceptRequest', {receiver: receiver, accept: true}, function(result) {
             if(result)
                 location.reload();
            
            
        })    
    });

    // reject
    $('#rejectFriend').click(function() {
        var receiver = $('#uName').text().substring(1);
        $.get('/acceptRequest', {receiver: receiver, accept: false}, function(result) {
             if(result)
                 location.reload();
        })    
    });

    // unfriend
    $('#removeFriend').click(function() {
        var receiver = $('#uName').text().substring(1);
        $.get('/removeFriend', {receiver: receiver}, function(result) {
             if(result)
                 location.reload();
        })    
    });

    // confirmation modal
    $('#requestSent').click(function() {
        location.reload();
    });

});
