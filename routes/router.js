const express = require("express");
const router = express();
const mainController = require('../controllers/mainController.js');
const profileController = require('../controllers/profileController.js');
const entryController = require('../controllers/entryController.js');
const userController = require('../controllers/userController.js');
const memoriesController = require('../controllers/memoriesController');
const calendarController = require('../controllers/calendarController');
const db = require('../models/db.js');


// GET
router.get('/', mainController.getMainPage); //incase user tries to access this route
router.get('/login', mainController.getLogin);
router.get('/error', mainController.getError);
router.get('/mainpage', mainController.getMainPage);
router.get('/settings', mainController.getSettingsPage);
router.get('/image/:id', mainController.getPicture); //responsible for getting image in profiles
router.get('/editaccount', mainController.geteditProfileAccount);
router.get('/searchentry/:_id',mainController.getEntry);

router.get('/checksignup', profileController.checksignup);
router.get('/checklogin', profileController.checklogin);
router.get('/profile/:uName', profileController.getProfile);
router.get('/logout', profileController.getLogout);

router.get('/calendar', calendarController.getCalendar); //calendar update
router.get('/getEntries', calendarController.getDesiredEntries); //calendar update

router.get('/userprofile/:uName', userController.getUserProfile);
router.get('/friendRequest', userController.friendRequest);
router.get('/pendingRequest', userController.pendingRequest);
router.get('/acceptRequest', userController.acceptRequest);
router.get('/removeFriend', userController.unfriend);

router.get('/memories', memoriesController.getMemories); //memories feature

//POST // Creation
router.post('/signup', db.upload.any(), profileController.signup);
router.post('/editaccount', db.upload.any(),profileController.editAccount);
router.post('/login', profileController.login);

router.post('/createentry', db.upload.any(), entryController.createEntry);
router.post('/editentry', db.upload.any(),  entryController.editEntry);
router.post('/deleteentry', entryController.deleteEntry);

router.get('/searchresults', mainController.getSearch);

//PATCH // Editing

//PUT // Editing

//DELETE
router.get('/deleteaccount', profileController.deleteaccount);

module.exports = router; 