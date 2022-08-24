const router = require('express').Router();
const { Router } = require('express');
const { registerDecorator } = require('handlebars');
const Products = require('../models/products');
const { restore } = require('../models/user');
const  User  = require('../models/user');
const dateFormat = require('date-and-time')
// pseudo code!

//input data into invoice handlebar file
//add handlebar to new file, 
//write file, 
//read file
//return page?
//
//

router.get('/create', async (req, res) => {
  
  // GET USER DATA
  const userData = await User.findOne({
    where: {
      id: req.session.userId
    },
    raw: true,
  })


  // GET A SINGLE PRODUCT INSTANCE SO EXTRACT CLIENT AND ORDER NUM
  const clientData = await Products.findOne({
    where: {
      user_id: req.session.userId
    },
    raw: true,
    })


// GET PRODUCT DATA
  const productData = await Products.findAll({
    where: {
      user_id: req.session.userId,
    },
    raw: true
  })


// SET CREATION TIME
const date = new Date();
const now = dateFormat.format(date, 'MMM DD YYYY');


//need to write function to add total sum
  // run query to select all product price when user id is = to current user id
  // add to array
  // user math npm to add total sum

// RENDER INVOICE
res.render('created', { userData, productData, clientData, now })
})


//define end point to handle new invoice 

router.post('/products', async (req, res) => {
  
  // CREATE NEW PRODUCT

    try {
      const invoiceUserData = await Products.create({
        name: req.body.name,
        user_id: req.session.userId,
        order_num: req.body.order,
        client: req.body.client,
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

// DELETE PRODUCT BY ID 
//post method because form won't recognize delete
router.post('/:id', async (req, res) => {
  try {
  const deleteProduct = await Products.destroy({
    where: {
     id: req.params.id
    },
    
  })
  const allProducts = await Products.findAll({
    where: {
      user_id: req.session.userId,
    },
    raw: true
  })
  res.render('invoice-form', {allProducts})

} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
})





module.exports = router;