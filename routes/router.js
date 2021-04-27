const router = require("express")();
const mainController = require('../controllers/mainController.js');
const profileController = require('../controllers/profileController.js');


// GET
router.get('/', mainController.getLogin); //incase user tries to access this route
router.get('/Login', mainController.getLogin);
router.get('/Error', mainController.getError);
router.get('/mainpage', mainController.getMainPage);
router.get('/settings', mainController.getSettingsPage);

router.get('/checksignup', profileController.checksignup);
router.get('/checklogin', profileController.checklogin);

router.get('/profile/:uName', profileController.getProfile);
router.get('/logout', profileController.getLogout);

//POST // Creation
router.post('/signup', profileController.signup);
router.post('/login', profileController.login);

//PATCH // Editing

//DELETE

module.exports = router; 