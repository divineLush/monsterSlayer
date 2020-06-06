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
      this.$emit('userHPChanged', { hp: this.userHP, diff: -this.monsterAttackDamage })
    },
    heal() {
      this.userHP += this.healAmount
      this.$emit('userHPChanged', { hp: this.userHP, diff: this.healAmount })
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
      this.$emit('monsterHPChanged', { hp: this.monsterHP, diff: this.attackDamage })
    },
    dealSpecialDamage() {
      this.handleMonsterDamage(this.specialAttackDamage)
      this.$emit('monsterHPChanged', { hp: this.monsterHP, diff: this.specialAttackDamage })
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
