////////Version after 2/13
//location parameters
var apiLink = 'http://api.openweathermap.org/data/2.5/weather?';
var APP_ID = '3a4633c0a5d16f141abef2134e99bba7';
//weather parameters
var weatherBackground;
var weatherTemperature;
var weatherDescription;
var weatherHumidity;
var weatherWind;
var weatherCityLon;
var weatherCityLat;
var weatherCity;
var country;
var weatherBackgroundUrl;


//Main JSON call to retrieve all data
$(document).ready(function(){
//get location
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			weatherCityLat = position.coords.latitude; 
			weatherCityLon = position.coords.longitude;
			var mainLink = apiLink + 'lat=' + weatherCityLat + '&lon=' +  weatherCityLon + '&appid=' + APP_ID;
			


  //fetching data from weather API
  $.getJSON(mainLink, function(weatherData) {
  	weatherDescription = weatherData.weather[0].description;
  	weatherTemperature = weatherData.main.temp;
  	weatherHumidity = weatherData.main.humidity;
  	weatherWind = weatherData.wind.speed;
  	weatherCity = weatherData.name;
  	country = weatherData.sys.country;
  	weatherBackground = weatherData.weather[0].icon;
  	weatherBackgroundUrl = "http://openweathermap.org/img/w/" + weatherBackground + ".png";

    //temperature switch
var toggleBtn = true;
	var celsTemp = ((weatherTemperature) - 273).toFixed();
	var farehTemp = ((weatherTemperature)*(9 / 5) - 459.67).toFixed();

//updating html page with retrieved data
  	$('#weatherCity').html(weatherCity +', ' + country);
  	$('#weatherWind').html('Wind speed: ' + weatherWind +  ' mp/h');
  	
  	$('#weatherHumidity').html('Humidity: ' + weatherHumidity + ' %');
  	$('#weatherDescription').html(weatherDescription);
  	$('#weatherBackground').html("<img src='" + weatherBackgroundUrl + " '>");

  	$('#weatherTemperature').html(celsTemp + ' &#8451');
  	$('#weatherTemperature').click(function (){
	if(toggleBtn === false){
		$('#weatherTemperature').html(celsTemp + ' &#8451');
		toggleBtn = true;
	}
	else{
		$('#weatherTemperature').html(farehTemp + ' &#8457');
		toggleBtn = false;
	}
});

	});
});
	}
});