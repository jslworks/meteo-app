import moment from 'moment'

export default function MainPage (props) {
  const meteoAreaData = weatherData(props) // Get data and mount into structure
  const meteoAreaDataEntries = Object.entries(meteoAreaData.current)
  meteoAreaDataEntries.pop() // Dont want details element which is the last

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
        {buildWeatherTable(meteoAreaDataEntries)}
      </tbody>
    </table>
  )
}

const weatherData = (data) => {
  const momentDate = moment().toObject()

  return {
    time: {
      year: momentDate.years,
      month: momentDate.months,
      day: momentDate.date,
      hour: momentDate.hours,
      minutes: momentDate.minutes
    },
    location: {
      country: data.loc.country,
      name: data.loc.name,
      state: data.loc.state,
      timezone: data.currMeteo.timezone,
      lat: data.loc.lat,
      lon: data.loc.lon
    },
    current: {
      clouds: data.currMeteo.current.clouds,
      humidity: data.currMeteo.current.humidity,
      sunrise: data.currMeteo.current.sunrise,
      sunset: data.currMeteo.current.sunset,
      temperature: data.currMeteo.current.temp,
      details: {
        description: data.currMeteo.current.weather[0].description,
        icon: data.currMeteo.current.weather[0].icon,
        dew_point: data.currMeteo.current.dew_point,
        feels_like: data.currMeteo.current.feels_like,
        pressure: data.currMeteo.current.pressure,
        uvi: data.currMeteo.current.uvi,
        visibility: data.currMeteo.current.visibility,
        wind_speed: data.currMeteo.current.wind_speed,
        wind_direction: data.currMeteo.current.wind_deg
      }
    },
    daily: data.currMeteo.daily,
    hourly: data.currMeteo.hourly
  }
}
