<template lang="pug">
    div.log-wrapper
        div(v-for="log in slicedLogs")
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

    computed: {
        slicedLogs() {
            return this.logs.slice(-4)
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
            const message = data.diff > 0
                ? `Monster healed ${data.diff} hp`
                : `You dealt ${Math.abs(data.diff)} damage`
            this.logs.push(message)
        })
        bus.$on('newGameWasStarted', () => this.logs = [])
    }
}
</script>

<style lang="stylus" scoped>
    .log-wrapper
        display flex
        flex-direction column
        justify-content center
        align-items center
        color #ffffc5
        height 30vh
</style>
