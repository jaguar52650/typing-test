<template>
<!--  <async-type-area typing-text="hello World!"></async-type-area>-->
  <async-type-area typing-text="qwertyuiop"></async-type-area>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script>

import {  defineAsyncComponent } from 'vue'
export default {
  name: 'App',
  components: {
    asyncTypeArea: defineAsyncComponent(() => import('./components/TypeArea.vue')),
  },
}
</script>
