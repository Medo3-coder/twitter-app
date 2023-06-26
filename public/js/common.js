$("#postTextarea").keyup(event => {
    var textbox = $(event.target);
    var value = textbox.val().trim();

    var submitPostButton = $("#submitPostButton");
    if (submitPostButton.length == 0) return alert("no submit button found");

    if (value == "") {
        submitPostButton.prop('disabled', true);
        return;
    }
    submitPostButton.prop('disabled', false);

})

$("#submitPostButton").click(() => {
    var button = $(event.target);
    var textbox = $("#postTextarea");
    var data = {
        content: textbox.val(),
    }

    $.post("/api/add-post", data, (postData) => {
        var html = createPostHtml(postData);
        $(".postContainer").prepend(html); // prepend add it to front
        textbox.val("");
        button.prop("disabled", true);
    });


});

function createPostHtml(postData) {

    var postedBy = postData.postedBy;
    var displayName = postedBy.firstName + " " + postedBy.lastName
    var timestamp = postData.createdAt;

    return `<div class="post">
            <div class="mainContentContainer"> 
                <div class="userImageContainer">
                    <img src="${postedBy.profilePic}">
                </div>
                <div class="postContentContainer">
                     <div class="header">
                        <a href="/profile/${postedBy.username}" class="displayName">${displayName}</a>
                        <span class="username">@${postedBy.username}</span>
                        <span class="username">${timestamp}</span>
                     </div>
                     <div class="postBody">
                         <span>${postData.content}</span>
                     </div>
                     <div class="postFooter">
                        <div class="postButtonContainer"> 
                            <button>
                                <i class="fa-regular fa-comment"></i>
                            </button>
                        </div>

                        <div class="postButtonContainer"> 
                            <button>
                                <i class="fa-solid fa-retweet"></i>
                            </button>
                        </div>

                        <div class="postButtonContainer"> 
                            <button>
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                     </div>
                </div>
            <div>
        </div>`;
}


