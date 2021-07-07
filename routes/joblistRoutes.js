const express = require('express');
const router = express.Router();

const {create, getJobByManagerId, update, deleteJob, getAllJobByAdmin, getManagerJobsByAdmin} = require('../controllers/joblistController');

const { protect, authorize } = require('../middleware/auth');

router.route('/create').post(protect,authorize('manager'), create)
router.route('/getjobesbymanagerid').get(protect, authorize('manager'),getJobByManagerId);
router.route('/update/:id').put(protect, authorize('manager'), update);
router.route('/delete/:id').delete(protect, authorize('manager'),deleteJob);
// admin route
router.route('/alljobs').get(protect, authorize('admin'), getAllJobByAdmin);
router.route('/getmanagerjobsbyadmin/:id').get(protect, authorize('admin','manager'), getManagerJobsByAdmin);




module.exports = router;    