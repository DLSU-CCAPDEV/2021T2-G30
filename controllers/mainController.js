const routerController = {

    getLogin: function (req, res) {
        res.render('login', {
            title: 'login',
            css: ['global']
        });
    },

    getError: function (req, res) {
        res.render('error', {
            title: 'Page not found',
            css:['global', 'error']
        });
    },

    getMainPage: function (req, res){
        res.render('mainpage', {
            title: 'SafeSpace',
            css: ['global','mainpage']
        });
    },

    getSettingsPage: function (req, res){
        res.render('settings',{
            title: 'Settings',
            css: ['global','settings']
        });
    }
    
};   

module.exports = routerController;