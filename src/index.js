import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import IndexRoute from './routes/IndexRoute'
import SocioRoute from './routes/SocioRoute'
import TicketSocio from './components/TicketSocio'
import AnadirSocioRoute from './routes/AnadirSocioRoute'
import AnadirCuotaRoute from './routes/AnadirCuotaRoute'
import LoginButton from './components/LoginButton'
import CarnetSocio from './routes/CarnetSocio'
import EditarSocioRoute from './routes/EditarSocioRoute'

document.title = 'Gestión Socios - Asociación de Vecinos de Sierra'


const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexRoute />
  },
  {
    path: '/socio/:IdSocio',
    element: <SocioRoute />
  },
  {
    path: '/ticketcuota/:IdCuota',
    element: <TicketSocio />
  },
  {
    path: '/nuevosocio',
    element: <AnadirSocioRoute />
  },
  {
      path: '/editarsocio/:IdSocio',
      element: <EditarSocioRoute />
  },
  {
    path: '/nuevacuota',
    element: <AnadirCuotaRoute />
  },
  {
    path: '/login',
    element: <LoginButton />
  },
  {
    path: '/carnetsocio/:IdCarnet',
    element: <CarnetSocio />
  }
], {basename: '/socios'})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="vecinosdesierra.eu.auth0.com"
      clientId="oW021rG2BB2cBtTVFP3fvrwwX6sSXrKU"
      authorizationParams={{
        redirectUri: `${window.location.origin}/socios`,
        audience: 'gestionsocios-api-asoc'
      }}
      // scope="openid profile email"
      >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);