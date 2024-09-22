const balance = document.querySelector("#balance");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");

// const dummyData = [
//   { id: 1, description: "Flower", amount: -20 },
//   { id: 2, description: "Salary", amount: 3500 },
//   { id: 3, description: "Book", amount: -10 },
//   { id: 4, description: "Camera", amount: -120 },
//   { id: 5, description: "Petrol", amount: -250 },
// ];
// let transactions = dummyData;

const localStorageTrans =JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans")!==null ? localStorageTrans : [];

function loadTransactionDetails(transactions) {
  // console.log(transactions)
  const sign = transactions.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transactions.amount < 0 ? "exp" : "inc");
  item.innerHTML = `
${transactions.description}
<span>${sign} ${Math.abs(transactions.amount)}</span>
<button class="btn-delete"onClick='removeTrans(${transactions.id})'>X</button>
`;
  trans.appendChild(item);
  // console.log(sign)
}

function removeTrans(id) {
  // console.log(id)
  if (confirm("Are you sure you want to delete Transaction ?")) {
    transactions = transactions.filter((transactions) => transactions.id != id);
    config();
    updateLocalStorage();
  } else {
    return;
  }
}
function updateAmount(){
const amounts = transactions.map((transactions)=>transactions.amount)
// console.log(amounts)
const total = amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2)
balance.innerHTML= `₹ ${total}`

const income = amounts.filter((item)=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
inc_amt.innerHTML=`₹ ${income}`
// console.log(income)
const expence = amounts.filter((item)=>item<0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
exp_amt.innerHTML=`₹ ${Math.abs(expence)}`

}

function config() {
  trans.innerHTML = "";
  transactions.forEach(loadTransactionDetails);
  updateAmount();
}
function addTransaction(e){
    e.preventDefault();
    if(description.value.trim()==""||amount.value.trim()==""){
        alert("Please Enter Description or Amount")
    }else{
        const transaction={
            id:uniqueid(),
            description:description.value,
            amount:+amount.value,
        };
        transactions.push(transaction);
        loadTransactionDetails(transaction);
        description.value='';
        amount.value='';
        updateAmount();
        updateLocalStorage();
    }

}
 function uniqueid(){
    return Math.floor(Math.random()*1000000000);
 }

form.addEventListener("submit", addTransaction)

window.addEventListener("load", function () {
  config();
});

function updateLocalStorage(){
    localStorage.setItem('trans',JSON.stringify(transactions))
}