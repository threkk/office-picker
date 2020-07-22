import { Coordinates } from '../store/modules/offices.types'

type Image = {
  source: string
  width: number
  height: number
}

export type WikipediaInfo = {
  readonly city: string
  readonly thumbnail: Image
  readonly image: Image
  readonly description: string
  readonly coord: Coordinates
  readonly extract: string
}

const headers = {
  'Api-User-Agent': 'hello@threkk.com',
  'Content-Type': 'application/json',
  accept: 'application/json; charset=utf-8'
}

const WIKIPEDIA_BASE = 'https://en.wikipedia.org/api/rest_v1/page/summary/'

export async function getCityInformation(
  city: string
): Promise<WikipediaInfo | null> {
  try {
    const res = await fetch(`${WIKIPEDIA_BASE}${city}`, {
      headers,
      method: 'GET',
      mode: 'cors'
    })

    if (res.ok) {
      const json = await res.json()

      return {
        city,
        extract: json.extract,
        thumbnail: json.thumbnail ?? null,
        image: json.originalImage ?? null,
        description: json.description ?? null,
        coord: json.coordinates ?? null
      }
    }
    return null
  } catch {
    return null
  }
}
