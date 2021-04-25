const router = require("express")();
const controller = require('../controllers/controller');

// GET
router.get('/', controller.getIndex);

router.get('../phase-1-files')
//POST // Creation

//PATCH // Editing


//DELETE

module.exports = router; 