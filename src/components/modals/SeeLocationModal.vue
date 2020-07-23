<template>
  <div>
    <p class="text-italic">{{ office.summary }}</p>
    <div class="columns">
      <div class="column col-sm-12 col-6">
        <h2>Location</h2>
        <address>
          {{ office.location.address }}<br />
          {{ office.location.postcode }} {{ city }}<br />
          {{ office.country.name }}<br />
          <span v-if="office.location.phone"
            >T: <a :href="hrefTel">{{ office.location.phone }}</a></span
          >
        </address>
      </div>

      <div class="column col-sm-12 col-6">
        <div v-if="office.weather.weatherDescription !== ''" class="toast">
          <img :src="office.weather.weatherIconUrl" class="img-responsive" />
          <strong>{{ office.weather.temperature }} &deg;C</strong> -
          <em> {{ office.weather.weatherDescription }}</em>
        </div>
        <img
          v-if="office.location.mapUrl != ''"
          :src="office.location.mapUrl"
          alt="Map with the location"
          class="modal-img-fit py-2"
        />
        <div v-else class="loading loading-lg"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { Office } from '../../store/modules/offices.types'

const offices = namespace('offices')

@Component
export default class SeeLocationModal extends Vue {
  @Prop({ type: String, required: true }) city!: string
  @offices.Getter('getOfficeByCity') getOfficeByCity!: (city: string) => Office
  @offices.Action('fetchWeather') fetchWeather!: (city: string) => void
  @offices.Action('fetchLocationMapUrl') fetchLocationMapUrl!: (
    city: string
  ) => void

  constructor() {
    super()
  }

  async created() {
    await Promise.all([
      this.fetchLocationMapUrl(this.city),
      this.fetchWeather(this.city)
    ])

    this.$forceUpdate()
  }

  get office(): Office {
    return this.getOfficeByCity(this.city)
  }

  get hrefTel(): string {
    return `tel:${this.office.location.phone}`
  }
}
</script>
<style>
.modal-img-fit {
  width: 100%;
}
</style>
