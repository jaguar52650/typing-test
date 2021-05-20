import {createStore} from 'vuex'

const store = createStore({
    strict: process.env.NODE_ENV == 'development',
    state() {
        return {
            text: '',
            error: ''
        }
    },
    mutations: {
        setText(state, text) {
            state.text = text
        },
        setError(state, error) {
            console.log(error)
            state.text = error
        }
    },
    actions: {
        loadBacon(context, {
            host = 'https://baconipsum.com/api/',
            type = 'all-meat',
            paras = '1',
            sentences = '', //high priority for paras
            startWithLorem = '0',
            format = 'json',
        } = {}) {
            let url = new URL(host)

            url.searchParams.set('type', type)
            url.searchParams.set('paras', paras)
            url.searchParams.set('sentences', sentences)
            url.searchParams.set('start-with-lorem', startWithLorem)
            url.searchParams.set('format', format)

            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.responseType = 'json'
            xhr.timeout = 10000

            xhr.onloadend = function () {
                if (xhr.response && xhr?.response[0].length) { //'?' not work
                    if (xhr?.response.length > 1) {
                        //todo multiple paras
                        context.commit('setText', xhr.response.toString());
                    } else {
                        context.commit('setText', xhr.response[0]);
                    }
                } else {
                    let error = xhr.statusText || 'error loading text'
                    context.commit('setError', error)
                }
            };

            xhr.send();

        }

    },
    getters: {
        getText(state) {
            return state.text
        }
    }
})
export default store