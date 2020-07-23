import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch'

const API_KEY = process.env.GEO_API_KEY
const STATIC_URL = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&apiKey=${API_KEY}`
const SEARCH_URL = `https://api.geoapify.com/v1/geocode/search?limit=1&apiKey=${API_KEY}&text=`

const headers = {
  'Content-Type': 'application/json',
  accept: 'application/json; charset=utf-8'
}

type CoordinatesProps = {
  city: string
  country: string
  address: string
  postcode: string
}

type Coordinates = {
  lat: number
  lon: number
}

async function getCoordinates(
  props: CoordinatesProps
): Promise<Coordinates | null> {
  const { city, country, address, postcode } = props
  const search = `${address}, ${postcode} ${city} (${country})`
  const res = await fetch(encodeURI(`${SEARCH_URL}${search}`), { headers })
  if (res.ok) {
    const obj = await res.json()
    if (obj.features[0]) {
      const [lon, lat] = obj.features[0].geometry.coordinates
      return {
        lat,
        lon
      }
    }
  }
  return null
}

const strOrFirst = (obj: string | string[]) =>
  Array.isArray(obj) ? obj[0] : obj

export default async function(req: NowRequest, res: NowResponse) {
  const city: string = strOrFirst(req.query.city) ?? null
  const country: string = strOrFirst(req.query.country) ?? null
  const address: string = strOrFirst(req.query.address) ?? null
  const postcode: string = strOrFirst(req.query.address) ?? null

  if (!city || !country || !address || !postcode) {
    console.error('Original query:', req.query)
    console.error('Parsed query:', city, country, address, postcode)
    res.status(422).send({ error: 'missing parameters' })
    return
  }

  try {
    const coords = await getCoordinates({ city, country, address, postcode })
    if (!coords) {
      res.status(404).send({ error: 'location not found', parameter: coords })
      return
    }
    const { lon, lat } = coords
    const point = `lonlat:${lon},${lat}`
    const centre = encodeURI(`&center=${point}`)
    const marker = encodeURI(`&marker=${point};size:large;text:O;color:red`)
    const url = `${STATIC_URL}${centre}${marker}`

    res.status(200).json({ coordinates: coords, mapUrl: url })
    return
  } catch (e) {
    console.error(e)
    res.status(400).json({ error: 'error querying the service' })
    return
  }
}
