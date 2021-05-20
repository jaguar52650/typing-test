<template>
    <div>
        <async-type-area :typing-text="getText" v-if="getText"></async-type-area>
        <button>new test</button>
        <button>rerun test</button>
    </div>
</template>

<script>
    import {defineAsyncComponent} from "vue";
    import {mapGetters} from 'vuex'

    export default {
        name: "TypeTest",
        components: {
            asyncTypeArea: defineAsyncComponent(() => import('./TypeArea.vue')),
        },
        data() {
            return {}
        },
        created() {
            this.startTest()
            // this.$store.commit('setText', 'qwerty')
        },
        computed: {
            ...mapGetters(['getText']),
        },
        methods: {
            startTest() {
                this.$store.dispatch('loadBacon', {
                    // sentences: 5,
                    paras: 3,
                });
            }
        }
    }
</script>

<style scoped>

</style>