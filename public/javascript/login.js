

const loginBtn = document.querySelector(".login-btn");
const wrongLoginMsg = document.querySelector(".wrong-login");

loginBtn.addEventListener("click", function(){
    let username = document.querySelector("#name").value;
    let password = document.querySelector("#password").value;

    console.log(username +  " "+ password);

    doFetch(username, password)
    
});


function doFetch(username, password){
    let uri = "https://dmvprojects.net/login/logged-user.html";
    
    let h = new Headers();
    h.append('Accept', 'html');
    let encoded = window.btoa(username+':'+password);
    let auth = 'Basic ' + encoded;
    h.append('Authorization', auth );
    console.log( auth );
    
    let req = new Request(uri, {
        method: 'GET',
        headers: h,
        credentials: 'include'
    });
    //credentials: 'same-origin'
    
    fetch(req)
    .then( (response)=>{
        if(response.ok){
            console.log(response);
            return response.text();
        }else{
            return
            // throw new Error('BAD HTTP stuff');
        }
    })
    .then( (jsonData) =>{
        let opened = window.open('http://127.0.0.1:5501/buy-home/apartmentid.html');
        opened.document.write(jsonData);

        console.log(jsonData);
    })
    .catch( (err) =>{
        console.log('ERROR:', err.message);
    });

}



