/*
 *
 *      Darby Huye
 *      Exercise Me - optimize.js
 *      Uses weather.js to get all windows and then picks the best window 
 *      If no "best" window exists, then it will recommend the user exercise 
 *      indoors or take the day off. Other wise, it just knows the start time
 *      and duration of the best outdoor workout time. 
 *
 */

 var starttime;
 var duration;

/* the odd indicies of the following are durations and even are starttimes */
/* the start time is associated with the following duration */
var allwindows = Array();
var count = 0; /* Invariant: will always be divisible by two */

function compareLists() 
{
   //nonRainingWindows();
}