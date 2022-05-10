import moment from 'moment'

export default function MainPage (props) {
  // Recibir datos por state
  // const [locName, setLocName] = useState('')
  const meteoAreaData = parseWeatherData(props)
  //   console.log(props)
  // Montar la estructura mas abajo
  // Devolver el resultado
  // Mantener el aplicativo actualizado
  // Diferenciar info basica de detalles (independizar)

  //   const htmlDecode = (input) => {
  //     const e = document.createElement('div')
  //     e.innerHTML = input
  //     return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
  //   }

  //   return <div dangerouslySetInnerHTML={{ __html: this.htmlDecode(weatherTable(meteoAreaData)) }} />

  return (
    <div dangerouslySetInnerHTML={{
      __html: () => {
        const e = document.createElement('div')
        e.innerHTML = weatherTable(meteoAreaData)
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
      }
    }}
    />
  )
  // weatherTable(meteoAreaData)
}

const weatherTable = (meteoAreaData) => {
  const current = meteoAreaData.current
  console.log(current)

  let table = '<div className="currentWeatherData" id="currentWeatherData"><tbody>'
  let rows = Object.entries(current).map((keyValue) => {
    console.log(keyValue)
    if (!keyValue[0].match('details')) {
      const tr = '<div className="weatherRow">' +
        '<div>' + keyValue[0] + '</div>' +
        '<div id="weatherRowValue">' + keyValue[1] + '</div>' +
    '</div>'
      return tr
    }
    return ''
  })
  rows = rows.join('')
  table += rows + '</tbody></div>'
  return table
}

/* El objeto ***loc*** otro objeto llamado *local_names*, el cual contiene el nombre de la ciudad para cada idioma.
Más adelante tener en cuenta para comparar con el idioma que tenga configurado
el usuario para así establecer el nombre del lugar en el idioma del usuario */
const parseWeatherData = (data) => {
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
