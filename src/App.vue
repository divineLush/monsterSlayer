<template lang="pug">
  div#app
    div.health-bar-wrapper(v-if="isNewGameStarted")
      HealthBar(:isUser="true")
      HealthBar(:isUser="false")
    AppControlPanel(ref="panel")
    Log
</template>

<script>
import { bus } from './main'
import AppControlPanel from './components/AppControlPanel.vue'
import HealthBar from './components/HealthBar.vue'
import Log from './components/Log.vue'

export default {
  name: 'app',

  components: {
    AppControlPanel,
    HealthBar,
    Log
  },

  data() {
    return {
      isNewGameStarted: false
    }
  },

  created() {
    const el = document.body
    el.style.margin = 0
    el.style.padding = 0
    el.style.height = '100%'
    bus.$on('newGameWasStarted', () => this.isNewGameStarted = true)
    bus.$on('gameWasLost', () => this.isNewGameStarted = false)
    bus.$on('gameWasWon', () => this.isNewGameStarted = false)
  }
}
</script>

<style lang="stylus" scoped>
  #app
    display flex
    flex-direction column
    justify-content space-evenly
    background-color #000047
    color #f8f8ff
    height 100vh
    font-family monospace

    .health-bar-wrapper
      display flex
      justify-content space-around
</style>
