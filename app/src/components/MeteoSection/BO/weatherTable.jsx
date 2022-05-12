import weatherData from './weatherData'
const moment = require('moment')
const { Box, Grid } = require('@mui/material')

export default function WeatherTable (props) {
  const meteoAreaData = weatherData(props.APIweatherData) // Get data and mount into structure
  const currentMeteoData = Object.entries(meteoAreaData.current)
  currentMeteoData.pop() // Dont want details element which is the last
  //   Creo componente tabla de datos tiempo aparte Paso props de otra manera

  moment.locale('en')

  return (
    <>
      <Grid container>
        {/*
      existen propiedades xs, sm, md....
        xs=12 usamos los 12 espacios disponibles para generico
        Si queremos hacer un poco de responsive, podriamos poner sm=6 lo
        cual haria que pantallas mas grandes salen 2 celdas en paralelo
        en vez de 2 apiladas para pantallas mas pequeñas
        */}
        <Grid item xs={12}>
          {showLocation(meteoAreaData.location)}
          {showDate()}
        </Grid>
        <Grid container m={3}>
          <Grid item xs={4}>
            {weatherAndTemperature(meteoAreaData.current)}
          </Grid>
          <Grid item xs={8}>
            {currentBasicWeather()}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const showLocation = (locationData) => {
  return (
    <Box
      sx={{ fontSize: '1.6em', fontWeight: 'bold' }}
    >
      {locationData.name}, {locationData.country}
    </Box>
  )
}

const showDate = () => {
  const allDate = moment().toObject()
  return (
    <Box
      sx={{ fontSize: '1em' }}
    >
      {moment(allDate).format('dddd') + ', ' +
          allDate.date + ' ' +
          moment(allDate).format('MMMM') + ' ' +
          moment(allDate).format('YYYY') + ' - ' +
          moment(allDate).format('HH:mm')}
    </Box>
  )
}

const weatherAndTemperature = (current) => {
  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Box>
            <img
              src={'http://openweathermap.org/img/wn/' +
                current.icon + '.png'} alt='weather-icon'
            />
          </Box>
          <Box> {current.description} </Box>
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{ fontSize: '3em' }}
          > {Math.round(current.temperature)} ºC
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

const currentBasicWeather = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Box>
          columnas1-1
        </Box>
        <Box>
          columna1-2
        </Box>
        <Box>
          columnas1-3
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          columnas2-1
        </Box>
        <Box>
          columnas2-2
        </Box>
        <Box>
          columnas2-3
        </Box>
      </Grid>
    </Grid>

  )
}
