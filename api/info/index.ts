import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch'

const headers = {
  'Api-User-Agent': 'hello@threkk.com',
  'Content-Type': 'application/json',
  accept: 'application/json; charset=utf-8'
}

const WIKIPEDIA_BASE = 'https://en.wikipedia.org/api/rest_v1/page/summary/'

const strOrFirst = (obj: string | string[]) =>
  Array.isArray(obj) ? obj[0] : obj

export default async function(req: NowRequest, res: NowResponse) {
  const city = strOrFirst(req.query.city) ?? null

  if (!city) {
    console.error('Original query string:', req.query)
    console.error('Parsed parameter:', city)
    res.status(422).send({ error: 'missing query parameter city' })
  }

  try {
    const wk = await fetch(encodeURI(`${WIKIPEDIA_BASE}${city}`), {
      headers
    })

    if (wk.ok) {
      const json = await wk.json()

      res.status(200).send({
        city,
        extract: json.extract,
        thumbnail: json.thumbnail ?? null,
        image: json.originalImage ?? null,
        description: json.description ?? null,
        coord: json.coordinates ?? null
      })
      return
    }
    res.status(404).send({ error: 'city not found' })
    return
  } catch (e) {
    console.error(e)
    res.status(400).json({ error: 'error querying the service' })
    return
  }
}
