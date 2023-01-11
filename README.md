# Automatic Productivity Webtime Tracker

A chrome extension that track the user's web activities throughout the day and record their time on websites that they deem productive or unproductive. The app contains options such as pausing/continuing tracking web activities, clearing all web data, and changing the amount of time the app will stop tracking after the user has gone idle.

## Functionalities & Usage

The automatic productivity webtime tracker tracks the user's web activities throughout the day. It displays the data on a donut chart, followed by a list that shows the user's spent time on each website. The app has 2 more tabs, where the user can add or remove websites that they deem productive or unproductive. It is an useful tool that records the users' browing activities, and illustrates the users' productivity on the web.

As of right now, the productivity webtime tracker only records data on the present day. When a day ends (i.e. 12pm), all the data will be cleared and webtime tracking for the next day begins.


## Technologies Used

The entire app is built using JavaScript and the front-end is handled using React. Some of the React dependencies include material-ui, react-donut-chart, and emotion. For more information on the used dependencies, visit ```package.json```. The app uses window.localStorage to record the user's browsing activities on the web.

