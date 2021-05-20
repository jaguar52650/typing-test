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
    class Char {
        constructor({char, engine, position} = {}) {
            return {
                char,
                position,
                time: 0,
                timeStart: 0,
                error: 0,
                getClass() {
                    if (engine.position === this.position && this.error) return 'error'
                    if (engine.position < this.position) return ''
                    if (engine.position > this.position) return 'success'
                    return 'current'
                }
            }
        }
    }

    class typingTest {
        text = []
        paras = []
        position = 0
        time = 0
        timeStart = 0
        timerId = null
        errors = 0

        constructor({text = []} = {}) {
            this.text = this.makeText(text)
        }

        makeText(text = '') {
            let engine = this
            let result = []

            for (let i = 0, k = 0; i < text.length; i++, k += text.length) {
                let paras = Array.from(text[i])  //корректно разбивает суррогатные пары
                this.paras[i] = []

                for (let j = 0; j < paras.length; j++) {
                    let char = paras[j]

                    let newCHar = new Char({
                        char,
                        engine,
                        position: result.length
                    })

                    this.paras[i][j] = newCHar
                    result.push(newCHar)
                }
            }
            return result
        }

        getParas() {
            return this.paras.map(para => para)
        }

        keyDown(e) {
            if(e.key != 'Shift') {
                if (this.position === 0) this.startTimer()
                if (
                    this.position < this.text.length
                    && e.key === this.text[this.position].char
                ) {
                    //todo суррогатные пары
                    this.nextCharStep()
                } else {
                    //todo only symbols
                    if (this.position < this.text.length) {
                        this.text[this.position].error++
                        this.errors++
                    }
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
                (1000 - Math.round(
                (this.errors * 1000) / this.text.length
                ) / 10)/10,
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
                return this.engine ? this.engine.getStatistic() :{}
            },
            getParas() {
                return this.engine ? this.engine.getParas() : []
            }
        },
        watch: {
            typingText: {
                handler(val) {
                    this.engine = new typingTest({
                        text: val.getText()
                    })
                },
                deep: true
            },
        },
        created: function () {
            window.addEventListener('keydown', this.keyDown)
            this.engine = new typingTest({
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
    }

    .current {
        background-color: green;
        padding:3px;
        color:white;
    }

    .error {
        background-color: yellow;
    }

    .success {
        color: green
    }
</style>