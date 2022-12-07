'use strict';
console.log('hello js');


Product.allProductsArray = [];
let productContainer = document.querySelector('section');
let results = document.querySelector('section + button');
let pic1 = document.getElementById('pic1');
let pic2 = document.getElementById('pic2');
let pic3 = document.getElementById('pic3');
// console.log(productContainer, results, pic1, pic2, pic3);

let clicks = 0;
// let maxClicks =25;
// console.log('click tracking', {clicks, maxClicks});


function Product(name, src){
  this.name = name;
  this.src = src;
  this.views = 0;
  this.click = 0;
  Product.allProductsArray.push(this);
}

let savedProductString = localStorage.getItem('savedProduct');
console.log('2. product strings', savedProductString);

if(savedProductString){
  let arrayOfNotProductObject = JSON.parse(savedProductString);
  console.log('objects that dont know they are products?', arrayOfNotProductObject);

  for(let i = 0; i < arrayOfNotProductObject.length; i++){
    new Product(
      arrayOfNotProductObject[i].name,
      arrayOfNotProductObject[i].src,
      arrayOfNotProductObject[i].views,
      arrayOfNotProductObject[i].click
    );
  }
  console.log('products', Product.allProductsArray);
}
else{


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
  new Product('pen', 'images/pen.jpg');
  new Product('pet-sweep', 'images/pet-sweep.jpg');
  new Product('scissors', 'images/scissors.jpg');
  new Product('shark', 'images/shark.jpg');
  new Product('sweep', 'images/sweep.png');
  new Product('tauntaun', 'images/tauntaun.jpg');
  new Product('unicorn', 'images/unicorn.jpg');
  new Product('water-can', 'images/water-can.jpg');
  new Product('wine-glass', 'images/wine-glass.jpg');
}

// console.log('is Product working? ', Product.allProductsArray);



function getRandomNumber(){
  return Math.floor(Math.random() * Product.allProductsArray.length);
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
  // console.log('are we clicking? ', event);
  if(event.target === productContainer){
    alert('Please click on a product');
  }
  clicks++;
  let clickProduct = event.target.alt;

  //if we dont click on an image this is undefined
  console.log(clickProduct);
  for(let i = 0; i < Product.allProductsArray.length; i++){
    if(clickProduct === Product.allProductsArray[i].name){
      Product.allProductsArray[i].click++;
      // localStorage.setItem(Product.allProductsArray[i].)
      break;
    }
  }
  if(clicks === 10){
    productContainer.removeEventListener('click', handleProductClick);
    results.addEventListener('click', renderResults);
    productContainer.className = 'no-voting';
    console.log('1. ',Product.allProductsArray);
    // localStorage.setItem('savedPizza', JSON.stringify(Pizza.allPizzasArray));
    localStorage.setItem('savedProduct', JSON.stringify(Product.allProductsArray));
  } else{
    renderProducts();
  }
}//closes the handle click function.




function renderResults(){
  console.log('did we make it here!');
  // id="ul"
  let ul = document.getElementById('product-results');
  for(let i = 0; i < Product.allProductsArray.length; i++){
    let li = document.createElement('li');
    li.textContent = `${Product.allProductsArray[i].name} had ${Product.allProductsArray[i].views} views and was clicked on ${Product.allProductsArray[i].click} times`;
    ul.appendChild(li);
  }
  //call our chart
  console.log('are our objects ready for the chart?',Product.allProductsArray);
  showResultsChart();
}








productContainer.addEventListener('click', handleProductClick);

renderProducts();


function showResultsChart(){
  let labels = [];
  let voteCounts = [];
  let showCounts = [];
  let votePercentage = [];

  for(let i = 0; i < Product.allProductsArray.length; i++){
    labels[i] = Product.allProductsArray[i].name;
    voteCounts[i] = Product.allProductsArray[i].click;
    showCounts[i] = Product.allProductsArray[i].views;


    let math;
    if(Product.allProductsArray[i].click === 0){
      math = `Zero clicks and shown ${Product.allProductsArray[i].views} times.`;
    } else {
      math = Math.round(((Product.allProductsArray[i].click / Product.allProductsArray[i]['views']).toFixed(2) * 100)) + '%';
    }
    if(voteCounts[i] === 0 || showCounts[i] === 0){
      votePercentage[i] = `Zero clicks and shown ${showCounts[i]} times.`;
    }else {
      votePercentage[i] = Math.floor(100 * (voteCounts[i] / showCounts[i]) );
    }
    // votePercentage[i] = Math.floor(100 * (voteCounts[i] / showCounts[i]) );
  }

  console.log('chart data:',labels,voteCounts, showCounts, votePercentage);

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Vote Count',
        data: voteCounts,
        backgroundColor: 'rgb(200,0,0)'
      },
      {
        label: 'Times Shown',
        data: showCounts,
        backgroundColor: 'rgb(0,200,0)',
      },
      // {
      //   label: 'Vote %',
      //   data: votePercentage
      // }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


}
