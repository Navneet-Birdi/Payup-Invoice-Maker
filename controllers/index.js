const router = require('express').Router();
const userRoutes = require('./userRoutes');

const homeRoutes = require('./homeRoutes')

router.use('/', homeRoutes)
router.use('/', userRoutes)


module.exports = router;






