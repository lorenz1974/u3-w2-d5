import { useState, useEffect } from 'react'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import WeatherDescription from './WeatherDescription'
import WeatherMap from './WeatherMap'
import ProvinceForecast from './ProvinceForecast'

const Province = ({ province, map, description }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchWeather = async () => {
    try {
      setIsLoading(true) // Imposta il caricamento a true ogni volta che si aggiorna
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=8f6cfdee89828a762d2fc0e9157104af&units=metric&lang=it&q=${province},IT`
      )
      if (!response.ok) {
        throw new Error('Response non OK')
      }
      const data = await response.json()
      setWeatherData(data)
      setIsLoading(false)
      setIsError(false)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setIsLoading(false)
      setIsError(true)
    }
  }

  // Effettua il fetch ogni volta che cambia la provincia
  useEffect(() => {
    if (province) {
      fetchWeather()
    }
  }, [province])

  return (
    <Row className='row-cols-1 row-cols-lg-2 mt-5'>
      {isLoading && !weatherData && (
        <Col className='d-flex justify-content-center'>
          <Spinner animation='border' variant='warning'></Spinner>
        </Col>
      )}
      {isError && (
        <Col>
          <Alert variant='danger'>
            Problema nel caricamento dei dati della città di {province}
          </Alert>
        </Col>
      )}
      {!isLoading && weatherData && (
        <>
          <Col className='order-md-0'>
            <h2 className='text-yellow-WA'>
              <img
                width='75px'
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt='Weather Icon'
              />
              {weatherData.name}
            </h2>
            <Row className='row-cols-2 row-cols-sm-4 mt-3'>
              <Col>
                <div>Temperatura</div>
                <div className='text-yellow-WA'>
                  {weatherData.main?.temp?.toFixed(1)}°C
                </div>
              </Col>
              <Col>
                <div>Percepita</div>
                <div className='text-yellow-WA'>
                  {weatherData.main?.feels_like?.toFixed(1)}°C
                </div>
              </Col>
              <Col>
                <div>Umidità</div>
                <div className='text-yellow-WA'>
                  {weatherData.main?.humidity}%
                </div>
              </Col>
              <Col>
                <div>Vento</div>
                <div className='text-yellow-WA'>
                  {weatherData.wind?.speed} m/s
                </div>
              </Col>
            </Row>
            {!isLoading && weatherData && description && (
              <Row>
                <Col className='mt-5'>
                  <WeatherDescription weatherData={weatherData} />
                </Col>
              </Row>
            )}
            <Row>
              <Col className='mt-5 order-md-2'>
                <h4 className='text-yellow-WA'>Previsioni a 5 giorni</h4>
                <ProvinceForecast province={province} />
              </Col>
            </Row>
          </Col>
          {map && (
            <Col md={{ order: 2 }}>
              <WeatherMap
                lat={weatherData.coord?.lat}
                log={weatherData.coord?.lon}
                province={weatherData.name}
              />
            </Col>
          )}
        </>
      )}
    </Row>
  )
}

export default Province
