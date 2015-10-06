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
    var text = data.body;
    var truncated = truncateString(text, 100, ' ', '...');
    return  "<div id=idea-" + data.id + ">"
        + "<li>" + "Title:  " + data.title + "</li>"
        + "<li>" + "Body:  " + truncated + "</li>"
        + "<li>Quality:  Swill</li>"
        + "<button class='delete' id="+ data.id +">Delete</button></br>"
        + "<button class='edit'>Edit</button></br>"
        + "<button class='thumbs_up'>Thumbs Up</button></br>"
        + "<button class='thumbs_down'>Thumbs Down</button></br>"
        + "</br>"
        + "</div>"
}

function truncateString (string, limit, breakChar, rightPad) {
    if (string.length <= limit) return string;

    var substr = string.substr(0, limit);
    if ((breakPoint = substr.lastIndexOf(breakChar)) >= 0) {
        if (breakPoint < string.length -1) {
            return string.substr(0, breakPoint) + rightPad;
        }
    }

    return string;
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

function loadIdeas(){
    console.log("Loading Ideas Have a Nice Day");
    $.ajax({
        url: '/ideas.json',
        type: 'GET',
        success: function(data){
            console.log(data);
            data.forEach(function(idea){
                $('#ideas').append(makeIdea(idea));
            });
        }
    });
}

$('document').ready(function(){
    $('#submit').on("click", submitIdea);
    $('#ideas').delegate(".delete", "click", deleteIdea);
    loadIdeas();
});
