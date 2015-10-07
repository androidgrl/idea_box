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
    return  "<div id=idea-" + data.id + " class='idea' data-title=" + data.title
        + " data-body=" + data.body + ">"
        + "<li id='search-title'>" + "Title:  " + data.title + "</li>"
        + "<li id='search-body'>" + "Body:  " + truncated + "</li>"
        + "<li id="+ "quality-" + data.id +">" + "Quality:  " + data.quality + "</li>"
        + "<li><button class='delete' id="+ data.id +">Delete</button></li>"
        + "<li><button class='edit' id="+ "edit-" + data.id +">Edit</button></li>"
        + "<li><button class='thumbs_up' id="+ "up-" + data.id +">Thumbs Up</button></li>"
        + "<li><button class='thumbs_down' id=" + "down-" + data.id +">Thumbs Down</button></li>"
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
        url: '/thumbs_up/' + this.id.slice(3) + '.json',
        type: 'GET',
        success: function(data){
            console.log("I have been thumbed up thank you");
            console.log(data);
            $('#quality-' + data.id).html("Quality:  " + data.quality);
        }
    });
}

function downIdea(){
    console.log("Thumbing down idea");
    $.ajax({
        url: "/thumbs_down/" + this.id.slice(5) + '.json',
        type: 'GET',
        success: function(data){
            console.log("I have been thumbed dwon boo hoo");
            console.log(data);
            $('#quality-' + data.id).html("Quality:  " + data.quality);
        }
    });
}

function editIdea(){
    console.log("Editing idea");
    var id = this.id.slice(5);
    window.location.href = "/ideas/" + id + "/edit";
}

function updateIdea(){
    console.log("Updating your idea");
    console.log($('#edit-title').val());
    console.log($('#edit-id').val());
    var id = $('#edit-id').val();
    $.ajax({
        url: "/ideas/" + id,
        type: "PUT",
        data: editedData(),
        success: function(data){
            console.log("Updated your idea");
            console.log(data);
        }
    });
    window.location.href = "/";
}

function editedData(){
    return {
        idea: {
            title: $('#edit-title').val(),
            body: $('#edit-body').val()
        }
    };
}

function filterIdeas(){
    console.log("Filtering your ideas");
    console.log(this.value);
    if (this.value.length > 0) {
        $(".idea").hide().filter(function () {
            return $(this).text().toLowerCase().indexOf($("#search").val().toLowerCase()) != -1;
        }).show();
    } else if (this.value.length === 0) {
        $(".idea").show();
    } else {
        $(".idea li").hide();
    }
}

//$(“#dino-list li”).hide();

//$(“#dino-search”).on(“keyup click input”, function () {
//if (this.value.length > 0) {
  //$(“#dino-list li”).hide().filter(function () {
    //return $(this).text().toLowerCase().indexOf($(“#dino-search”).val().toLowerCase()) != -1;
  //}).show();
//}
//else {
  //$(“#dino-list li”).hide();
//}
//});


$('document').ready(function(){
    $('#submit').on("click", submitIdea);
    $('#ideas').delegate(".delete", "click", deleteIdea);
    $('#ideas').delegate(".thumbs_up", "click", upIdea);
    $('#ideas').delegate(".thumbs_down", "click", downIdea);
    $('#ideas').delegate(".edit", "click", editIdea);
    $('#edit').on("click", updateIdea);
    $('#search').on("keyup", filterIdeas);
    loadIdeas();
});
