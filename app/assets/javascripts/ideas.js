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
    $.post('/ideas', formData(), function(idea){
        console.log(idea);
        $('#ideas').prepend(makeIdea(idea));
        $('#idea_title').val('');
        $('#idea_body').val('');
    });
}

function makeIdea(idea){
    return "<li>" + idea.title + "</li>"
}

$('document').ready(function(){
    $('#new_idea').submit(submitIdea);
});
