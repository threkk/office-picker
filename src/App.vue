<template>
  <div>
    <h1>Adyen Office Picker</h1>
    <div class="content">
      <div class="columns">
        <Card
          v-for="(office, idx) in offices"
          :key="idx"
          v-bind:city="office.city"
          v-bind:country="office.country.name"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Office } from './store/modules/offices.types'

import Card from './components/Card'

const namespace = 'offices'

@Component({
  components: {
    Card
  }
})
export default class App extends Vue {
  @State('offices', { namespace }) offices: Office[]
  @Action('fetchOffices', { namespace }) fetchOffices: void

  constructor() {
    super()
  }

  mounted() {
    this.fetchOffices()
  }
}
</script>

<style lang="scss">
$primary-color: rgb(10, 191, 83);

@import '../node_modules/spectre.css/src/spectre';

body {
  margin: 20px auto;
  max-width: 1200px;
  line-height: 1.6;
  padding: 0 10px;
}
</style>
