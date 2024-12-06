import React from 'react'

const WeatherDescription = ({ weatherData }) => {
  if (!weatherData) return null

  // Soglie per le sensazioni
  const temperature = weatherData.main.temp
  const feelsLike = weatherData.main.feels_like
  const humidity = weatherData.main.humidity
  const windSpeed = weatherData.wind.speed

  const temperatureDescription =
    temperature < 10
      ? 'freddo'
      : temperature < 20
      ? 'fresco'
      : temperature < 30
      ? 'piacevole'
      : 'caldo'

  const feelsLikeDescription =
    feelsLike < 10
      ? 'gelido'
      : feelsLike < 20
      ? 'fresco'
      : feelsLike < 30
      ? 'confortevole'
      : 'afoso'

  const humidityDescription =
    humidity < 30 ? 'secca' : humidity < 60 ? 'normale' : 'umida'

  const windDescription =
    windSpeed < 2
      ? 'calmo'
      : windSpeed < 6
      ? 'leggero'
      : windSpeed < 10
      ? 'moderato'
      : 'forte'

  return (
    <div>
      <p>
        A <span className='text-yellow-WA fw-bold'>{weatherData.name}</span>, la
        temperatura è di <strong>{temperature.toFixed(1)}°C</strong>, che si
        percepisce come <strong>{feelsLike.toFixed(1)}°C</strong>. L'aria è{' '}
        <strong>{humidityDescription}</strong> con un'umidità del{' '}
        <strong>{humidity}%</strong>. Il vento è{' '}
        <span className='text-yellow-WA fw-bold'>{windDescription}</span>. In
        generale, il clima è{' '}
        <span className='text-yellow-WA fw-bold'>{temperatureDescription}</span>
        , con una sensazione di{' '}
        <span className='text-yellow-WA fw-bold'>{feelsLikeDescription}</span>.
        Le condizioni attuali sono di{' '}
        <span className='text-yellow-WA fw-bold'>
          {weatherData.weather[0].description}
        </span>
        .
      </p>
    </div>
  )
}

export default WeatherDescription
