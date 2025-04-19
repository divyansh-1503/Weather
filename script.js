const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const weatherIconElement = document.getElementById('weatherIcon');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const weatherCardElement = document.querySelector('.weather-card');
const weatherInfoElement = document.querySelector('.weather-info');
const errorMessageElement = document.getElementById('errorMessage');
const loadingElement = document.querySelector('.loading');

const apiKey = '47b455f1e2814998dd6e1860fdd62b09' // Replace with your actual API key

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        displayError('Please enter a city name.');
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

function fetchWeather(city) {
    loadingElement.style.display = 'block';
    weatherInfoElement.style.display = 'none';
    errorMessageElement.style.display = 'none';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            loadingElement.style.display = 'none';
            weatherInfoElement.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            displayError('Failed to fetch weather data. Please check the city name and your internet connection.');
            loadingElement.style.display = 'none';
            weatherInfoElement.style.display = 'none';
        });
}

function displayWeather(data) {
    const { name, dt, main, weather, wind } = data;

    cityElement.textContent = name;
    dateElement.textContent = formatDate(dt);
    tempElement.textContent = `${Math.round(main.temp)}`;
    descriptionElement.textContent = weather[0].description;
    humidityElement.textContent = `${main.humidity}%`;
    windSpeedElement.textContent = `${wind.speed} m/s`;
    weatherIconElement.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    weatherIconElement.alt = weather[0].description;
}

function displayError(message) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}