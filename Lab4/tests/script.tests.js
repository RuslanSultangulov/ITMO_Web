const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;
html = `<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>Weather</title>
    <link href="../style.css" rel="stylesheet">
    <script defer src="../script.js"></script>
</head>

<body>
<div class="grid-container">
    <header>
        <h1>Погода здесь</h1>
        <button class="btn-update for-large-screens" onclick="updateWeather()">
            Обновить геолокацию
        </button>
        <button class="btn-update for-small-screens" onclick="updateWeather()">
            &#x21bb;
        </button>
    </header>
    <main>
        <section class="main-city-section" id="main-city-section">

        </section>
        <section class="favourites-section">
            <h2>Избранное</h2>
            <form action="#" class="add-city-form" id="add-city-form" method="POST" onsubmit="addCity(); return false">
                <input id="form-city-name" name="add-city" placeholder="Добавить новый город" type="text">
                <input class="btn" type="submit" value="+">
            </form>
        </section>
        <ul class="cities-ul" id="cities-ul">

        </ul>
    </main>
</div>

<template id="loader">
    <div class="loader">
        <p>Подождите, данные загружаются</p>
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<template id="main-city">
    <div class="main-city-charts">
        <h2 id="main-location"></h2>
        <div class="img-and-temperature">
            <img id="main-img" alt="Иконка погоды">
            <span class="temperature" id="main-temperature"></span>
        </div>
    </div>
    <div class="main-city-values">
        <ul class="city-charts-ul">
            <li>
                <span class="chart-name">Ветер</span>
                <span class="chart-value" id="main-wind"></span>
            </li>
            <li>
                <span class="chart-name">Облачность</span>
                <span class="chart-value" id="main-clouds"></span>
            </li>
            <li>
                <span class="chart-name">Давление</span>
                <span class="chart-value" id="main-pressure"></span>
            </li>
            <li>
                <span class="chart-name">Влажность</span>
                <span class="chart-value" id="main-humidity"></span>
            </li>
            <li>
                <span class="chart-name">Координаты</span>
                <span class="chart-value" id="main-coords"></span>
            </li>
        </ul>
    </div>
</template>

<template id="fav-city">
    <li id = "start">
        <div class="city-charts">
            <div class="city-charts-left">
                <h3 id="fav-location"></h3>
                <span class="temperature" id="fav-temperature"></span>
                <img id="fav-img" alt="Иконка погоды">
            </div>
            <button class="btn" id="close-btn" onclick="removeCity(this.value)">x</button>
        </div>
        <div class="city-values">
            <ul class="city-charts-ul">
                <li>
                    <span class="chart-name">Ветер</span>
                    <span class="chart-value" id="fav-wind"></span>
                </li>
                <li>
                    <span class="chart-name">Облачность</span>
                    <span class="chart-value" id="fav-clouds"></span>
                </li>
                <li>
                    <span class="chart-name">Давление</span>
                    <span class="chart-value" id="fav-pressure"></span>
                </li>
                <li>
                    <span class="chart-name">Влажность</span>
                    <span class="chart-value" id="fav-humidity"></span>
                </li>
                <li>
                    <span class="chart-name">Координаты</span>
                    <span class="chart-value" id="fav-coords"></span>
                </li>
            </ul>
        </div>
    </li>
</template>

</body>
`
window = new JSDOM(html).window;
global.document = window.document;
global.window = window;
global.fetch = require("node-fetch");
global.navigator = {
    userAgent: 'node.js'
};
const geolocate = require('mock-geolocation');
geolocate.use();
const fetchMock = require('fetch-mock');
const expect = require('chai').expect;
const script = require("../script");

const baseUrl = 'http://localhost:1337';

const mockCity = {
    clouds: "75 %",
    cod: 200,
    coords: "[59.89, 30.26]",
    humidity: "97 %",
    iconsrc: "img/13n.png",
    id: 498817,
    name: "Saint Petersburg",
    pressure: "1002 hpa",
    temperature: "0°С",
    wind: "Degree: 100°, 3 m/s"
};

const correctLoader = `<div class="loader">
        <p>Подождите, данные загружаются</p>
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>`

describe('Fetch', () => {
    it('Fetch by coords with ok response works correctly', async () => {
        fetchMock.get(baseUrl + "/weather/coordinates?lat=59.89&lon=30.26", mockCity)
        const result = await script.fetchByCoords(59.89, 30.26);
        expect(result).to.be.a('object');
        fetchMock.done();
        fetchMock.restore();
    })
    it('Fetch by city name with ok response works correctly', async () => {
        fetchMock.get(baseUrl + "/weather/city?name=Saint%20Petersburg", mockCity)
        const result = await script.fetchByCityName("Saint Petersburg");
        expect(result).to.be.a('object');
        fetchMock.done();
        fetchMock.restore();
    })
})


describe('Get template', () => {

    it('Should render main weather template correctly', (done) => {
        const template = script.getTemplate(mockCity, 'main-')
        expect(template.getElementById("main-location").innerText).to.equal("Saint Petersburg");
        expect(template.getElementById("main-img").src).to.equal("img/13n.png");
        expect(template.getElementById("main-temperature").innerText).to.equal("0°С");
        expect(template.getElementById("main-wind").innerText).to.equal("Degree: 100°, 3 m/s");
        expect(template.getElementById("main-clouds").innerText).to.equal("75 %");
        expect(template.getElementById("main-pressure").innerText).to.equal("1002 hpa");
        expect(template.getElementById("main-humidity").innerText).to.equal("97 %");
        expect(template.getElementById("main-coords").innerText).to.equal("[59.89, 30.26]");
        done();
    })

    it('Should render favourite city weather template correctly', (done) => {
        const template = script.getTemplate(mockCity, 'fav-')
        expect(template.getElementById("fav-location").innerText).to.equal("Saint Petersburg");
        expect(template.getElementById("fav-img").src).to.equal("img/13n.png");
        expect(template.getElementById("fav-temperature").innerText).to.equal("0°С");
        expect(template.getElementById("fav-wind").innerText).to.equal("Degree: 100°, 3 m/s");
        expect(template.getElementById("fav-clouds").innerText).to.equal("75 %");
        expect(template.getElementById("fav-pressure").innerText).to.equal("1002 hpa");
        expect(template.getElementById("fav-humidity").innerText).to.equal("97 %");
        expect(template.getElementById("fav-coords").innerText).to.equal("[59.89, 30.26]");
        expect(template.getElementById("close-btn").value).to.equal('498817');
        done();
    })
})

describe('Loader', () => {
    it('Loader displayed correctly', (done) => {
        const loader = script.getLoader();
        expect(loader.children[0].outerHTML).to.equal(correctLoader);
        done();
    })
})


