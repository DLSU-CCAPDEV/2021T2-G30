const router = require("express")();
const controller = require('../controllers/controller.js');

// GET
router.get('/', controller.getIndex);
router.get('/login', controller.getLogin);

//POST // Creation

//PATCH // Editing

//DELETE

module.exports = router; 