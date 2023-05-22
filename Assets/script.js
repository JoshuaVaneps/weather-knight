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
            currentPressure = `${data.list[0].main.pressure}`;
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
            // current advanced temp info
            $("#max-temp").children("h2").html("");

            $("#max-temp")
              .children("h2")
              .append(currentMax + "\xB0" + "F");

            $("#pressure").children("h2").html("");

            $("#pressure")
              .children("h2")
              .append(currentPressure + " hPa");

            $("#feels-like").children("h2").html("");

            $("#feels-like")
              .children("h2")
              .append(currentFeels + "\xB0" + "F");

            // 5 day forecast inputs
            for (let i = 0; i < 6; i++) {
              $(".forecastImg-" + i).html("");
              $("#forecastWeather-" + i).html("");

              var presentDate = dayjs();
              var addDay = presentDate.add(i, "day");
              var dayOfWeek = addDay.format("ddd-MMM-D");
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
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${inputLat}&lon=${inputLon}&appid=${apiKey}&units=imperial`
        )
          .then((response) => response.json())
          .then((data) => {
            var sunriseDate = `${data.sys.sunrise}` * 1000;
            var d = new Date(sunriseDate);
            let sunriseHours = d.getHours();
            let sunriseMinutes = "0" + d.getMinutes();
            var AmOrPm = sunriseHours >= 12 ? "pm" : "am";
            sunriseHours = sunriseHours % 12 || 12;
            let sunRise = sunriseHours + ":" + sunriseMinutes.substr(-2);

            console.log("sunrises at " + sunRise + AmOrPm);
            $("#sunrise").children("h2").html("");

            $("#sunrise")
              .children("h2")
              .append(sunRise + AmOrPm);

            var sunsetDate = `${data.sys.sunset}` * 1000;
            var d = new Date(sunsetDate);
            let sunsetHours = d.getHours();
            let sunsetMinutes = "0" + d.getMinutes();
            var AmOrPm = sunsetHours >= 12 ? "pm" : "am";
            sunsetHours = sunsetHours % 12 || 12;
            let sunSet = sunsetHours + ":" + sunsetMinutes.substr(-2);

            console.log("sunsets at " + sunSet + AmOrPm);
            $("#sunset").children("h2").html("");

            $("#sunset")
              .children("h2")
              .append(sunSet + AmOrPm);

            var cloudiness = `${data.clouds.all}`;
            $("#cloud").children("h2").html("");

            $("#cloud")
              .children("h2")
              .append(cloudiness + "%");
          });
      });
  });
});
