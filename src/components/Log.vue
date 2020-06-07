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
            return this.logs.slice(-5)
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
    .fade-enter
        opacity 0

    .fade-enter-active
        transition opacity 1s

    .fade-leave-active
        transition opacity 1s
        opacity 0

    .log-wrapper
        display flex
        flex-direction column
        justify-content center
        align-items center
        color #ffffc5
</style>
