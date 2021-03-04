window.onload = async () => {
    updateWeather();
    await loadWeatherFromStorage();
};

const baseUrl = 'http://localhost:1337'


function updateWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    postMainCityWeather(position.coords.latitude, position.coords.longitude);
}


function error() {
    alert("Unable to retrieve your location; Loading default...");
    postMainCityWeather(59.89, 30.26);
}

function postMainCityWeather(latitude, longitude,) {
    const loader = getLoader();
    const mainCitySection = document.getElementById("main-city-section")
    if (mainCitySection.firstElementChild) {
        mainCitySection.removeChild(mainCitySection.firstElementChild);
        mainCitySection.removeChild(mainCitySection.firstElementChild);
    }
    mainCitySection.appendChild(loader);

    fetchByCoords(latitude, longitude)
        .then(json => {
            mainCitySection.getElementsByClassName("loader")[0].remove();
            if (json !== undefined) {
                const template = getTemplate(json, "main-");
                mainCitySection.appendChild(template)
            }
        })
}

async function fetchByCoords(latitude, longitude) {
    try {
        const response = await fetch(baseUrl + "/weather/coordinates?lat=" +
            latitude +
            "&lon=" +
            longitude)
        if (response.ok) {
            return await response.json();
        } else {
            alert("Unable to load weather: " + response.status);
            return undefined
        }
    } catch (error) {
        alert("Unable to load weather: Server is down")
        console.log(error);
    }
}

async function fetchByCityName(cityName) {
    try {
        const response = await fetch(baseUrl + "/weather/city?name=" +
            cityName)
        const data = await response.json();
        if (data.status === 404) {
            return undefined
        } else {
            return data;
        }
    } catch (error) {
        alert("Unable to load weather");
        console.log(error);
    }
}

function getTemplate(json, prefix) {

    const temp = document.getElementById(prefix + "city").content;
    const copytemp = document.importNode(temp, true);

    copytemp.getElementById(prefix + "location").innerText = json.name;
    copytemp.getElementById(prefix + "img").src = json.iconsrc;
    copytemp.getElementById(prefix + "temperature").innerText = json.temperature;
    copytemp.getElementById(prefix + "wind").innerText = json.wind;
    copytemp.getElementById(prefix + "clouds").innerText = json.clouds;
    copytemp.getElementById(prefix + "pressure").innerText = json.pressure;
    copytemp.getElementById(prefix + "humidity").innerText = json.humidity;
    copytemp.getElementById(prefix + "coords").innerText = json.coords;


    if (prefix === "fav-") {
        copytemp.getElementById("close-btn").value = json.id;
        copytemp.getElementById("start").id = json.id;
    }

    return copytemp;
}

async function addCity() {
    const form = document.getElementById("add-city-form");
    const cityName = document.getElementById("form-city-name").value;
    form.reset();

    const response = await fetch(baseUrl + "/favourites?name=" + cityName, {
        method: 'GET'
    })
    if (response.status === 409) {
        alert("City Already Exists");
    } else {
        const id = await postCityWeather(cityName);
        if (id !== undefined) {
            const response = await fetch(baseUrl + "/favourites?name=" +
                cityName +
                "&id=" +
                id, {
                method: 'POST'
            })
        }
    }
}


async function loadWeatherFromStorage() {
    try {
        const response = await fetch(baseUrl + "/favourites", {
            method: 'GET'
        })
        const cities = await response.json();
        console.log(cities)
        for (let i = 0; i < cities.length; i++) {
            await postCityWeather(cities[i]);
        }
    } catch (error) {
        alert("Unable to load weather: Server is down")
        console.log(error)
    }
}

async function postCityWeather(cityName) {
    const loader = getLoader();
    const ul = document.getElementById("cities-ul");
    ul.appendChild(loader);
    const json = await fetchByCityName(cityName)
    if (json === undefined) {
        alert("Unable to load " + cityName + " weather");
        ul.getElementsByClassName("loader")[0].remove();
        return;
    }
    const template = getTemplate(json, "fav-");
    ul.getElementsByClassName("loader")[0].remove();
    ul.appendChild(template);
    return json.id;
}

async function removeCity(cityId) {
    const responce = await fetch(baseUrl + "/favourites?id=" + cityId, {
        method: 'DELETE'
    })
    document.getElementById(cityId).remove();

}

function getLoader() {
    const loader = document.getElementById("loader").content;
    return document.importNode(loader, true);
}

exports.fetchByCoords = async function (lat, lon) {
    return await fetchByCoords(lat, lon);
}

exports.fetchByCityName = async function (cityName) {
    return await fetchByCityName(cityName);
}

exports.getTemplate = function (json, prefix) {
    return getTemplate(json, prefix);
}

exports.getLoader = function () {
    return getLoader();
}
