var apiKey = "93ebb8e57f9a4d07d7c8ebff4bd9146f";
var searchInput;
var searchBtn = $(".btn");
var inputName;
var inputLat;
var inputLon;
var currentTemp;
var currentHumidity;
var currentFeels;
var currentMin;
var currentMax;
var currentWind;
var currentConditions;
var currentIcon;

$(function () {
  searchBtn.on("click", function (event) {
    event.preventDefault();

    searchInput = document.getElementById("input").value;
    console.log(searchInput);
    console.log("button Clicked");
    // fetching longitude and lattude of input city
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        inputName = data[0].name;
        console.log(inputName);
        inputLat = data[0].lat;
        inputLon = data[0].lon;
        // fetching all relevant data from api usihg the lon and lat from geocode api
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${inputLat}&lon=${inputLon}&appid=${apiKey}&units=imperial`
        )
          .then((response) => response.json())
          .then((data) => {
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
            console.log(currentIcon);

            // 5 day forecast inputs
            for (let i = 0; i < 6; i++) {
              $(".forecastImg-" + i).html("");
              $("#forecastWeather-" + i).html("");

              var presentDate = dayjs();
              var addDay = presentDate.add(i, "day");
              var dayOfWeek = addDay.format("dddd-MMM-D");
              $("#day-" + i).text(dayOfWeek);

              forecastTempDeci = `${data.list[i].main.temp}`;
              forecastTemp = Math.ceil(forecastTempDeci);
              forecastHumidity = `${data.list[i].main.humidity}`;
              forecastWind = `${data.list[i].wind.speed}`;
              console.log(forecastTemp);
              forecastIcon = `${data.list[i].weather[0].icon}`;
              // setting icon for 5 day forecast
              $(".forecastImg-" + i).append(
                `<img src="https://openweathermap.org/img/wn/${forecastIcon}.png"/>`
              );
              var fsWeather = $("#forecastWeather-" + i);
              fsWeather.append(forecastTemp + "\xB0" + "F");
              fsWeather
                .append("<p></p>")
                .children()
                .addClass("forecastHumidity-" + i + " p-2 pl-2");

              var fsHumidity = $(".forecastHumidity-" + i);
              fsHumidity.append("Humidity: " + forecastHumidity);

              fsHumidity
                .append("<p></p>")
                .addClass("forecastWind-" + i + " p-2  pl-2");
              $(".forecastWind-" + i).append(
                "Wind Speed: " + forecastWind + "mph"
              );
            }
          });
      });
  });
});
