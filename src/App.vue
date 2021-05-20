<template>
    <async-type-test></async-type-test>
    <img alt="Vue logo" src="./assets/logo.png"/>
</template>

<script>
    import {defineAsyncComponent} from 'vue'
    export default {
        name: 'App',
        components: {
            asyncTypeTest: defineAsyncComponent(() => import('./components/TypeTest.vue')),
        },

    }
</script>
