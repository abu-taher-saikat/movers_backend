const express = require('express');
const router = express.Router();

const {create} = require('../controllers/costControllers.js');

const { protect, authorize } = require('../middleware/auth');

router.route('/create').post(protect, authorize('manager'), create)
// admin route


module.exports = router;    