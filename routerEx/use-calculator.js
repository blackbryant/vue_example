import VueCalculator from './vue-calculator.js'
Vue.use(VueCalculator);



new Vue({
    el:'#app',
    data(){
        return {
             
        }
    },
    methods:{
        add(){
                 return this.$calculator.add(1,1) ; 

        },
        minus(){
            return this.$calculator.minus(100,1) ; 
        },
        message(){
            return this.$calculator.multi(2,5) ; 
        }


    }
})
