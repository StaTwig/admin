import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileContract, faTruck } from '@fortawesome/free-solid-svg-icons'

const _nav = [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Calendar',
    to: '/dashboard',
    icon: <CIcon name="cil-calendar" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'VCT Booking',
    to: '/booking',
    icon: <FontAwesomeIcon icon={faTruck} className="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'VCT Report',
    to: '/reports',
    icon: <FontAwesomeIcon icon={faFileContract} className="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Track & Trace',
    to: '/track',
    icon: <CIcon name="cil-graph" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
]

export default _nav
