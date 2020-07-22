<template>
  <!-- Card start -->
  <div class="column col-sm-12 col-md-6 col-xl-4 col-3">
    <div class="card my-2">
      <div class="card-image">
        <div class="square">
          <img
            v-if="office.imageUrl != null"
            :src="office.imageUrl"
            :alt="'Picture of ' + city"
          />
          <div v-else class="loading loading-lg"></div>
        </div>
      </div>
      <div class="card-header">
        <div class="card-title h3">{{ city }}</div>
        <div class="card-subtitle bold text-gray">{{ country }}</div>
      </div>
      <div class="card-body">
        <p>{{ office.summary }}</p>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary mr-2" @click="showDetailsModal">
          See location
        </button>
        <button class="btn btn-secondary" @click="showTravelModal">
          Send me there!
        </button>
      </div>
    </div>
  </div>
  <!-- Card end -->
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Office } from '../store/modules/offices.types'
import { ModalState } from '../store/modules/modals.types'

const offices = namespace('offices')
const modals = namespace('modals')

@Component
export default class Card extends Vue {
  @Prop({ required: true, type: String }) city: string
  @Prop({ required: true, type: String }) country: string
  @offices.Action('fetchCityInformation')
  fetchCityInformation: () => void
  @offices.Getter('getOfficeByCity') getOfficeByCity: (city: string) => Office
  @modals.Mutation('patchModal') patchModal: (
    patch: Partial<ModalState>
  ) => void

  constructor() {
    super()
  }

  async mounted() {
    await this.fetchCityInformation(this.city)
    this.$forceUpdate()
  }

  get office(): Office {
    return this.getOfficeByCity(this.city)
  }

  showDetailsModal() {
    const patch: Partial<ModalState> = {
      type: 'DETAILS',
      visible: true,
      city: this.city,
      title: `About ${this.city}`,
      size: 'MEDIUM'
    }
    this.patchModal(patch)
  }

  showTravelModal() {
    const patch: Partial<ModalState> = {
      type: 'TRAVEL',
      visible: true,
      city: this.city,
      title: `Travelling to ${this.city}`,
      size: 'SMALL'
    }
    this.patchModal(patch)
  }
}
</script>
<style>
.square {
  width: 100%;
  position: relative;
}

.square::before {
  content: '';
  padding-bottom: 100%;
  display: block;
}

.square img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  overflow: hidden;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}
</style>
