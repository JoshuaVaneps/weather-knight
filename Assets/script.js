var apiKey = "93ebb8e57f9a4d07d7c8ebff4bd9146f";
var searchInput;
var searchBtn = $('.btn');
var inputName ;
var inputLat ;
var inputLon ;
var currentTemp ;
var currentHumidity;
var currentFeels;
var currentMin;
var currentMax;
var currentWind;
var currentConditions;
var currentIcon;

function getcoordinates() {
    
    
// fetch('http://api.openweathermap.org/geo/1.0/direct?q={searchInput}&limit={limit}&appid={apiKey}')
// .then(response => response.json()).then(data =>{
//     console.log(data.name);
//     console.log(data.lat);
// //     console.log(data.lon);
// })
    // let {lat, lon} = ;
    // fetch (api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey})
};
$(function () {
searchBtn.on('click', function (event) {
    event.preventDefault();
  
    searchInput = document.getElementById("input").value;
    console.log(searchInput);
    console.log("button Clicked");
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${apiKey}`)
.then(response => response.json()).then(data =>{
    inputName =data[0].name;
   console.log(inputName);
    inputLat =data[0].lat;
    inputLon =data[0].lon;
fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${inputLat}&lon=${inputLon}&appid=${apiKey}&units=imperial`)
.then(response => response.json()).then(data =>{
    currentTemp = `${data.list[0].main.temp}`;
   console.log("current Temp= " + currentTemp);
    currentHumidity = `${data.list[0].main.humidity}`;
    currentFeels = `${data.list[0].main.feels_like}`;
    currentMin = `${data.list[0].main.temp_min}`;
    currentMax = `${data.list[0].main.temp_max}`;
    currentWind = `${data.list[0].wind.speed}`;
    currentConditions = `${data.list[0].weather[0].description}`;
    currentIcon = `${data.list[0].weather[0].icon}`;
   console.log("wind= " + currentWind);
   console.log("current Humidity= " + currentHumidity);
   console.log("max and min = " + currentMax + " & " + currentMin);
   console.log("feels like " + currentFeels);
   console.log(currentIcon)
   $('.img').append(`<img src="https://openweathermap.org/img/wn/${currentIcon}.png"/>`)
})
})
})
});
