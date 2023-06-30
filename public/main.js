const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("input");
const cities = ["London", "Delhi", "Moscow", "Beijing", "Mumbai", "New York", "Barcelona", "Shanghai", "Paris", "Tokyo",  "Bangalore", "Madrid", "Kabul", "Stalingrad", "California", "Dhaka", "Kyiv", "Brussels"];
const n = cities.length;


async function fetchWeatherLocation(lat, lon){

  const url = `/loc?lat=${lat}&lon=${lon}`;
 
  const res = await fetch(url)  
  const data = await res.json() 
  console.log(data.cod);
  if (data.cod === '404') { 
          alert('City not found')  
          return  
  } 
        
  if (data.cod === 401) {
          alert('Invalid API Key')
          return
  }
  
  const displayData = {
    cityName: data.name,
    icon: data.weather[0].icon,
    temperature: data.main.temp,
    descr: data.weather[0].description, 
    feelsV: data.main.feels_like,
    minV: data.main.temp_min, 
    maxV: data.main.temp_max,
    windV: data.wind.speed,
    humidV: data.main.humidity,
    visiblityV: data.visibility
    
  };
  addWeatherToDOM(displayData, 0);

}


const permission = document.querySelector(".location");
permission.addEventListener("click", function() {
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      
      fetchWeatherLocation(lat, lon);
      const ele = document.querySelector(".hidden");
      ele.classList.remove("hidden");
      const ele2 = document.querySelector(".location");
      ele2.classList.add("hidden");
    }) 
  }
}); 


async function fetchWeather(city, i){

  const url = `/api?q=${city}`;
 
  const res = await fetch(url)  
  const data = await res.json()
 
  if (data.cod === 404) {
          alert('City not found') 
          return  
  }
       
  if (data.cod === 401) {
          alert('Invalid API Key')
          return
  }

  const displayData = {
    cityName: city,
    icon: data.weather[0].icon,
    temperature: data.main.temp,
    descr: data.weather[0].description,
    feelsV: data.main.feels_like,
    minV: data.main.temp_min,
    maxV: data.main.temp_max,
    windV: data.wind.speed,
    humidV: data.main.humidity,
    visiblityV: data.visibility
  };
  
  addWeatherToDOM(displayData, i);
  
}

const addWeatherToDOM = (input, i) => {
  const cityName = document.querySelector(`.c${i}`); 
  const temp = document.querySelector(`.t${i}`);
  const description = document.querySelector(`.des${i}`);

  const feels = document.querySelector(`.feels`);
  const wind = document.querySelector(`.wind`);
  const imageURL = `https://openweathermap.org/img/wn/${input.icon}@2x.png`; 
  const image = document.querySelector(".image");
  const min = document.querySelector(`.min${i}`);
  const max = document.querySelector(`.max${i}`);
  const humid = document.querySelector(`.humid${i}`);
  const visibility = document.querySelector(`.vis${i}`);

 
 cityName.innerText = input.cityName;
 image.innerHTML = `<img src="${imageURL}" alt="" height="90">`;  
 temp.innerText = input.temperature +" ^C";
  if(i === 0){
    wind.innerText = input.windV +" kmph";
    feels.innerText = input.feelsV +" ^C";
  }
  min.innerText = input.minV +" ^C"; 
  max.innerText = input.maxV +" ^C";
  description.innerText = input.descr;
  humid.innerText = input.humidV;
  visibility.innerText = input.visiblityV +" m";

  
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (cityInput.value === "") {
    alert('Enter City');
  }else{
    fetchWeather(cityInput.value, 0);
    const ele = document.querySelector(".hidden");
      ele.classList.remove("hidden");
      const ele2 = document.querySelector(".location");
      ele2.classList.add("hidden");  
  }
});

const randIdx = Math.floor(Math.random()*(n-4));

for(let i=1; i<6; i++){
  fetchWeather(cities[randIdx + i - 1], i);
}
 