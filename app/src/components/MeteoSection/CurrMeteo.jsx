import {
  showLocation,
  showDate,
  weatherAndTemperature,
  currentBasicWeather,
  screenWidth
} from './tools'
const moment = require('moment')
const { Grid } = require('@mui/material')

/**
 * Displays current weather info, like location, temperature, weather icon...
 * @param {*} props weather data to obtain current and location data
 * @returns
 */
export default function CurrMeteo (props) {
  const meteoAreaData = props.meteoAreaData
  const { location, current } = meteoAreaData

  moment.locale('en') // Stablish english for APIweatherData through moment.js

  let gridSpaceXS
  if (screenWidth < 834) {
    gridSpaceXS = [11, 7, 1, 4]
  } else {
    gridSpaceXS = [11, 4, 1, 7]
  }

  return (
    <>
      <Grid container id='currMeteoContainer'>
        <Grid pl={2} pt={1} item xs={gridSpaceXS[0]}>
          {showLocation(location)}
          {showDate()}
        </Grid>
        <Grid container m={4}>
          <Grid item xs={gridSpaceXS[1]}>
            {weatherAndTemperature(current)}
          </Grid>
          <Grid item xs={gridSpaceXS[2]} />
          <Grid item xs={gridSpaceXS[3]}>
            {currentBasicWeather(current)}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
