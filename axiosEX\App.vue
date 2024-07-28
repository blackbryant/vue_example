<template>
  <div id="app">
     <div v-for="item in websiteData" :key="item.name">
        <ul >
          {{item.name}} :
            <li v-for="sub in item.info" >{{sub}} , </li>
        </ul>

     </div>

     <button @click="getdata">呼叫網站</button>


  </div>
</template>

<script>
import webapi from "./api/websiteapi";

export default {
  name: 'app',

  data () {
    return {
      websiteData: []
    }
  },
  methods: {
   async getdata(){
      const response = webapi.GetRunoobData();
      console.log(response)
      response.then((result)=>{
        this.websiteData = result.sites;

      })

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
