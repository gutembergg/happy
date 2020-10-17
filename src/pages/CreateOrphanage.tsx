import React, { FormEvent, useState } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { LeafletMouseEvent } from 'leaflet'

import { FiPlus } from 'react-icons/fi'

import mapMarkerImg from '../images/map-marker.svg'
import SideBar from '../components/SideBar/SideBar'

import '../styles/create-orphanage.css'

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpening_hours] = useState('')
  const [open_on_weekends, setOpen_on_weekends] = useState(true)

  function handleClickMap(e: LeafletMouseEvent) {
    const { lat, lng } = e.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  function openOnWeekend(params: boolean) {
    setOpen_on_weekends(params)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    console.log({
      position,
      name,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    })
  }

  return (
    <div id="page-create-orphanage">
      <SideBar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleClickMap}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 ? (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              ) : null}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image"></div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={e => setOpening_hours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => openOnWeekend(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => openOnWeekend(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  )
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
