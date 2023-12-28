import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import IndexRoute from './routes/IndexRoute'
import SocioRoute from './routes/SocioRoute'
import TicketSocio from './components/TicketSocio'
import AnadirSocioRoute from './routes/AnadirSocioRoute'
import AnadirCuotaRoute from './routes/AnadirCuotaRoute'

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
    path: '/nuevacuota',
    element: <AnadirCuotaRoute />
  }
], {basename: '/socios'})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);