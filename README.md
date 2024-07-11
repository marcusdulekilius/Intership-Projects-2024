# Intership-Projects-2024
Internships projects i did while working in İSBAK

# > csvsort
This one creates 1 million random and unique numbers and saves them in a .csv file. Then reads that file and creates a folder named 'userfile'. And checks if the folder that code is in has a folder named 'userfile', deletes it and recreates a new one. 
After than, in 'userfile' folder, creates folders from 0 to 9 for 3 times and creates a 'userfile.txt' for every folder. 
For example, if number is 0123456, the 'userfile.txt' that has this number is in userfile/0/1/2/userfile.txt.
With this code, we use sort for faster control mechanism.

# > csvtobin
____________

# 1) hexmaker.py
This one creates seven hex digits for 1 million unique lines. And saves this list as a .csv file. 

# 2) binmaker.py
This  one reads those hex digits and turns them into ASCII codes for less memory. But this code has a problem, and it is that the converting between ASCII and hex aren't starting from 0 to 127, it starts from 20 to 127.

# > log-viewer
_____________

# 1) index.html
This HTML code defines a log viewer web page with dynamic functionality:

# 2) styles.css
This CSS code controls the appearance of a dynamic log viewing application. Here's a breakdown of its functions:

> General Styling:

* body: Defines overall page fonts, transition effects, and basic layout settings.
* .container: Sets the general style and layout of the log viewing area.
* .switch and .slider: Controls the style and animation of the theme toggle switch button.
  
>> Theme Settings:

* .light-theme and .dark-theme: Defines background and text colors for light and dark themes.
* Selectors under .dark-theme apply custom styles when in dark mode (e.g., background colors for charts and log viewing area).

>> Statistics Panel Styles:

* .statistics and .statistics-header: Defines the overall style of the statistics panel and appearance of the header section. Emphasizes links and interactive elements.
  
>> Log Entries and Filters:

* .log-entries-scrollable and .log-entry: Sets the style of log entries and scrollable view for logs.
* .input-group: Controls the layout and style of filtering inputs.

>> Color and Contrast Settings:

* Manages color, background, and text color changes based on theme toggling.
This CSS ensures the application maintains a consistent appearance in both light and dark theme modes, adapting dynamically to user interactions for theme changes.

# 3) script.js
This JavaScript code sets up a dynamic log viewer application with filtering and visualization capabilities:

>> Theme Toggle: It allows users to switch between light and dark themes by clicking a checkbox (theme-toggle-checkbox). The theme change is handled by adding or removing the dark-theme class from the body element.

>> Log Data Generation: Initially, it creates an array logData containing 200 log entries. Each log entry consists of an IP address (ip) and a message (message). The first log entry is a sample "User logged in successfully." while subsequent entries are generated with placeholder messages.

>> Table Population: The populateLogTable function dynamically creates HTML table rows (<tr>) for each log entry in logData. It inserts columns (<td>) displaying the IP address and message into each row. This function is called on page load to populate the log entries table (log-entries).

>> Display Log Entries: The displayLogEntries function updates the displayed log entries based on user input in filter fields (ifilter for IP and mfilter for message). It filters logData based on the entered filters and updates the DOM to show matching log entries.

>> Filtering: Event listeners are set up to listen for input changes (input event) in the filter fields (ifilter and mfilter). When a filter value changes, the filterLogs function is triggered. It filters logData based on the current filter values and calls displayLogEntries to update the displayed logs accordingly.

>> Statistics Display: The displayStatistics function calculates and displays statistics about the log data. It counts occurrences of each unique IP address (ip) using reduce, prepares chart data using Chart.js, and renders a bar chart (stats-chart) displaying the message count per IP address.
Final version does those transactions using API(s) and Endpoints.
