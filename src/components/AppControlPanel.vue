<template lang="pug">
    div.control-panel
        div.control-panel__full(v-if="isNewGameStarted")
            p.control-panel__btn.control-panel__btn--attack(@click="attack") ATTACK
            p.control-panel__btn.control-panel__btn--special-attack(@click="specialAttack") SPECIAL ATTACK
            p.control-panel__btn.control-panel__btn--heal(@click="heal") HEAL
            p.control-panel__btn.control-panel__btn--give-up(@click="giveUp") GIVE UP
        div.control-panel__init(v-else)
            p(v-if="isGameWon") you won
            p(v-if="isGameLost") you lost
            p.control-panel__btn.control-panel__btn--new-game(@click="startNewGame") START NEW GAME
</template>

<script>
import { bus } from '../main'

export default {
    name: 'AppControlPanel',

    data() {
        return {
            isNewGameStarted: false,
            isGameWon: false,
            isGameLost: false
        }
    },

    methods: {
        startNewGame() {
            bus.startNewGame()
            this.isNewGameStarted = true
            this.isGameWon = false
            this.isGameLost = false
        },
        attack() {
            bus.dealDamage()
        },
        specialAttack() {
            bus.dealSpecialDamage()
        },
        heal() {
            bus.heal()
        },
        giveUp() {
            bus.$emit('gameWasLost')
        }
    },

    mounted() {
        bus.$on('gameWasLost', () => {
            this.isNewGameStarted = false
            this.isGameWon = false
            this.isGameLost = true
        })
        bus.$on('gameWasWon', () => {
            this.isNewGameStarted = false
            this.isGameWon = true
            this.isGameLost = false
        })
    }
}
</script>

<style lang="stylus" scoped>
    .control-panel
        &__full
            display flex
            justify-content space-around

        &__init
            display flex
            justify-content center

        &__btn
            cursor pointer
            &--attack
                background-color red

            &--special-attack
                background-color blue

            &--heal
                background-color green

            &--give-up
                background-color yellow
</style>
