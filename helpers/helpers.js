const helpers = {
    privacy: function(privacy) {
        if(privacy === 'public')
            return '<i class="fas fa-globe-americas mx-1 privacy-globe" data-bs-toggle="tooltip" title="Public Entry"></i>';
        else 
            return '<i class="fas fa-lock mx-1 privacy-lock" data-bs-toggle="tooltip" title="Private Entry"></i>';
    },

    significance: function(significance) {
        if(significance === '/None'){
            return null;
        }
        else if(significance === '1') {
            return '<i class="fas fa-circle fa-xs"></i> <i class="far fa-circle fa-xs"></i> <i class="far fa-circle fa-xs"></i> <i class="far fa-circle fa-xs"></i> <i class="far fa-circle fa-xs"></i>'
        }
        else if(significance === '2') {
            return '<i class="fas fa-circle fa-xs"></i> <i class="fas fa-circle fa-xs"></i> <i class="far fa-circle fa-xs"></i> <i class="far fa-circle fa-xs"></i> <i class="far fa-circle fa-xs"></i>'
        }
        else if(significance === '3') {
            return '<i class="fas fa-circle fa-xs"></i> <i class="fas fa-circle fa-xs"></i> <i class="fas fa-circle fa-xs"></i> <i class="far fa-circle fa-xs"></i> <i class="far fa-circle fa-xs"></i>'
        }
        else if(significance === '4') {
            return '<i class="fas fa-circle fa-xs"></i> <i class="fas fa-circle fa-xs"></i> <i class="fas fa-circle fa-xs"></i> <i class="fas fa-circle fa-xs"></i> <i class="far fa-circle fa-xs"></i>'
        }
        else if(significance === '5') {
            return '<i class="fas fa-circle fa-xs"></i> <i class="fas fa-circle fa-xs"></i> <i class="fas fa-circle fa-xs"></i> <i class="fas fa-circle fa-xs"></i> <i class="fas fa-circle fa-xs"></i>'
        }
    },

    significanceEdit: function(significance) {
        if(significance === '/None'){
            return '<option value="/None" selected>None</option> <option value="5">5</option> <option value="4">4</option> <option value="3">3</option> <option value="2">2</option> <option value="1">1</option>'
        }
        else if(significance === '1') {
            return '<option value="/None">None</option> <option value="5">5</option> <option value="4">4</option> <option value="3">3</option> <option value="2">2</option> <option value="1" selected>1</option>'
        }
        else if(significance === '2') {
            return '<option value="/None">None</option> <option value="5">5</option> <option value="4">4</option> <option value="3">3</option> <option value="2" selected>2</option> <option value="1">1</option>'
        }
        else if(significance === '3') {
            return '<option value="/None">None</option> <option value="5">5</option> <option value="4">4</option> <option value="3" selected>3</option> <option value="2">2</option> <option value="1">1</option>'
        }
        else if(significance === '4') {
            return '<option value="/None">None</option> <option value="5">5</option> <option value="4" selected>4</option> <option value="3">3</option> <option value="2">2</option> <option value="1">1</option>'
        }
        else if(significance === '5') {
            return '<option value="/None">None</option> <option value="5" selected>5</option> <option value="4">4</option> <option value="3">3</option> <option value="2">2</option> <option value="1">1</option>'
        }
    },

    privacyEdit: function(privacy) {
        if(privacy === 'private'){
            return '<option selected value="private">Private</option> <option value="public">Public</option>'
        }
        else if(privacy === 'public') {
            return '<option value="private">Private</option> <option selected value="public">Public</option>'
        }
    },


    date: function(date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];

        return (monthNames[date.getMonth()]) + ' ' + date.getDate() +  ', ' + date.getFullYear()
    },

    time: function(time) {
        return (time.getHours()).toString().padStart(2, 0) + ':' + (time.getMinutes()).toString().padStart(2, 0);
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
    },

    sortMethod: function (sortMethod) {
        if(sortMethod === 'date') 
            return '<li><button class="dropdown-item disabled sortOption">Sort by Date</button></li> <li><button class="dropdown-item sortOption">Sort by Significance</button></li>'
        else 
            return '<li><button class="dropdown-item sortOption">Sort by Date</button></li> <li><button class="dropdown-item disabled sortOption">Sort by Significance</button></li>'
    }
}

module.exports = helpers;