const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')
const forecast = new Forecast();

const updateUI = (data) => {
    console.log(data);
    // деструктурирующее присваивание
    const { cityDets, weather } = data;

    // обновления шаблона деталей
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${Math.round(weather.Temperature.Metric.Value)}</span>
      <span>&deg;C</span>
    </div>
    `;

    // обновление ночь/день
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    //удаление d-none при наличии
    if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
    }
};

cityForm.addEventListener('submit', e => {
    // предотвтращение действия по умалчанию
    e.preventDefault();

    // значение города
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // обновление ui с новым городом
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
};
