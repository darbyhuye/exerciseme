/*
 *
 *  Darby Huye 
 *  Exercise Me - weather.js
 *  Acesses data about the weather
 *  Will return an array containing all possible windows for outdoor exercise
 *  at the users current location.
 *
 */

 var temperature;
 var is_raining = 0; /* 0 -> is raining; 1 -> is not raining */

 //var request = new XMLHttpRequest();
 //var url = 'weather website';


 var url = 'https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}';
 var userLocation; 
 var myLat;
 var myLng;
 var no_more_windows = 1;
 var all_windows = Array();

 //look for possible weather api's 
    //openweathermap?

 function getWeather() 
 {

    setUserLocation();
    makeRequest();
    //determine all possible windows 
        //return this and have a different file that picks the best window
        //so this file should make a queue of structs that hold the start time 
            //and duration of each window.
    findAllWindows();
    return all_windows;

 }

/* gets weather information from offline ? */
function makeRequest() 
{
    request.open("GET", url, true);

}

function setUserLocation() 
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            /* DOUBLE CHECK THE FOLLOWING API DECLARATION */ 
            //recomend using a different api since the rain information
            //is not super accurate 
            //userLocation = api.openweathermap.org/data/2.5/weather?lat=myLat&lon=myLng;
        });
    }
}

function checkForRain() 
{

    //using the API, if raining, change bool to be 1
    //if not raining, do nothing 
}

function findStartTime() 
{
    checkForRain();

    //do stuff
    return start_time;
}

function findDuration() 
{

    //do stuff
    return duration;
}

function findAllWindows() 
{
    var this_start_time = findStartTime();
    var this_duration = findDuration();

    var count = 0;
    /* Invariant:  count is always divisible by two 
    odd indices are always duration and even is always start time */
    /* the start time corresponds with the following duration. */

    while(no_more_windows == 1) {
        all_windows[count] = this_start_time;
        all_windows[count + 1] = this_duration;
        count += 2; 
    }
}



