const router = require("express")();
const mainController = require('../controllers/mainController.js');
const profileController = require('../controllers/profileController.js');


// GET
router.get('/Login', mainController.getLogin);
router.get('/', mainController.getLogin); //incase user tries to access this route
router.get('/Error', mainController.getError);
router.get('/mainpage', mainController.getMainPage);
router.get('/settings', mainController.getSettingsPage);
//POST // Creation

router.post('/signup', profileController.signup);

//PATCH // Editing

//DELETE

module.exports = router; 