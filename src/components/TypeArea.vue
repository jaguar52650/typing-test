<template>
    <div>
        Info {{getStatistic}}
        <div class="chars">
            <span v-for="(currentChar,index) in chars" v-bind:class="currentChar.getClass(index)">
                {{currentChar.char}}
            </span>
        </div>
    </div>
</template>

<script>

    class type {
        position = 0
        time = 0
        timeStart = 0
        timerId = null
        errors = 0

        constructor({text = ''} = {}) {
            this.text = this.makeText(text)
        }

        makeText(text = '') {
            let engine = this
            return Array.from(text) //корректно разбивает суррогатные пары
                .map(char => ({
                    char,
                    time: 0,
                    timeStart: 0,
                    error: 0,
                    getClass(index) {
                        if (engine.position === index && this.error) return 'error'
                        if (engine.position < index) return ''
                        if (engine.position > index) return 'success'
                        return 'current'
                    }
                }))
        }

        keyDown(e) {
            console.log(e.key)
            if (this.position === 0) this.startTimer()
            if (
                this.position < this.text.length
                && e.key === this.text[this.position].char
            ) {
                //todo суррогатные пары
                this.nextCharStep()
            } else {
                //todo only symbols
                if(this.position < this.text.length) {
                    this.text[this.position].error++
                    this.errors++
                }
            }
        }

        nextCharStep() {
            this.position++
            let now = new Date().getTime()
            if (this.position === this.text.length) {
                clearInterval(this.timerId)
                this.updateTotalTime(now)
            }

            if (this.position > 1) {
                this.text[this.position - 1].time = now - this.text[this.position - 1].timeStart
            }
            if (this.position < this.text.length) {
                this.text[this.position].timeStart = now
            } else {
                console.log('finish')
            }
        }

        startTimer() {
            this.timeStart = new Date().getTime()
            let self = this
            this.updateTotalTime()
            this.timerId = setInterval(function () {
                self.updateTotalTime()
            }, 1000)
        }

        updateTotalTime(now = new Date().getTime()) {
            this.time = now - this.timeStart
        }

        getSpeed() {
            if (this.time === 0) return 0
            return Math.round((this.position + 1) / (this.time / 1000) * 60)
        }

        getAccuracy() {
            return Math.max(
                1000 - Math.round(
                (this.errors * 1000) / this.text.length
                ) / 10,
                0
            )
        }

        getSeconds() {
            return Math.round(this.time / 1000)
        }

        getStatistic() {
            return {
                speed: this.getSpeed(),
                accuracy: this.getAccuracy(),
                position: [this.position, this.text.length],
                time: this.getSeconds(),
                errors: this.errors
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
            },
            getStatistic() {
                return this.engine.getStatistic()
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

    .error {
        background-color: yellow;
    }

    .success {
        color: green
    }
</style>