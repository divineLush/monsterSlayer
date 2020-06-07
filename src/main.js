import Vue from 'vue'
import App from './App.vue'
import { genRandomNumber } from '../src/assets/utils'

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
      this.attackDamage = genRandomNumber(2, 5)
      this.specialAttackDamage = genRandomNumber(5, 10)
      this.healAmount = genRandomNumber(3, 7)
      this.monsterAttackDamage = genRandomNumber(13, 20)
      this.monsterHealAmount = genRandomNumber(10, 22)
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
      if (this.userHP + this.healAmount < 100)
        this.userHP += this.healAmount
      else 
        this.userHP = 100
      this.$emit('userHPChanged', { hp: this.userHP, diff: this.healAmount })
    },
    healMonster() {
      if (this.monsterHP + this.monsterHealAmount < 100)
        this.monsterHP += this.monsterHealAmount
      else
        this.monsterHP = 100
      this.$emit('monsterHPChanged', { hp: this.monsterHP, diff: this.monsterHealAmount })
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
      this.$emit('monsterHPChanged', { hp: this.monsterHP, diff: -this.attackDamage })
    },
    dealSpecialDamage() {
      this.handleMonsterDamage(this.specialAttackDamage)
      this.$emit('monsterHPChanged', { hp: this.monsterHP, diff: -this.specialAttackDamage })
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
