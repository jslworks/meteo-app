import moment from 'moment'

export default function MainPage (props) {
  const meteoAreaData = weatherData(props) // Get data and mount into structure
  const currentMeteoData = Object.entries(meteoAreaData.current)
  currentMeteoData.pop() // Dont want details element which is the last
  // console.log(props)
  // console.log(meteoAreaData)
  // Build data view
  const buildWeatherTable = (entries) => {
    return entries.map((entry, index) => {
      return (
        <tr key={index}>
          <th> {entry[0]} </th>
          <td> {entry[1]} </td>
        </tr>
      )
    })
  }

  // TODO Mantener el aplicativo actualizado

  return (
    <table className='currentWeatherData' id='currentWeatherData'>
      <tbody>
        {buildWeatherTable(currentMeteoData)}
      </tbody>
    </table>
  )
}

const weatherData = (data) => {
  const momentDate = moment().toObject()
  const location = data.loc
  const currMeteo = data.currMeteo
  const current = data.currMeteo.current
  const currentDay = data.currMeteo.daily[0]
  const daily = data.currMeteo.daily
  const hourly = data.currMeteo.hourly

  console.log(data.currMeteo.daily)

  return {
    time: {
      year: momentDate.years,
      month: momentDate.months,
      day: momentDate.date,
      hour: momentDate.hours,
      minutes: momentDate.minutes
    },
    location: {
      country: location.country,
      name: location.name,
      state: location.state,
      timezone: currMeteo.timezone,
      lat: location.lat,
      lon: location.lon
    },
    current: {
      icon: current.weather[0].icon,
      description: current.weather[0].description,
      temperature: current.temp,
      // Basic data
      minTemperature: currentDay.temp.min,
      maxTemperature: currentDay.temp.max,
      humidity: current.humidity,
      pressure: current.pressure,
      sunrise: current.sunrise,
      sunset: current.sunset,
      wind_speed: current.wind_speed,
      wind_direction: current.wind_deg,
      details: { // Detailed data
        clouds_intensity: current.clouds,
        dew_point: current.dew_point,
        feels_like: current.feels_like,
        uvi: current.uvi,
        moonPhase: currentDay.moon_phase
      }
    },
    daily: {
      1: {
        icon: data.currMeteo.daily[1].weather[0].icon,
        description: data.currMeteo.daily[1].weather[0].description,
        temperature: ((data.currMeteo.daily[1].temp.max + data.currMeteo.daily[1].temp.min) / 2),
        // Basic data
        minTemperature: data.currMeteo.daily[1].temp.min,
        maxTemperature: data.currMeteo.daily[1].temp.max,
        humidity: data.currMeteo.daily[1].humidity,
        pressure: data.currMeteo.daily[1].pressure,
        sunrise: data.currMeteo.daily[1].sunrise,
        sunset: data.currMeteo.daily[1].sunset,
        wind_speed: data.currMeteo.daily[1].wind_speed,
        wind_direction: data.currMeteo.daily[1].wind_deg,
        feels_like: calculateFeelsLike(data.currMeteo.daily[1].feelslike),
        details: { // Detailed data
          clouds_intensity: data.currMeteo.daily[1].clouds,
          visibility: current.visibility,
          dew_point: current.dew_point,
          // feels_like: ((data.currMeteo.daily[1].feelslike.day + data.currMeteo.daily[1].eve + data.currMeteo.daily[1].feelslike[2] + data.currMeteo.daily[1].feelslike[3]) / 4),
          feels_like: calculateFeelsLike(daily, 1),
          uvi: data.currMeteo.daily[1].uvi,
          moonPhase: data.currMeteo.daily[1].moon_phase
        }
      }
      // ,   Uncaught TypeError: data.currMeteo.daily[1].feelslike is undefined
    //   2: {
    //     icon: data.currMeteo.daily[2].weather[0].icon,
    //     description: data.currMeteo.daily[2].weather[0].description,
    //     temperature: ((data.currMeteo.daily[2].temp.max + data.currMeteo.daily[2].temp.min) / 2),
    //     // Basic data
    //     minTemperature: data.currMeteo.daily[2].temp.min,
    //     maxTemperature: data.currMeteo.daily[2].temp.max,
    //     humidity: data.currMeteo.daily[2].humidity,
    //     pressure: data.currMeteo.daily[2].pressure,
    //     sunrise: data.currMeteo.daily[2].sunrise,
    //     sunset: data.currMeteo.daily[2].sunset,
    //     wind_speed: data.currMeteo.daily[2].wind_speed,
    //     wind_direction: data.currMeteo.daily[2].wind_deg,
    //     details: { // Detailed data
    //       clouds_intensity: data.currMeteo.daily[2].clouds,
    //       visibility: data.currMeteo.current.visibility,
    //       dew_point: data.currMeteo.current.dew_point,
    //       feels_like: ((data.currMeteo.daily[2].feelslike[0] + data.currMeteo.daily[2].feelslike[1] + data.currMeteo.daily[2].feelslike[2] + data.currMeteo.daily[2].feelslike[3]) / 4),
    //       uvi: data.currMeteo.daily[2].uvi,
    //       moonPhase: data.currMeteo.daily[2].moon_phase
    //     }
    //   },
    //   3: {
    //     icon: data.currMeteo.current.weather[0].icon,
    //     description: data.currMeteo.daily[3].weather[0].description,
    //     temperature: ((data.currMeteo.daily[3].temp.max + data.currMeteo.daily[3].temp.min) / 2),
    //     // Basic data
    //     minTemperature: data.currMeteo.daily[3].temp.min,
    //     maxTemperature: data.currMeteo.daily[3].temp.max,
    //     humidity: data.currMeteo.daily[3].humidity,
    //     pressure: data.currMeteo.daily[3].pressure,
    //     sunrise: data.currMeteo.daily[3].sunrise,
    //     sunset: data.currMeteo.daily[3].sunset,
    //     wind_speed: data.currMeteo.daily[3].wind_speed,
    //     wind_direction: data.currMeteo.daily[3].wind_deg,
    //     details: { // Detailed data
    //       clouds_intensity: data.currMeteo.daily[3].clouds,
    //       visibility: data.currMeteo.current.visibility,
    //       dew_point: data.currMeteo.current.dew_point,
    //       feels_like: ((data.currMeteo.daily[3].feelslike[0] + data.currMeteo.daily[3].feelslike[1] + data.currMeteo.daily[3].feelslike[2] + data.currMeteo.daily[3].feelslike[3]) / 4),
    //       uvi: data.currMeteo.daily[3].uvi,
    //       moonPhase: data.currMeteo.daily[3].moon_phase
    //     }
    //   },
    //   4: {
    //     icon: data.currMeteo.current.weather[0].icon,
    //     description: data.currMeteo.daily[4].weather[0].description,
    //     temperature: ((data.currMeteo.daily[4].temp.max + data.currMeteo.daily[4].temp.min) / 2),
    //     // Basic data
    //     minTemperature: data.currMeteo.daily[4].temp.min,
    //     maxTemperature: data.currMeteo.daily[4].temp.max,
    //     humidity: data.currMeteo.daily[4].humidity,
    //     pressure: data.currMeteo.daily[4].pressure,
    //     sunrise: data.currMeteo.daily[4].sunrise,
    //     sunset: data.currMeteo.daily[4].sunset,
    //     wind_speed: data.currMeteo.daily[4].wind_speed,
    //     wind_direction: data.currMeteo.daily[4].wind_deg,
    //     details: { // Detailed data
    //       clouds_intensity: data.currMeteo.daily[4].clouds,
    //       visibility: data.currMeteo.current.visibility,
    //       dew_point: data.currMeteo.current.dew_point,
    //       feels_like: ((data.currMeteo.daily[4].feelslike[0] + data.currMeteo.daily[4].feelslike[1] + data.currMeteo.daily[4].feelslike[2] + data.currMeteo.daily[4].feelslike[3]) / 4),
    //       uvi: data.currMeteo.daily[4].uvi,
    //       moonPhase: data.currMeteo.daily[4].moon_phase
    //     }
    //   },
    //   5: {
    //     icon: data.currMeteo.current.weather[0].icon,
    //     description: data.currMeteo.daily[5].weather[0].description,
    //     temperature: ((data.currMeteo.daily[5].temp.max + data.currMeteo.daily[5].temp.min) / 2),
    //     // Basic data
    //     minTemperature: data.currMeteo.daily[5].temp.min,
    //     maxTemperature: data.currMeteo.daily[5].temp.max,
    //     humidity: data.currMeteo.daily[5].humidity,
    //     pressure: data.currMeteo.daily[5].pressure,
    //     sunrise: data.currMeteo.daily[5].sunrise,
    //     sunset: data.currMeteo.daily[5].sunset,
    //     wind_speed: data.currMeteo.daily[5].wind_speed,
    //     wind_direction: data.currMeteo.daily[5].wind_deg,
    //     details: { // Detailed data
    //       clouds_intensity: data.currMeteo.daily[5].clouds,
    //       visibility: data.currMeteo.current.visibility,
    //       dew_point: data.currMeteo.current.dew_point,
    //       feels_like: ((data.currMeteo.daily[5].feelslike[0] + data.currMeteo.daily[5].feelslike[1] + data.currMeteo.daily[5].feelslike[2] + data.currMeteo.daily[5].feelslike[3]) / 4),
    //       uvi: data.currMeteo.daily[5].uvi,
    //       moonPhase: data.currMeteo.daily[5].moon_phase
    //     }
    //   },
    //   6: {
    //     icon: data.currMeteo.current.weather[0].icon,
    //     description: data.currMeteo.daily[6].weather[0].description,
    //     temperature: ((data.currMeteo.daily[6].temp.max + data.currMeteo.daily[6].temp.min) / 2),
    //     // Basic data
    //     minTemperature: data.currMeteo.daily[6].temp.min,
    //     maxTemperature: data.currMeteo.daily[6].temp.max,
    //     humidity: data.currMeteo.daily[6].humidity,
    //     pressure: data.currMeteo.daily[6].pressure,
    //     sunrise: data.currMeteo.daily[6].sunrise,
    //     sunset: data.currMeteo.daily[6].sunset,
    //     wind_speed: data.currMeteo.daily[6].wind_speed,
    //     wind_direction: data.currMeteo.daily[6].wind_deg,
    //     details: { // Detailed data
    //       clouds_intensity: data.currMeteo.daily[6].clouds,
    //       visibility: data.currMeteo.current.visibility,
    //       dew_point: data.currMeteo.current.dew_point,
    //       feels_like: ((data.currMeteo.daily[6].feelslike[0] + data.currMeteo.daily[6].feelslike[1] + data.currMeteo.daily[6].feelslike[2] + data.currMeteo.daily[6].feelslike[3]) / 4),
    //       uvi: data.currMeteo.daily[6].uvi,
    //       moonPhase: data.currMeteo.daily[6].moon_phase
    //     }
    //   },
    //   7: {
    //     icon: data.currMeteo.current.weather[0].icon,
    //     description: data.currMeteo.daily[7].weather[0].description,
    //     temperature: ((data.currMeteo.daily[7].temp.max + data.currMeteo.daily[7].temp.min) / 2),
    //     // Basic data
    //     minTemperature: data.currMeteo.daily[7].temp.min,
    //     maxTemperature: data.currMeteo.daily[7].temp.max,
    //     humidity: data.currMeteo.daily[7].humidity,
    //     pressure: data.currMeteo.daily[7].pressure,
    //     sunrise: data.currMeteo.daily[7].sunrise,
    //     sunset: data.currMeteo.daily[7].sunset,
    //     wind_speed: data.currMeteo.daily[7].wind_speed,
    //     wind_direction: data.currMeteo.daily[7].wind_deg,
    //     details: { // Detailed data
    //       clouds_intensity: data.currMeteo.daily[7].clouds,
    //       visibility: data.currMeteo.current.visibility,
    //       dew_point: data.currMeteo.current.dew_point,
    //       feels_like: ((data.currMeteo.daily[7].feelslike[0] + data.currMeteo.daily[7].feelslike[1] + data.currMeteo.daily[7].feelslike[2] + data.currMeteo.daily[7].feelslike[3]) / 4),
    //       uvi: data.currMeteo.daily[7].uvi,
    //       moonPhase: data.currMeteo.daily[7].moon_phase
    //     }
    //   }
    }
    // ,
    // hourly: data.currMeteo.hourly
  }
}

function calculateFeelsLike (daily, index) {
  const day = daily[index]
  // console.log(feelslike)
  let count = 0
  count += Object.values(day).map((value) => {
    return value
  })
  return count / day.length
}
