<template>
    <div class="container">
        <h1>Тест скорости печати</h1>
        <div class="alert alert-danger" role="alert" v-if="getError">
            {{getError}}
        </div>
        <async-type-area
                v-if="getText.hasText()"
                :typing-text="getText">
        </async-type-area>
        <button type="button" class="btn btn-warning" @click="startTest">Начать новый тест</button>
    </div>
</template>

<script>
    import {defineAsyncComponent} from "vue";
    import {mapGetters} from 'vuex'

    import "bootstrap/dist/css/bootstrap.min.css";

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
            ...mapGetters([
                'getText',
                'getError'
            ]),
        },
        methods: {
            startTest() {
                //todo блокировать кнопку на вермя загрузки
                this.$store.dispatch('loadBacon', {
                    paras: 2,
                });
            }
        }
    }
</script>

<style scoped>

</style>