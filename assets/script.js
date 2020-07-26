$(document).ready(function () {
  // Setting the date and time for the header
  $("#currentDay").text(moment().format("[Today is] dddd, MMMM Do YYYY"));

  // Function for all of the save buttons
  $(".saveBtn").on("click", function () {
    var activity = $(this).siblings(".description").val(); // this value will capture the value of our textArea
    var hour = $(this).parent().attr("id"); // this captures the id which tells us which hour the event coresponds to

    localStorage.setItem(hour, activity); // setting the hour and event to local storage
  });

  // Determining the row hour...
  function hourUpdate() {
    $(".parent").each(function () {
      var ourHour = parseInt($(this).attr("id").split("-")[1]); //...separating the number from the "hour-" and selecting the number in that string
      var momentHour = moment().hours(); // This connects the moment function and keeps the calendar current.
      var _this = $(this); // trying to reduce the times that the DOM is called

      // This statement compares ourHour to the momentHour to determine past/present/future classes for our textAreas
      if (ourHour < momentHour) {
        _this.children(".description").addClass("past");
      } else if (ourHour === momentHour) {
        _this.children(".description").addClass("present");
        _this.children(".description").removeClass("past");
      } else {
        _this.children(".description").addClass("future");
        _this.children(".description").removeClass("past");
        _this.children(".description").removeClass("present");
      }
    });
  }

  setInterval(hourUpdate, 6000); // this will update the hour class every minute

  // Storage for each textArea
  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  $("#hour-13 .description").val(localStorage.getItem("hour-13"));
  $("#hour-14 .description").val(localStorage.getItem("hour-14"));
  $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  $("#hour-16 .description").val(localStorage.getItem("hour-16"));
  $("#hour-17 .description").val(localStorage.getItem("hour-17"));

  // Clear Button --> clears local storage & reloads calendar
  $("#clearDay").on("click", function () {
    localStorage.clear();
    location.reload(true);
  });
});
