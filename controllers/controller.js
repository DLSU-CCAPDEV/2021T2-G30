const routerController = {
    //get kung ano ginagawa nung function
    getIndex: function (req, res) {
        res.render('mainpage', {
            title: 'Homepage'
        });
    },

    // getIndex: (req, res) => {
    //     res.send("fuck you bitch");
        
    // },

    
}

module.exports = routerController;