import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch'
import offices from './offices.json'

export default async function(req: NowRequest, res: NowResponse) {
  res.status(200).send(offices)
  return
}
