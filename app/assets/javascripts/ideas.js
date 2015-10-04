function formData(){
    return {
        idea: {
            title: $('#idea_title').val(),
            body: $('#idea_body').val()
        }
    };
}

function submitIdea(event){
    event.preventDefault();
    postData();
}

function postData(){
    $.post('/ideas', formData(), function(data){
        $('#ideas').prepend(data);
    });
}

$('document').ready(function(){
    $('#new_idea').submit(submitIdea);
});
