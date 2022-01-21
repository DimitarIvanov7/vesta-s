displayAnimation();

const inputForm = document.querySelector(".inputForm");

inputForm.addEventListener('submit', ()=>{
    // console.log("submit");
    alert("Имейлът е изпратен, очаквайте отговор")
    // location.reload();
    window.location.href = window.location.href;
});