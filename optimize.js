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

/* the odd indicies of the following are durations and even are starttimes */
/* the start time is associated with the following duration */

function compareLists(weather, calendar){
    /* no possible time */
    if(weather.length == 0 || calendar.length == 0) return null;
    //return 20.00;

    console.log(weather);
    console.log(calendar);

    var Whour = null;
    var Chour = null;
    var Wdur = null;
    var Cdur = null;
    var diff;
    var overlap = 0;
    for(var i = 0; i < weather.length; i++) {
        Whour = weather[i].hour;
        Wdur = weather[i].duration;
        for(var j = 0; j < calendar.length; j++) {
            Chour = calendar[j].hour;
            Cdur = calendar[j].duration;
            //if not raining before free
            if(checkItsDay(Whour, Chour, Wdur, Cdur)) {
                if(Whour < Chour) { 
                    diff = Chour - Whour;
                    //if they overlap
                    if(diff < Wdur) {
                        //see if an hour overlaps
                        if(Wdur > Cdur) overlap = Cdur;
                        else if(Cdur > Wdur) overlap = (Wdur +Whour) - Chour;
                        else if(Cdur == Wdur) overlap = Chour - (Whour + Wdur);
                        //overlap = Chour - (Whour + Wdur);
                        if(overlap > 1)
                            return Chour;
                    }
                } 
                if(Chour < Whour) { //if free before not raining
                    diff = Whour - Chour;
                    //if they overlap
                    console.log(diff);
                    console.log("cdur: " + Cdur);
                    console.log("wdur: " + Wdur);
                    if(diff < Cdur) {
                        //see if an hour overlaps
                        if(Wdur < Cdur) overlap = Wdur;
                        //else if(Cdur <= Wdur) overlap = Whour - (Chour + Cdur);
                        
                        else if(Cdur < Wdur) overlap = (Cdur +Chour) - Whour;
                        else if(Cdur == Wdur) overlap = Whour - (Chour + Cdur);

                        //else if(Cdur == Wdur) overlap = Whour - (Chour + Cdur);
                        console.log(overlap);
                        if(overlap > 1)
                            return Whour;
                    }
                }
            }

        }
    }
    return null;
}

//verify that it is daytime 
function checkItsDay(whour, chour, wdur, cdur) {
    var end;
    if(whour < 8) {
        end = whour + wdur;
        if(end < 9) return false;
    } 
    if(chour < 8) {
        end = chour + cdur;
        if(end < 9) return false;
    }
    if(whour > 22) {
        end = whour + wdur;
        if(end < 33) return false;
    }
    if(chour > 22) {
        end = chour + cdur;
        if(end < 33) return false;
    }
    return true;
}