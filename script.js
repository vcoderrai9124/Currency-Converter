const BASE_URL=" https://api.exchangerate-api.com/v4/latest/USD";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
constfromCurr =document.querySelector(".from select");
constToCurr =document.querySelector(".To select");
const msg =document.querySelector(".msg");


for(let select of dropdowns){
for (currCode in countryList){
    let newOption= document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name==="from"&& currCode==="USD"){
        newOption.selected="selected";
    }else if(select.name==="To"&& currCode==="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
})
}
const updateFlag=(element)=>{
    let currCode= element.value;
    let countryCode = countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc;
};

 const updateExchangeRate = async()=>{
     let amount = document.querySelector(".amount input");
     let amtVal = amount.value;
     console.log(amtVal);
     if(amtVal===""||amtVal<1){
         amtVal=1;
         amount.value="1";
     }
     console.log(fromCurr,ToCurr.value);
     const URL =`${BASE_URL}${fromCurr.value.tolowerCase()}/${ToCurr.value.tolowerCase()}.json`;
     let response = await fetch(URL);
     let data = await response.json();
     let rate = data[ToCurr.value.tolowerCase()];

     let finalAmount = amtVal*rate;
     console.log(rate);
     console.log(amount);
     msg.innerText=` ${amtVal} ${fromCurr.value} = ${finalAmount} ${ToCurr.value}`
 };
 btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
window.document.addEventListener("load",()=>{
    updateExchangeRate();
})