export type Country = {
  name: string
  code: string
}

export type Location = {
  address: string
  postcode: string
  phone: string
  mapUrl: string
  coordinates: Coordinates
}

export type Coordinates = {
  lat: number
  lon: number
}

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

export type Weather = {
  weatherIconUrl: string
  weatherDescription: string
  temperature: number
}

export class Office {
  city: string
  country: Country
  location: Location
  weather: Weather
  description: string
  summary: string
  imageUrl: string

  constructor(city: string, countryName: string, countryCode: string) {
    this.city = city
    this.description = ''
    this.imageUrl = ''
    this.summary = ''
    this.weather = {
      weatherDescription: '',
      weatherIconUrl: '',
      temperature: NaN
    }
    this.country = {
      name: countryName,
      code: countryCode
    }
    this.location = {
      address: '',
      mapUrl: '',
      phone: '',
      postcode: '',
      coordinates: {
        lat: 0,
        lon: 0
      }
    }
  }
}

export type OfficeState = {
  offices: Office[]
}
