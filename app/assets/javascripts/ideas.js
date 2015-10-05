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
    return "<li>" + "Title:  " + data.title + "</li>"
        + "<li>" + "Body:  " + data.body + "</li>"
        + "<li>Quality:  Swill</li>"
        + "<button class='delete' id="+ data.id +">Delete</button></br>"
        + "<button id='edit'>Edit</button></br>"
        + "<button id='thumbs_up'>Thumbs Up</button></br>"
        + "<button id='thumbs_down'>Thumbs Down</button></br>"
        + "</br>"
}

function deleteIdea(){
    console.log("Delete me");
    $.ajax({
        url: '/ideas/' + this.id,
        type: 'DELETE',
        success: function(result){
            console.log('I am deleted thank you');
            $('ul').html("");
        }
    });
}

//$('.delete').on("click", function(){console.log("Hello");});

$('document').ready(function(){
    $('#submit').on("click", submitIdea);
    $('#ideas').delegate(".delete", "click", deleteIdea)
    //$('.delete').on("click", deleteIdea);
});
