const router = require('express').Router();
const Products = require('../models/products');
const  User  = require('../models/user');

// pseudo code!

//input data into invoice handlebar file
//add handlebar to new file, 
//write file, 
//read file
//return page?
//
//



//define end point to handle new invoice 

router.post('/products', async (req, res) => {
  //get user data from /invoice user input


  // user creates multiple products

  // once they are ready, got ot invoice generation page

  // click on generate button

  // app will find all the products from db

  // generate a pdf

  // user will be able to do


  console.log('heyyyy', req.body);
    try {
      const invoiceUserData = await Products.create({
        // order_number: req.body.order,
        name: req.body.name,
        user_id: req.session.userId,
        product_quantity: req.body.quantity,
        price: req.body.price,
        in_stock: req.body.subject
      });
      
  
    res.status(200).json(invoiceUserData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

  // router.get("/products", (req, res) => {
  //   const allProducts = Products.findAll();

  //   // const returnProducts = allProducts.get({plain: true });
  //   res.render('invoice-form', {allProducts})
  //   console.log(allProducts);
  // })





  





module.exports = router;