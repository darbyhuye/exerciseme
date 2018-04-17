
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

var times;

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
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
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
function listOfEvents() {
  times = new Array(); 
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 15,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    appendPre('Upcoming events:');

    if (events.length > 0) {
      var duration = 0;
      var possible_time = {
        "hour": [],
        'duration': []
      };
        for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {  /* if the event is all day long */
          when = event.start.date;
          duration = 24;
        }
        var end = event.end.dateTime;
        if (!end) {
          end = event.end.date;
        }

        var endMin = stringToMinutes(end);
        var whenMin = stringToMinutes(when);

        if(duration < 24) duration = endMin - whenMin; /* sets duration */
        possible_time.hour = whenMin;
        possible_time.duration = duration;
        times.push(possible_time);

        /* reinitlizing variables */
        duration = 0;
        possible_time = {
                "hour":[],
                "duration":[]
        };

        console.log("before i will add event");
        //addEvent(events);
      }
    } else {
        times = NULL; /* there are no upcoming events */
    }
    console.log("DONE GETTING CALENDAR TIMES");
    console.log(times);
    return times; 
  });
}

function stringToMinutes(string)
{
  /* parse the times */
  var part = string.split('-', 3);
  var temp = part[2].substring(3)
  /* turn string into number (in minutes) */
  var temp2 = temp.split(':', 2);
  var minutes = parseInt(temp2[0]) + (temp2[1] / 60);
  return minutes;
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


/************************ SHOULD BE IN WEATHER.JS -> EXPERIEMENTING **********/

jQuery(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/5c7bce2bb5d620b8/forecast/hourly/q/MA/Boston.json",
  dataType : "jsonp",
  success : function(parsed_json) {
    var possibleWeatherTimes = nonRainingWindows(parsed_json);
    console.log("TIMES FOR WEATHER");
    console.log(possibleWeatherTimes);


    var possibleCalendarTimes;
    /* get possible calendar times here */
    handleClientLoad(function(possibleCalendarTimes) {
          possibleCalendarTimes = times;
          console.log("TIMES FOR CALENDAR");
          console.log(possibleCalendarTimes);
    }, console.log("FAILED"));


   // var possibleCalendarTimes = handleClientLoad();

    }
  });
});

function nonRainingWindows(parsed_json)
{
    /* information for the next 36 hours */
    var hourly_forecast = parsed_json['hourly_forecast']; 
    var times = new Array();
    var possible_time = {
        "hour":[],
        "duration":[]
    };

    var end_of_window = true;
    var duration = 0;
    var inchesRain;
    var time;
    /* makes list of windows */
    for(var i = 0; i < hourly_forecast.length; i++) {
        time = parseFloat(hourly_forecast[i]['FCTTIME']['hour']);
        inchesRain = parseFloat(hourly_forecast[i]['qpf'].english);
        duration++;
        if(end_of_window == true && inchesRain == 0) {
            end_of_window = false; /* beginning of new window */
            possible_time.hour = time; 
        }
        if(end_of_window == false && inchesRain > 0) { /* end of a window */
            end_of_window = true;
            possible_time.duration = duration;
            times.push(possible_time);
            /* re-initilizes variables */
            duration = 0;
            possible_time = {
                "hour":[],
                "duration":[]
            };
        } 
    }
    if(duration > 0 && inchesRain == 0) {
            possible_time.duration = duration;
            times.push(possible_time);
    }

    return times;
}


/*******************COMPARE TIMES IN THIS FILE *********************/
/* change this later when you know how to access functions from
    different files properly */


function compareLists(weather, calendar){
    console.log(weather.length);
}

