const search=document.getElementById("search");

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".card").forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)
? "block"
: "none";

});

});

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("click",()=>{

btn.animate([
{transform:"scale(1)"},
{transform:"scale(0.9)"},
{transform:"scale(1)"}
],{
duration:300
});

});

});