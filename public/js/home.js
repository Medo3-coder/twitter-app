$(document).ready(()=> {
    $.get("/api/get-posts" , results => {
        console.log(results);
    }) 
})