//WHEN THE PAGE IS DONE LOADING...
$(document).ready(function() {
    //MAKE A GET REQUEST TO /api/chirps
    $.get("http://localhost:3000/api/chirps", function(data) {
        //LOOP THROUGH ALL THE ELEMENTS IN THE ARRAY
        data.forEach(function(chirp) {
            //AND CREATE A DIV FOR EACH ONE
            createDiv(chirp);
        });
    });
    //WHEN THERE'S A KEYUP EVENT ON THE INPUT BOX...
    $("#chirp-input").keyup(function(e) {
        //SET THE BUTTON TO DISABLED IF THERE'S NO TEXT IN THE BOX
        $("#chirp-btn").attr('disabled', e.target.value.length <= 0);
    })
    //WHEN THE CHIRP BUTTON IS CLICKED...
    $("#chirp-btn").click(function(e) {
        //CREATE A NEW CHIRP JS OBJECT
        var chirp = {
            user: "See_Em",
            message: $("#chirp-input").val(),
            timestamp: Date.now().toString()
        };
        //AND SEND A POST REQUEST TO THE SERVER WITH THE JSON'IFIED
        //VERSION OF THE CHIRP
        $.post("http://localhost:3000/api/chirps", JSON.stringify(chirp), "json")
            //THEN, IF EVERYTHING WAS SUCCESSFUL
            .then(function() {
                //CREATE A DIV FROM THE CHIRP
                createDiv(chirp);
            //OR PRINT THE ERROR, IF THERE WAS ONE    
            }, function(err) {
                console.log(err);
            })
    })
})

//CREATE A NEW DIV ELEMENT WITH THE PROPERTIES OF A GIVEN CHIRP
function createDiv(chirp) {
    var div = $("<div class='chirp'></div>");
    div.append(
        $("<h4>" + chirp.user + "</h4>"),
        $("<h6>" + chirp.message + "</h6>"),
        $("<p>" + chirp.timestamp + "</p>") // fix this so it shows actual date/time
    );
    $(".chirp-container").append(div);
};
