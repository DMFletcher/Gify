
$(document).ready(function () {
    var animalArray = ["dog", "cat", "bird"];
    var animalGif;
    var animalName;

    populateButtons(animalArray);



    function populateButtons(result) {
        //I take a passed argument and create a button with the name of the argument
        $("#buttonDiv").empty();
        for (var i = 0; i < result.length; i++) {
            var btn = document.createElement("Button");
            btn.innerHTML = result[i];
            btn.setAttribute("class", "animal-button");
            btn.setAttribute("animal-name", result[i]);

            var newButton = document.getElementById("buttonDiv");
            //Append the element in page (in span).  
            newButton.appendChild(btn);
        }

    }


    function populateImages() {
        //I build the URL , use ajax query , Build an array of gifs , and append them to the HTML
        console.log(animalName);
        var apiKey = "RYfmx99eSVxuKYWs06NrpYwu7fiOEAPD";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" +
            apiKey + "&q=" + animalName + "&limit=25&offset=0&rating=G&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < 10; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var animalGif = $("<img class='great-gify'>");

                    animalGif.attr("src", results[i].images.fixed_height_still.url);
                    animalGif.attr("data-still", results[i].images.fixed_height_still.url);
                    animalGif.attr("data-animate", results[i].images.fixed_height.url);
                    animalGif.attr("data-state", "still");
                    gifDiv.append(p);
                    gifDiv.append(animalGif);
                    $("#imageDiv").prepend(gifDiv);
                    console.log(results[i]);
                }
            }
        });
    }
    $("#add-animal").on("click", function (event) {
        //click event for adding an entry to the animalArray
        event.preventDefault();
        var newAnimal = $("#animal-input").val();
        animalArray.push(newAnimal);
        populateButtons(animalArray);
    });
    $(document).on("click", ".animal-button", function () {
        //click event for populating images
        //   if ($(this).attr("class") === "animal-button"){
        animalName = $(this).attr("animal-name");
        populateImages();
    });
    $(document).on("click", ".great-gify", function () {
        //click event for animating gifs
        //        }else if($(this).attr("class") === "great-gify"){
        console.log($(this).attr("data-state"));
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("data-state", "animate");
            var imgToggle = $(this).attr("data-animate");
            $(this).attr("src", imgToggle);
            console.log($(this).attr("data-state"));
        } else {
            $(this).attr("data-state", "still");
            imgToggle = $(this).attr("data-still");
            $(this).attr("src", imgToggle);

        }
    
        
    });
    
});


