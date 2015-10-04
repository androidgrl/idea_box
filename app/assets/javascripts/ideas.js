//function formData(){
    //return {
        //idea: {
            //title: $('#idea_title').val(),
            //body: $('#idea_body').val()
        //}
    //};
//}

//function submitIdea(){
    //event.preventDefault();
    //postData();
//}

//function postData(){
    //$.post('/ideas', formData());
//}

//$('document').ready(function(){
    //$('#new_idea').submit(submitIdea);
//});

$('document').ready(function(){
    $('#new_idea').submit(function(event){
        event.preventDefault();
        $.post('/ideas', {
            idea: {
                title: $('#idea_title').val(),
                body: $('#idea_body').val()
            }
        })
    });
});
