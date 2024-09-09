const city_name = document.getElementById("city-name");
const btn_cls = document.getElementById("btn-cls");
const tempElement = document.querySelector('h2.temp');
const cityElement = document.querySelector('h3.city');
const humidityElement = document.querySelector('p.humidity');
const windElement = document.querySelector('p.wind');

btn_cls.addEventListener("click", () => {
    let location = city_name.value;
    // let location = city_name.value.trim();
    console.log("city_name.value", location);

    if (!location) {
        alert("Please enter a city name.");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=59bac7041ac7e5f5b3f615d6430e5662&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found: ${location}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            cityElement.innerText = data.name;
            tempElement.innerText = `${data.main.temp.toFixed(1)} °C`;
            humidityElement.innerText = `${data.main.humidity}%`;
            windElement.innerText = `${data.wind.speed} km/h`;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Error fetching the weather data. Please check the city name and try again.');
        });
});
