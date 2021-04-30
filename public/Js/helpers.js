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
    }
}

module.exports = helpers;