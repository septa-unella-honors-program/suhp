/*This page sets up the routes to the applicaiton*/

var controller = require('../controllers/controllers');
var router = require('express').Router();

router.post('/signup', controller.users.post);
router.get('/signin', controller.users.get);

router.get('/goals', controller.goals.get);
router.post('/goals', controller.goals.post);
router.put('/goals', controller.goals.put);

router.post('/email', controller.emails.post);


module.exports = router;
