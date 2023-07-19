const inputBox=document.querySelector(".input-box");
const searchBtn=document.getElementById("search-btn");
const weather_img=document.querySelector(".weather-img");
const temp=document.querySelector(".temp");
const description=document.querySelector(".description");
const humidity=document.getElementById("humidity-val");
const wind_speed=document.getElementById("wind-speed");
const location_not_found=document.querySelector(".location-not-found");
const weather_body=document.querySelector(".weather-body");



async function checkWeather(city){

    const api_key = "c37350bfab2e80be1489dd39aabe3bcf";

    /*  here, `` is called back text.
    we used the `` around a series of characters, which are interpreted as a string literal, 
    but any expressions of the form ${..} are parsed and evaluated inline immediately. */

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    /*The fetch() method in JavaScript is used to request data from a server. The request can be of any type of API that returns the data in JSON or XML. The fetch() method requires one parameter, the URL to request, and returns a promise.*/

    const weather_data = await fetch(`${url}`).then(response => response.json());
 
    //console.log(weather_data);

    if(weather_data.cod === `404`){
        location_not_found.style.display="flex";
        weather_body.style.display="none";
        console.log("error");
        return;
    }
    location_not_found.style.display="none";
    weather_body.style.display="flex";
    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            break;
    }
}

/* for enter key press on inputbox*/
inputBox.addEventListener("keypress", (event)=>{
    if(event.keyCode===13) 
        checkWeather(inputBox.value);
});

searchBtn.addEventListener("click", ()=>{
    checkWeather(inputBox.value);
});


