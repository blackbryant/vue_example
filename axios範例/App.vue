<template>
  <div id="app">
     <div v-for="item in websiteData" :key="item.name">
        <ul >
          {{item.name}} :
            <li v-for="sub in item.info" >{{sub}} , </li>
        </ul>

     </div>

     <button @click="getdata">Get範例</button>

     <div style="background-color: blueviolet;border: 1 1 1 1;block-size: 20px">
        <span style="color: white;">{{message.name}}-{{message.url}}</span>
     </div>

     <button @click="postdata">post範例</button>
     <hr>
     <label>Date</label>
     <input type="text"  v-model="params.time">
     <br>

     <label>Name</label>
     <input type="text"  v-model="params.name">
     <br>

     <label>gender</label>
     <input type="radio" value="男"  v-model="params.gender">男
     <input type="radio" value="女"  v-model="params.gender">女
     <br>

     <label>e-mail</label>
     <input type="text"  v-model="params.email">
     <br>

     <label>message</label>
     <input type="text"  v-model="params.message">
     <br>

     <button @click="writedata">送出表單</button>
    <div style="background-color: blueviolet;border: 1 1 1 1;block-size: 20px">
        <span style="color: white;">{{result}}</span>
     </div>



  </div>
</template>

<script>
import webapi from "./api/websiteapi";
import googleSheetapi from "./api/googleSheetapi";

function GetDateTime(){
    var date = new Date();
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}


export default {
  name: 'app',

  data () {
    return {
      websiteData: [],
      message:"",
      params : {time: GetDateTime(), name:"",gender:"",email:"",message:""},
      result:""
    }
  },
  getters:{

  },
  methods: {
    getdata(){
      const response = webapi.GetRunoobData();
      console.log(response)
      response.then((result)=>{
        this.websiteData = result.sites;

      })

    },
     postdata(){


      const response = webapi.PostRunoobData();
      response.then((result)=>{
        if(result.status =="200")
        {
          this.message = result.data ;
        }else
        {
          this.message ="no messate" ;
        }

      })
    },
    writedata(){
      console.log(this.params)
      const response = googleSheetapi.WriteData(this.params);
      response.then((result)=>{
        console.log(result);
        this.result = result ;


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
