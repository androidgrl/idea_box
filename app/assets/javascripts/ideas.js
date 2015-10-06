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
        + "<li id="+ "quality-" + data.id +">" + "Quality:  " + data.quality + "</li>"
        + "<button class='delete' id="+ data.id +">Delete</button></br>"
        + "<button class='edit' id="+ "edit-" + data.id +">Edit</button></br>"
        + "<button class='thumbs_up' id="+ "up-" + data.id +">Thumbs Up</button></br>"
        + "<button class='thumbs_down' id=" + "down-" + data.id +">Thumbs Down</button></br>"
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

function upIdea(){
    console.log("Thumbing up idea");
    $.ajax({
        url: '/thumbs_up/' + this.id.slice(3,6) + '.json',
        type: 'GET',
        success: function(data){
            console.log("I have been thumbed up thank you");
            console.log(data);
            $('#quality-' + data.id).html("Quality:  " + data.quality);
        }
    });
}

$('document').ready(function(){
    $('#submit').on("click", submitIdea);
    $('#ideas').delegate(".delete", "click", deleteIdea);
    $('#ideas').delegate(".thumbs_up", "click", upIdea);
    loadIdeas();
});
