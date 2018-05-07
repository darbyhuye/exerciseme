Darby Huye
EXP57 independent project

Exercise me

I created a program that adds a workout time to the user's google calendar when they are free and it is not raining (tomorrow). This works for most days however there are many bugs in this program:
    - will not work next year
    - only works in boston right now
    - "best" workout time tends to be one at 8 am the next day; should be specialized for the user
    -some edge cases for when comparing non-raining windows with times open on the google calendar fail.
    - lots of security flaws

I used the google calendar api as well as wunderground api for collecting weather data. 

Future improvements: 
    I want to remove the bugs listed above. I also want to make this program run once daily and send a push notification to the user's mobile device with the time for them to exercise outdoors the next day (if any).
