class Storage{
    static getSearchedUsersFromStorage(){
        //tüm kullanıcları al
        let users;
        if(localStorage.getItem("searched")===null){
            users=[];
        }
        else{
            users=JSON.parse(localStorage.getItem("searched"))
        }
        return users;
    }
    static addSearchedUserToStorage(username){
        //kullanıcı ekle
        let users = this.getSearchedUsersFromStorage();

        //indexof
        if(users.indexOf(username)===-1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }
    static clearAllSearchedUsersFromStorage(){
        //tüm kullanıcları sil
        localStorage.removeItem("searched");
    }
}