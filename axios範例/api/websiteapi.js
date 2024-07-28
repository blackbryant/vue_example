import axios from 'axios'

async function GetRunoobData(){
  let data = {};
  //https://www.runoob.com/try/ajax/json_demo.json

  try {
   await  axios
     .get("http://localhost/api/json_demo")
     .then((response) => {
       if (response.request.readyState === 4 && response.status === 200) {
         data = response.data;
       }
     })
     .catch(function (error) {
       // 请求失败处理
       console.log(error);
     });

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for further handling
  }
    return data;
}

function GetAA(){

  return "AAAAa";

}

export default {
  GetRunoobData,
  GetAA
}


