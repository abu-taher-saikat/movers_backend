const express = require('express');
const router = express.Router();

const {register, login, getAllUsers, getSingleAdmin,deleteSingleAdmin, updateSingleAdmin, myaccount} = require('../controllers/authControllers');

const { protect, authorize } = require('../middleware/auth');

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/alladmins').get(protect, authorize('admin'), getAllUsers)
router.route('/admin/:id').get(protect,authorize('admin'), getSingleAdmin).delete(protect,authorize('admin'), deleteSingleAdmin);
router.route('/admin/edit/:id').put(protect,authorize('admin'), updateSingleAdmin);
router.route('/myaccount').get(protect, myaccount);
// router.post('/login', login)




module.exports = router;    