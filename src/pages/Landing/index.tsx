import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import '../../styles/global.css'
import './styles.css'

import Logo from '../../images/Logo.svg'

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={Logo} alt="happy-logo" />

        <main>
          <h1>Bonheur pour tous</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </main>

        <div className="location">
          <strong>Genève</strong>
          <span>Suisse</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  )
}

export default Landing
