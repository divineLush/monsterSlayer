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
            bus.$on('userHPChanged', data => this.health = data.hp)
        } else {
            this.health = bus.monsterHP
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

</style>
