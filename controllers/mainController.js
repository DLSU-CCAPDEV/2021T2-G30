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
            css: ['global','mainpage'],
            entries: [
                { entryTitle: 'Title 1', entryBody: 'Body 1', entryDate: 'June 14, 2012' }, 
                { entryTitle: 'Title 2', entryBody: 'Body 2', entryDate: 'April 28, 2021' }
            ]
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