import { useState, useEffect } from 'react'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'

const ProvinceForecast = ({ province }) => {
  const [weatherForecastData, setWeatherForecastData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchWeather = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?appid=8f6cfdee89828a762d2fc0e9157104af&units=metric&lang=it&q=${province},IT`
      )
      if (!response.ok) {
        throw new Error('Response non OK')
      }
      const data = await response.json()
      setWeatherForecastData(data)
      setIsLoading(false)
      setIsError(false)
    } catch (error) {
      console.error('Error fetching weather forecast data:', error)
      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    if (province) {
      fetchWeather()
    }
  }, [province])

  const now = new Date()
  const fiveDaysAhead = new Date()
  fiveDaysAhead.setDate(now.getDate() + 3)

  const filteredForecast = weatherForecastData?.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt_txt)
    return forecastDate > now && forecastDate <= fiveDaysAhead
  })

  return (
    <Row className='mt-5'>
      {isLoading && !weatherForecastData && (
        <Col className='d-flex justify-content-center'>
          <Spinner animation='border' variant='warning'></Spinner>
        </Col>
      )}
      {isError && (
        <Col>
          <Alert variant='danger'>
            Problema nel caricamento dei dati di forecast città di {province}
          </Alert>
        </Col>
      )}
      {!isLoading && weatherForecastData && (
        <table className='table table-striped'>
          <thead className='bg-yellow-WA text-black fw-bold'>
            <tr>
              <th className='text-center'>Giorno</th>
              <th className='text-center'>Data</th>
              <th className='text-center'>Ora</th>
              <th className='text-center'>Temp.</th>
              <th className='text-center'>Umidità</th>
              <th className='text-center'>Pioggia</th>
              <th className=''>Nubi</th>
            </tr>
          </thead>
          <tbody>
            {filteredForecast
              .filter((forecast) => new Date(forecast.dt_txt) <= fiveDaysAhead)
              .map((forecast, index) => {
                const date = new Date(forecast.dt_txt)
                const optionsDay = { weekday: 'long' }
                const optionsDate = { day: '2-digit', month: 'long' }
                const optionsTime = { hour: '2-digit', minute: '2-digit' }
                const formattedDay = date.toLocaleDateString(
                  'it-IT',
                  optionsDay
                )
                const formattedDate = date.toLocaleDateString(
                  'it-IT',
                  optionsDate
                )
                const formattedTime = date.toLocaleTimeString(
                  'it-IT',
                  optionsTime
                )
                return (
                  <tr key={index} className='fs-7'>
                    <td className='text-center'>{formattedDay}</td>
                    <td className='text-center'>{formattedDate}</td>
                    <td className='text-center'>{formattedTime}</td>
                    <td className='text-center'>
                      {forecast.main.temp.toFixed(1)} °C
                    </td>
                    <td className='text-center'>{forecast.main.humidity} %</td>
                    <td className='text-center'>
                      {forecast.rain ? forecast.rain['3h'] : 0} mm
                    </td>
                    <td className=''>
                      <img
                        width='35px'
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        alt='Weather Icon'
                      />
                      {forecast.weather[0].description}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
    </Row>
  )
}

export default ProvinceForecast
