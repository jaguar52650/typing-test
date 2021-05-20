<template>
    <div>
        <async-type-area
                v-if="getText.hasText()"
                :typing-text="getText">
        </async-type-area>
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
            // this.$store.commit('setText', ['qwerty','uiop'])
        },
        computed: {
            ...mapGetters(['getText']),
        },
        methods: {
            startTest() {
                this.$store.dispatch('loadBacon', {
                    // sentences: 5,
                    paras: 2,
                });
            }
        }
    }
</script>

<style scoped>

</style>