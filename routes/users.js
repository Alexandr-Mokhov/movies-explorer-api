const router = require('express').Router();
const { userValidation } = require('../utils/validation');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', userValidation, updateUser);

module.exports = router;
