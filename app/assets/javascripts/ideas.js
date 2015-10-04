function formData(){
    return {
        idea: {
            title: $('#idea_title').val(),
            body: $('#idea_body').val()
        }
    };
}

function submitIdea(){
    event.preventDefault();
    postData();
}

function postData(){
    $.post('/ideas', formData(), function(data){
        $('#ideas').prepend(data.slice(925, 1755));
    });
}

$('document').ready(function(){
    $('#new_idea').submit(submitIdea);
});
