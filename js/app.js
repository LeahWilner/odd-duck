'use strict';

console.log('hello js');

// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
// Times the image has been shown

Product.allProductsArray = [];
let productContainer = document.querySelector('section');
let results = document.querySelector('section + div');
let pic1 = document.getElementById('pic1');
let pic2 = document.getElementById('pic2');
let pic3 = document.getElementById('pic3');
console.log(productContainer, results, pic1, pic2, pic3);

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

console.log('is Product working? ',Product.allProductsArray);

function getRandomNumber(){
  return Math.floor(Math.random() * Product.allProductsArray.length+1);
}

function renderProducts(){
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();

  if (product1 === product2 || product1 === product3){
    product1 = getRandomNumber();
  }

  if (product2 === product3 || product2 === product1){
    product2 = getRandomNumber();
  }
  if(product3 === product2 || product3 === product1){
    product3 = getRandomNumber();
  }

  console.log(product1, product2, product3);



  pic1.src = Product.allProductsArray[product1].src;
  pic2.src = Product.allProductsArray[product2].src;
  pic3.src = Product.allProductsArray[product3].src;

  pic1.alt = Product.allProductsArray[product1].name;
  pic2.alt = Product.allProductsArray[product2].name;
  pic3.alt = Product.allProductsArray[product3].name;

  Product.allProductsArray[product1].views++;
  Product.allProductsArray[product2].views++;
  Product.allProductsArray[product3].views++;
}

function handleProductClick(event){
  console.log('are we clicking? ', event);
  if(event.target === productContainer){
    alert('Please click on a product');
  }
  clicks++;
  let clickProduct = event.target.alt;
  console.log(clickProduct);
  for(let i = 0; i < Product.allProductsArray.length; i++){
    if(clickProduct === Product.allProductsArray[i].name){
      Product.allProductsArray[i].click++;
      break;
    }
  }
}

if(clicks === maxClicks){
  productContainer.removeEventListener('click', handleProductClick);
  results.addEventListener('click', renderResults);
  productContainer.className = 'no voting';
} else{
  renderProducts();
}


function renderResults(){
  let ul = document.getElementById('ul');
  for(let i =0; i < Product.allProductsArray.length; i++){
    let li = document.createElement('li');
    li.textContent = `${Product.allProductsArray[i].name} had ${Product.allProductsArray[i].views} and were clicked on ${Product.allProductsArray[i].click} times`;
    ul.appendChild(li);
  }
}

new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen');
new Product('pet-sweep', 'images/pet-sweep');
new Product('scissors', 'scissors');
new Product('shark', 'images/shark');
new Product('sweep', 'images/sweep');
new Product('tauntaun', 'images/tauntaun');
new Product('unicorn', 'images/unicorn');
new Product('water-can', 'images/water-can');
new Product('wine-glass', 'images/wine-glass');








renderProducts();
