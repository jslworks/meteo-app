import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { currCoords, obtainLocInfoAll } from './reducers/locationReducer.js'
import logo from './assets/logo.png'
import Menu from './components/Menu'
import MainPage from './components/MainPage'
import Maps from './components/Maps'
import Alerts from './components/Alerts'

/**
 * TODO:
 * Escribir ternario para MainPage si
 * se han obtenido los datos o no
 */

const App = () => {
  const dispatch = useDispatch()

  const coords = useSelector((state) => state.location.currCoords)
  const loc = useSelector((state) => state.location.loc)
  const currMeteo = useSelector((state) => state.location.currMeteo)

  /* We need a 2nd useEffect, spliting of getting coords and
  getting location Info to avoid infinite rendering if we
  dispatch both together */
  useEffect(() => {
    dispatch(currCoords())
  }, [dispatch])

  useEffect(() => {
    if (coords) {
      dispatch(obtainLocInfoAll(coords))
    }
  }, [dispatch, coords])

  return (
    <BrowserRouter>
      <header>
        <Link id='logo' to='/main'><img src={logo} alt='logo' /></Link>
        <Menu />
      </header>
      <Routes>
        <Route path='/' element={(loc && currMeteo) ? <MainPage /> : null} />
        <Route path='/maps' element={coords ? <Maps coords={coords} /> : null} />
        <Route path='/alerts' element={<Alerts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App