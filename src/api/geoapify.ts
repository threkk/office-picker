import { Coordinates } from '../store/modules/offices.types'

const API_KEY = '338a112591a545e8a05550f91d192d33'
const STATIC_URL = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&apiKey=${API_KEY}`
const SEARCH_URL = `https://api.geoapify.com/v1/geocode/search?limit=1&apiKey=${API_KEY}&text=`

export interface GetCoordinatesProps {
  city: string
  country: string
  address: string
  postcode: string
}

export async function getCoordinates(
  props: GetCoordinatesProps
): Promise<Coordinates | null> {
  const { city, country, address, postcode } = props
  const search = encodeURI(`${address}, ${postcode} ${city} (${country})`)
  try {
    const res = await fetch(`${SEARCH_URL}${search}`)
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
  } catch (e) {
    console.error(e)
  }
  return null
}

export function getMapUrl(coordinates: Coordinates): string {
  // color:#0abf53;
  const { lon, lat } = coordinates
  const point = `lonlat:${lon},${lat}`
  const centre = encodeURI(`&center=${point}`)
  const marker = encodeURI(`&marker=${point};size:large;text:O;color:red`)
  const url = `${STATIC_URL}${centre}${marker}`
  return url
}
