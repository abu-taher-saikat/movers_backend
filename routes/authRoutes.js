const express = require('express');
const router = express.Router();

const {register, login} = require('../controllers/authControllers');


// const { protect } = require('../middleware/auth');

router.route('/register').post(register)
router.route('/login').post(login)
// router.post('/login', login)




module.exports = router;