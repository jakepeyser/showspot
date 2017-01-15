const router = require('express').Router();

router.use('/artist', require('./artist'));
router.use('/location', require('./location'));

// No API routes matched --> 404
router.use((req, res) => res.status(404).end());

module.exports = router;
