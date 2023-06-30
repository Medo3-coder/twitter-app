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


//Like button click handler
$(document).on("click", ".likeButton", (event) => {
    var button = $(event.target);
    var postId = getPostIdFromElement(button);
    console.log(postId);
});

function getPostIdFromElement(element) {
     var isRoot = element.hasClass("post");
     var rootElement = isRoot ? element : element.closest(".post");
     var postId = rootElement.data().id;

     if(postId === undefined) return alert("No post Id specified");

     return postId;
}

function createPostHtml(postData) {

    var postedBy = postData.postedBy;
    var displayName = postedBy.firstName + " " + postedBy.lastName
    var timestamp = timeDifference(new Date(), new Date(postData.createdAt));

    return `<div class="post" data-id="${postData._id}">
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
                            <button class="likeButton">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                     </div>
                </div>
            <div>
        </div>`;
};



function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if (elapsed / 1000 < 30) return "just now";
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}


