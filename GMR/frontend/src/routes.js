import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Booking = React.lazy(() => import('./views/booking/Booking'))
const Reports = React.lazy(() => import('./views/reports/Reports'))
const Track = React.lazy(() => import('./views/trackandtrace/Track'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/booking', name: 'VCT Booking', component: Booking },
  { path: '/reports', name: 'VCT Reports', component: Reports },
  { path: '/track', name: 'Track and Trace', component: Track },
]

export default routes
