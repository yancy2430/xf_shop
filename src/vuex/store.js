import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        count:1,
        num:1,
        integr:0,
    },
    mutations:{
        increment:state => state.num ++,
        decrement:state => state.num --,
        
        
    }
})
