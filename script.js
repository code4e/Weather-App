

$('form').on('submit', e => {
    e.preventDefault();
    fetchCity().then(cityDetails => {
        // console.log(cityDetails);
        $('.weather-card').css('display', 'block');
        if(cityDetails.IsDayTime == false){
            $('#time-img').attr('src', 'img/night.svg');
        }
        else{
            $('#time-img').attr('src', 'img/day.svg');
        }
        $('#weatherIcon').attr('src', `img/icons/${cityDetails.WeatherIcon}.svg`);
        $('.city').text(cityDetails.cityName);
        $('.weather-type').text(cityDetails.cityWeatherType);
        $('.temparature').text(cityDetails.cityTemp + '°C');
    });
});

const fetchCity = async function(){
    const getCity = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=GCe079Vj5jFO781vdAWHl2XkvJOD3Y7G&q=${$('#enter-loction').val()}`);
    const cityData = await getCity.json();
    // console.log(cityData[0].EnglishName, cityData[0].Key);
    const getCurrCondition = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityData[0].Key}?apikey=GCe079Vj5jFO781vdAWHl2XkvJOD3Y7G`);
    const currconditionData = await getCurrCondition.json();
    // console.log(currconditionData[0].Temperature.Metric.Value + ' ' + currconditionData[0].WeatherText + ' ' + currconditionData[0].IsDayTime + ' ' + currconditionData[0].WeatherIcon);
    const weatherObject = {
        cityName: cityData[0].EnglishName,
        cityTemp: currconditionData[0].Temperature.Metric.Value,
        cityWeatherType: currconditionData[0].WeatherText,
        IsDayTime: currconditionData[0].IsDayTime,
        WeatherIcon: currconditionData[0].WeatherIcon
    };
    return weatherObject;
}