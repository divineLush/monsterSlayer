<template lang="pug">
  div#app
    transition(name="fade")
      div.health-bar-wrapper(v-if="isNewGameStarted")
        HealthBar(:isUser="true")
        HealthBar(:isUser="false")
    AppControlPanel(ref="panel")
    transition(name="fade")
      Log(v-if="isNewGameStarted")
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
  .fade-enter
    opacity 0

  .fade-enter-active
    transition opacity 2s

  .fade-leave-active
    transition opacity 2s
    opacity 0

  #app
    display flex
    justify-content center
    align-items center
    flex-direction column
    background-color #000047
    color #f8f8ff
    height 100vh
    font-family monospace

    .health-bar-wrapper
      display flex
      width 100%
      justify-content space-around
</style>
