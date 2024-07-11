# Intership-Projects-2024
Internships projects i did while working in İSBAK

# csvsort
___________
This one creates 1 million random and unique numbers and saves them in a .csv file. Then reads that file and creates a folder named 'userfile'. And checks if the folder that code is in has a folder named 'userfile', deletes it and recreates a new one. 
After than, in 'userfile' folder, creates folders from 0 to 9 for 3 times and creates a 'userfile.txt' for every folder. 
For example, if number is 0123456, the 'userfile.txt' that has this number is in userfile/0/1/2/userfile.txt.
With this code, we use sort for faster control mechanism.

# csvtobin
____________

> hexmaker.py
This one creates seven hex digits for 1 million unique lines. And saves this list as a .csv file. 

> binmaker.py
This  one reads those hex digits and turns them into ASCII codes for less memory. But this code has a problem, and it is that the converting between ASCII and hex aren't starting from 0 to 127, it starts from 20 to 127.

# log-viewer
_____________

>> index.html
This HTML code defines a log viewer web page with dynamic functionality.

>> styles.css
This CSS code controls the appearance of a dynamic log viewing application.

> General Styling:

* body: Defines overall page fonts, transition effects, and basic layout settings.
* .container: Sets the general style and layout of the log viewing area.
* .switch and .slider: Controls the style and animation of the theme toggle switch button.

> Theme Settings:

* .light-theme and .dark-theme: Defines background and text colors for light and dark themes.
* Selectors under .dark-theme apply custom styles when in dark mode (e.g., background colors for charts and log viewing area).

> Statistics Panel Styles:

* .statistics and .statistics-header: Defines the overall style of the statistics panel and appearance of the header section. Emphasizes links and interactive elements.
  
> Log Entries and Filters:

* .log-entries-scrollable and .log-entry: Sets the style of log entries and scrollable view for logs.
* .input-group: Controls the layout and style of filtering inputs.

> Color and Contrast Settings:

* Manages color, background, and text color changes based on theme toggling.
This CSS ensures the application maintains a consistent appearance in both light and dark theme modes, adapting dynamically to user interactions for theme changes.

<svg height="256" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" width="256" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h256v256h-256z" fill="#f7df1e"/><path d="m67.311746 213.932292 19.590908-11.856051c3.7794539 6.701105 7.2175746 12.370896 15.464432 12.370896 7.905117 0 12.88899-3.092318 12.88899-15.120254v-81.798096h24.057499v82.13821c0 24.917333-14.605816 36.258946-35.915175 36.258946-19.2451048 0-30.4164571-9.96734-36.0870603-21.995683"/><path d="m152.380952 211.354413 19.58847-11.341613c5.156572 8.421181 11.858489 14.607035 23.714946 14.607035 9.968153 0 16.324673-4.983873 16.324673-11.857676 0-8.248483-6.529625-11.170134-17.527873-15.980089l-6.012749-2.579505c-17.357206-7.387835-28.871111-16.667225-28.871111-36.257727 0-18.04353 13.7472-31.791543 35.228444-31.791543 15.294172 0 26.292013 5.327645 34.195911 19.247137l-18.731073 12.028343c-4.124444-7.388648-8.591034-10.309486-15.464431-10.309486-7.045689 0-11.513905 4.467809-11.513905 10.309486 0 7.217574 4.468216 10.139631 14.777702 14.607847l6.013968 2.577473c20.449524 8.764546 31.963428 17.699353 31.963428 37.804292 0 21.653537-17.012215 33.509588-39.86692 33.509588-22.339454 0-36.774603-10.653664-43.819073-24.573562"/></svg>![javascript-js](https://github.com/marcusdulekilius/Intership-Projects-2024/assets/114644911/29a2de19-275f-4f9b-8452-dfa415c82af9) script.js
This JavaScript code sets up a dynamic log viewer application with filtering and visualization capabilities:

> Theme Toggle: It allows users to switch between light and dark themes by clicking a checkbox (theme-toggle-checkbox). The theme change is handled by adding or removing the dark-theme class from the body element.

> Log Data Generation: Initially, it creates an array logData containing 200 log entries. Each log entry consists of an IP address (ip) and a message (message). The first log entry is a sample "User logged in successfully." while subsequent entries are generated with placeholder messages.

> Table Population: The populateLogTable function dynamically creates HTML table rows (<tr>) for each log entry in logData. It inserts columns (<td>) displaying the IP address and message into each row. This function is called on page load to populate the log entries table (log-entries).

> Display Log Entries: The displayLogEntries function updates the displayed log entries based on user input in filter fields (ifilter for IP and mfilter for message). It filters logData based on the entered filters and updates the DOM to show matching log entries.

> Filtering: Event listeners are set up to listen for input changes (input event) in the filter fields (ifilter and mfilter). When a filter value changes, the filterLogs function is triggered. It filters logData based on the current filter values and calls displayLogEntries to update the displayed logs accordingly.

> Statistics Display: The displayStatistics function calculates and displays statistics about the log data. It counts occurrences of each unique IP address (ip) using reduce, prepares chart data using Chart.js, and renders a bar chart (stats-chart) displaying the message count per IP address.
Final version does those transactions using API(s) and Endpoints.
