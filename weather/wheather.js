const apiKey = "f00c38e0279b7bc85480c3fe775d518c";
const loader = document.getElementById("loader");

let city = localStorage.getItem("city");
let lat = localStorage.getItem("lat");
let lon = localStorage.getItem("lon");

if (city) fetchWeather(`q=${city}`);
else if (lat && lon) fetchWeather(`lat=${lat}&lon=${lon}`);

async function fetchWeather(param) {
    loader.style.display = "block";

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${param}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    loader.style.display = "none";

    document.getElementById("city-name").innerText = data.name;
    document.getElementById("date").innerText = moment().format("LLLL");
    document.getElementById("temp").innerText = `${data.main.temp}°C`;
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("details").innerText =
        `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;

    document.getElementById("weather-icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    changeBackground(data.weather[0].main);
}

function changeBackground(type) {
    if (type === "Rain") document.body.style.backgroundImage = "url(bg-rain.jpg)";
    else if (type === "Clouds") document.body.style.backgroundImage = "url(bg-cloudy.jpg)";
    else document.body.style.backgroundImage = "url(bg-sunny.jpg)";
}

function goBack() {
    localStorage.clear();
    window.location.href = "index.html";
}
