import Vue from 'vue'
import App from './App.vue'

export const bus = new Vue({
  data: {
    userHP: 100,
    monsterHP: 100,
    attackDamage: 10,
    specialAttackDamage: 20,
    healAmount: 8,
    monsterAttackDamage: 7
  },

  methods: {
    takeDamage() {
      this.userHP -= this.monsterAttackDamage
    },
    heal() {
      this.userHP += this.healAmount
      console.log(this.userHP)
    },
    dealDamage() {
      this.monsterHP -= this.attackDamage
    },
    dealSpecialDamage() {
      this.monsterHP -= this.specialAttackDamage
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
