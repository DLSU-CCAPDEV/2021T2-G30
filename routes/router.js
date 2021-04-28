const router = require("express")();
const mainController = require('../controllers/mainController.js');
const profileController = require('../controllers/profileController.js');
const entryController = require('../controllers/entryController.js');


// GET
router.get('/', mainController.getLogin); //incase user tries to access this route
router.get('/login', mainController.getLogin);
router.get('/error', mainController.getError);
router.get('/mainpage', mainController.getMainPage);
router.get('/settings', mainController.getSettingsPage);

router.get('/checksignup', profileController.checksignup);
router.get('/checklogin', profileController.checklogin);

router.get('/profile/:uName', profileController.getProfile);
router.get('/logout', profileController.getLogout);

//POST // Creation
router.post('/signup', profileController.signup);
router.post('/createEntry', entryController.createEntry);

router.post('/login', profileController.login);

//PATCH // Editing

//PUT // Editing

//DELETE

module.exports = router; 