const express = require("express");
const mainController = require('../controllers/mainController.js');
const profileController = require('../controllers/profileController.js');
const entryController = require('../controllers/entryController.js');
const userController = require('../controllers/userController.js');
const memoriesController = require('../controllers/memoriesController.js');
const calendarController = require('../controllers/calendarController.js');
const letterController = require('../controllers/letterController.js');

const db = require('../models/db.js');
const validation = require('../helpers/validation.js');

const router = express();

// GET
router.get('/', mainController.getMainPage); //incase user tries to access this route
router.get('/login', mainController.getLogin);
router.get('/error', mainController.getError);
router.get('/usererror', mainController.getUserError);
router.get('/mainpage', mainController.getMainPage);
router.get('/settings', mainController.getSettingsPage);
router.get('/image/:id', mainController.getPicture); //responsible for getting image in profiles
router.get('/editaccount', mainController.geteditProfileAccount);
router.get('/searchentry/:_id',mainController.getEntry);
router.get('/changeSort', mainController.changeSort);

router.get('/checksignup', profileController.checksignup); //checks username
router.get('/getCheckEmail', profileController.checkemail); //checks email if it already exists
router.get('/getEditEmail', profileController.editCheckEmail);
router.get('/checklogin', profileController.checklogin); //checks credentials and sends it back to ajax
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
router.get('/disablememories', profileController.disableMemories);
router.get('/enablememories', profileController.enableMemories);

router.get('/letters', letterController.getLetters);
router.get('/lettersoutgoing', letterController.getLettersOutgoing);

//POST // Creation
router.post('/signup', [db.upload.any(), validation.signupValidation()], profileController.signup);
router.post('/editaccount', db.upload.any(),profileController.editAccount);
router.post('/login', validation.loginValidation(), profileController.login);

router.post('/createentry', db.upload.any(), entryController.createEntry);
router.post('/editentry', db.upload.any(),  entryController.editEntry);
router.post('/deleteentry', entryController.deleteEntry);

router.post('/createletter', db.upload.any(), letterController.createLetter);

router.get('/searchresults', mainController.getSearch);

//PATCH // Editing

//PUT // Editing

//DELETE
router.get('/deleteaccount', profileController.deleteaccount);

module.exports = router; 