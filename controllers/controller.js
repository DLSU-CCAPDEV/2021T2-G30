const routerController = {
    // get kung ano ginagawa nung function
    getIndex: function (req, res) {
        res.render('mainpage', {
            title: 'Homepage'
        });
    },

    getLogin: function (req, res) {
        res.render('login', {
            title: 'login'
        });
    },


    
};   

module.exports = routerController;