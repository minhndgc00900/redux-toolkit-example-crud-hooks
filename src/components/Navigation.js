import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
    <a href="/products" className="navbar-brand">
      Edison Academy
    </a>
    <div className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to={"/products"} className="nav-link">
          Products
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/add"} className="nav-link">
          Add
        </Link>
      </li>
    </div>
  </nav>
  )
}

export default Navigation