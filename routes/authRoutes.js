const express = require('express');
const router = express.Router();

const {register, login, getAllUsers, getSingleAdmin,deleteSingleAdmin, updateSingleAdmin} = require('../controllers/authControllers');

// const { protect } = require('../middleware/auth');

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/alladmins').get(getAllUsers)
router.route('/admin/:id').get(getSingleAdmin).delete(deleteSingleAdmin);
router.route('/admin/edit/:id').put(updateSingleAdmin);
// router.post('/login', login)




module.exports = router;