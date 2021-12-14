export default{

    install(Vue,options){
        Vue.prototype.$calculator ={
            minus : function(a, b){

                return a - b ;
            },
            add : function(a , b){
                return a + b ;

            },
            multi: function(a ,b){
                return a * b ;
            },
            devide: function(a,b){
                return a / b ;
            }

        }
    }

}
