const express = require('express');
const router = express.Router();
const { requireSignin } = require('../api/controllers/auth');
const { create, list} = require('../api/controllers/posts');

router.post('/addPost', requireSignin, create);
router.get('/viewPost', list);

module.exports = router;