import WeatherTable from './BO/WeatherTable'

/** TODO
 * Navbar con detalles, previsi�n horaria, previsi�n semanal
 */
export default function MeteoArea (props) {
  return <WeatherTable APIweatherData={props.APIweatherData} />
}
