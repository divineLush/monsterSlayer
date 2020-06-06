import Vue from 'vue'
import App from './App.vue'

export const bus = new Vue({
  data: {
    userHP: null,
    monsterHP: null,
    attackDamage: null,
    specialAttackDamage: null,
    healAmount: null,
    monsterAttackDamage: null
  },

  methods: {
    startNewGame() {
      this.$emit('newGameWasStarted')
      this.userHP = 100
      this.monsterHP = 100
      this.attackDamage = 10
      this.specialAttackDamage = 20
      this.healAmount = 8
      this.monsterAttackDamage = 7
    },
    takeDamage() {
      if (this.userHP - this.monsterAttackDamage > 0)
        this.userHP -= this.monsterAttackDamage
      else {
        this.userHP = 0
        this.$emit('gameWasLost')
      }
      this.$emit('userHPChanged', this.userHP)
    },
    heal() {
      this.userHP += this.healAmount
      this.$emit('userHPChanged', this.userHP)
    },
    handleMonsterDamage(damage) {
      if (this.monsterHP - damage > 0)
        this.monsterHP -= damage
      else {
        this.monsterHP = 0
        this.$emit('gameWasWon')
      }
    },
    dealDamage() {
      this.handleMonsterDamage(this.attackDamage)
      this.$emit('monsterHPChanged', this.monsterHP)
    },
    dealSpecialDamage() {
      this.handleMonsterDamage(this.specialAttackDamage)
      this.$emit('monsterHPChanged', this.monsterHP)
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
