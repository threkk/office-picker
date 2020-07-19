import offices from './offices.json'

export default {
  getOffices: async () => {
    return offices
  },

  getOfficeByCity: async (city: string) => {
    for (const office of offices) {
      if (office.city === city) {
        return office
      }
    }
  }
}
