$(document).ready(function () {
  // Setting the day on the header
  const currentDay = $("#currentDay");
  // Creating an empty array to hold calendar events
  let eventsArray = "";
  // This saves at which moment the calendar was last rendered
  let calendarRendered = moment();

  // Building the calendar for the current day with saved Events
  function renderCalendar(today, eventsArray) {
    let newHour = moment(today).hour(9); // Starting at 9am...
    const hourRow = $(".parent"); // Building onto the container element of the HTML reference code
    
    for (let i = 1; i < 10; i++) {
      // Looping through calendar to build a 9am to 5pm workday
      
      let timeBlock = newHour.format("hA"); // setting up the timeBlocks and hourly format
      
      let timeOfDay = ""; // empty string to hold the different classes defining "past", "present", & "future" events
      if (today.isAfter(newHour, "hour")) {
        timeOfDay = "past";
      } else if (today.isBefore(newHour, "hour")) {
        timeOfDay = "future";
      } else {
        timeOfDay = "present";
      }
      
      hourRow.append(row); // attaching row to container
      
      const row = $("<div>").addClass("row"); // Adding a row to hold each element

      row.append($("<div>").addClass("col-2 hour").text(timeBlock)); // adding the hour column

      row.append(
        $("<textarea>")
          .addClass(`col-8 ${timeOfDay}`)
          .addClass("description")
          .text(eventsArray[timeBlock])
      ); // adding events column with any saved events

      row.append($("<button>").addClass("col-2 saveBtn").attr("id", timeBlock)); // adding buttons

      newHour.add(1, "hour"); // increasing each hour til it reaches 5
    }
  }

  // Setting the current day
  function initCal() {
    const today = moment();
    currentDay.text(today.format("LL")); // setting the header to display the day

    renderCalendar(today, eventsArray); // building the daily calendar with saved events
  }

  // Stores events to local storage
  function storeEvents() {
    localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
  }

  // Loads events from local storage
  function loadEvents() {
    let storedEvents = JSON.parse(localStorage.getItem("eventsArray"));
    if (storedEvents) {
      eventsArray = storedEvents;
    }
    console.log("my events: ", storedEvents);
  }

  // Checking the current time when calendar is rendered.
  function currentTime() {
    const checkTimeInterval = setInterval(function () {
      if (moment().isAfter(calendarRendered, "minute")) {
        initCal();
      }
    }, 60000);
  }

  loadEvents();
  initCal();
  currentTime();

  // Saving the events when the buttons are clicked
  $("button.saveBtn").on("click", function (event) {
    let saveEvent = $(this).siblings(".description").val();
    console.log(timeBlock);

    // let saveEvent = event.currentTarget.parentElement.children[1].value;
    // eventsArray[event.currentTarget.id] = saveEvent;
    storeEvents();
    console.log(saveEvent);
    console.log(timeKey);
  });
});
