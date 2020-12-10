import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        beers: [],
        isShowButtonNext: false,
        loading: false,
        page: 1
    },
    mutations: {
        addBeer(state, newBeer) {
            state.beers.push(newBeer);
        },
        changeStateButton(state) {
            state.isShowButtonNext = !state.isShowButtonNext;
        },
        changeLoading(state) {
            state.loading = !state.loading;
        },
        deleteItem(state, indexDel) {
            state.beers.splice(indexDel, 1);
        },
        changePage(state) {
            state.page++;
        },
        changeItem(state, newVal) {
            const tmp = state.beers[newVal.indexChange];
            tmp.name = newVal.name;
            tmp.description = newVal.description;
            console.log(tmp);
            state.beers.splice(newVal.indexChange, 1, tmp);
        }
    },
    actions: {
        GET_BEERS({commit}) {
            commit('changeLoading');
            if (this.state.page === 1) commit('changeStateButton');
            console.log(this.state.page)
            axios.get(`https://api.punkapi.com/v2/beers?page=${this.state.page}&limit=25`)
                .then(res => {
                    if (res.data.length) {
                        res.data.forEach((val) => {
                            commit('addBeer', val)
                        })
                        console.log(this.state.beers)
                        commit('changePage');
                    } else commit('changeStateButton');
                    commit('changeLoading')
                })
        }
    },
    getters: {
        GET_BEERS(state) {
            return state.beers;
        },
        IS_SHOW_BUTTON_NEXT(state) {
            return state.isShowButtonNext;
        },
        GET_LOADING(state) {
            return state.loading;
        }
    }
});
