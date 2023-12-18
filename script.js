const apiKey = '3a724385fe47311c999e19f5e60bd78b'; // Replace with your API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    if (cityInput === '') {
        alert('Please enter a city name');
        return;
    }

    const url = new URL(apiUrl);
    const params = {
        q: cityInput,
        appid: apiKey,
        units: 'metric',
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please enter a valid city name.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(error.message || 'Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';

    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    const weatherHtml = `
        <p>City: ${cityName}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${weatherDescription}</p>
    `;

    weatherInfo.innerHTML = weatherHtml;
}
