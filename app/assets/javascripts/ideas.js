function formData(){
    return {
        idea: {
            title: $('#title').val(),
            body: $('#body').val()
        }
    };
}

function submitIdea(){
    postData();
}

function postData(){
    $.post('/ideas', formData(), function(data){
        $('#ideas').prepend(makeIdea(data));
        $('#title').val('');
        $('#body').val('');
    });
}

function makeIdea(data){
    console.log(data);
    return  "<div id=idea-" + data.id + ">"
        + "<li>" + "Title:  " + data.title + "</li>"
        + "<li>" + "Body:  " + data.body + "</li>"
        + "<li>Quality:  Swill</li>"
        + "<button class='delete' id="+ data.id +">Delete</button></br>"
        + "<button id='edit'>Edit</button></br>"
        + "<button id='thumbs_up'>Thumbs Up</button></br>"
        + "<button id='thumbs_down'>Thumbs Down</button></br>"
        + "</br>"
        + "</div>"
}

function deleteIdea(){
    console.log("Delete me");
    $.ajax({
        url: '/ideas/' + this.id,
        type: 'DELETE',
        success: function(result){
            console.log('I am deleted thank you');
            $("#idea-" + result.id).html("");
        }
    });
}

$('document').ready(function(){
    $('#submit').on("click", submitIdea);
    $('#ideas').delegate(".delete", "click", deleteIdea)
});
