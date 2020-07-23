import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch'

const API_KEY = process.env.WEATHER_API_KEY
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const ICON_URL = 'https://openweathermap.org/img/wn/'

const headers = {
  'Content-Type': 'application/json',
  accept: 'application/json; charset=utf-8'
}

const strOrFirst = (obj: string | string[]) =>
  Array.isArray(obj) ? obj[0] : obj

export default async function(req: NowRequest, res: NowResponse) {
  const city = req.query.city ? strOrFirst(req.query.city) : null
  const country = req.query.code ? strOrFirst(req.query.code) : null

  if (!city || !country) {
    console.error('Original request:', req.query)
    console.error('Parsed parameters', city, country)
    res.status(422).send({ error: 'missing parameters' })
    return
  }

  const query = [city, country].join(',')
  try {
    const weather = await fetch(
      encodeURI(`${API_URL}&q=${query}&appid=${API_KEY}`),
      { headers }
    )
    if (weather.ok) {
      const obj = await weather.json()
      res.status(200).send({
        temperature: obj.main.temp,
        weatherDescription: obj.weather[0].description,
        weatherIconUrl: `${ICON_URL}${obj.weather[0].icon}.png`
      })
      return
    }
    res.status(404).send({ error: 'weather prediction not found' })
    return
  } catch (e) {
    console.error(e)
    res.status(400).json({ error: 'error querying the service' })
    return
  }
}
