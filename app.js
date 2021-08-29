  
 const inputField= document.getElementById("input-city");
 const showTempDiv= document.getElementById("show-temperature");
 const resultDisplay=document.getElementById("result-display");
 resultDisplay.style.display="none"
 const loadingDisplay= document.getElementById("loading display");
 loadingDisplay.style.display="none"
 const apiKey="97bb59aeb93e6b63802104d6729e7691";

const searchWeather=async ()=>{
   const inputFieldText= inputField.value;
   showTempDiv.textContent="";
  inputField.value="";
loadingDisplay.style.display="block"
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${inputFieldText}&appid=${apiKey}`
  
  const res= await fetch(url);
  const data= await res.json();
  if(res.status==200){
    resultDisplay.style.display="block"
    loadingDisplay.style.display="none"
    showTemp(data) 
  }
  else{
    loadingDisplay.style.display="none"
  resultDisplay.style.display="block"
  }
   
    

 
 
}

const showTemp=(temps)=>{
    if(temps==0){
        resultDisplay.style.display="block"
    }
    else{
        resultDisplay.style.display="none"
  const unixTime= temps.timezone;
  let date= new Date(unixTime*1000);
   let hours= date.getHours();
   let minutes= "0"+ date.getMinutes();
   let seconds= "0"+ date.getSeconds();
let formateTime=`${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
   
  

    const newDiv= document.createElement("div");
    newDiv.innerHTML=`
    <img src="http://openweathermap.org/img/wn/${temps.weather[0].icon}@2x.png" alt="">
            <h1>${temps.name}</h1>
            <h3>${formateTime}</h3>
            <h1>${temps.main.humidity}%</h1>
            <h3><span> Temp: ${parseInt(temps.main.temp-273)}</span>&deg;C</h3>
            <h5><span>feels like: ${parseInt(temps.main.feels_like-273)}</span>&deg;C</h5>
            <h1 class="lead">${temps.weather[0].main}</h1>
    `
 showTempDiv.appendChild(newDiv);

    }
}