const router = require("express");
const mainController = require('../controllers/mainController.js');
const profileController = require('../controllers/profileController.js');

// initialize gridfs stream
// let gfs;
// conn.once('open', function() {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

// GET
router.get('/', mainController.getLogin); //incase user tries to access this route
router.get('/login', mainController.getLogin);
router.get('/error', mainController.getError);
router.get('/mainpage', mainController.getMainPage);
router.get('/settings', mainController.getSettingsPage);

router.get('/checksignup', profileController.checksignup);
router.get('/checklogin', profileController.checklogin);

router.get('/profile/:uName', profileController.getProfile);

//POST // Creation
router.post('/signup', upload.single('dPicture'), profileController.signup);

//PUT // Editing

//DELETE

module.exports = router; 