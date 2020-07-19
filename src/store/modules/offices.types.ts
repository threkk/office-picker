type Country = {
  name: string
  code: string
}

type Location = {
  address: string
  postcode: string
  phone?: string
}

export class Office {
  city: string
  country: Country
  location?: Location
  // weather?: any
  summary?: string
  imageUrl?: string

  constructor(city: string, countryName: string, countryCode: string) {
    this.city = city
    this.country = {
      name: countryName,
      code: countryCode
    }
  }
}

export type OfficeState = {
  offices: Office[]
}
