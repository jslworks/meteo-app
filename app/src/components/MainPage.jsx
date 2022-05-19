import MeteoArea from './MeteoSection/MeteoArea'
import '../styles/MainPage.css'
import FeedBack from './FeedBack'
const { Box, Grid } = require('@mui/material')

/**
 * Represents the 1st view for users. Contains 2 differents sections split in screen:
 * MeteoArea and FeedBackArea (Weather alerts & comments)
 * @params props: receive 'coords' , 'loc' and 'currMeteo'
 * 'coords' represents coordinates from user device
 * 'loc' represents location data as name, country...
 * 'currMeteo' represents weather data from the stablish location
 */
export default function MainPage (props) {
  // The structure its made with Grid and Box from Material UI
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Box
            sx={{ bgcolor: '#E5EDDE' }}
          >
            <MeteoArea APIweatherData={props.APIweatherData} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <FeedBack />
        </Grid>
      </Grid>
    </>
  )
}
