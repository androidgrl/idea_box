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
        console.log(data);
        $('#ideas').prepend(makeIdea(data));
        $('#title').val('');
        $('#body').val('');
    });
}

function makeIdea(data){
    return "<li>" + "Title:  " + data.title + "</li>"
        + "<li>" + "Body:  " + data.body + "</li>"
        + "<li>Quality:  Swill</li>"
        + "</br>"
}

$('document').ready(function(){
    $('#submit').on("click", submitIdea);
});
