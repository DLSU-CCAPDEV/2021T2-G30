const express = require("express");
const mainController = require('../controllers/mainController.js');
const profileController = require('../controllers/profileController.js');
const entryController = require('../controllers/entryController.js');
const router = express();
const db = require('../models/db.js');


// GET
router.get('/', mainController.getLogin); //incase user tries to access this route
router.get('/login', mainController.getLogin);
router.get('/error', mainController.getError);
router.get('/mainpage', mainController.getMainPage);
router.get('/settings', mainController.getSettingsPage);
router.get('/image/:id', mainController.getPicture); //responsible for getting image
router.get('/editaccount', mainController.geteditProfileAccount);

router.get('/checksignup', profileController.checksignup);
router.get('/checklogin', profileController.checklogin);
router.get('/profile/:uName', profileController.getProfile);
router.get('/logout', profileController.getLogout);

router.get('/createentry', db.upload.any("image"), entryController.mainPageEntry);

//POST // Creation
router.post('/signup', db.upload.any("dPicture"), profileController.signup);
router.post('/editaccount',profileController.editAccount);
router.post('/login', profileController.login);

router.post('/createentry', entryController.createEntry);
router.post('/editentry', entryController.editEntry);
router.post('/deleteentry', entryController.deleteEntry);

//PATCH // Editing

//PUT // Editing

//DELETE

module.exports = router; 