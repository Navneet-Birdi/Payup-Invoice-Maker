const router = require('express').Router();
const Products = require('../models/products');
const User = require('../models/user')
const orderNum = []

// LOGIN TO VIEW INVOICE FORM
router.post('/login', async (req, res) => {
  let activeUser = req.body.user
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.user,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // SET SESSION VARIABLE LOGGEDIN TO TRUE 
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// DISPLAY FORM FOR INVOICE
router.get("/invoice", async (req, res) => {


  const active = await User.findByPk(req.session.userId);

  const returnActive = active.get({ plain: true })

  const allProducts = await Products.findAll({
    where: {
      user_id: req.session.userId,
    },
    raw: true
  })

  console.log(allProducts);
  res.render('invoice-form', {
    returnActive,
    allProducts
   })
    
  });

// CREATE NEW USER 
router.post('/newuser', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address
    });

    // SET SESSION VARIABLE LOGGEDIN TO TRUE
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/success", (req, res) => {
  res.render('success')
});
module.exports = router;