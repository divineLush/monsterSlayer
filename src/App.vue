<template>
  <div id="app">
    <template v-if="isNewGameStarted">
      <HealthBar :isUser="true"></HealthBar>
      <HealthBar :isUser="false"></HealthBar>
    </template>
    <p v-if="isGameWon">you won</p>
    <p v-if="isGameLost">you lost</p>
    <p v-if="isGameWon || isGameLost" @click="$refs.panel.startNewGame()">new game</p>
    <AppControlPanel ref="panel"></AppControlPanel>
  </div>
</template>

<script>
import { bus } from './main'
import AppControlPanel from './components/AppControlPanel.vue'
import HealthBar from './components/HealthBar.vue'

export default {
  name: 'app',

  components: {
    AppControlPanel,
    HealthBar
  },

  data() {
    return {
      isNewGameStarted: false,
      isGameWon: false,
      isGameLost: false
    }
  },

  mounted() {
    bus.$on('newGameWasStarted', () => {
      this.isNewGameStarted = true
      this.isGameLost = false
      this.isGameWon = false
    })
    bus.$on('gameWasLost', () => {
      this.isNewGameStarted = false
      this.isGameLost = true
    })
    bus.$on('gameWasWon', () => {
      this.isNewGameStarted = false
      this.isGameWon = true
    })
  }
}
</script>
