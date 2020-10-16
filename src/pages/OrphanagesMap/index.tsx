import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'

import SideBar from '../../components/SideBar'

import 'leaflet/dist/leaflet.css'
import mapMarker from '../../images/map-marker.svg'
import './styles.css'

const mapIcons = Leaflet.icon({
  iconUrl: mapMarker,

  iconSize: [50, 60],
  iconAnchor: [25, 60],
  popupAnchor: [178, 2]
})

const OrphanagesMap = () => {
  return (
    <div id="page-map">
      <SideBar />

      <Map center={[46.2071669, 6.1291619]} zoom={15} style={{ width: '100%', height: '100%' }}>
        {/*  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        <Marker icon={mapIcons} position={[46.2071669, 6.1291619]}>
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Orfanato Bahia
            <Link to="/orphanages/1">
              <FiArrowRight size={32} color="#fff" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap
