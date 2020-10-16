import React from 'react'
import mapMarker from '../images/map-marker.svg'

export default function Sidebar() {
  return (
    <div>
      <aside>
        <header>
          <img src={mapMarker} alt="marker" />

          <h2>Choisissez l'instituition sur la carte</h2>
          <p>Muitas crianças estão esperando a sua visita </p>
        </header>

        <footer>
          <strong>Genève</strong>
          <span>Suisse</span>
        </footer>
      </aside>
    </div>
  )
}
