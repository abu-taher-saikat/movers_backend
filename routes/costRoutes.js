const express = require('express');
const router = express.Router();

const {create, getCostById} = require('../controllers/costControllers.js');

const { protect, authorize } = require('../middleware/auth');

router.route('/create').post(protect, authorize('manager'), create)
router.route('/getcostbyjobid/:id').get(protect, authorize('manager'), getCostById)
// admin route


module.exports = router;    