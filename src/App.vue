<template lang="pug">
  div#app
    template(v-if="isNewGameStarted")
      HealthBar(:isUser="true")
      HealthBar(:isUser="false")
    AppControlPanel
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

  mounted() {
    bus.$on('newGameWasStarted', () => this.isNewGameStarted = true)
    bus.$on('gameWasLost', () => this.isNewGameStarted = false)
    bus.$on('gameWasWon', () => this.isNewGameStarted = false)
  }
}
</script>
