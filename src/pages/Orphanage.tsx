import React, { useState, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useParams } from 'react-router-dom'
import L from 'leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import api from '../services/api'

import '../styles/orphanage.css'
import Sidebar from '../components/SideBar/SideBar'

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Orphanage {
  name: string
  latitude: number
  longitude: number
  about: string
  intructions: string
  opeing_houes: string
  open_on_weekend: boolean
  images: Array<{
    id: number
    url: string
  }>
}

interface OrphanageParams {
  id: string
}

export default function Orphanage() {
  const [orphanage, setOrphanage] = useState<Orphanage>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const params = useParams<OrphanageParams>()

  useEffect(() => {
    api.get(`/user/${params.id}`).then(res => {
      setOrphanage(res.data)
      console.log(res.data)
    })
  }, [params.id])

  if (!orphanage) {
    return <p>Loading...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt="Lar das meninas" />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  onClick={() => setActiveImageIndex(index)}
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                >
                  <img src={image.url} alt="Lar das meninas" />
                </button>
              )
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>
              Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco
              e/ou vulnerabilidade social.
            </p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>Venha como se sentir mais à vontade e traga muito amor para dar.</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                8h às 18h
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
