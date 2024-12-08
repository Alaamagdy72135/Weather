const forecast = document.getElementById("forecast");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const forecastingDays = document.getElementById("forecastingDays");
let final = [];

searchInput.addEventListener("input", function () {
    try {
        getWeather(searchInput.value, forecastingDays.value);
    } catch (error) { }
});

forecastingDays.addEventListener("input", function () {
    try {
        getWeather(searchInput.value, forecastingDays.value);
    } catch (error) { }
});

searchBtn.addEventListener("click", function () {
    try {
        getWeather(searchInput.value, forecastingDays.value);
    } catch (error) {
    }
})

async function getWeather(city, count = 3) {
    try {
        let response = await (await fetch(`https://api.weatherapi.com/v1/forecast.json?key=574d8bd828984989809203229240712&q=${city}&days=${count}`)).json();
        final = response;
        displayCurrentWeather();
    }
    catch (error) {
    }
}

getWeather("cairo", 3);

function displayCurrentWeather() {
    let cartona = "";

    for (let i = 0; i < final.forecast.forecastday.length; i++) {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let d = new Date(final.forecast.forecastday[i].date);
        let dayName = days[d.getDay()];
        let monthName = month[d.getMonth()];

        cartona += `
          <div class="col-4">
            <div class="card" id="current">
              <div class="card-header d-flex justify-content-between">
                <span class="text-white">${dayName}</span>
                <span class="text-white">${d.getDate()} ${monthName}</span>
              </div>
              <div class="card-body py-1">
                <h4 class="text-white">${final.location.name}</h4>
                <h2 class="text-white fs-1">${final.forecast.forecastday[i].day.avgtemp_c}°C</h2>
                <img
                  src = "${final.forecast.forecastday[i].day.condition.icon}" alt="${final.forecast.forecastday[i].day.condition.text}"/>
                <h4 class="text-white">${final.forecast.forecastday[i].day.condition.text}</h4>
              </div>
              <div class="card-footer">
                <div class="d-flex justify-content-between">
                  <span class="text-white">
                    <i class="fa-solid fa-umbrella text-white"></i>
                    ${final.forecast.forecastday[i].day.daily_chance_of_rain}%
                  </span>
                  <span class="text-white">
                    <i class="fa-solid fa-wind text-white"></i>
                    ${final.forecast.forecastday[i].day.maxwind_kph}km/h
                  </span>
                  <span class="text-white">
                    <i class="fa-solid fa-compass text-white"></i>
                    ${final.forecast.forecastday[i].hour[0].wind_dir}
                  </span>
                 </div>
              </div>
            </div>
          </div>
        `
    }
    forecast.innerHTML = cartona;
}