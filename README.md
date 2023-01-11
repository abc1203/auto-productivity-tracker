# Automatic Productivity Webtime Tracker

![image](https://github.com/JasonChen1203/auto-productivity-tracker/blob/main/public/demo.png?raw=true)

A chrome extension that track the user's web activities throughout the day and record their time on websites that they deem productive or unproductive. The app contains options such as pausing/continuing tracking web activities, clearing all web data, and changing the amount of time the app will stop tracking after the user has gone idle.

## Functionalities & Usage

The automatic productivity webtime tracker tracks the user's web activities throughout the day. It displays the data on a donut chart, followed by a list that shows the user's spent time on each website. The app has 2 more tabs, where the user can add or remove websites that they deem productive or unproductive. It is an useful tool that records the user's browing activities, and illustrates the user's productivity on the web.

As of right now, the productivity webtime tracker only records data on the present day. When a day ends (i.e. 12pm), all the data will be cleared and webtime tracking for the next day begins.

Inside the Settings tab, the user can adjust the inactivity interval - the amount of time the app will stop tracking after the user has gone idle. For example, when the inactivity interval is set to 5 minutes and the user visits Google and goes idle, the tracker will track for 5 minutes before stopping. There are also options for pausing/continuing tracking all web activities, and clearing all recorded browsing activities.


## Technologies Used

The entire app is built using JavaScript and the front-end is handled using React. Some of the React dependencies include ```material-ui```, ```react-donut-chart```, and ```emotion```. For more information on the used dependencies, visit ```package.json```. The app uses window.localStorage to record the user's browsing activities on the web.


## How to Set Up

This chrome extension is currently in the process of migrating from manifest v2 to v3, and it is temporarily unavailable from the chrome web store. To use the manifest v2 version, follow the steps below:

1. Download the main branch of this repository
2. Go to your chrome extensions page and enable developer mode
3. Click on the ```Load Unpacked``` button on the top left corner and load the ```build``` folder of the downloaded repository

The extension is loaded and can be used.

![image](https://github.com/JasonChen1203/auto-productivity-tracker/blob/main/public/demo_01.png?raw=true)

