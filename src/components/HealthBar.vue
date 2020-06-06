<template lang="pug">
    div
        p {{ health }}
</template>

<script>
import { bus } from '../main'

export default {
    name: 'HealthBar',
    props: ['isUser'],
    data() {
        return {
            health: 0
        }
    },

    mounted() {
        if (this.isUser) {
            this.health = bus.userHP
            bus.$on('userHPChanged', health => this.health = health)
        } else {
            this.health = bus.monsterHP
            bus.$on('monsterHPChanged', health => this.health = health)
            setInterval(() => bus.takeDamage(), 1000)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
