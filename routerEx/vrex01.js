import {Brazil,Hawaii,Jamaica,Panama} from "./city.js"
import store from "./store.js" 
const Home = {
    template:`<div class="home">
                <h1> All Destinations </h1>
                <div class="destinations">
                  <div  v-for="destination in destinations" :key="destination.name">
                    <router-link :to="{name:'DestinationDetails' , params:{slug: destination.slug}}">
                        <h2>{{destination.name}} </h2>
                    </router-link>
                    <figure> 
                    <router-link :to="{name:'DestinationDetails', params:{slug: destination.slug, name:destination.name}}">
                        <img :src="'/vuerouter/assets/'+destination.image" :alt="destination.name" width='70%'/>
                    </router-link>

                    </figure>
                  </div>
                </div>
              </div>`,
    data:function(){
        return {
            destinations: store.destinations
        }
    },
  }

   
const goBack = {
    template:`
                <span class="go-back">
                    <button @click="goBack">go back</button>
                </span>
    `,
    methods:{
            goBack(){

                return this.$router.go(-1);
            }
    }
}

  const DestinationDetails =  {
    template:`<div>
                <go-back/>
                <section class="destination">
                    <h1> {{slug}} : {{ name}}</h1>
                <div class="destination-detail">
                    <img :src="'/vuerouter/assets/'+destination.image"  width='40%'/>
                    <p>
                    {{destination.description}}
                    </p>
                </div>
                
                </section>
                <section class="expreience">
                    <h2> Top expreience in {{destination.name}}</h2>
                    <div class="cards">
                        <div v-for="experience in destination.experiences" :key="experience.slug" class="card">
                        <router-link :to="{name:'expDetails', params:{slug:destination.slug, expSlug: experience.slug}}">   
                            <span class="class-text">
                                {{experience.name}}
                            </span>
                            <img  :src="'/vuerouter/assets/'+experience.image" alt="experience.slug"  width='20%'/>
                        </router-link> 
                        </div>
                    </div>
                </section>
                <section>
                    <router-view :key="$route.path" />
                </section>
              </div>
              `,
    data(){
        return {
            slug : this.$route.params.slug,
            name : this.$route.params.name
            
        }
    },
    computed:{
      destination(){
          return store.destinations.find(
              destination => destination.slug === this.slug 
          )
      }
    },
    components:{goBack}
  }


  const expDetail =  {
    template:`<div>
                <section>
                    <h1> Expreience</h1>
                    <h1> {{ experience.name}} </h1>
                    <div class="experience-detail">
                        <img :src="'/vuerouter/assets/'+experience.image"  width='40%'/>
                        <p>
                            {{experience.description}}
                        </p>
                    </div>
                </section>
              </div>
              `,
    data(){
        return {
            expSlug : this.$route.params.expSlug,
            slug : this.$route.params.slug,
            
        }
    },
    computed:{
      destination(){
          return store.destinations.find(
              destination => destination.slug === this.slug 
          )
      },
      experience(){
            console.log(this.destination) ; 
            return this.destination.experiences.find(
                expreience => expreience.slug === this.expSlug 
            )
        }
    }
  }


  

const navLinks={
    template:` 
                <nav id="nav">
                <ul class="nav-links">
                    <li class="links">
                    <router-link :to="{name:'Home'}"> Home </router-link>
                    
                    </li>
                    <li v-for="destination in destinations" :key="destination.name" class="links">
                    <router-link :to="{name:'DestinationDetails', params:{slug: destination.slug, name:destination.name}}">
                        {{destination.name}}
                    </router-link>

                    </li>
                </ul>

            </nav> 

            `,
            data(){
                return {
                    slug : this.$route.params.slug,
                    name : this.$route.params.name,
                    destinations: store.destinations
                }
            },


}



const router = new VueRouter({
    linkExactActiveClass:"vue-link-temp",
    mode:"history",
    routes:[
        {path:"/vuerouter", name:"Home", component:Home },  
        {path:"/destination/:slug/:name", name:"DestinationDetails", component:DestinationDetails,
            children:[
                {
                    path:":expSlug" , name:"expDetails", component:expDetail
                }

            ]
        
        },
        {path:"/expDetails/:slug" , name:"expDetails", component:expDetail}
     
    ]

})

new Vue({
    el:'#app',
    router,
    components : {navLinks, goBack},
    data(){
        return {
         
        }
    }
})
