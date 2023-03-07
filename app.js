//elementleri seçme

const githubForm =document.getElementById("github-form");
const nameInput =document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

//objeler
const github = new Github();
const ui = new UI();

addEventListener();

function addEventListener(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}

function getData(e){
    let username = nameInput.value.trim();

    if(username ===""){
        alert("Lütfen Geçerli bir Kullanıcı adı girin")
    }
    else{
        github.getGithubData(username)
        .then(response=>{
            if(response.user.message === "Not Found"){
                //hatamesajı
                ui.showError("Kullanıcı Bulunamadı");
            }
            else{

                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err=>ui.showError(err));

    }

    ui.clearInput();//input alanı temizlme
    e.preventDefault();
}


function getAllSearched(){
    //arananları sotrageden al ve uiye ekle
    let users = Storage.getSearchedUsersFromStorage();

    let result=""
    users.forEach(user=>{
        result += ` <li class="list-group-item">${user}</li> `
    });
    lastUsers.innerHTML = result;
}

function clearAllSearched(){
    //tüm arananları temizle

    if(confirm("Emin misiniz?")){
        //silme
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();

    }
}