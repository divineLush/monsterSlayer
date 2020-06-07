<template lang="pug">
    div.health-bar-wrapper__bar
        p {{ title }}
        p {{ health }}
        div.health-bar-wrapper__bar__custom-bar
            div.health-bar-wrapper__bar__custom-bar__current-hp(:style="currentHPWidth")
</template>

<script>
import { bus } from '../main'

export default {
    name: 'HealthBar',

    props: ['isUser'],

    data() {
        return {
            health: 0,
            title: null
        }
    },

    computed: {
        currentHPWidth() {
            return { width: this.health + 'px' }
        }
    },

    created() {
        if (this.isUser) {
            this.health = bus.userHP
            this.title = 'You'
            bus.$on('userHPChanged', data => this.health = data.hp)
        } else {
            this.health = bus.monsterHP
            this.title = 'Monster'
            bus.$on('monsterHPChanged', data => this.health = data.hp)
            setInterval(() => {
                if (bus.userHP > 0 && bus.monsterHP > 0)
                    bus.takeDamage()
            }, 1000)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .health-bar-wrapper__bar
        display flex
        flex-direction column
        justify-content center
        align-items center
        color #ffffc5
        height 30vh

        &__custom-bar
            background-color #fb367f
            width 100px
            height 10px

            &__current-hp
                height 100%
                background-color #36fbb2
</style>
