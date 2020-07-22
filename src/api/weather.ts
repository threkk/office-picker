import { Weather } from '../store/modules/offices.types'

const API_KEY = 'ea8046e3225946b4a61efcdb357b8527'
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const ICON_URL = 'http://openweathermap.org/img/wn/'

export async function getWeather(
  city: string,
  countryCode: string
): Promise<Weather | null> {
  const query = [city, countryCode].join(',')

  const res = await fetch(`${API_URL}&q=${query}&appid=${API_KEY}`)
  if (res.ok) {
    const obj = await res.json()
    const weather = {
      temperature: obj.main.temp,
      weatherDescription: obj.weather[0].description,
      weatherIconUrl: `${ICON_URL}${obj.weather[0].icon}.png`
    }
    return weather
  }
  return null
}
