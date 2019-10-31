const container = document.getElementById("weatherToday")
const containerCity = document.getElementById("weatherCity")
const containerWeekly = document.getElementById("weatherWeekly")

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=60a9f45b45a7b39b290afa28477d7241')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    let sunriseHour = new Date((json.sys.sunrise)*1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    let sunsetHour = new Date((json.sys.sunset)*1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    console.log(`Sunrise ${sunriseHour}, Sunset ${sunsetHour}`)

    container.innerHTML = `${json.weather[0].description} | ${json.main.temp.toFixed(1)} &#8451 
    <p>sunrise ${sunriseHour}</p> <p>sunset ${sunsetHour}</p>`
    
    containerCity.innerHTML = `<h2>${json.name}</h2>`
  })


  const handle5DayForecast = (json) => {
  const forecastDiv = document.getElementById('forecast')
  let weekDays = {}
  console.log(json)

  json.list.forEach((weather) => {
    let weekDay = new Date((weather.dt)*1000).toLocaleDateString([], {weekday: 'long'})
    if (weekDays[weekDay]) {
      weekDays[weekDay].push(weather)
    } else {
      weekDays[weekDay] = [weather]
    }
  })

  Object.entries(weekDays).forEach((item, index) => {
    if (index === 0) {
      return 
    }

    let weekDay = item[0]
    const weatherValues = item[1]

    const temps = weatherValues.map((value) => value.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    forecastDiv.innerHTML += `<li>${weekDay} - max: ${maxTemp.toFixed(1)} &#8451 
    min: ${minTemp.toFixed(1)} &#8451 </li>`
  })
}

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=39&APPID=60a9f45b45a7b39b290afa28477d7241')
  .then((res) => res.json())
  .then(handle5DayForecast)



  // fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=15&APPID=60a9f45b45a7b39b290afa28477d7241')
  // .then((response) => {
  //   return response.json()
  // })
  // .then((json) => {
  //   console.log(json)
  //   console.log(json.list[0].main.temp)
  //   // let currentDay = new Date((json.list[1].dt)*1000).toLocaleDateString([], {weekday: 'long'})
  //   // console.log(currentDay)
  //   let currentDay;
  //   let lowestTemp=json.list[0].main.temp_min; 
  //   let currTempLow=0;
  //   let highestTemp=json.list[0].main.temp_max;
  //   let currTempHigh=0;
    
  //   for(let i=1; i<json.list.length; i++) {
  //     currentDay = new Date((json.list[i].dt)*1000).toLocaleDateString([], {weekday: 'long'})
  //     currTempLow=json.list[i].main.temp_min
  //     console.log(`${currentDay} min temp: ${currTempLow}`)

  //     if(currTempLow < lowestTemp) {
  //       lowestTemp = currTempLow
  //     } 
  //   }
    
  //   for(let i=1; i < json.list.length; i++) {
  //     currTempHigh = json.list[i].main.temp_max
  //     console.log(`${currentDay} max temp: ${currTempHigh}`)
    
  //   if(currTempHigh > highestTemp) {
  //     highestTemp = currTempHigh
  //   } 

  //   currentDay = new Date((json.list[i].dt)*1000).toLocaleDateString([], {weekday: 'long'})
  //   }

  //   containerWeekly.innerHTML += `<p>Min: ${lowestTemp} &#8451 </p>
  //   <p> Max: ${highestTemp} &#8451`
  // })