const router = require('express').Router();
// LOAD INDEX.HTML ON LANDING PAGE
router.get("/", (req, res) => {
  res.render('index')
});

// LOAD SIGNUP.HTML
router.get("/signup", (req, res) => {
  res.render('signup')
});


module.exports = router;