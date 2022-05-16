const { Divider, Box, Grid } = require('@mui/material')

export default function Details (props) {
  const { details } = props
  return (
    <Grid container>
      <Grid item xs={12}>
        <Divider />
        {showDetailsData(detais)}
      </Grid>
    </Grid>
  )
}


  // Deailed elements
  function showDetailsData (details) {
    console.log(details);
    return details.map((item, index) => {
      return (
        <>
          <Box sx={{
            height: '1.7em',
            display: 'center',
            fontSize: '0.9em'
          }}
          >
            {/* item.replaceAll(' ', '_') */}
            {/* {details.clouds_intensity} */}
          </Box>
          <Divider />
        </>
      )
    })
  }