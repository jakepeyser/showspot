const router = require('express').Router();

// router.use('/example', require('./example'));

// No API routes matched --> 404
router.use((req, res) => res.status(404).end());

module.exports = router;
