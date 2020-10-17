import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'

import mapMarker from '../../images/map-marker.svg'
import './styles.css'
import api from '../../services/api'

const mapIcons = Leaflet.icon({
  iconUrl: mapMarker,

  iconSize: [50, 60],
  iconAnchor: [25, 60],
  popupAnchor: [178, 2]
})

interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
}

const OrphanagesMap = () => {
  const { goBack } = useHistory()

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('/users').then(res => {
      setOrphanages(res.data)
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img onClick={goBack} src={mapMarker} alt="marker" />

          <h2>Choisissez l'instituition sur la carte</h2>
          <p>Muitas crianças estão esperando a sua visita </p>
        </header>

        <footer>
          <strong>Genève</strong>
          <span>Suisse</span>
        </footer>
      </aside>

      <Map center={[46.2071669, 6.1291619]} zoom={15} style={{ width: '100%', height: '100%' }}>
        {/*  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapIcons}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={32} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap
