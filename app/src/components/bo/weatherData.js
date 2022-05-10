import moment from 'moment'

/* El objeto ***loc*** otro objeto llamado *local_names*, el cual contiene el nombre de la ciudad para cada idioma.
Más adelante tener en cuenta para comparar con el idioma que tenga configurado
el usuario para así establecer el nombre del lugar en el idioma del usuario */
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

export default { weatherData }
