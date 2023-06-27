$(document).ready(() => {
    $.get("/api/get-posts", results => {
        outputPosts(results, $(".postContainer"))
        console.log(results);
    })
});


function outputPosts(results, container) {
    container.html("");
    results.forEach(result => {
        var html = createPostHtml(result);
        container.append(html);
    });

    //if no posts
    if (results.length == 0) {
        container.append("<span>Nothing to Show</span>")
    }
}