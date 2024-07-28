import axios  from "axios";


export default{
  WriteData
}

async function WriteData(user){

  let result={} ;
  await axios({
    method: "post",
    url: "https://script.google.com/macros/s/{應用程式}/exec",
    data: {
      time: user.time,
      name: user.name,
      gender: user.gender,
      email: user.email,
      message: user.message,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (response) {

      console.log(response);
      result = response.data.result;
    })
    .catch(function (error) {
      console.log(error);
    });

    return result;
  }
