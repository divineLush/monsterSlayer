<template lang="pug">
    div.control-panel
        div.control-panel__full(v-if="isNewGameStarted")
            div.control__panel__full__btn-container
                p.control-panel__btn(@click="attack") ATTACK
                p.control-panel__btn-hint arrow left
            div.control__panel__full__btn-container
                p.control-panel__btn(@click="specialAttack") SPECIAL ATTACK
                p.control-panel__btn-hint arrow right
            div.control__panel__full__btn-container
                p.control-panel__btn(@click="heal") HEAL
                p.control-panel__btn-hint arrow up
            div.control__panel__full__btn-container
                p.control-panel__btn(@click="giveUp") GIVE UP
                p.control-panel__btn-hint esc
        div.control-panel__init(v-if="!isNewGameStarted")
            p.control-panel__init__message(v-if="isGameWon") YOU WON
            p.control-panel__init__message(v-if="isGameLost") YOU LOST
            p.control-panel__btn.control-panel__btn--new-game(@click="startNewGame") START NEW GAME
            p.control-panel__btn-hint press enter...
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
        handleEnter() {
            this.startNewGame()
            console.log('fromPanel')
        },
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

    created() {
        window.addEventListener('keydown', event => {
            console.log(event)
            if (this.isNewGameStarted)
                switch(event.keyCode) {
                    case(38):
                        this.heal()
                        break
                    case(40):
                        this.giveUp()
                        break
                    case(37):
                        this.attack()
                        break
                    case(39):
                        this.specialAttack()
                        break
                    case(27):
                        this.giveUp()
                        break
                    default:
                        break
                }
            else if (event.keyCode === 13)
                this.startNewGame()
        })
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
        height 30vh
        width 100%
        display flex
        justify-content center
        align-items center

        &__btn-hint
            text-align center
            color #9090ff

        &__full
            display flex
            width 100%
            justify-content space-evenly

            &__btn-container
                flex-direction column

        &__init
            &__message
                color #5dfbc1
                font-weight bold
                text-align center

        &__btn
            cursor pointer
            border 4px solid #c5c5ff
            padding 7px
            text-align center

            &:hover
                background-color #d0feed
                color #00005b

            &--new-game:hover
                background-color #f8f8ff
                color #00005b
</style>
