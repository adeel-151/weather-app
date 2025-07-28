const apiKey = '04cca9f2dca448d0820190143252207';

    async function fetchWeather() {
        const city = document.getElementById('cityInput').value.trim();
        const resultDiv = document.getElementById('weatherResult');
        const errorDiv = document.getElementById('errorMsg');

        if (city === '') {
            errorDiv.textContent = 'Please enter a city name.';
            resultDiv.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);

            if (!response.ok) {
                throw new Error('City not found.');
            }

            const data = await response.json();

            resultDiv.innerHTML = `
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
                <p><strong>Condition:</strong> ${data.current.condition.text}</p>
                <img src="https:${data.current.condition.icon}" alt="weather icon">
                <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
                <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
            `;

            errorDiv.textContent = '';

        } catch (error) {
            errorDiv.textContent = 'City not found. Please try again.';
            resultDiv.innerHTML = '';
        }
    }