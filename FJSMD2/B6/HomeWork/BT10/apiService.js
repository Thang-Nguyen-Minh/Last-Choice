export async function fetchUsers() {
    try{
        const Users=await fetch("https://jsonplaceholder.typicode.com/users");
        //Chuyển đổi body text của response thành JSON object
        const data=await Users.json();
        return data;
    }catch(err){
        console.log(err);
        return [];
    }
}
