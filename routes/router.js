const express = require("express");
const mainController = require('../controllers/mainController.js');
const profileController = require('../controllers/profileController.js');
const router = express();
const db = require('../models/db.js');

// GET
router.get('/', mainController.getLogin); //incase user tries to access this route
router.get('/login', mainController.getLogin);
router.get('/error', mainController.getError);
router.get('/mainpage', mainController.getMainPage);
router.get('/settings', mainController.getSettingsPage);

router.get('/checksignup', profileController.checksignup);
router.get('/checklogin', profileController.checklogin);
router.get('/profile/:uName', profileController.getProfile);
router.get('/image/:id', mainController.getPicture);

//POST // Creation
router.post('/signup', db.upload.single("dPicture"), profileController.signup);

//PUT // Editing

//DELETE

module.exports = router; 