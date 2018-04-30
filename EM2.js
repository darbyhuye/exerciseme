/* Darby Huye
 * EXP57 independent project
 * attempt 2
 */

 // Client ID and API key from the Developer Console
var CAL_CLIENT_ID = '352217354004-02pe7f1kfijtr6rmo09pgjddijqti3p8.apps.googleusercontent.com';
var CAL_API_KEY = 'AIzaSyBt8j6SXFMnOAU6B9HGHS6_c3FJn9Z7OPA';
var calendarEvents;
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
//need to update: timezone, dateTime 
var newEvent; 
var times;
var isFirst, isLast;
var events;

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}


/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: CAL_API_KEY,
    clientId: CAL_CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}


/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  console.log("in updateSigninStatus");
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listOfEvents(); /* makes list of users events  */
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
 // GETS CAL EVENTS IN THE NEXT 36 HOURS 
function listOfEvents() {
  times = new Array(); 
  var today = new Date();
  var enddate = new Date(today);
  enddate.setDate(today.getDate() + 1.5);
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': today.toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 15,
    'timeMax': enddate.toISOString(),
    'orderBy': 'startTime'
  }).then(function(response) {
    events = response.result.items;

    if (events.length > 0) {
      var duration = 0;
      var possible_time = {
        "hour": [],
        'duration': []
      };
        for (i = 0; i < events.length; i++) {
          isFirst = false;
          isLast = false;

          var event = events[i];
          var nextevent = null;
          var when2 = null;
          var end = null;

        //first event:
        if(i == 0) {
            isFirst = true;
            end = today.toISOString();
              when2 = event.start.dateTime;
              if(!when2) {
                when2 = event.start.date;
                duration = null;
              }
        } 
        if (i == events.length - 1) { //last event
            isLast = true;
            when2 = enddate.toISOString();
            end = event.end.dateTime;
            if (!end) { /* if the event is all day long */
              end = event.end.date;
            }
        }
                //if its not the first or last event
        if(isLast == false && isFirst == false){
            nextevent = events[i + 1];
            when2 = nextevent.start.dateTime;
            if(!when2) {
              when2 = nextevent.start.date;
              duration = null;
            }
          end = event.end.dateTime;
          if (!end) { /* if the event is all day long */
            end = event.end.date;
          }
        } 

        var endMin = stringToMinutes(end, isFirst, false);
        var whenMin2 = stringToMinutes(when2, false, isLast);
        //only adds to list if an event is not occuring
        if(duration != null) {
          if(whenMin2 > endMin) duration = whenMin2 - endMin; /* sets duration */
          else if(endMin > whenMin2) duration = 24 - endMin + whenMin2;
          else if(whenMin2 == endMin) duration = 24;
          possible_time.hour = endMin;
          possible_time.duration = duration;
          times.push(possible_time);
        }

        /* reinitlizing variables */
        duration = 0;
        possible_time = {
                "hour":[],
                "duration":[]
        };
      }
    } else {
        times = NULL; /* there are no upcoming events */
    }
  });
}

function stringToMinutes(string, isFirst, isLast)
{
  if(isLast || isFirst) {
    var part = string.split('-', 3);
    var temp = part[2].substring(3);
    var temp2 = temp.split(':', 3);
    var minutes = parseInt(temp2[0]) + (temp2[1] / 60);
    console.log(minutes);
    return minutes - 4;

  }
  /* parse the times */
  var part = string.split('-', 3);
  var temp = part[2].substring(3);
  /* turn string into number (in minutes) */
  var temp2 = temp.split(':', 2);
  var minutes = parseInt(temp2[0]) + (temp2[1] / 60);
  return minutes;
}


/* Adds an event to the calendar 
 * should be used after time slot is selected.
 * should be called in a loop such that it executes once a day */
 
function addEvent(events, thetime) {
  console.log("in add event");
  console.log(events);

    var startDateTime = convertTimetoDate(thetime)
    var endDateTime = convertTimetoDate(thetime + 1); /* makes workout time always 1 hr */

    newEvent = {
      'summary': 'Run outdoors!',
      'description': 'Exercise Me predicts this time to be good for outdoor exercise. This is just a suggestion. Exercise at this time with caution.',
      'start': {
        'dateTime': '2018-04-30T' + startDateTime + ':00-04:00',
        'timeZone': 'America/New_York'
      },
      'end': {
        'dateTime': '2018-04-30T' + endDateTime + ':00-04:00',
        'timeZone': 'America/New_York'
      },
      'colorId': 11
    };
  console.log("start time: " + newEvent['start']['dateTime']);
  console.log("end time: " + endDateTime);
  console.log(newEvent);
   var request = gapi.client.calendar.events.insert({
      'calendarId': 'darbyhuye@gmail.com',
      'resource': newEvent
   });
   request.execute(function(event){ 
      //appendPre('Event created: ' + newEvent.htmlLink);
    });

    console.log("end of add event");

}

function convertTimetoDate(time) {  
  var hour = Math.floor(time);
  var dec = time - hour;
  return (hour + ':' + (dec * 60));
}

/*****************************************************************************/
var possibleCalendarTimes;

jQuery(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/5c7bce2bb5d620b8/forecast/hourly/q/MA/Boston.json",
  dataType : "jsonp",
    success : function(parsed_json) {
      var possibleWeatherTimes = nonRainingWindows(parsed_json);
      handleClientLoad();

      var bestTime;
      setTimeout(function(){
        possibleCalendarTimes = times;
        bestTime = compareLists(possibleWeatherTimes, possibleCalendarTimes);
        if(bestTime != null) {
            addEvent(events, bestTime);
            alert('The best time for you to exercise outdoors was just added to your google calendar.');
        } else {
          alert('It seems you are super busy or it is very rainy where you are. There are no good times for you to exercise outdoors.');
        }
      }, 1800);
    }
  });
});
