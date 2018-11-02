var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtected = csrf();
router.use(csrfProtected);

// Require Controller Module
var member_controller = require('../controllers/memberController');

/* GET Member Profile. */
router.get('/tai-khoan', member_controller.isLogedIn, member_controller.get_profile);

/* GET Member logout. */
router.get('/thoat', member_controller.isLogedIn, member_controller.get_logout);

router.use('/', member_controller.notLogin_use);

/* GET Member Register. */
router.get('/dang-ky', member_controller.notLogedIn, member_controller.get_register);

/* POST Member Register. */
router.post('/dang-ky', member_controller.post_register);

/* GET Member Login. */
router.get('/dang-nhap', member_controller.notLogedIn, member_controller.get_login);

/* POST Member Login. */
router.post('/dang-nhap', member_controller.post_login);

module.exports = router;
