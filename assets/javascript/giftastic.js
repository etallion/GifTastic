var buttons = ["superman", 
               "batman", 
               "wonder woman",
               "catwoman",
               "the hulk",
               "spiderman",
               "shazam"];



$(document).ready(function(){

var $buttonDiv = $("#buttons");
var $display = $("#displayGIF");

//Renders buttons -------------------------------------------------------------------
function renderButtons(){
    $buttonDiv.empty();
    console.log("renderButtons");

    buttons.forEach(function(subject,i){
        console.log(subject);
        // $display.text("Hello Computer");
        var $newBtn = $("<button>");
        $newBtn.addClass("btn");
        $newBtn.addClass("btn-outline-primary");
        $newBtn.attr("data-value",subject);
        $newBtn.attr("index",i);
        $newBtn.text(subject);
        $newBtn.addClass("myButton");

        $buttonDiv.append($newBtn);
        // $display.append($newBtn);
    });
};

//Button Click Handler ------------------------------------------------
$buttonDiv.on("click", ".myButton", function(){
    console.log("click button");
    $("#col1").empty();
    $("#col2").empty();
    $("#col3").empty();
    // Grabbing and storing the data-value property value from the button
    var newSubject = $(this).attr("data-value");

    displayResults(newSubject);
});

//display gifs, shows 10 GIFs ------------------------------------------------
function displayResults(newSubject){
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      newSubject + "&api_key=CrX8JL8Xml3HttBQHBLoftYCWB2ZBYvq&limit=10";

      //Update the resultsHeading
      $("#resultsHeading").empty();
      $("#resultsHeading").html('<span>Showing 10 results for : ' + newSubject + ' <button class="btn btn-outline-secondary btn-sm" id="deleteBtn" data-value="'+newSubject+'">Delete button</button>');


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
          gifDiv.addClass("eachGIF");
          // gifDiv.addClass("col-sm");
       
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var subjectImg = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item

          subjectImg.attr("src", results[i].images["480w_still"].url);
          subjectImg.attr("data-animate", results[i].images.fixed_height.url);
          subjectImg.attr("data-still", results[i].images.fixed_width_still.url);
          subjectImg.attr("data-state", "still");
          subjectImg.addClass("gif");

          gifDiv.prepend(p);
          gifDiv.prepend(subjectImg);
          
          
          // Prepend GIF into 3 columns
            if(i%3===0){
              console.log("0000000000");
              // Prependng the gifDiv to the HTML page in the "#displayGIF" div
              $("#col1").prepend(gifDiv);
            } else if (i%3===1){
              console.log("11111111");
              $("#col2").prepend(gifDiv);
              console.log("2222222222");
            } else if (i%3===2){
              $("#col3").prepend(gifDiv);
            }
        }
      });
};


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
    $(this).css("border-color", "yellow");
    $(this).css("border-width", "1");
    $(this).css("border-style", "solid");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    $(this).attr("data-state", "animate");
    $(this).css("border-width", "0");
  }
  
});


//Adds new Button ----------------------------------------------------------------------------
$("#addButton").on("click", function(){
    event.preventDefault();
    console.log("new search");
    if($("#newSearch").val() != "" && (buttons.indexOf($("#newSearch").val()) < 0)){
    buttons.push($("#newSearch").val());
    renderButtons();
    displayResults($("#newSearch").val());
    } else {
      //invalid entry
      alert("Please enter a valid entry.");
    }

});

//Deletes  Button ----------------------------------------------------------------------------
$("#resultsHeading").on("click","#deleteBtn", function(){
  event.preventDefault();
  console.log("delete button " + $(this).attr("data-value") + " at position: " +$(this).attr("index"));
  
  var myIndex = buttons.indexOf($(this).attr("data-value"));

  buttons.splice(myIndex,1);
  renderButtons();
  $("#resultsHeading").empty();
  $("#resultsHeading").html('<span>Showing 10 results for : ' + $(this).attr("data-value"));

});

renderButtons();
displayResults("superman");
}); // END OF document.ready()


