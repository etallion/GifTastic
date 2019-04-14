var buttons = ["microchip", 
               "commodore 64", 
               "apple 2",
               "steve jobs",
               "bill gates",
               "javascript",
               "mainframe"];



$(document).ready(function(){

var $buttonDiv = $("#buttons");
var $display = $("#displayGIF");

//Renders buttons -------------------------------------------------------------------
function renderButtons(){
    $buttonDiv.empty();
    console.log("renderButtons");

    buttons.forEach(function(subject){
        console.log(subject);
        $display.text("Hello Computer");
        var $newBtn = $("<button>");
        $newBtn.attr("data-value",subject);
        $newBtn.text(subject);
        $newBtn.addClass("myButton");

        $buttonDiv.append($newBtn);
        // $display.append($newBtn);
    });
};

//Button Click Handler, shows 10 GIFs ------------------------------------------------
$buttonDiv.on("click", ".myButton", function(){
    console.log("click button");
    $display.empty();

    // Grabbing and storing the data-value property value from the button
    var newSubject = $(this).attr("data-value");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      newSubject + "&api_key=CrX8JL8Xml3HttBQHBLoftYCWB2ZBYvq&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var gifDiv = $("<div>");
          // gifDiv.addClass("eachGIF");
          gifDiv.addClass("col-sm");
       
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var subjectImg = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          subjectImg.attr("src", results[i].images.fixed_width_still.url);
          subjectImg.attr("data-animate", results[i].images.fixed_height.url);
          subjectImg.attr("data-still", results[i].images.fixed_width_still.url);
          subjectImg.attr("data-state", "still");
          subjectImg.addClass("gif");

          
            if(i%2===0){
                console.log("new row ---------------");
                //add new row after every 3 images are added
                var $newRow = $("<div>");
                 $newRow.addClass("row");
                 $display.append($newRow);
            } 
        
          gifDiv.append(subjectImg);
          gifDiv.append(p);

          // Prependng the gifDiv to the HTML page in the "#displayGIF" div
          $("#displayGIF").append(gifDiv);
        }
      });
});


//Pause/Play GIF image Click Handler ------------------------------------------------
$display.on("click", ".gif", function() {
    console.log("pause button");
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});


//Adds new Button ----------------------------------------------------------------------------
$("#addButton").on("click", function(){
    event.preventDefault();
    console.log("new search");
    buttons.push($("#newSearch").val());
    renderButtons();

});
renderButtons();
}); // END OF document.ready()


