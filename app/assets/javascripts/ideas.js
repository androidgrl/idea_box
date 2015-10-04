function submitIdea(){
    event.preventDefault();
    alert('Hello Jamie');
}

$('document').ready(function(){
    $('#new_idea').submit(submitIdea);
});
