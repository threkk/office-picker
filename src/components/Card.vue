<template>
  <!-- Card start -->
  <div class="column col-sm-12 col-md-6 col-xl-4 col-3">
    <div class="card my-2">
      <div class="card-image">
        <img
          v-if="imgUrl != null"
          :src="imgUrl"
          class="img-responsive"
          :alt="'Picture of ' + city"
        />
        <div v-else class="loading loading-lg"></div>
      </div>
      <div class="card-header">
        <div class="card-title h3">{{ city }}</div>
        <div class="card-subtitle bold text-gray">{{ country }}</div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary mr-2">See location</button>
        <button class="btn btn-secondary">Send me there!</button>
      </div>
    </div>
  </div>
  <!-- Card end -->
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Card extends Vue {
  @Prop({ required: true, type: String }) readonly city: string
  @Prop({ required: true, type: String }) readonly country: string
  @Prop({ type: String }) readonly imgUrl: string
}
</script>
