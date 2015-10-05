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
        $('#ideas').prepend("<li>" + data.title + "</li>");
        $('#title').val('');
        $('#body').val('');
    });
}

$('document').ready(function(){
    $('#submit').on("click", submitIdea);
});
