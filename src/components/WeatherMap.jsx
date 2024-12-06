import React, { useState, useEffect } from 'react'

const WeatherMap = (props) => {
  const [lat, setLat] = useState(props.lat)
  const [log, setLog] = useState(props.log)
  const [province, setProvince] = useState(props.province)
  const [mapSrc, setMapSrc] = useState('')

  useEffect(() => {
    // Aggiorna lo stato locale se le props cambiano
    setLat(props.lat)
    setLog(props.log)
    setProvince(props.province)
  }, [props.lat, props.log, props.province])

  useEffect(() => {
    // Genera il nuovo URL della mappa ogni volta che lo stato cambia
    const newMapSrc = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${lat},${log},+(${province})&t=&z=14&ie=UTF8&iwloc=B&output=embed`
    setMapSrc(newMapSrc)
  }, [lat, log, province]) // Dipende dalle variabili di stato

  return (
    <div className='w-100'>
      <iframe
        className='border border-2 border-yellow-WA m-0 p-0'
        width='100%'
        height='600'
        src={mapSrc}
        title={`Mappa di ${province}`}
      ></iframe>
    </div>
  )
}

export default WeatherMap
