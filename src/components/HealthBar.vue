<template lang="pug">
    div.health-bar-wrapper__bar
        p {{ title }}
        p {{ health }}
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

    mounted() {
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
</style>
