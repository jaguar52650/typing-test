<template>
    <div>
        <div class="chars">
            <p v-for="para in getParas">
                <span v-for="currentChar in para" v-bind:class="currentChar.getClass()">
                    {{currentChar.char}}
                </span>
            </p>
        </div>
        <div>Скорость: {{getStatistic.speed}} Знаков в минуту</div>
        <div>Точность: {{getStatistic.accuracy.toFixed(1)}} %</div>
        <!--        Info {{getStatistic}}-->
    </div>
</template>

<script>
    import TypingTest from '../modules/TypingTest.js'

    export default {
        name: "TypeArea",
        props: {
            typingText: Object
        },
        components: {},
        data() {
            return {
                engine: null
            }
        },
        computed: {
            getStatistic() {
                return this.engine ? this.engine.getStatistic() : {}
            },
            getParas() {
                return this.engine ? this.engine.getParas() : []
            }
        },
        watch: {
            typingText: {
                handler(val) {
                    this.engine = new TypingTest({
                        text: val.getText()
                    })
                },
                deep: true
            },
        },
        created: function () {
            window.addEventListener('keydown', this.keyDown)
            this.engine = new TypingTest({
                text: this.typingText.getText()
            })
        },
        unmounted: function () {
            window.removeEventListener('keydown', this.keyDown)
            this.engine = null
        },
        methods: {
            keyDown: function (e) {
                this.engine.keyDown(e)
            }
        },
    }
</script>

<style scoped>
    .chars {
        padding: 3px;
        line-height: 32px;
        font-size: 21px;
        text-align: left;
        min-height: 400px;
    }

    .current {
        background-color: green;
        padding: 3px;
        color: white;
    }

    .error {
        background-color: yellow;
    }

    .success {
        color: green
    }
</style>