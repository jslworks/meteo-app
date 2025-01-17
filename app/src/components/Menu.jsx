import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { useState } from 'react'
import { MenuData } from './MenuData'
import '../styles/Menu.css'
import { IconContext } from 'react-icons/lib'
import { SwipeableDrawer } from '@mui/material'

/**
 * TODO:
 * Gestionar menú iniciado sesión
 *  Crear MenuDataLogged
 *  Crear showMenuDataLogged
 *  Crear logOut
 */

export default function Menu () {
  const [menu, setMenu] = useState(false)

  const showMenu = () => setMenu(!menu)

  // Pages elements
  function showMenuData () {
    return MenuData.map((item, index) => {
      return (
      // Menu item for each MenuData
        <li key={index} className={item.cName}>
          <Link to={item.path}>
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </li>
      )
    })
  }

  return (
    <IconContext.Provider value={{ color: 'white' }}>
      <Link to='#' id='menu-open'>
        <FaIcons.FaBars onClick={showMenu} />
      </Link>
      <SwipeableDrawer
        anchor='right'
        open={menu}
        onOpen={showMenu}
        onClose={showMenu}
      >
        <ul className='nav-menu-items' onClick={showMenu}>
          <li className='navbar-toggle'>
            <Link to='#' id='menu-close'>
              <FaIcons.FaRegWindowClose />
            </Link>
          </li>
          {showMenuData()}
        </ul>
      </SwipeableDrawer>
    </IconContext.Provider>
  )
}
