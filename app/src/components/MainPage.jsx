import MeteoArea from './MeteoSection/MeteoArea'
import '../styles/MainPage.css'
import FeedBack from './FeedBack'
const { Box, Grid } = require('@mui/material')

/**
 * Represents the 1st view for users. Contains 2 differents sections split in screen:
 * MeteoArea and FeedBackArea (Weather alerts & comments)
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
