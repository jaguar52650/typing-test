<template>
    <div>
        Position: {{engine.position}}
        <div class="chars">
            <div v-for="(currentChar,index) in chars" v-bind:class="currentChar.getClass(index)">
                {{currentChar.char}}
                {{currentChar.wrong}}
            </div>
        </div>
    </div>

</template>

<script>

    class type {
        position = 0

        constructor({
                        text = ''
                    } = {}) {
            this.text = this.makeText(text)
        }

        makeText(text = '') {
            let engine = this
            return Array.from(text)
                .map(char => ({
                    char,
                    time: 0,
                    wrong: 0,
                    getClass(index) {
                        if (engine.position === index && this.wrong) return 'wrong'
                        if (engine.position < index) return ''
                        if (engine.position > index) return 'success'
                        return 'current'
                    }
                }))
        }

        keyDown(e) {
            console.log(e.key)
            if (e.key === this.text[this.position].char) {
                this.position++
            } else {
                //todo only symbols
                this.text[this.position].wrong++
            }
        }
    }

    export default {
        name: "TypeArea",
        props: ["typingText"],
        components: {},
        data() {
            return {
                engine: null
            }
        },
        computed: {
            chars() {
                return this.engine.text
            }
        },
        created: function () {
            this.engine = new type({
                text: this.typingText
            })
            window.addEventListener('keydown', this.keyDown)
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
        font-size: 15px;
    }

    .current {
        background-color: green
    }

    .wrong {
        background-color: yellow;
    }

    .success {
        color: green
    }
</style>