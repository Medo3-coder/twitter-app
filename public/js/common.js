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


