const router = require('express').Router();
const userRoutes = require('./userRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes)
router.use('/', userRoutes)
router.use('/', invoiceRoutes)


module.exports = router;






