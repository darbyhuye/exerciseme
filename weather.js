/*
 *          Returns a list of times it is not raining in the next 36 hours.
 *
 *          Limitation: Only works in Boston, MA right now.
 *
 */

jQuery(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/5c7bce2bb5d620b8/forecast/hourly/q/MA/Boston.json",
  dataType : "jsonp",
  success : function(parsed_json) {
    var possibleWeatherTimes = nonRainingWindows(parsed_json);
    console.log("TIMES FOR WEATHER");
    console.log(possibleWeatherTimes);


    /* get possible calendar times here */
    handleClientLoad(function (possibleCalendarTimes){

    });

    var possibleCalendarTimes = handleClientLoad();
    console.log("TIMES FOR CALENDAR");
    console.log(possibleCalendarTimes);

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