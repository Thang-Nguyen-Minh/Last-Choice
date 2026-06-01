function simulateTask(){
    return new Promise((resolve,reject)=>{
        let task=true;
        setTimeout(()=>{
            if (task){
                resolve("Task Completed!");
            }
            else reject("Task not Completed!");
        })
    })
}
simulateTask().then((message) => {
    console.log("Success:", message);
})
    .catch((err) => {
        console.log("Error:", err);
    });