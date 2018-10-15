const express = require('express');
const router = express.Router();
const user_controller = require('../app/controllers/user.controller');

router.post('/api/v1/users', user_controller.create);
router.post('/api/v1/users/login', user_controller.login);
router.put('/api/v1/users/logout/:id', user_controller.logout);
router.get('/api/v1/users', user_controller.getAll);
router.put('/api/v1/users/:id', user_controller.update)
router.get('/api/v1/users/:id', user_controller.get);
router.get('/api/v1/welcome', user_controller.welcome);

module.exports = router;