// DEFINING FIELDS
const orderNum = document.getElementById('order');
const custName = document.getElementById('name');
const product = document.getElementById('product');
const quantity = document.getElementById('quantity');
const price = document.getElementById('price');
const inStock = document.getElementById('subject');
const submitBtn = document.getElementById('submitBtn');
const delProduct = document.getElementById('delProduct');
const createBtn = document.getElementById('create');
const printBtn = document.getElementById('print')


// CREATING VARIABLES
let orderNumber = '';
let customerName = '';
let custProduct = '';
let prodQuantity = '';
let prodPrice = '';
let prodInStock = '';

// GATHER DATA ON CLICK
$(submitBtn).click(function () {
    // grab data from inputs
    orderNumber = $(orderNum).val();
    customerName = $(custName).val();
    custProduct = $(product).val();
    prodQuantity = $(quantity).val();
    prodPrice = $(price).val();
    prodInStock = !!$(inStock).val();
  

    console.log(orderNumber, customerName, custProduct, prodQuantity, prodPrice, prodInStock);

    createInvoice(orderNumber, customerName, custProduct, prodQuantity, prodPrice, prodInStock);
  });


// POST TO /PRODUCTS ENDPOINT TO CREATE PRODUCT
async function createInvoice(orderNumber, customerName, custProduct, prodQuantity, prodPrice, prodInStock) {
    if (orderNumber && customerName && custProduct && prodQuantity && prodPrice) {
      const response = await fetch("/products", {
        method: "POST",
        body: JSON.stringify(
            {   "order": orderNumber ,
                "client": customerName,
                "name": custProduct,
                "quantity": prodQuantity,
                "price": prodPrice,
                "subject": prodInStock }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/invoice")
      } else {
        alert("Couldnt Create Your product! :( ");
      }
    }
  };

// NAVIGATE TO /CREATE ENDPOINT ON CLICK
$(createBtn).click(function() {
  document.location.replace('/create')
})



// PRINT INVOICE ON CLICK
 $(printBtn).click(function() {
  const invoice = document.getElementById('invoice').innerHTML
  var original = document.body.innerHTML

  document.body.innerHTML = invoice

  window.print();

  document.body.innerHTML = original
 })