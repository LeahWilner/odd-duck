'use strict';

console.log('hello js');

// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
// Times the image has been shown

Product.allProductsArray = [];
let ProductContainer = document.querySelector('section');
let results = document.querySelector('section + div');
let pic1 = document.querySelector('section img:first-child');
let pic2 = document.querySelector('section img:nth-child(2)');
let pic3 = document.querySelector('section img:first-child(3)');
console.log(ProductContainer, results, pic1, pic2, pic3);

let clicks = 0;
let maxClicks =25;
console.log('click tracking', {clicks, maxClicks});


function Product(name, src){
  this.name = name;
  this.src = src;
  this.views = 0;
  this.click = 0;
  Product.allProductsArray.push(this);  
}

console.log(is Product working? ',Product.allProductsArray');