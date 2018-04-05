Darby Huye
EXP57 independent project

Overview:

Files & short decription:
    weather.js -> finds all windows for possible outdoor exercise based on a
            the users current location. Uses a weather api to find times when 
            it is not raining/snowing outdoors. Creates a list of all of these
            times (start time and duration of window).
    optimize.js -> goes through the list of possible windows created in 
            weather.js. Compares these times with the users schedule to 
            determine if a window that works with their schedule exists and, if
            so, which of the windows is the "best" (the definition of best
            is described below).
-> need a file to preform the initial survey of the users preferences.
    -> also need a place to store this information


"best" -> an outdoor exercise window, after comparison with the user's schedule, 
        meets the criteria of being the "best" window if:
        a) If multiple possible windows exists after comparison with the users
            schedule, then the best possible window is the one that meets the
            users morning/afternoon/night preferences.
            i) If multiple windows exists, for example, in the morning and
                the user prefers to exercise in the morning, then the best 
                window is the window that is before the users first obligation
                but not more than an hour before the user's normal wake up time.
            ii) If only one window exists during the users prefered workout 
                time, then this window is the best window.
            iii) If no window exists during the users prefered workout time,
                then a the windows during the users next most preferred workout
                time are analyzed, given at least one window exists. 
        b) If one possible window exists, then it is the best possible window.
        c) If no possible window exists, then there is no best possible window.
            i) If the user has an hour of free time in their scheudle, the app
                should recommend exercising indoors (if possible) during that 
                time.
            ii) If the user does not have free time in their schedule, the app
                should recommend skipping exercise for that day.