const router = require('express').Router();
const { Router } = require('express');
const { registerDecorator } = require('handlebars');
const Products = require('../models/products');
const { restore } = require('../models/user');
const  User  = require('../models/user');
const dateFormat = require('date-and-time')
const math = require("mathjs");
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

  // GET PRICES
  const productPrice = await Products.findAll({
    where: {
      user_id: req.session.userId,
    },
    attributes: [ 'price'],
    raw: true
  })

  let prices = []
  for (let index = 0; index < productPrice.length; index++) {
    const product = productPrice[index];
    prices.push(product.price)
  }
  let sum = math.sum(prices)
  let total = math.format(sum,  {notation: 'fixed', precision: 2})

// SET CREATION TIME
const date = new Date();
const now = dateFormat.format(date, 'MMM DD YYYY');

// IN STOCK ?

const productStock = await Products.findAll({
  where: {
    user_id: req.session.userId,
  },
  attributes: [ 'in_stock'],
  raw: true
})

let inStock = []
for (let index = 0; index < productStock.length; index++) {
  const stock = productStock[index];
  
  if(stock.in_stock === 1) {
    stock.in_stock = 'Yes'
    inStock.push(stock)
  } else {
   stock.in_stock = 'No'
   inStock.push(stock)
  }
}

console.log(inStock)

// RENDER INVOICE
res.render('created', { userData, productData, clientData, now, total, inStock })
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