/*
 *
 *          Darby Huye
 *          Exercise me -> calendar.js 
 *          makes an object with the open intervals on a users calendar
 *  
 *
 *
 */


// Client ID and API key from the Developer Console
var CLIENT_ID;
var API_KEY;
var calendarEvents;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS;

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES;

var authorizeButton;
var signoutButton;

//need to update: timezone, dateTime 
var newEvent; 

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    authorizeButton = document.getElementById('authorize-button');
    signoutButton = document.getElementById('signout-button');
    SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
    DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    CLIENT_ID = '352217354004-02pe7f1kfijtr6rmo09pgjddijqti3p8.apps.googleusercontent.com';
    API_KEY = 'AIzaSyBt8j6SXFMnOAU6B9HGHS6_c3FJn9Z7OPA';

    newEvent = {
      'summary': 'Run outdoors!',
      'description': 'Exercise Me predicts this time to be good for outdoor exercise. This is just a suggestion. Exercise at this time with caution.',
      'start': {
        'dateTime': '2015-05-28T09:00:00-07:00',
        'timeZone': 'America/Boston'
      },
      'end': {
        'dateTime': '2015-05-28T17:00:00-07:00',
        'timeZone': 'America/Boston'
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 12 * 60},
          {'method': 'popup', 'minutes': 30}
        ]
      }
    };
    console.log("in calendar.js")
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  console.log("in init client");
  console.log(API_KEY);
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    console.log("before button that is working");
    console.log(authorizeButton);
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log("before button issue");
    console.log(authorizeButton);
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    console.log("this is where the list was printed");
    listUpcomingEvents(); /* prints events to screen */
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 30,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    appendPre('Upcoming events:');
    console.log("before this if statement");
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {  /* if the event is all day long */
          when = event.start.date;
        }
        var end = event.end.dateTime;
        if (!end) {
          end = event.end.date;
        }
        //appendPre(event.summary + ' (' + when + " ending at "+ end + ')');
        //calendarEvents.push(when + " ending at " + end);
        console.log("before add event");
        addEvent(events);
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}



/* Adds an event to the calendar 
 * should be used after time slot is selected.
 * should be called in a loop such that it executes once a day */
 
function addEvent(events) {

    var startDateTime = new Date();
    var endDateTime = new Date() + 60; /* makes workout time always 1 hr */

    newEvent['start']['dateTime'] = startDateTime;
    newEvent['end']['dateTime'] = endDateTime;

    events.push(newEvent);

   // var end = new EventDateTime();
    //end.setDateTime(endDateTime);
   // newEvent.setEnd(end);

/*
    var reminderOverrides = new EventReminder[] {
        new EventReminder().setMethod("email").setMinutes(60 * 12),
        new EventReminder().setMethod("popup").setMinutes(30),
    };*/

  /*  var reminders = new Event.Reminders()
      reminders.setUseDefault(false)
      reminders.setOverrides(Arrays.asList(reminderOverrides));
    newEvent.setReminders(reminders); */

    console.log("end of add event");

}

