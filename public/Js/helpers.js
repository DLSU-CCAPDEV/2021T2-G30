const helpers = {
    privacy: function(privacy) {
        if(privacy === 'public')
            return '<i class="fas fa-globe-americas mx-1 privacy-globe" data-bs-toggle="tooltip" title="Public Entry"></i>';
        else 
            return '<i class="fas fa-lock mx-1 privacy-lock" data-bs-toggle="tooltip" title="Private Entry"></i>';
    },

    date: function(date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];

        return (monthNames[date.getMonth()]) + ' ' + date.getDate() +  ', ' + date.getFullYear()
    },

    defaultDate: function(date) {
        //console.log(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0))
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0)
    },

    status: function(friend) {
        /*
            2 = friend
            1 = sent
            0 = to accept
            -1 = not friend
        */
        if(friend === 2)
            return '<button type="button" id="removeFriend" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#removefriendmodal"> Unfriend </button>'
        else if(friend === 1)
            return '<button type="button" id="pendingFriend" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cancelrequestmodal"> Cancel Request </button>'
        else if(friend === 0)
            return '<button type="button" id="acceptFriend" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#acceptfriendmodal" style="margin-right: 5px"> Accept Request </button> <button type="button" id="rejectFriend" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#rejectfriendmodal" style="margin-left: 5px"> Reject Request </button>'
        else if(friend === -1)
            return '<button type="button" id="addFriend" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addfriendmodal"> Add Friend </button>'
    }
}

module.exports = helpers;