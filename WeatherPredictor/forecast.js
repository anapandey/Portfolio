$(document).ready(function(){
    var unit="&units=metric";
    var apiKey="&APPID=d23737fe086028a8aeaea31d43a6817d";
//geolocation api call for city & country names
    $.getJSON('http://ip-api.com/json/?callback=?', function(data) {
        var mycity = data.city;
        var mycountry=data.country;
        getWeather(mycity, mycountry);
    });
// getting weather forecast data from openweathermap, ajax call    
    function getWeather(mycity, mycountry) {
        var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + mycity + "," + mycountry + "" + unit + "" + apiKey;
        $.ajax({
            url: apiURL,
            dataType: 'json',
            success: function(data) {
                $('#cityName').html(mycity + " ," +mycountry);
                $('#forecastText').html(data.weather[0].main + " , forecast for " + data.weather[0].description);
                $('#temperature').html(data.main.temp+" &deg;C");
 // converting default temperature unit to Fahrenheit & Celsius               
                $('#fahrenheitButton').click(function(){
                    $('#temperature').empty().hide().append(Math.round(data.main.temp)*9/5+32 +" &deg;F").fadeIn(800);
                });
                $('#celsiusButton').click(function(){
                    $('#temperature').empty().hide().append(data.main.temp+" &deg;C").fadeIn(800);
                });
            }
        });
    }
 // Getting weather data for cities entered in searchbox, ajax call   
    $('#button').click(function(){
       var city=$('#city').val();
        if(city !=''){
            console.log(city);
            $.ajax({
               url:"http://api.openweathermap.org/data/2.5/weather?q=" + city + unit + apiKey,
               type:"GET",
               dataType:"json",
               success:function(data){
                   console.log(data);
                   $('#cityName').empty().hide().append(data.name+ " , "+data.sys.country).fadeIn(800);
                   $('#forecastText').empty().hide().append(data.weather[0].main + " , forecast for " + data.weather[0].description).fadeIn(800);
                   $('#temperature').empty().hide().append(data.main.temp +" &deg;C").fadeIn(800);
   //converting data into Fahrenheit  & Celsius                
                   $('#fahrenheitButton').click(function(){
                       $('#temperature').empty().hide().append(Math.round(data.main.temp)*9/5+18 +" &deg;F").fadeIn(800);
                   });
                   $('#celsiusButton').click(function(){
                       $('#temperature').empty().hide().append(data.main.temp+" &deg;C").fadeIn(800);
                   });
               }
            });
        } else {
//searchbox error alert            
           $('#error').empty().hide().append('Please enter a city').fadeIn(800).fadeOut(2000);
        }
    });
});




                          
