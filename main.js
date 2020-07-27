let inputArea = document.getElementById('newInput');
let addButton = document.getElementById('add');
let list = document.querySelector('ul');
let newItem = "";
let deleteButton = document.querySelectorAll('.button');

//function for the "Delete" button
function deleteItem(e){
    let itemLine = e.target.parentNode;
    itemLine.parentNode.removeChild(itemLine);
}

//function for when the checkbox is checked
function completed(e){
    let itemText = e.target.nextElementSibling;
    itemText.style.textDecoration = 'line-through';
    itemText.style.color = '#8C7E9A';

    let itemLine = e.target.parentNode;
    list.appendChild(itemLine);
}

//function for the "Add" button
function addItem(){
    //gets the value from the input box
    newItem = inputArea.value;
    //create new list item
    let newListItem = document.createElement('li');

    //creates a check box and appends it to the list item
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    newListItem.appendChild(checkbox);
    checkbox.onclick = completed;

    //create a text node to hold the list item text from the input and append it to the list item
    let itemText = document.createElement('p');
    itemText.textContent = newItem;
    newListItem.appendChild(itemText);

    //create a delete button and append it to the list item
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete');
    deleteButton.textContent = "Delete";
    newListItem.appendChild(deleteButton);
    deleteButton.onclick = deleteItem;

    //add the whole list item to the to do list 
    list.prepend(newListItem);

    
}
//adds the new to-do item to the list
addButton.onclick = addItem;


//alarm clock stuff - Web Animations API
const myAnimation = document.getElementById("hands").animate(
    [
        {
            transform: 'rotate(0) ',
        },
        {
            transform: 'rotate(360deg) ',
        },
    ],
    {
        duration: 3000,
        iterations: Infinity,
    }
);

//third-party api - OpenWeatherMap API
// used https://bithacker.dev/fetch-weather-openweathermap-api-javascript as a resource for how to use the API


let cityInput = document.getElementById('city-input');
let weatherButton = document.getElementById('city-button');

//function that runs when we click the "Get Weather" button
function getWeather(){
    //gets the text value from the input
    let city = cityInput.value;

//function that gets the weather with our api key and city
//then displays it
function weatherBalloon(city) {
    var key = 'c715c9b3ebc21f403deb09b10da2d3be';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)  
    .then(function(resp) { return resp.json() }) 
    .then(function(data) {
      drawWeather(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  
    
    weatherBalloon(city);
}
  
  weatherButton.onclick = getWeather;
  
  //formats and displays all the weather information
  function drawWeather( d ) {
	var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
	document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
	document.getElementById('location').innerHTML = d.name;
}