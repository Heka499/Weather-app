const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const temperatureToggle = document.querySelector('.temperature-toggle');
const searchInput = document.querySelector('.search-box input');

// event listener for the "Enter" key press
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        
        event.preventDefault();

        
        search.click();
    }
});

search.addEventListener('click', () => {
    
    const APIKey = '40eb30a81126caf6139b79047c899339';
    const cityName = document.querySelector('.search-box input').value;

    if(cityName === '')
        return;

    // check if C or F is selected
    const selectedUnit = document.querySelector('input[name="temperature"]:checked').id;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`).then(response => response.json()).then(json => {
        
        if(json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            temperatureToggle.style.display = 'none'
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        //const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humnidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            
            case 'Rain':
                image.src = 'images/rain.png';
                break;

            case 'Clouds':
                image.src = 'images/cloud.png';
                break;

            case 'Haze':
                image.src = 'images/mist.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;

            default:
                image.src = '';
        }

        // inital temperature in celsius 
        let initialTemperature = json.main.temp;
        
        // check if the fahrenheit is selected and convert initaltemp to fahrenheit 
        if (selectedUnit === 'fahrenheit') {
             initialTemperature = (initialTemperature * 9/5) + 32;
        }
        
        // Pass the initial temperature and the corresponding temperature unit
        setTemperature(initialTemperature, selectedUnit === 'celsius' ? 'C' : 'F');


        //temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humnidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        temperatureToggle.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    });

});


temperatureToggle.addEventListener('change', function () {
    // Get the selected unit from the toggle
    let selectedUnit = document.querySelector('input[name="temperature"]:checked').id;

    // Get the current temperature value
    let currentTemperature = parseFloat(document.querySelector('.weather-box .temperature').textContent);

    
    if (selectedUnit === 'celsius') {

        if (currentTemperature !== undefined && selectedUnit === 'celsius') {
            currentTemperature = (currentTemperature - 32) * 5/9;
        }
        setTemperature(currentTemperature, 'C')
    } else {
        if (currentTemperature !== undefined && selectedUnit === 'fahrenheit') {
            currentTemperature = (currentTemperature * 9/5) + 32;
        }
        setTemperature(currentTemperature, 'F');
    }
});



function setTemperature(value, unit) {
    const temperatureElement = document.querySelector('.weather-box .temperature');
    temperatureElement.innerHTML = `${parseInt(value)}<span>°${unit}</span>`;
}