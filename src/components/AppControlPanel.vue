<template lang="pug">
    div.control-panel
        div.control-panel__full(v-if="isNewGameStarted")
            p.control-panel__btn(@click="attack") ATTACK
            p.control-panel__btn(@click="specialAttack") SPECIAL ATTACK
            p.control-panel__btn(@click="heal") HEAL
            p.control-panel__btn(@click="giveUp") GIVE UP
        div.control-panel__init(v-else)
            p.control-panel__init__message(v-if="isGameWon") YOU WON
            p.control-panel__init__message(v-if="isGameLost") YOU LOST
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
            flex-direction column
            align-items center
            &__message
                color #5dfbc1
                font-weight bold

        &__btn
            cursor pointer
            border 4px solid #c5c5ff
            padding 7px

            &:hover
                background-color #d0feed
                color #00005b

            &--new-game:hover
                background-color #f8f8ff
                color #00005b
</style>
