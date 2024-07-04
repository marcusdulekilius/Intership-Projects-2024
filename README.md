# Intership-Projects-2024
Internships projects i did while working in İSBAK

# csvsort
This code creates 1 million random and unique numbers and saves them in a .csv file. Then reads that file and creates a folder named 'userfile'. And checks if the folder that code is in has a folder named 'userfile', deletes it and recreates a new one. 
After than, in 'userfile' folder, creates folders from 0 to 9 for 3 times and creates a 'userfile.txt' for every folder. 
For example, if number is 0123456, the 'userfile.txt' that has this number is in userfile/0/1/2/userfile.txt.
With this code, we use sort for faster control mechanism.

# csvtobin
____________

# 1) hexmaker.py
This code creates seven hex digits for 1 million unique lines. And saves this list as a .csv file. 

# 2) binmaker.py
This code reads those hex digits and turns them into ASCII codes for less memory. But this code has a problem, and it is that the converting between ASCII and hex aren't starting from 0 to 127, it starts from 20 to 127.
