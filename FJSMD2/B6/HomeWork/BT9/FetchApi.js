async function getUsers() {
    try{
        const Users=await fetch("https://jsonplaceholder.typicode.com/users");
        //Chuyển đổi body text của response thành JSON object
        const User=await Users.json();
        User.forEach(user => {
            console.log(user.name);
        });
    }catch(err){
        console.log(err);
    }
}
getUsers();