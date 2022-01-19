// const { response } = require("express");

//autocomplete phone num
const form = document.querySelector(".form-apart");

form.addEventListener('submit', ()=>{
    alert("Въведен апартамент")
})

const BrokerContact = document.querySelector("#broker-contact");
const PhoneContact = document.querySelector("#phone-contact");

BrokerContact.addEventListener('input', ()=>{
    switch(BrokerContact.value) {
        case "Ася Нейкова":
            PhoneContact.value = "0896 611 040";
            break;

        case "Ирена Иванова":
            PhoneContact.value = "0882 704 982";
            break;

        case "Миглена Балабанова":
            PhoneContact.value = "0898 585 292";
    }
});


// delete apartments

const deleteBtn = document.querySelectorAll("#delete-btn");
// deleteBtn.addEventListener("click", (e)=>{
//     const endpoint = `/apartment/${}`
// });

deleteBtn.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        const endpoint = `/apartment/${btn.dataset.doc}`;

        if(confirmDelete()){
            fetch(endpoint, {
            method: 'DELETE'
            })
            .then((response)=>{
                response.json()
                alert("Апартамента е изтрит");
                location.reload();
            })
                
            .then((data)=>{  
            })  
            .catch((err)=>{
                console.log(err)

            })

        }
        
    })
})

function confirmDelete() {
  return confirm("Сигурна ли си, че искаш да изтриеш апартамента?")
}




