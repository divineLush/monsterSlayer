<template lang="pug">
    div
        div(v-for="log in logs")
            p {{ log }}
</template>

<script>
import { bus } from '../main'

export default {
    name: 'Log',

    data() {
        return {
            logs: []
        }
    },

    created() {        
        bus.$on('userHPChanged', data => {
            const message = data.diff > 0
                ? `You healed ${data.diff} hp`
                : `You took ${Math.abs(data.diff)} damage`
            this.logs.push(message)
        })
        bus.$on('monsterHPChanged', data => {
            this.logs.push(`You dealt ${data.diff} damage`)
        })
        bus.$on('newGameWasStarted', () => this.logs = [])
    }
}
</script>

<style lang="stylus" scoped>
</style>
