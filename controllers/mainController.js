const routerController = {

    getLogin: function (req, res) {
        res.render('login', {
            title: 'login',
            css: ['global']
        });
    },

    getIndex: function (req, res) {
        res.render('mainpage', {
            title: 'Homepage'
        });
    },
    
};   

module.exports = routerController;