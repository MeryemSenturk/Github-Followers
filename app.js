
const getBtn = document.querySelector("#button")
const value = document.getElementById("searchText");
const cardsDiv =document.getElementById("cards")

const searchInput = document.querySelector("#searchFollowers")

let followers = []

// https://api.github.com/users/anthonyharold67/followers?per_page=100

const getFollowers = async (userName) => {
    try{
        const response = await fetch(`https://api.github.com/users/${userName}/followers?per_page=100`)

        console.log(response);

        if(response.ok){
            const data = await response.json()
            console.log(data);

            if(data.lenght > 0){
                searchInput.style = "display:flex;"
            }

             // forEach & map farkı sorulur
             //* forEach => no return
             //? map => array return

            data.forEach((item) => createElem(item));

        }else{ // response gelir, iletişm kurulur fakat aranan kullanıcı yoksa devreye girer. 
            throw new Error("Kullanıcı bulunamadı")  // manuel hata fırlattık.
        }

    } catch(error) {   // response hatasını yakalar. Api ile iletişime geçilemezse devreye girer.
        console.log(error);
        searchInput.style = "display:none"
        cardsDiv.innerHTML =`<h1 class="text-center my-5 text-danger">${error}</h1>`
    }
}

const createElem = (user) => {
    // console.log(user);
    // console.log(user.login);
    const {login, html_url, avatar_url} = user;
    // console.log(avatar_url);
    const newElem = `
         <div class="col">
           <div class="card">
             <img src="${avatar_url}" class="card-img-top" alt="...">
            <div class="card-body">
             <h5 class="card-title">${login}</h5>
             <a href="${html_url}" target="_blank" class="btn btn-dark">View Profile</a>
            </div>
           </div>
         </div>
    `
    cardsDiv.innerHTML += newElem
}

getBtn.addEventListener("click", () => {

cardsDiv.innerHTML = "";

   const newValue = value.value.trim()  // baştaki ve sondaki boşlukları temizler.
   console.log(newValue);
   if(newValue){
    getFollowers(newValue)

   }else{
    alert("Lütfen bir kullanıcı adı giriniz!")
   }
})



searchInput.addEventListener("input", (e)=>{
    console.log(e.target.value);

    cardsDiv.innerHTML = "";

    e.target.value ? followers.filter((item) => item.login.toLowerCase().includes(e.target.value.toLowerCase())).forEach((item) => createElem(item)) : followers.forEach((item) => createElem(item))
})

window.addEventListener("loada", () => {
    searchInput.style = "display:none"
})