const router = require("express")();
const controller = require('../controllers/controller.js');

// GET
router.get('/', controller.getIndex);

//POST // Creation

//PATCH // Editing


//DELETE

module.exports = router; 