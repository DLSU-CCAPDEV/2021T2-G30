const express = require("express");
const mainController = require('../controllers/mainController.js');
const profileController = require('../controllers/profileController.js');
const router = express();
const db = require('../models/db.js');
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
router.get('/image/:id', mainController.getPicture);
router.get('/createentry', entryController.mainPageEntry);
router.get('/editaccount', mainController.geteditProfileAccount);


//POST // Creation
router.post('/signup', db.upload.single("dPicture"), profileController.signup);
router.post('/editaccount',profileController.editAccount);

//PATCH // Editing

//PUT // Editing

//DELETE

module.exports = router; 