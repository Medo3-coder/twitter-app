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

$("#submitPostButton").click(()=>{
    var button = $(event.target);
    var textbox = $("#postTextarea");
    var data = {
        content: textbox.val(),
    }

    $.post("/api/post" , data , (postData , status , xhr) => {

    });

})


