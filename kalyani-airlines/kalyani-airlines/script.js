document.addEventListener("DOMContentLoaded",()=>{
const params=new URLSearchParams(window.location.search);
const destination=params.get("destination");
const destinationSelect=document.getElementById("to");
if(destination && destinationSelect){
  [...destinationSelect.options].forEach(option=>{
    if(option.textContent.includes(`(${destination})`)) option.selected=true;
  });
}

let current=1, baseFare=18499;
const showStep=n=>{
document.querySelectorAll(".booking-panel").forEach(x=>x.classList.remove("active-panel"));
document.getElementById("step"+n)?.classList.add("active-panel");
document.querySelectorAll(".step").forEach((x,i)=>x.classList.toggle("active",i<n));
current=n;
};
document.querySelectorAll(".next-btn").forEach(btn=>btn.addEventListener("click",()=>{
if(current===1){baseFare=Number(document.querySelector('input[name="flight"]:checked').value);}
if(current===2 && (!document.getElementById("fullName").value || !document.getElementById("email").value || !document.getElementById("mobile").value)){alert("Please enter the passenger details.");return;}
if(current===1){document.getElementById("passengerCount").textContent=document.getElementById("passengers").value;}
if(current===3){updateTotal();}
showStep(Number(btn.dataset.next));
if(current===4) updateTotal();
}));
document.querySelectorAll(".back-btn").forEach(btn=>btn.addEventListener("click",()=>showStep(Number(btn.dataset.back))));
document.querySelectorAll('input[name="class"]').forEach(x=>x.addEventListener("change",updateTotal));
function updateTotal(){
const pax=Number(document.getElementById("passengers").value||1);
const mult=Number(document.querySelector('input[name="class"]:checked')?.dataset.mult||1);
const total=Math.round(baseFare*pax*mult);
document.getElementById("classTotal").textContent="₹"+total.toLocaleString("en-IN");
document.getElementById("paymentTotal").textContent="₹"+total.toLocaleString("en-IN");
}
document.getElementById("payBtn")?.addEventListener("click",()=>{
const name=document.getElementById("fullName").value||"Passenger";
const total=document.getElementById("paymentTotal").textContent;
document.getElementById("confirmation").innerHTML=`<b>✓ Demo payment successful!</b><br>Thank you, ${name}. Your Kalyani Airlines ticket has been confirmed.<br><span>Booking reference: KA${Math.floor(100000+Math.random()*900000)} · Total paid: ${total}</span>`;
});
const contact=document.getElementById("contactForm");
if(contact) contact.addEventListener("submit",e=>{e.preventDefault();document.getElementById("contactResult").textContent="Thank you! Your demo message has been received.";});
const login=document.getElementById("loginForm");
if(login) login.addEventListener("submit",e=>{e.preventDefault();document.getElementById("loginResult").textContent="Demo login successful!";});
});